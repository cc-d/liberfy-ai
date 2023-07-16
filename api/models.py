from sqlalchemy import Column, Integer, String, create_engine, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Mapped

from database import Base


from custom import IColumn


class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = IColumn(Integer, primary_key=True)
    email: Mapped[str] = IColumn(String, unique=True)
    hpassword: Mapped[str] = Column(String)
