from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    email: str


class UserInDB(User):
    hashed_password: str


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
