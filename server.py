from fastapi import FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routes
from routes import auth, publications, experiences, certifications, blogs, testimonials, appointments, contacts, profile, settings, stats

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Dr. Rocco de Filippis Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth.router)
app.include_router(publications.router)
app.include_router(experiences.router)
app.include_router(certifications.router)
app.include_router(blogs.router)
app.include_router(testimonials.router)
app.include_router(appointments.router)
app.include_router(contacts.router)
app.include_router(profile.router)
app.include_router(settings.router)
app.include_router(stats.router)

# Root endpoint
@app.get("/api")
async def root():
    return {"message": "Dr. Rocco de Filippis Portfolio API", "status": "running"}

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
