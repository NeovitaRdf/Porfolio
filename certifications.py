from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models.certification import Certification, CertificationCreate, CertificationUpdate
from utils.auth import get_current_user
from utils.database import certifications_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/certifications", tags=["certifications"])

@router.get("", response_model=List[Certification])
async def get_certifications():
    """Get all certifications sorted by date."""
    certifications = await certifications_collection.find().sort('date', -1).to_list(1000)
    return serialize_docs(certifications)

@router.get("/{id}", response_model=Certification)
async def get_certification(id: str):
    """Get a single certification by ID."""
    try:
        certification = await certifications_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    
    return serialize_doc(certification)

@router.post("", response_model=Certification)
async def create_certification(
    certification: CertificationCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new certification (admin only)."""
    certification_doc = certification.dict()
    certification_doc['createdAt'] = datetime.utcnow()
    certification_doc['updatedAt'] = datetime.utcnow()
    
    result = await certifications_collection.insert_one(certification_doc)
    certification_doc['_id'] = result.inserted_id
    
    return serialize_doc(certification_doc)

@router.put("/{id}", response_model=Certification)
async def update_certification(
    id: str,
    certification_update: CertificationUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a certification (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in certification_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await certifications_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Certification not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_certification(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a certification (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await certifications_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Certification not found")
    
    return {"message": "Certification deleted successfully"}