from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from .models import User, Base
from .schemas import UserLogin, UserInDB, Token
from .security import (
    hash_passwd,
    create_access_token,
    verify_passwd,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)
from .dependencies import get_tokenuser
from .database import engine, SessionLocal, get_db
from datetime import timedelta
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get('/')
async def hello():
    return {"message": "hello, world"}


@app.post('/token', response_model=Token)
async def token_login(
    formdata: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = db.query(UserInDB).filter(email=formdata.email).first()
    if not user or not verify_passwd(formdata.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    atoken_exp = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    atoken = create_access_token(data={'sub': user.email}, expires_delta=atoken_exp)
    return {'access_token': atoken, 'token_type': 'bearer'}


@app.get('/users/me', response_model=User)
async def users_me(curuser: User = Depends(get_tokenuser)):
    return curuser
