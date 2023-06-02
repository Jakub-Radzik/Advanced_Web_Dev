from dotenv import load_dotenv
from pydantic import BaseSettings, EmailStr
from redis.asyncio import Redis

load_dotenv()


class CommonSettings(BaseSettings):
    APP_NAME: str = "CinemaWorld"
    DEBUG_MODE: bool = True


class DatabaseSettings(BaseSettings):
    DB_HOST: str
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str


class Settings(CommonSettings, DatabaseSettings):
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_PASSWORD: str

    SECRET_KEY: str
    ALGORITHM: str

    EMAIL_HOST: str
    EMAIL_PORT: int
    EMAIL_USERNAME: str
    EMAIL_PASSWORD: str
    EMAIL_FROM: EmailStr
    THE_MOVIE_DB_API_KEY: str
    THE_MOVIE_BASE_URL: str
    REDIS_INSTANCE: Redis = None
    PDF_KEY: str
    PDF_URL: str
    PDF_TEMPLATE_ID: str

    CLIENT_ID: str
    CLIENT_SECRET: str
    STRIPE_SECRET_KEY: str


    class Config:
        env_file = "../.env"


settings = Settings()


TORTOISE_ORM = {
    "connections": {
        "default": f"postgres://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.DB_HOST}:5432/{settings.POSTGRES_DB}"
    },
    "apps": {
        "models": {
            "models": [
                "src.apps.movies.models",
                "src.apps.rooms.models",
                "src.apps.sessions.models",
                "src.apps.user.models",
                "aerich.models",
            ],
            "default_connection": "default",
        },
    },
}
