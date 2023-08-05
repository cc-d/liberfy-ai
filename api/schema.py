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


class BaseUserToken(BaseUser):
    token: Optional[str]


class BaseUserDB(BaseUser):
    hpassword: str


class EmailPassData(BaseModel):
    email: str
    password: str


class BaseMessage(BaseModel):
    id: Optional[int]
    role: str
    content: str
    completion_id: int


class BaseCompletion(BaseModel):
    id: Optional[int]
    chat_id: int
    user_id: int
    messages: Optional[List[BaseMessage]]


class BaseChat(BaseModel):
    id: Optional[int]
    name: str
    user_id: int
    completions: List[BaseCompletion]


class DataUserFromToken(BaseModel):
    token: str


class DataCreateChat(BaseModel):
    name: str
    user_id: int


class DataCreateCompletion(BaseModel):
    chat_id: int
    user_id: int
    sysprompt: str
    temperature: int


class DataMsgAdd(BaseModel):
    completion_id: Optional[int]
    role: str
    content: str
