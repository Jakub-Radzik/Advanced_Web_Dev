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


class OAuth2ReservationBearerWithCookie(OAuth2PasswordBearer):
    """
    Returns the reservation token from the cookie.
    """
    async def __call__(self, request: Request) -> str | None:
        reservation_id: str | None = request.cookies.get("reservation_token")
        if not reservation_id:
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Invalid reservation token",
                )
            else:
                return None
        return reservation_id


def change_int_into_letters(value: int):
    """
    Changes the integer into letters, e.g. 1 -> A, 2 -> B, 27 -> AA.
    """
    letters = []
    while value > 0:
        value, remainder = divmod(value - 1, 26)
        letters.append(chr(65 + remainder))
    return "".join(reversed(letters))
