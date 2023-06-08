from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi_limiter.depends import RateLimiter
from tortoise.exceptions import IntegrityError
from jose import JWTError, jwt
from passlib.context import CryptContext
from src.apps.utilities.utils import OAuth2ReservationBearerWithCookie
from src.settings import settings
from uuid import uuid4
from src.apps.sessions.models import TicketReservation, Ticket
from src.apps.sessions.schemas import Tickets, BuyerInfo
from src.apps.services.send_email import send_email_with_pdf
from tortoise.expressions import Q
import stripe
from tortoise.expressions import Q

stripe.api_key = settings.STRIPE_SECRET_KEY

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
RESERVATION_TOKEN_EXPIRE_MINUTES = 5
RESERVATION_EXCEPTION = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="This is not a valid reservation!",
)

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2ReservationBearerWithCookie(tokenUrl="/api/v1/reserve/tickets")


def create_reservation_token(
    data: dict,
    expires_delta: timedelta = timedelta(minutes=RESERVATION_TOKEN_EXPIRE_MINUTES),
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_reservation(token: str = Depends(oauth2_scheme)):
    """
    Function that returns the current reservation.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        reservation_id: str = payload.get("sub", "")
        if reservation_id == "":
            raise RESERVATION_EXCEPTION
        reservation = await TicketReservation.filter(
            reservation_id=reservation_id
        ).first()
        if reservation is None:
            raise RESERVATION_EXCEPTION
        return reservation
    except JWTError:
        raise RESERVATION_EXCEPTION


@router.post(
    "/reserve/tickets",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def reserve_tickets(tickets: Tickets, response: Response):
    """
    Function that reserves tickets.
    """
    reservation_id = str(uuid4())
    try:
        db_ticket_count = await Ticket.filter(
            Q(last_reserved__gt=(datetime.now() - timedelta(minutes=5)))
            | Q(last_reserved=None),
            is_sold=False,
            id__in=tickets.tickets,
        ).count()
        if db_ticket_count != len(tickets.tickets):
            raise RESERVATION_EXCEPTION

        await Ticket.filter(id__in=tickets.tickets).update(last_reserved=datetime.now())
        await TicketReservation.create(
            reservation_id=reservation_id,
            tickets=tickets.tickets,
            reserved_at=datetime.now(),
        )
        reservation_token = create_reservation_token({"sub": reservation_id})
        response.set_cookie(
            key="reservation_token", value=reservation_token, httponly=True
        )
        return {
            "reservation_token": reservation_token,
            "token_type": "bearer",
            "tickets": tickets.tickets,
        }
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already reserved tickets!",
        )


@router.post(
    "/reserve/buyer_info",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def reserve_buyer_info(
    buyer_email: BuyerInfo,
    reservation: TicketReservation = Depends(get_current_reservation),
):
    """
    Function that fulfills buyer info.
    """
    await TicketReservation.filter(reservation_id=reservation.reservation_id).update(
        buyer_email=buyer_email.email
    )
    return {"detail": "Buyer info fulfilled!"}


@router.post(
    "/reserve/checkout",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def reserve_checkout(
    reservation: TicketReservation = Depends(get_current_reservation),
):
    """
    Function that checks out the reservation.
    """
    try:
        if reservation.buyer_email is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have not fulfilled your buyer info!",
            )
        tickets = await Ticket.filter(id__in=reservation.tickets).values_list(
            "price", flat=True
        )
        amount = int(sum(tickets) * 100)
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="pln",
            automatic_payment_methods={"enabled": True},
        )
        await Ticket.filter(id__in=reservation.tickets).update(
            last_reserved=datetime.now()
        )
        await TicketReservation.filter(
            reservation_id=reservation.reservation_id
        ).update(transaction_id=intent.id)
        return {"client_secret": intent.client_secret}
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already checked out!",
        )


@router.post(
    "/reserve/sold",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def reserve_sold(
    reservation: TicketReservation = Depends(get_current_reservation),
):
    """
    Function that marks tickets as sold.
    """
    try:
        if reservation.transaction_id is None or reservation.buyer_email is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have not checked out!",
            )
        intent = stripe.PaymentIntent.retrieve(reservation.transaction_id)
        if intent.status != "succeeded":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Your payment has not been processed!",
            )
        await Ticket.filter(id__in=reservation.tickets).update(is_sold=True)
        ticket_data = await Ticket.filter(id__in=reservation.tickets).values(
            "price",
            "session_fk__movie_fk__title",
            "session_fk__datetime",
            "session_fk__room_fk__name",
            "row",
            "seat",
        )
        pdf_data = {
            "screening_date": str(ticket_data[0]["session_fk__datetime"].date()),
            "screening_title": str(ticket_data[0]["session_fk__movie_fk__title"]),
            "screening_hour": str(ticket_data[0]["session_fk__datetime"].time()),
            "screening_room": str(ticket_data[0]["session_fk__room_fk__name"]),
            "cinema": "Cinema World",
            "qrstring": str(reservation.reservation_id),
            "ticket_number": str(reservation.reservation_id),
            "transaction_number": str(reservation.transaction_id),
            "items": [
                {
                    "ticket_type": "Normalny",
                    "seat": f'{ticket["row"]}-{ticket["seat"]}',
                    "unit_price": str(ticket["price"]),
                }
                for ticket in ticket_data
            ],
        }
        status_code = send_email_with_pdf(reservation.buyer_email, pdf_data)
        if status_code != status.HTTP_200_OK:
            raise HTTPException(
                status_code=status_code,
                detail="Your tickets have not been sent!",
            )
        return {"detail": "Tickets sold and sent!"}
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already sold tickets!",
        )
