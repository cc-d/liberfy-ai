import os
from os.path import dirname, abspath, join as opjoin
from sqlalchemy import Column, Integer, String, create_engine, Boolean, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Mapped
from sqlalchemy.orm.session import Session
from typing import Optional, List, Union
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, Text
from sqlalchemy.orm import Mapped, relationship, backref
from uuid import uuid4


from utils import get_gptmodels

from database import Base

DEFAULT_GPTMODEL = 'gpt-3.5-turbo'


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, unique=True)
    hpassword: Mapped[str] = Column(String)
    chats: "Mapped[List[Chat]]" = relationship("Chat", back_populates="user")
    completions: "Mapped[Completion]" = relationship(
        "Completion", back_populates="user"
    )

    def __repr__(self):
        return f"<User id={self.id} email={self.email}>"


class Chat(Base):
    __tablename__ = "chats"
    id: Mapped[int] = Column(Integer, primary_key=True)
    name: Mapped[str] = Column(String, default="New chat")
    user: Mapped[User] = relationship("User", back_populates="chats", uselist=False)
    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id"))
    completions: "Mapped[List[Completion]]" = relationship(
        "Completion", back_populates="chat", uselist=True
    )

    def __repr__(self):
        return f"<Chat id={self.id} name={self.name} user_id={self.user_id}>"


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = Column(Integer, primary_key=True)
    role: Mapped[str] = Column(String)
    content: Mapped[str] = Column(String)
    completion_id: Mapped[int] = Column(Integer, ForeignKey("completions.id"))

    # Define the relationship with the Completion model
    completion: Mapped["Completion"] = relationship("Completion", backref="messages")

    def __repr__(self):
        return f"<Message id={self.id} role={self.role} content={self.content} completion_id={self.completion_id}>"


class Completion(Base):
    __tablename__ = "completions"
    id: Mapped[int] = Column(Integer, primary_key=True)
    chat_id: Mapped[int] = Column(Integer, ForeignKey("chats.id"))
    user_id: Mapped[int] = Column(Integer, ForeignKey("users.id"))
    chat: Mapped[Chat] = relationship(
        "Chat", back_populates="completions", uselist=False
    )
    user: Mapped[User] = relationship(
        "User", back_populates="completions", uselist=False
    )

    temperature: Mapped[float] = Column(Float, default=1.0)
    model: Mapped[str] = Column(String, default=DEFAULT_GPTMODEL)

    def __repr__(self):
        return f'<Completion id={self.id} chat_id={self.chat_id} user_id={self.user_id} temperature={self.temperature} model={self.model}>'
