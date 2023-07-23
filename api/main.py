from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp

import logging

from config import PORT, HOST, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from database import engine, SessionLocal, get_db
from models import User, Base, Token
from schema import EmailPassData, BaseUser
from security import hash_passwd, verify_passwd, create_user
from myfuncs import runcmd

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

Base.metadata.create_all(bind=engine)


class CSPMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        return response


app = FastAPI()

# fuck CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,  # Allow credentials (cookies, authorization headers, etc.)
)

# CSP middleware
app.add_middleware(CSPMiddleware)

arouter = APIRouter()

print('loading routes')


@arouter.get('/')
async def hello():
    return {"status": "ok"}


@arouter.post('/user/login', response_model=BaseUser)
async def login_user(formdata: EmailPassData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == formdata.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Email {formdata.email} not found",
            headers={'WWW-Authenticate': 'Bearer'},
        )
    # if not verify_passwd(formdata.password, user.hpassword):
    #    raise HTTPException(
    #        status_code=status.HTTP_401_UNAUTHORIZED,
    #        detail="Incorrect password for email.",
    #        headers={"WWW-Authenticate": "Bearer"},
    #    )
    return BaseUser(email=user.email, id=user.id)  # returning the user email


@arouter.post("/user/register", response_model=BaseUser)
def register(epdata: EmailPassData, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == epdata.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user(user_email=epdata.email, user_password=epdata.password, db=db)


@arouter.get("/openapi.json")
async def get_openapi_schema():
    return get_openapi(title="API documentation", version="1.0.0", routes=app.routes)


app.include_router(arouter, prefix="/api")

if (__name__) == '__main__':
    runcmd(f"uvicorn main:app --host {HOST} --port {PORT} --reload", output=False)
