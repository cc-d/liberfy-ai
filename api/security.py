from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

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


def verify_passwd(cleartext, hashed):
    return pwd_context.verify(cleartext, hashed)


def hash_passwd(cleartext):
    return pwd_context.hash(cleartext)
