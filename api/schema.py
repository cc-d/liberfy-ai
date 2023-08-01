import json
from pydantic import BaseModel
from typing import Optional, List, Dict, Any, Union, TypeVar, Generic, Type, Callable
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped


class BaseToken(BaseModel):
    user_id: int
    token: str


class BaseUser(BaseModel):
    id: Optional[int]
    email: str


class TokensBaseUser(BaseUser):
    tokens: List[BaseToken]


class BaseUserToken(BaseUser):
    token: Optional[str]


class BaseTokenData(BaseModel):
    token: str


class BaseUserDB(BaseUser):
    hpassword: str


class EmailPassData(BaseModel):
    email: str
    password: str


class BaseChat(BaseModel):
    id: Optional[int]
    name: str
    user_id: int
    user: Optional[BaseUser]
    convos: Optional[List["BaseConvo"]]


class BaseMessage(BaseModel):
    id: Optional[int]
    role: str
    content: str
    name: str
    function_call: str
    convo_id: int
    convo: "BaseConvo"


class BaseConvo(BaseModel):
    id: Optional[int]
    chat_id: int
    chat: BaseChat
    user_id: int
    user: BaseUser
    messages: List[BaseMessage]


class DataCreateChat(BaseModel):
    name: str
    user_id: int
