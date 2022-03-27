from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.models.stuff import Stuff, Stuffs
from backend.schemas.stuff import StuffResponse, StuffSchema
from backend.config import get_settings

API_PREFIX = get_settings().STUFF_API_PREFIX

router = APIRouter(prefix=API_PREFIX)


@router.post("/bulk", status_code=status.HTTP_201_CREATED)
async def create_stuff(payload: list[StuffSchema], db_session: AsyncSession = Depends(get_db)):
    # Find a better way to convert the list of Schemas into a list of instantiated Models
    stuffs = Stuffs([Stuff(**item.dict()) for item in payload])
    return await stuffs.save(db_session)

@router.delete("/bulk", status_code=status.HTTP_201_CREATED)
async def create_stuff(db_session: AsyncSession = Depends(get_db)):
    # Find a better way to convert the list of Schemas into a list of instantiated Models
    return await Stuffs.delete(db_session)
    

@router.get("/", response_model=list[StuffResponse])
async def get_all_stuff(
    db_session: AsyncSession = Depends(get_db),
):
    return await Stuff.all(db_session)

@router.get("/{name}", response_model=StuffResponse)
async def find_stuff(
    name: str,
    db_session: AsyncSession = Depends(get_db),
):
    return await Stuff.find(db_session, name)


@router.delete("/{name}")
async def delete_stuff(name: str, db_session: AsyncSession = Depends(get_db)):
    stuff = await Stuff.find(db_session, name)
    return await Stuff.delete(stuff, db_session)


@router.patch("/{name}", response_model=StuffResponse)
async def update_stuff(
    payload: StuffSchema,
    name: str,
    db_session: AsyncSession = Depends(get_db),
):
    stuff = await Stuff.find(db_session, name)
    await stuff.update(db_session, **payload.dict())
    return stuff
