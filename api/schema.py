import json
from pydantic import BaseModel
from typing import Optional, List, Dict, Any, Union, TypeVar, Generic, Type, Callable
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped
from enum import Enum


##### User / Token #####
class Token(BaseModel):
    access_token: str
    token_type: str


class BaseUser(BaseModel):
    email: str


class DBUser(BaseUser):
    id: int


class DBUserWithToken(DBUser):
    token: Token


class DBUserPass(DBUser):
    hpassword: str


##### Comp/Msg/GPT #####


class BaseMsg(BaseModel):
    role: str
    content: str


class DBMsg(BaseMsg):
    id: int
    completion_id: int


class BaseComp(BaseModel):
    messages: List[BaseMsg]


class GPTComp(BaseComp):
    model: str
    temperature: float


class DBComp(GPTComp):
    id: int
    user_id: int


class BaseChat(BaseModel):
    name: str
    user_id: int


class NoDBChat(BaseChat):
    completions: List[BaseComp]


class DBChat(BaseChat):
    id: int
    completions: List[DBComp]


##### Data #####
class DataEmailPass(BaseModel):
    email: str
    password: str


class DataCreateChat(BaseModel):
    name: str
    user_id: int


class DataCreateComp(BaseModel):
    chat_id: int
    user_id: int
    sysprompt: str
    temperature: int


class DataMsgAdd(BaseModel):
    completion_id: Optional[int]
    role: str
    content: str
