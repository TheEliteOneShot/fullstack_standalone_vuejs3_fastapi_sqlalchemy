from fastapi import FastAPI

from api.nonsense import router as nonsense_router
from api.stuff import router as stuff_router
from database import engine
from models.base import Base

app = FastAPI(title="Stuff And Nonsense API", version="0.3")

app.include_router(stuff_router)
app.include_router(nonsense_router)


async def start_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()


@app.on_event("startup")
async def startup_event():
    await start_db()


@app.on_event("shutdown")
async def shutdown_event():
    pass
