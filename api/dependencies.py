from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from security import SECRET_KEY, ALGORITHM
from models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


async def get_tokenuser(token: str = Depends(oauth2_scheme)):
    creds_except = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='invalid credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get('sub', None)
        if email is None:
            raise creds_except
        tokendata = User(email=email)
        return tokendata
    except JWTError:
        raise creds_except
    except Exception:
        raise
