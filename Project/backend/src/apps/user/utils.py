from fastapi import HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param


class OAuth2PasswordBearerWithCookie(OAuth2PasswordBearer):
    """
    It is safer for the user to pass JWT with httponly cookie then in request body. Thus
    we extended this class to accept JWT from said cookie.
    """
    async def __call__(self, request: Request) -> str | None:
        authorization: str | None = request.cookies.get("access_token")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None
        return param
