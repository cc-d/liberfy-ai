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
    completions: Optional[List["BaseCompletion"]]


class BaseMessage(BaseModel):
    id: Optional[int]
    role: str
    content: str
    name: str
    function_call: str
    completion_id: int
    completion: "BaseCompletion"


class BaseCompletion(BaseModel):
    id: Optional[int]
    chat_id: int
    chat: Optional[BaseChat]
    user_id: int
    user: Optional[BaseUser]
    messages: List[BaseMessage]


class DataCreateChat(BaseModel):
    name: str
    user_id: int


class DataCreateCompletion(BaseModel):
    chat_id: int
    user_id: int
    prompt: str
    temperature: float
    max_tokens: int
