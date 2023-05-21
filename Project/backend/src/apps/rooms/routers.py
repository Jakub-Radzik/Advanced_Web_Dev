from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_limiter.depends import RateLimiter
from src.apps.rooms.models import Room
from src.apps.rooms.schemas import Room_Pydantic, RoomIn_Pydantic
from src.apps.user.auth import get_current_user

router = APIRouter()


@router.get(
    "/rooms",
    dependencies=[Depends(RateLimiter(times=5, seconds=15))],
)
async def get_rooms():
    rooms = await Room_Pydantic.from_queryset(Room.all())
    return rooms


@router.get(
    "/rooms/{room_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=15))],
)
async def get_room(room_id: int):
    room = await Room_Pydantic.from_queryset_single(Room.get(id=room_id))
    if room:
        return room
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Room not found")


@router.post(
    "/rooms",
    dependencies=[Depends(RateLimiter(times=5, seconds=15))],
)
async def create_room(room: RoomIn_Pydantic, _: str = Depends(get_current_user)):
    room_obj = await Room.create(**room.dict(exclude_unset=True))
    return await Room_Pydantic.from_tortoise_orm(room_obj)


@router.put(
    "/rooms/{room_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=15))],
)
async def update_room(room_id: int, room: RoomIn_Pydantic):
    await Room.filter(id=room_id).update(**room.dict(exclude_unset=True))
    return await Room_Pydantic.from_queryset_single(Room.get(id=room_id))


@router.delete(
    "/rooms/{room_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=15))],
)
async def delete_room(room_id: int, _: str = Depends(get_current_user)):
    deleted_count = await Room.filter(id=room_id).delete()
    if not deleted_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Room not found"
        )
    return {"message": f"Deleted room {room_id}"}
