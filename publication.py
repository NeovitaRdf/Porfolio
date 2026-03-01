from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PublicationBase(BaseModel):
    title: str
    authors: str
    journal: str
    year: int
    doi: Optional[str] = None
    abstract: str
    citations: int = 0
    category: str
    pdfUrl: Optional[str] = None
    featured: bool = False

class PublicationCreate(PublicationBase):
    pass

class PublicationUpdate(BaseModel):
    title: Optional[str] = None
    authors: Optional[str] = None
    journal: Optional[str] = None
    year: Optional[int] = None
    doi: Optional[str] = None
    abstract: Optional[str] = None
    citations: Optional[int] = None
    category: Optional[str] = None
    pdfUrl: Optional[str] = None
    featured: Optional[bool] = None

class Publication(PublicationBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True