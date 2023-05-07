from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_limiter.depends import RateLimiter

from src.apps.movies.utils import (
    get_moviedb_config,
    get_currently_popular_movies,
    get_genres_mapping,
)
from src.apps.movies.schemas import Language, Size, size_mapping
from src.settings import settings


router = APIRouter()


@router.get("/movies", dependencies=[Depends(RateLimiter(times=5, seconds=1))])
async def get_movies(
    language: Language = Language.ENGLISH,
    page: str = "1",
    size: Size = Size.MEDIUM,
):
    """Get movies from moviedb API"""
    config = await get_moviedb_config()
    genres_mapping = await get_genres_mapping(language.value)
    movies = await get_currently_popular_movies(language.value, page)

    data = {
        "results": [],
    }

    poster_size = config["poster_sizes"][size_mapping[size.value]]
    backdrop_size = config["backdrop_sizes"][size_mapping[size.value]]

    for movie in movies["results"]:
        movie_data = {
            "id": movie["id"],
            "title": movie["title"],
            "poster_path": f"{config['resource_base_url']}{poster_size}{movie['poster_path']}",
            "backdrop_path": f"{config['resource_base_url']}{backdrop_size}{movie['backdrop_path']}",
            "overview": movie["overview"],
            "release_date": movie["release_date"],
            "vote_average": movie["vote_average"],
            "vote_count": movie["vote_count"],
            "original_language": movie["original_language"],
            "original_title": movie["original_title"],
            "genres": list(map(lambda x: genres_mapping[x], movie["genre_ids"])),
        }
        data["results"].append(movie_data)

    return data
