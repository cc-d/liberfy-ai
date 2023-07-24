from pydantic import BaseModel
from typing import Optional, List, Dict, Any, Union, TypeVar, Generic, Type, Callable
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import Mapped


class BaseUser(BaseModel):
    id: Optional[int]
    email: str


class BaseUserDB(BaseUser):
    hpassword: str


class EmailPassData(BaseModel):
    email: str
    password: str


class BaseChat(BaseModel):
    id: Optional[int]
    name: str
    user_id: int
    user: BaseUser
