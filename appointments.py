from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models.appointment import Appointment, AppointmentCreate, AppointmentUpdate
from utils.auth import get_current_user
from utils.database import appointments_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/appointments", tags=["appointments"])

@router.get("", response_model=List[Appointment])
async def get_appointments(current_user: dict = Depends(get_current_user)):
    """Get all appointments (admin only)."""
    appointments = await appointments_collection.find().sort('createdAt', -1).to_list(1000)
    return serialize_docs(appointments)

@router.get("/{id}", response_model=Appointment)
async def get_appointment(id: str, current_user: dict = Depends(get_current_user)):
    """Get a single appointment by ID (admin only)."""
    try:
        appointment = await appointments_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return serialize_doc(appointment)

@router.post("", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    """Book a new appointment (public endpoint)."""
    appointment_doc = appointment.dict()
    appointment_doc['createdAt'] = datetime.utcnow()
    appointment_doc['updatedAt'] = datetime.utcnow()
    
    result = await appointments_collection.insert_one(appointment_doc)
    appointment_doc['_id'] = result.inserted_id
    
    return serialize_doc(appointment_doc)

@router.put("/{id}", response_model=Appointment)
async def update_appointment(
    id: str,
    appointment_update: AppointmentUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update an appointment (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in appointment_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await appointments_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_appointment(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete an appointment (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await appointments_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    return {"message": "Appointment deleted successfully"}