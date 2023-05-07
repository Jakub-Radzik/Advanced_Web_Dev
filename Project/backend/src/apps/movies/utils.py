from src.settings import settings
from fastapi import HTTPException, status
import requests
from datetime import datetime
import json


async def get_moviedb_config() -> dict[str, str]:
    redis = settings.REDIS_INSTANCE

    data = await redis.get("moviedb_config")
    last_checked = await redis.get("moviedb_config_last_checked")

    now = datetime.now()

    if (
        data is not None
        and last_checked is not None
        and (now - datetime.fromisoformat(last_checked)).days < 7
    ):
        return json.loads(data)
    else:
        req = requests.get(
            f"{settings.THE_MOVIE_BASE_URL}/configuration?api_key={settings.THE_MOVIE_DB_API_KEY}"
        )

        if req.status_code == status.HTTP_200_OK:
            response = req.json()
            resource_base_url = response["images"]["secure_base_url"]
            poster_sizes = response["images"]["poster_sizes"]
            backdrop_sizes = response["images"]["backdrop_sizes"]
            logo_sizes = response["images"]["logo_sizes"]
            data = {
                "resource_base_url": resource_base_url,
                "poster_sizes": poster_sizes,
                "backdrop_sizes": backdrop_sizes,
                "logo_sizes": logo_sizes,
            }
            await redis.set("moviedb_config", json.dumps(data))
            await redis.set("moviedb_config_last_checked", now.isoformat())
            return data
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong. Please try again later.",
            )


async def get_currently_popular_movies(language: str, page: str) -> dict[str, list]:
    redis = settings.REDIS_INSTANCE

    data_key = "currently_popular_movies" + language + page
    last_checked_key = "currently_popular_movies_last_checked" + language + page

    data = await redis.get(data_key)
    last_checked = await redis.get(last_checked_key)

    now = datetime.now()

    if (
        data is not None
        and last_checked is not None
        and (now - datetime.fromisoformat(last_checked)).days < 1
    ):
        return json.loads(data)
    else:
        req = requests.get(
            f"{settings.THE_MOVIE_BASE_URL}/movie/popular?api_key={settings.THE_MOVIE_DB_API_KEY}&language={language}&page={page}"
        )

        if req.status_code == status.HTTP_200_OK:
            response = req.json()
            data = {"results": []}
            for movie in response["results"]:
                movie_data = {
                    "id": movie["id"],
                    "title": movie["title"],
                    "poster_path": movie["poster_path"],
                    "backdrop_path": movie["backdrop_path"],
                    "overview": movie["overview"],
                    "release_date": movie["release_date"],
                    "vote_average": movie["vote_average"],
                    "vote_count": movie["vote_count"],
                    "original_language": movie["original_language"],
                    "original_title": movie["original_title"],
                    "genre_ids": list(map(str, movie["genre_ids"])),
                }
                data["results"].append(movie_data)

            await redis.set(data_key, json.dumps(data))
            await redis.set(last_checked_key, now.isoformat())
            return data
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong. Please try again later.",
            )


async def get_genres_mapping(language: str) -> dict[str, str]:
    redis = settings.REDIS_INSTANCE

    data_key = "genres_mapping" + language
    last_checked_key = "genres_mapping_last_checked" + language

    data = await redis.get(data_key)
    last_checked = await redis.get(last_checked_key)

    now = datetime.now()

    if (
        data is not None
        and last_checked is not None
        and (now - datetime.fromisoformat(last_checked)).days < 7
    ):
        return json.loads(data)
    else:
        req = requests.get(
            f"{settings.THE_MOVIE_BASE_URL}/genre/movie/list?api_key={settings.THE_MOVIE_DB_API_KEY}&language={language}"
        )

        if req.status_code == status.HTTP_200_OK:
            response = req.json()
            data = {}
            for genre in response["genres"]:
                data[genre["id"]] = genre["name"]

            await redis.set(data_key, json.dumps(data))
            await redis.set(last_checked_key, now.isoformat())
            return data
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong. Please try again later.",
            )
