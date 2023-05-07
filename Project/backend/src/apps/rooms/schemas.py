from enum import Enum

from pydantic import BaseModel
from tortoise import Tortoise
from tortoise.contrib.pydantic.creator import pydantic_model_creator

from .models import Room

Tortoise.init_models(["src.apps.rooms.models"], "models")
Room_Pydantic = pydantic_model_creator(Room, name="Room")


class RoomIn_Pydantic(BaseModel):
    name: str
    rows: int
    seats_per_row: int
    is_IMAX: bool
    alignment: str
    screen_size: int
    matrix: list[list[bool]]
