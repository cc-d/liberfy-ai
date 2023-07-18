import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from dependencies import get_tokenuser
from models import User

SECRET_KEY = 'secret'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 600

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def create_access_token(data: dict, expires_delta: timedelta = None):
    encode_data = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES / 2)
    encode_data.update({'exp': expire})
    encjwt = jwt.encode(encode_data, SECRET_KEY, algorithm=ALGORITHM)
    return encjwt


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


def valid_user_pass(db: Session, email: str, passwd: str) -> bool:
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
