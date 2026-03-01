from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from models.profile import Profile, ProfileUpdate
from utils.auth import get_current_user
from utils.database import profile_collection, serialize_doc

router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.get("", response_model=Profile)
async def get_profile():
    """Get profile information."""
    profile = await profile_collection.find_one({})
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return serialize_doc(profile)

@router.put("", response_model=Profile)
async def update_profile(
    profile_update: ProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update profile information (admin only)."""
    update_data = {k: v for k, v in profile_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await profile_collection.find_one_and_update(
        {},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return serialize_doc(result)