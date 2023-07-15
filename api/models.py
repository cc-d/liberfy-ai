from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email: str
    password: str
