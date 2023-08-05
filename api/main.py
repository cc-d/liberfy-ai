#!/usr/bin/env python3
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload, selectinload
from datetime import timedelta
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from typing import List, Optional, Dict, Any, Union, TypeVar, Generic, Type, Callable

import logging

from config import PORT, HOST, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from database import engine, SessionLocal, get_db, to_dict, model_to_dict
from models import User, Base, Chat, Message, Completion, UserToken
from schema import (
    EmailPassData,
    BaseUser,
    BaseChat,
    BaseMessage,
    BaseCompletion,
    BaseUserDB,
    BaseToken,
    BaseUserToken,
    DataCreateChat,
    DataCreateCompletion,
    DataMsgAdd,
    DataUserFromToken,
)
from security import hash_passwd, verify_passwd, create_user, create_user_token
from myfuncs import runcmd
from logfunc import logf

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

Base.metadata.create_all(bind=engine)


class CSPMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        csp_directives = (
            "default-src 'self'; "
            "img-src 'self' data: https://fastapi.tiangolo.com; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "style-src 'self' https://cdn.jsdelivr.net"
        )
        response.headers["Content-Security-Policy"] = csp_directives
        return response


app = FastAPI()

# fuck CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,  # Allow credentials (cookies, authorization headers, etc.)
    expose_headers=["*"],
)

# CSP middleware
app.add_middleware(CSPMiddleware)

arouter = APIRouter()

print("loading routes")


@arouter.get("/")
async def hello():
    return {"status": "ok"}


@arouter.post("/user/login", response_model=BaseUserToken)
async def login_user(formdata: EmailPassData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == formdata.email).first()
    if not user:
        user = create_user(
            user_email=formdata.email, user_password=formdata.password, db=db
        )
        token = create_user_token(user.id, db)
        return BaseUserToken(email=user.email, id=user.id, token=token.token)

    if not verify_passwd(formdata.password, user.hpassword):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password for email.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = db.query(UserToken).filter(UserToken.user_id == user.id).first()
    if token is None:
        token = create_user_token(user.id, db)

    return BaseUserToken(email=user.email, id=user.id, token=token.token)


@arouter.post("/user/user_from_token", response_model=BaseUser)
async def user_from_token(formdata: DataUserFromToken, db: Session = Depends(get_db)):
    token = db.query(UserToken).filter(UserToken.token == formdata.token).first()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Token not found"
        )

    user = db.query(User).filter(User.id == token.user_id).first()
    print('user', user, vars(user))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return BaseUser(email=user.email, id=user.id)


@arouter.get('/user/{user_id}/chats', response_model=List[BaseChat])
async def get_chats(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    chats = db.query(Chat).filter(Chat.user_id == user_id).all()

    bchats = []
    for c in chats:
        bchats.append(BaseChat(id=c.id, name=c.name, user_id=user.id, completions=[]))
    print(bchats, 'bchats')
    return bchats


@arouter.get("/openapi.json")
async def get_openapi_schema():
    return get_openapi(title="API documentation", version="1.0.0", routes=app.routes)


@arouter.post("/chat/new", response_model=BaseChat)
async def new_chat(data: DataCreateChat, db: Session = Depends(get_db)):
    chat = Chat(name=data.name, user_id=data.user_id)
    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


@arouter.get("/chat/{chat_id}", response_model=BaseChat)
async def get_chat(chat_id: int, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    user = db.query(User).filter(User.id == chat.user_id).first()
    completions = list(
        db.query(Completion)
        .filter(Completion.chat_id == chat.id)
        .options(selectinload(Completion.messages))
        .all()
    )
    comps = []
    for c in completions:
        msgs = [BaseMessage(**model_to_dict(m)) for m in c.messages]
        comps.append(BaseCompletion(messages=msgs, **model_to_dict(c)))

    print('compscomps', comps)

    return BaseChat(id=chat.id, user_id=user.id, completions=comps, name=chat.name)


@arouter.post("/completion/new", response_model=BaseCompletion)
async def create_completion(data: DataCreateCompletion, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == data.user_id).first()
    logger.debug("user %s", user)
    completion = Completion(chat_id=data.chat_id, user_id=user.id)

    logger.debug("completion %s", completion)
    db.add(completion)
    db.commit()
    db.refresh(completion)

    logger.debug("completion created %s %s", completion, vars(completion))

    comptitle = (
        'System message' if not hasattr(data, 'sysprompt') else str(data.sysprompt)
    )
    msg = Message(role='system', content=comptitle, completion_id=completion.id)
    print(msg)
    db.add(msg)
    print('addmsg', msg)
    db.commit()
    print('commsg', msg)
    db.refresh(msg)
    print('refmsg', msg)

    msgs = [BaseMessage(**model_to_dict(msg))]
    print('msgsmsgs', msgs)
    bc = BaseCompletion(messages=msgs, **model_to_dict(completion))
    return bc


@arouter.get("/completion/{completion_id}", response_model=BaseCompletion)
async def get_completion(completion_id: int, db: Session = Depends(get_db)):
    completion = db.query(Completion).filter(Completion.id == completion_id).first()

    if not completion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found"
        )

    msg = db.query(Message).filter(Message.completion_id == completion.id).all()
    completion.messages = list(msg)

    return completion


@arouter.post("/completion/{completion_id}/message/add", response_model=BaseMessage)
async def add_message(data: DataMsgAdd, db: Session = Depends(get_db)):
    role, content = data.role, data.content
    msg = Message(role=role, content=content, completion_id=completion_id)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


app.include_router(arouter, prefix="/api")


if (__name__) == "__main__":
    runcmd(f"uvicorn main:app --host {HOST} --port {PORT} --reload", output=False)
