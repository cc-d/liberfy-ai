from pydantic import BaseModel
from typing import Optional
from models import User


class BaseUser(BaseModel):
    id: int
    email: str


from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped

from models import Base


class UserInDB(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    hpassword = Column(String)


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
