import redis.asyncio as redis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter
from tortoise.contrib.fastapi import register_tortoise

from src.settings import settings
from src.apps.movies.routers import router as movies_router

app = FastAPI()

origins = [
    "http://localhost:8080",
]


@app.on_event("startup")
async def startup():
    redis_limitter = redis.from_url(
        f"redis://:{settings.REDIS_PASSWORD}@{settings.REDIS_HOST}:{settings.REDIS_PORT}/1",
        encoding="utf-8",
        decode_responses=True,
    )
    await FastAPILimiter.init(redis_limitter)

    settings.REDIS_INSTANCE = await redis.from_url(
        f"redis://:{settings.REDIS_PASSWORD}@{settings.REDIS_HOST}:{settings.REDIS_PORT}/0",
        decode_responses=True,
        encoding="utf-8",
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies_router, prefix="/api/v1", tags=["movies"])


register_tortoise(
    app,
    db_url=f"postgres://postgres:postgres@{settings.DB_HOST}:5432/db",
    modules={"models": ["src.apps.movies.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
