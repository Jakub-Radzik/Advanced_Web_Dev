from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_limiter.depends import RateLimiter
from src.apps.movies.models import Movie
from src.apps.movies.schemas import (
    Language,
    Movie_Create,
    Movie_Pydantic,
    Size,
    size_mapping,
)
from src.apps.movies.utils import (
    get_currently_popular_movies,
    get_genres_mapping,
    get_moviedb_config,
    flush_redis,
)
from src.apps.user.auth import get_current_user
from src.apps.utilities.redis import redis_cache

router = APIRouter()


@router.get("/movies", dependencies=[Depends(RateLimiter(times=5, seconds=1))])
async def get_movies(
    language: Language = Language.ENGLISH,
    page: str = "1",
    size: Size = Size.MEDIUM,
    _: str = Depends(get_current_user),
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
            "runtime": movie["runtime"] if "runtime" in movie else "N/A",
        }
        data["results"].append(movie_data)

    return data


@router.get("/stored/movies", dependencies=[Depends(RateLimiter(times=5, seconds=1))])
@redis_cache
async def get_stored_movies():
    """Get movies from database"""
    movies = await Movie_Pydantic.from_queryset(Movie.all())
    return movies


@router.get(
    "/stored/movies/{movie_id}", dependencies=[Depends(RateLimiter(times=5, seconds=1))]
)
@redis_cache
async def get_stored_movie(movie_id: int):
    """Get movie from database"""
    movie = await Movie_Pydantic.from_queryset_single(Movie.get(id=movie_id))
    if not movie:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return movie


@router.post("/stored/movies", dependencies=[Depends(RateLimiter(times=5, seconds=1))])
async def create_stored_movie(movie: Movie_Create, _: str = Depends(get_current_user)):
    """Create movie in database"""
    movie_obj = await Movie.create(**movie.dict(exclude_unset=True))
    return await Movie_Pydantic.from_tortoise_orm(movie_obj)


@router.put(
    "/stored/movies/{movie_id}", dependencies=[Depends(RateLimiter(times=5, seconds=1))]
)
async def update_stored_movie(
    movie_id: int, movie: Movie_Create, _: str = Depends(get_current_user)
):
    """Update movie in database"""
    await Movie.filter(id=movie_id).update(**movie.dict(exclude_unset=True))
    return await Movie_Pydantic.from_queryset_single(Movie.get(id=movie_id))


@router.delete(
    "/stored/movies/{movie_id}", dependencies=[Depends(RateLimiter(times=5, seconds=1))]
)
async def delete_stored_movie(movie_id: int, _: str = Depends(get_current_user)):
    """Delete movie from database"""
    await Movie.filter(id=movie_id).delete()
    return {"message": "Movie deleted successfully!"}


@router.get("/flush-cache", dependencies=[Depends(RateLimiter(times=5, seconds=1))])
async def flush_cache(_: str = Depends(get_current_user)):
    """Flush redis cache"""
    return await flush_redis()
