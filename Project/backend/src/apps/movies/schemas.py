from pydantic import BaseModel
from enum import Enum


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
