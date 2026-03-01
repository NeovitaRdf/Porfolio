from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models.experience import Experience, ExperienceCreate, ExperienceUpdate
from utils.auth import get_current_user
from utils.database import experiences_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/experiences", tags=["experiences"])

@router.get("", response_model=List[Experience])
async def get_experiences():
    """Get all experiences sorted by start date."""
    experiences = await experiences_collection.find().sort('startDate', -1).to_list(1000)
    return serialize_docs(experiences)

@router.get("/{id}", response_model=Experience)
async def get_experience(id: str):
    """Get a single experience by ID."""
    try:
        experience = await experiences_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    return serialize_doc(experience)

@router.post("", response_model=Experience)
async def create_experience(
    experience: ExperienceCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new experience entry (admin only)."""
    experience_doc = experience.dict()
    experience_doc['createdAt'] = datetime.utcnow()
    experience_doc['updatedAt'] = datetime.utcnow()
    
    result = await experiences_collection.insert_one(experience_doc)
    experience_doc['_id'] = result.inserted_id
    
    return serialize_doc(experience_doc)

@router.put("/{id}", response_model=Experience)
async def update_experience(
    id: str,
    experience_update: ExperienceUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update an experience entry (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in experience_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await experiences_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_experience(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete an experience entry (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await experiences_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    return {"message": "Experience deleted successfully"}