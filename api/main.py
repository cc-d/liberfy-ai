from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import schema
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from config import PORT, HOST, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from database import engine, SessionLocal, get_db
from models import User, Base
from schemas import EmailPassData, UserInDB, AccessToken, BaseUser
from security import hash_passwd, create_access_token, verify_passwd, create_user
from dbutils import get_tokenuser
from myfuncs import runcmd

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


@arouter.get('/')
async def hello():
    return {"status": "ok"}


@arouter.post('/token_login', response_model=AccessToken)
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
    return AccessToken(access_token=atoken, token_type='bearer')


@arouter.get('/users/me', response_model=BaseUser)
async def users_me(curuser: User = Depends(get_tokenuser)):
    user_resp = BaseUser(id=curuser.id, email=curuser.email)
    return user_resp


@arouter.post("/register", response_model=BaseUser)
def register(epdata: EmailPassData, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == epdata.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(user_email=epdata.email, user_password=epdata.password, db=db)


@arouter.get("/openapi.json")
async def get_openapi_schema():
    return get_openapi(title="API documentation", version="1.0.0", routes=app.routes)


app.include_router(arouter, prefix="/api")
