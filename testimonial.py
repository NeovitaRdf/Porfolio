from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TestimonialBase(BaseModel):
    name: str
    position: str
    content: str
    rating: int = 5
    imageUrl: Optional[str] = None
    date: datetime
    approved: bool = False

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = None
    imageUrl: Optional[str] = None
    date: Optional[datetime] = None
    approved: Optional[bool] = None

class Testimonial(TestimonialBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True