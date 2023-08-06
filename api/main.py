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
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
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
from schema import (
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


@logf()
@arouter.post('/user_from_token', response_model=DBUser)
def jwt_autologin(data: DataJustToken, db: Session = Depends(get_db)) -> DBUser:
    user = user_from_jwt(db, data.token)
    return DBUser(**model_to_dict(user))


@arouter.get('/user/{user_id}/chats', response_model=List[DBChat])
async def get_chats(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    chats = db.query(Chat).filter(Chat.user_id == user_id).all()

    bchats = []
    for c in chats:
        bchats.append(DBChat(id=c.id, name=c.name, user_id=user.id, completions=[]))
    print(bchats, 'bchats')
    return bchats


@arouter.get("/openapi.json")
async def get_openapi_schema():
    return get_openapi(title="API documentation", version="1.0.0", routes=app.routes)


@arouter.post("/chat/new", response_model=DBChat)
async def new_chat(data: DataCreateChat, db: Session = Depends(get_db)):
    chat = Chat(name=data.name, user_id=data.user_id)
    chat = add_commit_refresh(chat, db)

    return chat


@arouter.get("/chat/{chat_id}", response_model=DBChat)
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
        msgs = [DBMsg(**model_to_dict(m)) for m in c.messages]
        comps.append(DBComp(messages=msgs, **model_to_dict(c)))

    print('compscomps', comps)

    return DBChat(id=chat.id, user_id=user.id, completions=comps, name=chat.name)


@arouter.post("/completion/new", response_model=DBComp)
async def create_completion(data: DataCreateComp, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == data.user_id).first()
    logger.debug("user %s", user)
    completion = Completion(chat_id=data.chat_id, user_id=user.id)

    logger.debug("completion %s", completion)
    completion = add_commit_refresh(completion, db)

    logger.debug("completion created %s %s", completion, vars(completion))

    comptitle = (
        'System message' if not hasattr(data, 'sysprompt') else str(data.sysprompt)
    )
    msg = Message(role='system', content=comptitle, completion_id=completion.id)
    msg = add_commit_refresh(msg, db)

    msgs = [DBMsg(**model_to_dict(msg))]
    print('msgsmsgs', msgs)
    bc = DBComp(messages=msgs, **model_to_dict(completion))
    return bc


@arouter.get("/completion/{completion_id}", response_model=DBComp)
async def get_completion(completion_id: int, db: Session = Depends(get_db)):
    completion = db.query(Completion).filter(Completion.id == completion_id).first()

    if not completion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found"
        )

    msg = db.query(Message).filter(Message.completion_id == completion.id).all()
    completion.messages = list(msg)

    return completion


@arouter.post("/completion/{completion_id}/message/add", response_model=DBMsg)
async def add_message(
    completion_id: int, data: DataMsgAdd, db: Session = Depends(get_db)
):
    role, content = data.role, data.content
    msg = Message(role=role, content=content, completion_id=completion_id)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


app.include_router(arouter, prefix="/api")


if (__name__) == "__main__":
    runcmd(f"uvicorn main:app --host {HOST} --port {PORT} --reload", output=False)
