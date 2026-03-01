from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    status: str = 'new'

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    status: Optional[str] = None

class Contact(ContactBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True