from tortoise import Tortoise
from tortoise.contrib.pydantic.creator import pydantic_model_creator
from pydantic import BaseModel

from .models import Book

Tortoise.init_models(["src.apps.BookService.models"], "models")
Book_Pydantic = pydantic_model_creator(Book, name="Book")


class BookIn(BaseModel):
    title: str
    author: int
    pages: int


class BookUpdate(BaseModel):
    id: int
    title: str
    author: int
    pages: int
    is_borrowed: bool


class BookDelete(BaseModel):
    id: int
