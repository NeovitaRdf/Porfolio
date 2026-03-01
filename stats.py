from fastapi import APIRouter, Depends
from utils.auth import get_current_user
from utils.database import (
    publications_collection,
    experiences_collection,
    certifications_collection,
    blogs_collection,
    testimonials_collection,
    appointments_collection
)

router = APIRouter(prefix="/api/stats", tags=["stats"])

@router.get("")
async def get_stats(current_user: dict = Depends(get_current_user)):
    """Get dashboard statistics (admin only)."""
    
    # Count publications
    total_publications = await publications_collection.count_documents({})
    
    # Calculate total citations
    pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$citations"}}}
    ]
    citation_result = await publications_collection.aggregate(pipeline).to_list(1)
    total_citations = citation_result[0]['total'] if citation_result else 0
    
    # Count experiences
    total_experiences = await experiences_collection.count_documents({})
    current_positions = await experiences_collection.count_documents({'current': True})
    
    # Count certifications
    total_certifications = await certifications_collection.count_documents({})
    
    # Count blog posts
    total_blogs = await blogs_collection.count_documents({'published': True})
    
    # Count testimonials
    approved_testimonials = await testimonials_collection.count_documents({'approved': True})
    
    # Count appointments
    total_appointments = await appointments_collection.count_documents({})
    pending_appointments = await appointments_collection.count_documents({'status': 'pending'})
    
    return {
        "totalPublications": total_publications,
        "totalCitations": total_citations,
        "totalExperiences": total_experiences,
        "currentPositions": current_positions,
        "certifications": total_certifications,
        "blogPosts": total_blogs,
        "testimonials": approved_testimonials,
        "totalAppointments": total_appointments,
        "pendingAppointments": pending_appointments
    }