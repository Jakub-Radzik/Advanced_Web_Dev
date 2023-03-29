from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_limiter.depends import RateLimiter
from src.apps.Author.models import Author
from src.apps.Author.schemas import Author_Pydantic, AuthorIn, AuthorUpdate, AuthorDelete


router = APIRouter()


@router.get("/authors", response_model=list[Author_Pydantic])
async def get_all_authors():
    return await Author_Pydantic.from_queryset(Author.all())


@router.get("/authors/{id}", response_model=Author_Pydantic)
async def get_author(id: int):
    return await Author_Pydantic.from_queryset_single(Author.get(id=id))


@router.post("/authors", response_model=Author_Pydantic)
async def create_author(author: AuthorIn):
    author_obj = await Author.create(**author.dict(exclude_unset=True))
    return await Author_Pydantic.from_tortoise_orm(author_obj)


@router.put("/authors/{id}", response_model=Author_Pydantic)
async def update_author(id: int, author: AuthorUpdate):
    update_obj = await Author.filter(id=id).update(**author.dict(exclude_unset=True, exclude={"id"}))

    if not update_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Author with id {id} not found")

    return await Author_Pydantic.from_queryset_single(Author.get(id=id))


@router.delete("/authors/{id}", response_model=Author_Pydantic)
async def delete_author(id: int):
    delete_obj = await Author.filter(id=id).delete()

    if not delete_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Author with id {id} not found")

    return {"deleted": True}
