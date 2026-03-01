from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class AppointmentBase(BaseModel):
    patientName: str
    email: EmailStr
    phone: str
    date: str
    time: str
    type: str
    notes: Optional[str] = None
    status: str = 'pending'

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    patientName: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    type: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None

class Appointment(AppointmentBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True