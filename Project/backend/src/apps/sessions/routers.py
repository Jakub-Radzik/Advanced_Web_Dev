from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_limiter.depends import RateLimiter
from typing import Type
from datetime import datetime, timedelta
from src.apps.movies.models import Movie
from src.apps.rooms.models import Room
from src.apps.sessions.models import Session, Ticket
from src.apps.sessions.schemas import (
    Session_Pydantic,
    Ticket_Pydantic,
    SessionIn,
    SessionUpdate,
    TicketIn,
    TicketUpdate,
)
from src.apps.user.auth import get_current_user
from src.apps.utilities.redis import redis_cache
from tortoise.exceptions import DoesNotExist
from tortoise.expressions import Q
from src.apps.utilities.utils import change_int_into_letters

router = APIRouter()


@router.get(
    "/sessions",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def get_sessions():
    sessions = await Session_Pydantic.from_queryset(Session.all())
    return sessions


@router.get(
    "/sessions/number",
)
async def get_sessions_number():
    return await Session.all().count()


@router.get(
    "/sessions/{session_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
    response_model=Session_Pydantic,
)
async def get_session(session_id: int):
    session = await Session_Pydantic.from_queryset_single(Session.get(id=session_id))
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Session not found"
        )
    return session


@router.get(
    "/sessions/movie/{movie_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def get_sessions_by_movie(movie_id: int):
    sessions = (
        await Session.filter(movie_fk=movie_id, datetime__gte=datetime.now())
        .order_by("datetime")
        .values("id", "datetime")
    )
    sessions_grouped_by_date = {}
    for session in sessions:
        date = session["datetime"].date()
        if date not in sessions_grouped_by_date:
            sessions_grouped_by_date[date] = []
        sessions_grouped_by_date[date].append(
            {
                "id": session["id"],
                "time": session["datetime"].strftime("%H:%M"),
            }
        )

    if not sessions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Sessions not found"
        )
    return sessions_grouped_by_date


@router.post(
    "/sessions",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def create_session(session: SessionIn, _=Depends(get_current_user)):
    # NOTE: perfomance can be improved by using bulk_create
    try:
        await Movie.get(id=session.movie_fk_id)
        room = await Room.get(id=session.room_fk_id)
        room_matrix: list[list[int]] = room.matrix
    except DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Movie or room not found"
        )

    count = 0
    if session.dateto is None or session.date_interval is None:
        if session.timeto is None or session.time_interval is None:
            await create_session_and_generate_assosciated_tickets(
                session.room_fk_id,
                session.movie_fk_id,
                datetime.combine(session.datefrom, session.timefrom),
                room_matrix,
            )
            count += 1
        else:
            combined_datetime = datetime.combine(session.datefrom, session.timefrom)
            combined_datetime_to = datetime.combine(session.datefrom, session.timeto)
            while combined_datetime <= combined_datetime_to:
                await create_session_and_generate_assosciated_tickets(
                    session.room_fk_id,
                    session.movie_fk_id,
                    combined_datetime,
                    room_matrix,
                )
                count += 1
                combined_datetime += session.time_interval

    else:
        if session.timeto is None or session.time_interval is None:
            combined_datetime = datetime.combine(session.datefrom, session.timefrom)
            combined_datetime_to = datetime.combine(session.dateto, session.timefrom)
            while combined_datetime <= combined_datetime_to:
                await create_session_and_generate_assosciated_tickets(
                    session.room_fk_id,
                    session.movie_fk_id,
                    combined_datetime,
                    room_matrix,
                )
                count += 1
                combined_datetime += session.date_interval

        else:
            date_from = session.datefrom
            date_to = session.dateto
            while date_from <= date_to:
                date_from_time = datetime.combine(date_from, session.timefrom)
                date_from_time_to = datetime.combine(date_from, session.timeto)
                while date_from_time <= date_from_time_to:
                    await create_session_and_generate_assosciated_tickets(
                        session.room_fk_id,
                        session.movie_fk_id,
                        date_from_time,
                        room_matrix,
                    )
                    count += 1
                    date_from_time += session.time_interval
                date_from += session.date_interval

    return {"created": count}


async def create_session_and_generate_assosciated_tickets(
    # TODO: add validation for room_matrix
    room_fk_id: int,
    movie_fk_id: int,
    datetime: datetime,
    room_matrix: list[list[int]],
):
    session = await Session.create(
        room_fk_id=room_fk_id,
        movie_fk_id=movie_fk_id,
        datetime=datetime,
    )
    tickets = []
    for row_idx, row in enumerate(room_matrix):
        for col_idx, flag in enumerate(row):
            if flag == 1:
                tickets.append(
                    Ticket(
                        session_fk=session.id,
                        row=change_int_into_letters(row_idx + 1),
                        seat=col_idx + 1,
                    )
                )
    await Ticket.bulk_create(tickets)
    return session


@router.delete(
    "/sessions/{session_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def delete_session(session_id: int, _=Depends(get_current_user)):
    session = await Session.get_or_none(id=session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Session not found"
        )
    await session.delete()
    return {"deleted": session_id}


@router.put(
    "/sessions/{session_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def update_session(
    session_id: int, session: SessionUpdate, _=Depends(get_current_user)
):
    session_obj = await Session.get_or_none(id=session_id)
    if not session_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Session not found"
        )
    await session_obj.update_from_dict(session.dict()).save()
    return await Session_Pydantic.from_queryset_single(Session.get(id=session_id))


@router.get(
    "/sessions/{session_id}/tickets",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def get_tickets_by_session(session_id: int):
    qs = Ticket.filter(session_fk=session_id)
    tickets = await Ticket.filter(session_fk=session_id)
    if not tickets:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Tickets not found"
        )
    return await Ticket_Pydantic.from_queryset(qs)


@router.post(
    "/sessions/{session_id}/tickets",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def create_ticket(ticket: TicketIn, session_id: int, _=Depends(get_current_user)):
    session = await Session.get_or_none(id=session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Session not found"
        )
    ticket_obj = await Ticket.create(
        session_fk=session_id,
        row=ticket.row,
        seat=ticket.seat,
    )
    return await Ticket_Pydantic.from_tortoise_orm(ticket_obj)


@router.put(
    "/sessions/{session_id}/tickets/{ticket_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def update_ticket(
    ticket: TicketUpdate,
    session_id: int,
    ticket_id: int,
    _=Depends(get_current_user),
):
    ticket_obj = await Ticket.get_or_none(id=ticket_id)
    if not ticket_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found"
        )
    await ticket_obj.update_from_dict(ticket.dict()).save()
    return await Ticket_Pydantic.from_queryset_single(Ticket.get(id=ticket_id))


@router.delete(
    "/sessions/{session_id}/tickets/{ticket_id}",
    dependencies=[Depends(RateLimiter(times=5, seconds=1))],
)
async def delete_ticket(session_id: int, ticket_id: int, _=Depends(get_current_user)):
    ticket = await Ticket.get_or_none(id=ticket_id)
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found"
        )
    await ticket.delete()
    return {"deleted": ticket_id}
