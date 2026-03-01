from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ExperienceBase(BaseModel):
    position: str
    organization: str
    location: str
    startDate: datetime
    endDate: Optional[datetime] = None
    current: bool = False
    description: str
    responsibilities: List[str] = []

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    position: Optional[str] = None
    organization: Optional[str] = None
    location: Optional[str] = None
    startDate: Optional[datetime] = None
    endDate: Optional[datetime] = None
    current: Optional[bool] = None
    description: Optional[str] = None
    responsibilities: Optional[List[str]] = None

class Experience(ExperienceBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True