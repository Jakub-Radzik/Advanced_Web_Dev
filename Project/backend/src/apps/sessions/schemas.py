from tortoise import Tortoise
from tortoise.contrib.pydantic.creator import pydantic_model_creator

from .models import Session, Ticket

Tortoise.init_models(["src.app.sessions.models"], "models")
Session_Pydantic = pydantic_model_creator(Session, name="Session")
Ticket_Pydantic = pydantic_model_creator(Ticket, name="Ticket")
