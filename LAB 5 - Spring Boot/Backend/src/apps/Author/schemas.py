from tortoise import Tortoise
from tortoise.contrib.pydantic.creator import pydantic_model_creator
from pydantic import BaseModel

from src.apps.Author.models import Author


Tortoise.init_models(["src.apps.Author.models"], "models")
Author_Pydantic = pydantic_model_creator(Author, name="Author")


class AuthorIn(BaseModel):
    name: str
    surname: str


class AuthorUpdate(BaseModel):
    name: str
    surname: str


class AuthorDelete(BaseModel):
    id: int
