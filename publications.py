from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from models.publication import Publication, PublicationCreate, PublicationUpdate
from utils.auth import get_current_user
from utils.database import publications_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/publications", tags=["publications"])

@router.get("", response_model=List[Publication])
async def get_publications(
    search: Optional[str] = None,
    category: Optional[str] = None,
    year: Optional[int] = None,
    featured: Optional[bool] = None
):
    """Get all publications with optional filters."""
    query = {}
    
    if search:
        query['$or'] = [
            {'title': {'$regex': search, '$options': 'i'}},
            {'authors': {'$regex': search, '$options': 'i'}},
            {'abstract': {'$regex': search, '$options': 'i'}}
        ]
    
    if category:
        query['category'] = category
    
    if year:
        query['year'] = year
    
    if featured is not None:
        query['featured'] = featured
    
    publications = await publications_collection.find(query).sort('year', -1).to_list(1000)
    return serialize_docs(publications)

@router.get("/{id}", response_model=Publication)
async def get_publication(id: str):
    """Get a single publication by ID."""
    try:
        publication = await publications_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not publication:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    return serialize_doc(publication)

@router.post("", response_model=Publication)
async def create_publication(
    publication: PublicationCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new publication (admin only)."""
    publication_doc = publication.dict()
    publication_doc['createdAt'] = datetime.utcnow()
    publication_doc['updatedAt'] = datetime.utcnow()
    
    result = await publications_collection.insert_one(publication_doc)
    publication_doc['_id'] = result.inserted_id
    
    return serialize_doc(publication_doc)

@router.put("/{id}", response_model=Publication)
async def update_publication(
    id: str,
    publication_update: PublicationUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a publication (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in publication_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await publications_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_publication(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a publication (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await publications_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Publication not found")
    
    return {"message": "Publication deleted successfully"}