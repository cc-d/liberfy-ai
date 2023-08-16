#!/usr/bin/env python3
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session, joinedload, selectinload
from datetime import timedelta
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    OAuth2AuthorizationCodeBearer,
    OAuth2PasswordRequestForm,
    OAuth2PasswordBearer,
)
from fastapi.responses import Response
from fastapi.openapi.models import OAuthFlowAuthorizationCode

from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from typing import List, Optional, Dict, Any, Union, TypeVar, Generic, Type, Callable

import logging

from config import (
    PORT,
    HOST,
    JWT_SECRET_KEY,
    JWT_ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from database import engine, SessionLocal, get_db, model_to_dict, add_commit_refresh
from models import User, Base, Chat, Message, Completion
from schemas import (
    BaseUser,
    DBUser,
    DBUserWithToken,
    DBUserPass,
    BaseMsg,
    DBMsg,
    BaseComp,
    GPTComp,
    DBComp,
    BaseChat,
    NoDBChat,
    DBChat,
    DataEmailPass,
    DataCreateChat,
    DataCreateComp,
    DataMsgAdd,
    Token,
    DataOAuth,
    DataJustToken,
)
from security import (
    hash_passwd,
    verify_passwd,
    create_user,
    create_access_token,
    user_from_jwt,
)
from gptutils import submit_gpt_comp
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


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")


@arouter.post('/user/register', response_model=DBUserWithToken)
async def register_user(data: DataOAuth, db: Session = Depends(get_db)) -> BaseUser:
    remail, rpass = data.username, data.password
    user = db.query(User).filter(User.email == remail).first()
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User Already Exists",
            headers={"WWW-Authenticate": "Bearer"},
        )
    newuser = create_user(user_email=remail, user_password=rpass, db=db)
    return DBUserWithToken(
        token=create_access_token(newuser.email), **model_to_dict(newuser)
    )


@arouter.post("/user/login", response_model=DBUserWithToken)
async def login_jwt_token(data: DataOAuth, db: Session = Depends(get_db)) -> Token:
    email = data.username
    password = data.password
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"No user found with email {email}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    elif not verify_passwd(password, user.hpassword):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password for email.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return DBUserWithToken(token=create_access_token(user.email), **model_to_dict(user))


@arouter.post('/user_from_token', response_model=DBUser)
def jwt_autologin(data: DataJustToken, db: Session = Depends(get_db)) -> DBUser:
    user = user_from_jwt(db, data.token)
    return DBUser(**model_to_dict(user))


@arouter.post("/chat/new", response_model=DBChat)
async def new_chat(data: DataCreateChat, db: Session = Depends(get_db)):
    chat = Chat(name=data.name, user_id=data.user_id)
    chat = add_commit_refresh(chat, db)

    return chat


@arouter.delete("/chat/{chat_id}/delete")
async def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Chat with id {chat_id} not found.",
        )
    db.delete(chat)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@arouter.get("/user/{user_id}/chats", response_model=list[DBChat])
async def get_chat(user_id: int, db: Session = Depends(get_db)):
    chats = (
        db.query(Chat)
        .filter(Chat.user_id == user_id)
        .options(selectinload(Chat.completions).selectinload(Completion.messages))
        .all()
    )

    result = []
    for chat in chats:
        chat_dict = model_to_dict(chat)

        completions_list = []
        for comp in chat.completions:
            comp_dict = model_to_dict(comp)

            messages_list = []
            for message in comp.messages:
                message_dict = model_to_dict(message)
                messages_list.append(DBMsg(**message_dict))

            comp_dict['messages'] = messages_list
            completions_list.append(DBComp(**comp_dict))

        chat_dict['completions'] = completions_list
        result.append(DBChat(**chat_dict))

    return result


@arouter.post("/completion/new", response_model=DBComp)
async def create_completion(data: DataCreateComp, db: Session = Depends(get_db)):
    print('promptdatanew', data)
    user = db.query(User).filter(User.id == data.user_id).first()
    logger.debug("user %s", user)
    completion = Completion(chat_id=data.chat_id, user_id=user.id)

    logger.debug("completion %s", completion)
    completion = add_commit_refresh(completion, db)

    logger.debug("completion created %s %s", completion, vars(completion))

    msg = Message(role='system', content=data.sysprompt, completion_id=completion.id)
    msg = add_commit_refresh(msg, db)

    msgs = [DBMsg(**model_to_dict(msg))]
    print('msgsmsgs', msgs)
    bc = DBComp(messages=msgs, **model_to_dict(completion))
    return bc


@arouter.delete('/completion/{completion_id}/delete')
async def delete_completion(completion_id: int, db: Session = Depends(get_db)):
    comp = db.query(Completion).filter(Completion.id == completion_id).first()
    if comp is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Completion with id {completion_id} not found.",
        )
    db.delete(comp)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@arouter.get("/completion/{completion_id}", response_model=DBComp)
async def get_completion(completion_id: int, db: Session = Depends(get_db)):
    completion = db.query(Completion).filter(Completion.id == completion_id).first()

    if not completion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found"
        )

    msgs = db.query(Message).filter(Message.completion_id == completion.id).all()
    print('querymsgs', msgs)
    completion.messages = list({DBMsg(**model_to_dict(m)) for m in msgs})

    return completion


@arouter.post("/completion/{completion_id}/messages/add", response_model=DBMsg)
async def add_message(
    completion_id: int, data: DataMsgAdd, db: Session = Depends(get_db)
):
    role, content = data.role, data.content
    msg = Message(role=role, content=content, completion_id=completion_id)
    msg = add_commit_refresh(msg, db)
    return msg


@arouter.post('/completion/{completion_id}/submit', response_model=DBComp)
async def submit_comp(completion_id: int, db: Session = Depends(get_db)):
    """submits a completion to chatgpt and saves response"""
    completion = db.query(Completion).filter(Completion.id == completion_id).first()
    if not completion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found"
        )
    completion = submit_gpt_comp(completion, db)
    return completion


@arouter.get("/openapi.json")
async def get_openapi_schema():
    return get_openapi(title="API documentation", version="1.0.0", routes=app.routes)


app.include_router(arouter, prefix="/api")


if (__name__) == "__main__":
    runcmd(f"uvicorn main:app --host {HOST} --port {PORT} --reload", output=False)
