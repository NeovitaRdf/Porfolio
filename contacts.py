from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models.contact import Contact, ContactCreate, ContactUpdate
from utils.auth import get_current_user
from utils.database import contacts_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/contacts", tags=["contacts"])

@router.get("", response_model=List[Contact])
async def get_contacts(current_user: dict = Depends(get_current_user)):
    """Get all contact submissions (admin only)."""
    contacts = await contacts_collection.find().sort('createdAt', -1).to_list(1000)
    return serialize_docs(contacts)

@router.get("/{id}", response_model=Contact)
async def get_contact(id: str, current_user: dict = Depends(get_current_user)):
    """Get a single contact submission by ID (admin only)."""
    try:
        contact = await contacts_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return serialize_doc(contact)

@router.post("", response_model=Contact)
async def create_contact(contact: ContactCreate):
    """Submit a contact form (public endpoint)."""
    contact_doc = contact.dict()
    contact_doc['createdAt'] = datetime.utcnow()
    contact_doc['updatedAt'] = datetime.utcnow()
    
    result = await contacts_collection.insert_one(contact_doc)
    contact_doc['_id'] = result.inserted_id
    
    return serialize_doc(contact_doc)

@router.put("/{id}", response_model=Contact)
async def update_contact(
    id: str,
    contact_update: ContactUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update contact status (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in contact_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await contacts_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_contact(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a contact submission (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await contacts_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    return {"message": "Contact deleted successfully"}