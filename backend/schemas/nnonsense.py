from pydantic import BaseModel, Field

class NonsenseSchema(BaseModel):
    name: str = Field(
        title="",
        description="",
    )
    description: str = Field(
        title="",
        description="",
    )

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "name": "Name for Some Nonsense",
                "description": "Some Nonsense Description",
            }
        }


class NonsenseResponse(BaseModel):
    id: int = Field(
        title="Id",
        description="",
    )
    name: str = Field(
        title="",
        description="",
    )
    description: str = Field(
        title="",
        description="",
    )

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "config_id": "1",
                "name": "Name for Some Nonsense",
                "description": "Some Nonsense Description",
            }
        }
