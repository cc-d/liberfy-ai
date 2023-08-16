import json
from pydantic import BaseModel, constr
from typing import (
    Optional,
    List,
    Dict,
    Any,
    Union,
    TypeVar,
    Generic,
    Type,
    Callable,
)
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
    messages: List[DBMsg]
    model: str
    temperature: float


class BaseChat(BaseModel):
    name: str
    user_id: int


class NoDBChat(BaseChat):
    completions: List[BaseComp]


class DBChat(BaseChat):
    id: int
    completions: List[DBComp]


class GPTChoice(BaseModel):
    index: int
    message: BaseMsg
    finish_reason: str


class GPTDelta(BaseModel):
    content: str


class GPTUsage(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


class GPTComp(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[GPTChoice]
    usage: GPTUsage


class GPTChunkComp(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[GPTDelta]
    usage: GPTUsage


class GPTCreateCompReq(BaseModel):
    model: str
    messages: List[BaseMsg]
    functions: Optional[List[Dict[str, Union[str, Dict[str, str]]]]] = None
    function_call: Optional[Union[str, Dict[str, str]]] = None
    temperature: Optional[float] = 1
    top_p: Optional[float] = 1
    n: Optional[int] = 1
    stream: Optional[bool] = False
    stop: Optional[Union[str, List[str]]] = None
    max_tokens: Optional[int] = None
    presence_penalty: Optional[float] = 0
    frequency_penalty: Optional[float] = 0
    logit_bias: Optional[Dict[int, float]] = None
    user: Optional[str] = None


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
    completion_id: int
    role: str
    content: str


class DataOAuth(BaseModel):
    username: str
    password: str


class DataJustToken(BaseModel):
    token: str
