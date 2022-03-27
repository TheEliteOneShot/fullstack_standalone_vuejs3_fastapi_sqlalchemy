from fastapi import FastAPI

from backend.api.nonsense import router as nonsense_router
from backend.api.stuff import router as stuff_router
from backend.database import engine
from backend.models.base import Base
from fastapi.middleware.cors import CORSMiddleware
from config import Config

app = FastAPI(title=Config.API_TILE, version=str(Config.API_VERSION))

app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.CORS_ORIGINS,
    allow_credentials=Config.CORS_ALLOW_CREDENTIALS,
    allow_methods=Config.CORS_ALLOW_METHODS,
    allow_headers=Config.CORS_ALLOW_HEADERS,
)

app.include_router(stuff_router)
app.include_router(nonsense_router)


async def start_db():
    # Initialize the database
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()


@app.on_event("startup")
async def startup_event():
    await start_db()


@app.on_event("shutdown")
async def shutdown_event():
    pass
