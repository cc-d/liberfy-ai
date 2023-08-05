import jwt
from jwt import PyJWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from database import get_db
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import random
from logfunc import logf
from typing import Union
from config import PORT, HOST, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from models import User, UserToken, Chat, Completion
from schema import EmailPassData, BaseUser, BaseToken
from database import add_commit_refresh
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def verify_passwd(cleartext: str, hashed: str) -> bool:
    """
    Verify if the cleartext password matches the hashed password.

    Args:
        cleartext (str): The cleartext password to verify.
        hashed (str): The hashed password to compare against.

    Returns:
        bool: True if the passwords match, False otherwise.
    """
    return pwd_context.verify(cleartext, hashed)


def hash_passwd(cleartext: str) -> str:
    """
    Hashes a cleartext password.

    Args:
        cleartext (str): The cleartext password to hash.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(cleartext)


def valid_user_pass(email: str, passwd: str, db: Session = Depends(get_db)) -> bool:
    """
    Validate if a user with the given email and password exists in the database.

    Args:
        db (Session): The SQLAlchemy database session.
        email (str): The email of the user.
        passwd (str): The password to validate.

    Returns:
        bool: True if the user exists and password is valid, False otherwise.
    """
    user = db.query(User).filter(email=email).first()
    if user:
        if verify_passwd(passwd, user.hpassword):
            return True
    return False


def create_user_token(user_id: Union[str, int], db: Session) -> UserToken:
    user = db.query(User).filter(User.id == user_id).first()
    newtoken = UserToken(user_id=user_id)
    return add_commit_refresh(newtoken, db)


def create_user(user_email: str, user_password: str, db: Session) -> User:
    hpassword = hash_passwd(user_password)
    db_user = User(email=user_email, hpassword=hpassword)
    return add_commit_refresh(db_user, db)
