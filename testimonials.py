from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models.testimonial import Testimonial, TestimonialCreate, TestimonialUpdate
from utils.auth import get_current_user
from utils.database import testimonials_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])

@router.get("", response_model=List[Testimonial])
async def get_testimonials(approved: bool = True):
    """Get all approved testimonials."""
    query = {'approved': approved} if approved else {}
    testimonials = await testimonials_collection.find(query).sort('date', -1).to_list(1000)
    return serialize_docs(testimonials)

@router.get("/{id}", response_model=Testimonial)
async def get_testimonial(id: str):
    """Get a single testimonial by ID."""
    try:
        testimonial = await testimonials_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return serialize_doc(testimonial)

@router.post("", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    """Submit a new testimonial (public endpoint, requires approval)."""
    testimonial_doc = testimonial.dict()
    testimonial_doc['approved'] = False  # Requires admin approval
    testimonial_doc['createdAt'] = datetime.utcnow()
    testimonial_doc['updatedAt'] = datetime.utcnow()
    
    result = await testimonials_collection.insert_one(testimonial_doc)
    testimonial_doc['_id'] = result.inserted_id
    
    return serialize_doc(testimonial_doc)

@router.put("/{id}", response_model=Testimonial)
async def update_testimonial(
    id: str,
    testimonial_update: TestimonialUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update/approve a testimonial (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in testimonial_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await testimonials_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_testimonial(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a testimonial (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await testimonials_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return {"message": "Testimonial deleted successfully"}