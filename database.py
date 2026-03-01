from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Collections
users_collection = db.users
publications_collection = db.publications
experiences_collection = db.experiences
certifications_collection = db.certifications
blogs_collection = db.blogs
testimonials_collection = db.testimonials
appointments_collection = db.appointments
contacts_collection = db.contacts
settings_collection = db.settings
profile_collection = db.profile

def serialize_doc(doc):
    """Convert MongoDB document to dict with string _id."""
    if doc:
        doc['id'] = str(doc.pop('_id'))
        return doc
    return None

def serialize_docs(docs):
    """Convert list of MongoDB documents to list of dicts."""
    return [serialize_doc(doc) for doc in docs]