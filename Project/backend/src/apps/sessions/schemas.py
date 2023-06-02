from tortoise import Tortoise
from tortoise.contrib.pydantic.creator import pydantic_model_creator
from pydantic import BaseModel, ValidationError, validator
from datetime import datetime, date, time, timedelta

from .models import Session, Ticket

Tortoise.init_models(["src.apps.sessions.models"], "models")
Session_Pydantic = pydantic_model_creator(Session, name="Session")
Ticket_Pydantic = pydantic_model_creator(Ticket, name="Ticket")


class SessionIn(BaseModel):
    room_fk_id: int
    movie_fk_id: int
    datefrom: date
    timefrom: time
    dateto: date | None
    timeto: time | None
    date_interval: timedelta | None
    time_interval: timedelta | None

    @validator("datefrom", "dateto")
    def check_later_than_now(cls, v):
        if v is None:
            return v
        if v < date.today():
            raise ValueError("Date cannot be earlier than today")
        return v

    @validator("timefrom", "timeto")
    def check_time(cls, v):
        if v is None:
            return v
        if v < time(0, 0, 0):
            raise ValueError("Time cannot be earlier than 00:00")
        return v

    @validator("date_interval")
    def check_date_interval(cls, v):
        if v is None:
            return v
        if v < timedelta(days=1):
            print(v)
            raise ValueError("Date interval cannot be less than 1 day")
        return v

    @validator("time_interval")
    def check_time_interval(cls, v):
        if v is None:
            return v
        if v < timedelta(minutes=30):
            print()
            raise ValueError("Time interval cannot be less than 30 minutes")
        return v


class SessionUpdate(BaseModel):
    room_fk_id: int
    movie_fk_id: int
    datetime: datetime


class TicketIn(BaseModel):
    session_fk_id: int
    row: int
    seat: int
    price: float


class TicketUpdate(BaseModel):
    session_fk_id: int
    row: int
    seat: int
    price: float
    is_vip: bool
    is_imax: bool
