from pydantic import BaseModel, Field
from typing import Optional, List

class StuffSchema(BaseModel):
    name: str = Field(
        title="",
        description="",
    )
    description: str = Field(
        title="",
        description="",
    )

    def test():
        print('called')
        return "this was a test"

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "name": "Name for Some Stuff",
                "description": "Some Stuff Description",
            }
        }

class StuffsSchema(BaseModel):
    stuffs: List[StuffSchema]
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "name": "StuffList",
                "description": "A list of stuff objects",
            }
        }

class StuffResponse(BaseModel):
    id: Optional[int] = Field(
        title="Id",
        description="",
    )
    name: Optional[str] = Field(
        title="",
        description="",
    )
    description: Optional[str] = Field(
        title="",
        description="",
    )

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "config_id": "1",
                "name": "Name for Some Stuff",
                "description": "Some Stuff Description",
            }
        }