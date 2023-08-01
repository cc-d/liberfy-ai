from sqlalchemy import Column, Integer, String, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Mapped
from sqlalchemy.orm.session import Session
from typing import Optional
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, relationship, backref
from uuid import uuid4

from database import Base


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, unique=True)
    hpassword: Mapped[str] = Column(String)
    chats: "Mapped[Chat]" = relationship("Chat", back_populates="user")
    completions: "Mapped[Completion]" = relationship(
        "Completion", back_populates="user"
    )


class Chat(Base):
    __tablename__ = "chats"
    id: Mapped[int] = Column(Integer, primary_key=True)
    name: Mapped[str] = Column(String, default="New chat")
    user: Mapped[User] = relationship("User", back_populates="chats", uselist=False)
    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id"))
    completions: "Mapped[Completion]" = relationship(
        "Completion", back_populates="chat"
    )


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = Column(Integer, primary_key=True)
    role: Mapped[str] = Column(String)
    content: Mapped[str] = Column(String)
    name: Mapped[str] = Column(String)
    function_call: Mapped[str] = Column(String)
    Completion: "Mapped[Completion]" = relationship(
        "Completion", back_populates="messages", uselist=False
    )
    completion_id: Mapped[int] = Column(Integer, ForeignKey("completions.id"))


class Completion(Base):
    __tablename__ = "completions"
    id: Mapped[int] = Column(Integer, primary_key=True)
    chat: Mapped[Chat] = relationship(
        "Chat", back_populates="completions", uselist=False
    )
    chat_id: Mapped[int] = Column(Integer, ForeignKey("chats.id"))
    user: Mapped[User] = relationship(
        "User", back_populates="completions", uselist=False
    )
    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id"))
    messages: "Mapped[Message]" = relationship(
        "Message", back_populates="completion", uselist=False
    )


class UserToken(Base):
    __tablename__ = "usertokens"
    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id"))
    token: Mapped[str] = Column(
        String, unique=True, primary_key=True, default=lambda: str(uuid4())
    )
