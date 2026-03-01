from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class BlogBase(BaseModel):
    title: str
    excerpt: str
    content: str
    author: str
    publishedDate: datetime
    category: str
    tags: List[str] = []
    imageUrl: Optional[str] = None
    readTime: Optional[str] = None
    featured: bool = False
    published: bool = False

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    publishedDate: Optional[datetime] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    imageUrl: Optional[str] = None
    readTime: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None

class Blog(BlogBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True