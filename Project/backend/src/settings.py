from dotenv import load_dotenv
from pydantic import BaseSettings, EmailStr
from redis.asyncio import Redis

load_dotenv()


class CommonSettings(BaseSettings):
    APP_NAME: str = "CinemaWorld"
    DEBUG_MODE: bool = True


class DatabaseSettings(BaseSettings):
    DB_HOST: str


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

    class Config:
        env_file = "../.env"


settings = Settings()
