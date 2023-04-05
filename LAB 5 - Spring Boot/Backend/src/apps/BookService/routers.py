from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_limiter.depends import RateLimiter
from src.apps.BookService.models import Book
from src.apps.BookService.schemas import Book_Pydantic, BookIn, BookUpdate, BookDelete
from src.apps.Author.models import Author

router = APIRouter()


@router.get(
    "/books",
    response_model=list[Book_Pydantic],
    dependencies=[Depends(RateLimiter(times=2, seconds=1))],
)
async def get_books() -> list[Book_Pydantic]:
    return await Book_Pydantic.from_queryset(Book.all())


@router.get(
    "/books/borrowed",
    response_model=list[Book_Pydantic],
    dependencies=[Depends(RateLimiter(times=2, seconds=1))],
)
async def get_borrowed_books() -> list[Book_Pydantic]:
    return await Book_Pydantic.from_queryset(Book.filter(is_borrowed=True))


@router.get(
    "/books/unborrowed",
    response_model=list[Book_Pydantic],
    dependencies=[Depends(RateLimiter(times=2, seconds=1))],
)
async def get_unborrowed_books() -> list[Book_Pydantic]:
    return await Book_Pydantic.from_queryset(Book.filter(is_borrowed=False))


@router.get(
    "/books/{id}",
    response_model=Book_Pydantic,
    dependencies=[Depends(RateLimiter(times=2, seconds=1))],
)
async def get_book(id: int) -> Book_Pydantic:
    return await Book_Pydantic.from_queryset_single(Book.get(id=id))


@router.post(
    "/books",
    response_model=Book_Pydantic,
    dependencies=[Depends(RateLimiter(times=1, seconds=2))],
)
async def add_book(book: BookIn) -> Book_Pydantic:
    author = await Author.get(id=book.author)
    book_obj = await Book.create(
        title=book.title, author=author, pages=book.pages, is_borrowed=False
    )
    return await Book_Pydantic.from_tortoise_orm(book_obj)


@router.put(
    "/books",
    response_model=Book_Pydantic,
    dependencies=[Depends(RateLimiter(times=1, seconds=2))],
)
async def update_book(book: BookUpdate) -> Book_Pydantic:
    update_obj = await Book.filter(id=book.id).update(
        **book.dict(exclude_unset=True, exclude={"id", "author"})
    )
    if not update_obj:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Book with id {book.id} not found",
        )
    new_author = await Author.get(id=book.author)
    await Book.filter(id=book.id).update(author=new_author)
    return await Book_Pydantic.from_queryset_single(Book.get(id=book.id))


@router.delete(
    "/books",
    response_model=dict,
    dependencies=[Depends(RateLimiter(times=1, seconds=2))],
)
async def delete_book(book: BookDelete) -> dict:
    delete_obj = await Book.filter(id=book.id).delete()
    if not delete_obj:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Book with id {book.id} not found",
        )
    return {"message": f"Book with id {book.id} deleted"}


@router.put(
    "/books/borrow",
    response_model=Book_Pydantic,
    dependencies=[Depends(RateLimiter(times=1, seconds=2))],
)
async def borrow_book(id: int) -> Book_Pydantic:
    if await Book.filter(id=id, is_borrowed=True).exists():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Book with id {id} is already borrowed",
        )
    await Book.filter(id=id).update(is_borrowed=True)
    return await Book_Pydantic.from_queryset_single(Book.get(id=id))


@router.put(
    "/books/return",
    response_model=Book_Pydantic,
    dependencies=[Depends(RateLimiter(times=1, seconds=2))],
)
async def return_book(id: int) -> Book_Pydantic:
    if not await Book.filter(id=id, is_borrowed=True).exists():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Book with id {id} is not borrowed",
        )
    await Book.filter(id=id).update(is_borrowed=False)
    return await Book_Pydantic.from_queryset_single(Book.get(id=id))
