from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv()


class CommonSettings(BaseSettings):
    APP_NAME: str = "Simple book API"
    DEBUG_MODE: bool = True


class DatabaseSettings(BaseSettings):
    DB_HOST: str


class Settings(CommonSettings, DatabaseSettings):
    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_PASSWORD: str


settings = Settings()
