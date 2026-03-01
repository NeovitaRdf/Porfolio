from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from models.settings import SiteSettings, SiteSettingsUpdate
from utils.auth import get_current_user
from utils.database import settings_collection, serialize_doc

router = APIRouter(prefix="/api/settings", tags=["settings"])

@router.get("", response_model=SiteSettings)
async def get_settings():
    """Get site settings."""
    settings = await settings_collection.find_one({})
    
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    
    return serialize_doc(settings)

@router.put("", response_model=SiteSettings)
async def update_settings(
    settings_update: SiteSettingsUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update site settings (admin only)."""
    update_data = {k: v for k, v in settings_update.dict(exclude_unset=True).items()}
    update_data['updatedAt'] = datetime.utcnow()
    
    result = await settings_collection.find_one_and_update(
        {},
        {'$set': update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Settings not found")
        ALLOWED HOSTS = ['*']
        STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    
    return serialize_doc(result)
    
