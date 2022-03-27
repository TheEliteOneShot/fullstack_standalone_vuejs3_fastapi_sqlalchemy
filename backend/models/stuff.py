from fastapi import HTTPException, status
from typing import List
from sqlalchemy import Column, Integer, String, select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.base import Base

class Stuff(Base):
    __tablename__ = "stuff"
    id = Column(Integer, unique=True, primary_key=True)
    name = Column(String, nullable=False, unique=False)
    description = Column(String, nullable=False)

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    @classmethod
    async def find(cls, db_session: AsyncSession, name: str):
        """

        :param db_session:
        :param name:
        :return:
        """
        stmt = select(cls).where(cls.name == name)
        result = await db_session.execute(stmt)
        instance = result.scalars().first()
        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"Not found": f"There is no record for requested: {name=}"},
            )
        else:
            return instance

    @classmethod
    async def all(cls, db_session: AsyncSession):
        """

        :param db_session:
        :return:
        """
        stmt = select(cls)
        result = await db_session.execute(stmt)
        instance = result.scalars().all()
        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"Not found": "There are no records."},
            )
        else:
            return instance

class Stuffs(Base):
    __tablename__ = "stuff"
    stuffs = List[Stuff]

    def __init__(self, stuffs: List[Stuff]):
        self.stuffs = stuffs
    
    async def save(self, db_session: AsyncSession):
        """

        :param db_session:
        :return:
        """
        # add_all preserves the object relationships. TODO: Find a way to insert many using the 'insert' sql statement method so that the speed is faster.
        db_session.add_all(self.stuffs)
        await db_session.commit()
        return True
    
    @classmethod
    async def delete(cls, db_session: AsyncSession):
        """

        :param db_session:
        :return:
        """
        stmt = delete(cls)
        await db_session.execute(stmt)
        await db_session.commit()
        return True
        