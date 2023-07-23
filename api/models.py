from sqlalchemy import Column, Integer, String, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Mapped
from sqlalchemy.orm.session import Session
from typing import Optional
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, relationship

from database import Base


def rantoken(n: int = 32) -> str:
    chars = list("0123456789abcdef")
    import random

    s = ""
    for i in range(n):
        s += random.choice(chars)
    return s


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, unique=True)
    hpassword: Mapped[str] = Column(String)
    tokens = relationship("Token", backref="user")


# from custom import IColumn
class Token(Base):
    __tablename__ = "tokens"
    token: Mapped[str] = Column(
        String, primary_key=True, index=True, default=rantoken()
    )
    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id"))
