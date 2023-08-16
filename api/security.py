import jwt
from jwt import PyJWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from database import get_db
from fastapi import Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer
import random
from logfunc import logf
from typing import Union
from config import (
    PORT,
    HOST,
    JWT_SECRET_KEY,
    JWT_ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from models import User, Chat, Completion
from schemas import (
    BaseUser,
    DBUser,
    DBUserWithToken,
    DBUserPass,
    BaseMsg,
    DBMsg,
    BaseComp,
    GPTComp,
    DBComp,
    BaseChat,
    NoDBChat,
    DBChat,
    DataEmailPass,
    DataCreateChat,
    DataCreateComp,
    DataMsgAdd,
    Token,
)
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


@logf()
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


@logf()
def hash_passwd(cleartext: str) -> str:
    """
    Hashes a cleartext password.

    Args:
        cleartext (str): The cleartext password to hash.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(cleartext)


@logf()
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


@logf()
def encode_jwt(enc: dict) -> str:
    """
    Encode a dictionary into a jwt token.

    Args:
        enc (dict): The dictionary to encode.

    Returns:
        str: The encoded jwt token.
    """
    return jwt.encode(enc, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


@logf()
def create_access_token(
    email: str, expires_delta: timedelta = ACCESS_TOKEN_EXPIRE_MINUTES
) -> Token:
    """Creates jwt access token for a given user.

    Args:
        email (str): The email of the user.
        expires_delta (timedelta, optional): The expiration time of the token.
            Defaults to ACCESS_TOKEN_EXPIRE_MINUTES.

    Returns:
        Token: The access token.
    """
    exp = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {'exp': datetime.utcnow() + exp, 'iat': datetime.utcnow(), 'sub': email}
    token = encode_jwt(payload)
    return Token(access_token=token, token_type='bearer')


@logf()
def decode_jwt(
    token: str, secret_key: str = JWT_SECRET_KEY, algorithm: str = JWT_ALGORITHM
) -> dict:
    """Decodes a jwt token.

    Args:
        token (str): The token to decode.
        secret_key (str): The secret key used to encode the token.
        algorithm (str): The algorithm used to encode the token.

    Returns:
        dict: The decoded token.
    """
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload
    except PyJWTError as e:
        logger.error(e)
        raise credentials_exception


@logf(level='warning')
def user_from_jwt(db: Session, tokenstr: str = Security(decode_jwt)) -> DBUser:
    """Extracts the user email from a jwt token.

    Args:
        tokenstr (str): The token to decode.

    Returns:
        str: The email of the user.
    """

    payload = decode_jwt(tokenstr)
    print(1)
    email = payload.get('sub')
    if email is None:
        raise HTTPException(
            status_code=400, detail='Could not determine email from JWT'
        )
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail='No email matching JWT email in DB')
    return user


@logf()
def create_user(user_email: str, user_password: str, db: Session) -> User:
    hpassword = hash_passwd(user_password)
    db_user = User(email=user_email, hpassword=hpassword)
    return add_commit_refresh(db_user, db)
