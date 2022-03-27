from fastapi import HTTPException, status
from sqlalchemy import Column, Integer, String, select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.base import Base

class Nonsense(Base):
    __tablename__ = "nonsense"
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
                detail={"Record not found": f"There is no record for requested name value : {name}"},
            )
        else:
            return instance
    
    
    @classmethod
    async def all(cls, db_session: AsyncSession, name: str):
        """

        :param db_session:
        :return:
        """
        stmt = select(cls)
        result = await db_session.execute(stmt)
        print(result)
        return await db_session.commit()
