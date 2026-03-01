from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CertificationBase(BaseModel):
    title: str
    issuer: str
    date: datetime
    description: Optional[str] = None
    credentialId: Optional[str] = None
    imageUrl: Optional[str] = None

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None
    credentialId: Optional[str] = None
    imageUrl: Optional[str] = None

class Certification(CertificationBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True