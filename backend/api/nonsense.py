from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.models.nonsense import Nonsense
from backend.schemas.nnonsense import NonsenseResponse, NonsenseSchema
from backend.config import get_settings

API_PREFIX = get_settings().NONSENSE_API_PREFIX

router = APIRouter(prefix=API_PREFIX)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=NonsenseResponse)
async def create_nonsense(payload: NonsenseSchema, db_session: AsyncSession = Depends(get_db)):
    nonsense = Nonsense(**payload.dict())
    await nonsense.save(db_session)
    return nonsense

@router.get("/", response_model=NonsenseResponse)
async def get_all_nonsense(
    db_session: AsyncSession = Depends(get_db),
):
    return await Nonsense.all(db_session)

@router.get("/name", response_model=NonsenseResponse)
async def find_nonsense(
    name: str,
    db_session: AsyncSession = Depends(get_db),
):
    return await Nonsense.find(db_session, name)


@router.delete("/")
async def delete_nonsense(name: str, db_session: AsyncSession = Depends(get_db)):
    nonsense = await Nonsense.find(db_session, name)
    return await nonsense.delete(nonsense, db_session)


@router.patch("/", response_model=NonsenseResponse)
async def update_nonsense(
    payload: NonsenseSchema,
    name: str,
    db_session: AsyncSession = Depends(get_db),
):
    nonsense = await Nonsense.find(db_session, name)
    await nonsense.update(db_session, **payload.dict())
    return nonsense
