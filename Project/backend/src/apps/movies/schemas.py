from datetime import date
from enum import Enum

from pydantic import BaseModel
from tortoise import Tortoise
from tortoise.contrib.pydantic.creator import pydantic_model_creator

from .models import Movie

Tortoise.init_models(["src.apps.movies.models"], "models")
Movie_Pydantic = pydantic_model_creator(Movie, name="Movie")


class Language(Enum):
    ENGLISH = "en-US"


class Size(Enum):
    ORIGINAL = "original"
    MEDIUM = "medium"
    SMALL = "small"


size_mapping = {
    Size.ORIGINAL.value: -1,
    Size.MEDIUM.value: -2,
    Size.SMALL.value: -1,
}


class Movie_Create(BaseModel):
    title: str
    poster_path: str
    backdrop_path: str
    overview: str
    release_date: date
    vote_average: float
    vote_count: int
    original_language: str
    original_title: str
    genres: list[str]
    runtime: int
