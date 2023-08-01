#!/usr/bin/env python3
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
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
from database import engine, SessionLocal, get_db
from models import User, Base, Chat, Message, Convo, UserToken
from schema import (
    EmailPassData,
    BaseUser,
    BaseChat,
    BaseMessage,
    BaseConvo,
    BaseUserDB,
    BaseToken,
    TokensBaseUser,
    BaseUserToken,
    BaseTokenData,
    DataCreateChat,
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
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        return response


app = FastAPI()

# fuck CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,  # Allow credentials (cookies, authorization headers, etc.)
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

    return BaseUserToken(email=user.email, id=user.id, token=None)


@arouter.post("/user/user_from_token", response_model=BaseUser)
async def user_from_token(formdata: BaseTokenData, db: Session = Depends(get_db)):
    token = db.query(UserToken).filter(UserToken.token == formdata.token).first()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Token not found"
        )

    user = db.query(User).filter(User.id == token.user_id).first()
    print('user', user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return BaseUser(email=user.email, id=user.id)


@arouter.get('/user/{user_id}/chats', response_model=List[BaseChat])
async def get_chats(user_id: int, db: Session = Depends(get_db)):
    chats = list(db.query(Chat).filter(Chat.user_id == user_id).all())
    return chats


@arouter.get("/openapi.json")
async def get_openapi_schema():
    return get_openapi(title="API documentation", version="1.0.0", routes=app.routes)


@arouter.post("/chat/new", response_model=BaseChat)
async def new_chat(data: DataCreateChat, db: Session = Depends(get_db)):
    chat = Chat(name=data.name, user_id=data.user_id)
    db.add(chat)
    db.commit()
    db.refresh(chat)

    return BaseChat(**chat)


@arouter.get("/chat/{chat_id}", response_model=BaseChat)
async def get_chat(chat_id: int, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    user = db.query(User).filter(User.id == chat.user_id).first()
    user = BaseUser(email=user.email, id=user.id)

    return BaseChat(
        id=chat.id, name=chat.name, user_id=chat.user_id, user=user, convos=[]
    )


app.include_router(arouter, prefix="/api")


if (__name__) == "__main__":
    runcmd(f"uvicorn main:app --host {HOST} --port {PORT} --reload", output=False)
