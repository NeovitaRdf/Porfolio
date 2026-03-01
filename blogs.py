from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from models.blog import Blog, BlogCreate, BlogUpdate
from utils.auth import get_current_user
from utils.database import blogs_collection, serialize_doc, serialize_docs

router = APIRouter(prefix="/api/blogs", tags=["blogs"])

@router.get("", response_model=List[Blog])
async def get_blogs(
    search: Optional[str] = None,
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    published: Optional[bool] = True
):
    """Get all published blogs with optional filters."""
    query = {}
    
    if published is not None:
        query['published'] = published
    
    if search:
        query['$or'] = [
            {'title': {'$regex': search, '$options': 'i'}},
            {'excerpt': {'$regex': search, '$options': 'i'}},
            {'content': {'$regex': search, '$options': 'i'}}
        ]
    
    if category:
        query['category'] = category
    
    if featured is not None:
        query['featured'] = featured
    
    blogs = await blogs_collection.find(query).sort('publishedDate', -1).to_list(1000)
    return serialize_docs(blogs)

@router.get("/{id}", response_model=Blog)
async def get_blog(id: str):
    """Get a single blog by ID."""
    try:
        blog = await blogs_collection.find_one({'_id': ObjectId(id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    return serialize_doc(blog)

@router.post("", response_model=Blog)
async def create_blog(
    blog: BlogCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new blog post (admin only)."""
    blog_doc = blog.dict()
    blog_doc['createdAt'] = datetime.utcnow()
    blog_doc['updatedAt'] = datetime.utcnow()
    
    result = await blogs_collection.insert_one(blog_doc)
    blog_doc['_id'] = result.inserted_id
    
    return serialize_doc(blog_doc)

@router.put("/{id}", response_model=Blog)
async def update_blog(
    id: str,
    blog_update: BlogUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a blog post (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    update_data = {k: v for k, v in blog_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await blogs_collection.find_one_and_update(
        {'_id': obj_id},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    return serialize_doc(result)

@router.delete("/{id}")
async def delete_blog(
    id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a blog post (admin only)."""
    try:
        obj_id = ObjectId(id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    result = await blogs_collection.delete_one({'_id': obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    return {"message": "Blog deleted successfully"}