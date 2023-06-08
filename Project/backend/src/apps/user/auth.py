from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Response, status, Request
from fastapi.responses import RedirectResponse
from fastapi_sso.sso.google import GoogleSSO
from fastapi_limiter.depends import RateLimiter
from tortoise.exceptions import IntegrityError
from jose import JWTError, jwt
from passlib.context import CryptContext
from src.apps.user.models import BlacklistTokens
from src.settings import settings

from src.apps.utilities.utils import OAuth2PasswordBearerWithCookie

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = 30
CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
)

router = APIRouter()

google_sso = GoogleSSO(
    settings.CLIENT_ID,
    settings.CLIENT_SECRET,
    "http://localhost:8008/api/v1/auth/google/callback",
    allow_insecure_http=True,
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="/api/v1/auth/token")


def create_access_token(
    data: dict,
    expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Function that returns the current user.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub", "")
        if email == "":
            raise CREDENTIALS_EXCEPTION
        token_in_blacklist = await BlacklistTokens.filter(token=token).exists()
        if token_in_blacklist:
            raise CREDENTIALS_EXCEPTION

        return email
    except JWTError:
        raise CREDENTIALS_EXCEPTION


@router.get(
    "/auth/token",
    status_code=status.HTTP_303_SEE_OTHER,
    dependencies=[Depends(RateLimiter(times=5, minutes=1))],
)
async def sso_login_for_token():
    return await google_sso.get_login_redirect()


@router.get("/auth/google/callback")
async def sso_login_callback(request: Request, response: Response):
    user = await google_sso.verify_and_process(request)
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token_expire = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expire
    )
    response.set_cookie(
        key="access_token", value=f"Bearer {access_token}", httponly=True
    )
    # PLEASE DONT CHANGE IT
    return RedirectResponse("http://localhost:8080/admin")


@router.get(
    "/auth/logout",
    status_code=status.HTTP_202_ACCEPTED,
    dependencies=[Depends(RateLimiter(times=5, minutes=1))],
)
async def logout(token: str = Depends(oauth2_scheme), _: str = Depends(get_current_user)):
    try:
        await BlacklistTokens.create(token=token)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="User already logged out!",
        )
    return {"message": "Successfully logged out"}
