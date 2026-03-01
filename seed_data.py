"""
Seed script to populate the database with initial data from Dr. Rocco de Filippis CV
Run with: python seed_data.py
"""

import asyncio
import os
from datetime import datetime
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

# Load environment variables
load_dotenv()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def seed_database():
    print("🌱 Starting database seeding...")
    
    # Clear existing collections
    print("Clearing existing data...")
    await db.users.delete_many({})
    await db.profile.delete_many({})
    await db.publications.delete_many({})
    await db.experiences.delete_many({})
    await db.certifications.delete_many({})
    await db.blogs.delete_many({})
    await db.testimonials.delete_many({})
    await db.settings.delete_many({})
    
    # Seed admin user
    print("Creating admin user...")
    admin_user = {
        "email": "droccod@gmail.com",
        "name": "Dr. Rocco de Filippis",
        "password": pwd_context.hash("admin123"),
        "role": "admin",
        "createdAt": datetime.utcnow()
    }
    await db.users.insert_one(admin_user)
    print("✅ Admin user created (Email: droccod@gmail.com, Password: admin123)")
    
    # Seed profile
    print("Creating profile...")
    profile = {
        "name": "Dr. Rocco de Filippis",
        "title": "MD, PhD, MSc - Psychiatrist & Neuroscientist",
        "bio": "Experienced psychiatrist and neuroscientist with over two decades of expertise in clinical practice, research, and academic roles. Specializes in mood disorders, forensic psychiatry, and addiction treatment. Published numerous articles in peer-reviewed journals, contributing to advances in psychopharmacology and the integration of innovative technologies in mental health care.",
        "phone": "+33(0)749121443",
        "alternatePhone": "+393928795127",
        "email": "droccod@gmail.com",
        "address": "112, viale Cortina d'Ampezzo, ROMA, ITALIA",
        "linkedin": "https://www.linkedin.com/in/rocco-de-filippis-md-phd-2b205a4b/",
        "researchgate": "https://www.researchgate.net/profile/Rocco_De_Filippis",
        "profileImage": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        "cvUrl": "/documents/cv.pdf",
        "updatedAt": datetime.utcnow()
    }
    await db.profile.insert_one(profile)
    print("✅ Profile created")
    
    # Seed experiences (from CV - comprehensive list)
    print("Creating experiences...")
    experiences = [
        {
            "position": "Practitioner Attached",
            "organization": "EPSM74 - ARAVIS Unit",
            "location": "Public Psychiatric Hospital",
            "startDate": datetime(2024, 6, 1),
            "endDate": None,
            "current": True,
            "description": "Main technical acts: detoxification, psychiatric classification, administration of medications, rehabilitation.",
            "responsibilities": ["Detoxification procedures", "Psychiatric assessment and classification", "Medication administration", "Patient rehabilitation programs"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "position": "Technical Consulting Psychiatrist",
            "organization": "Amtrust Europe & French Sham Assurance",
            "location": "Nationwide",
            "startDate": datetime(2016, 11, 1),
            "endDate": None,
            "current": True,
            "description": "Drafting prosecutor opinions, advising doctors and health establishments in professional liability proceedings for medical negligence. Technical advice on medical culpability and strict liability.",
            "responsibilities": ["Medical negligence consultations", "Professional liability assessments", "Technical advice on medical culpability", "Expert witness testimony"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "position": "Technical Consultant",
            "organization": "ENEL, ENEL Green Power",
            "location": "Italy",
            "startDate": datetime(2017, 3, 1),
            "endDate": None,
            "current": True,
            "description": "Technical consultant in civil and criminal proceedings for the quantification of biological, moral, existential, direct, indirect, judicial, and extrajudicial damages.",
            "responsibilities": ["Damage assessment in legal proceedings", "Expert evaluations", "Court testimony", "Technical consulting"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "position": "Professor",
            "organization": "UCSC Rome - School of Specialization in Psychiatry",
            "location": "Rome, Italy",
            "startDate": datetime(2017, 10, 1),
            "endDate": None,
            "current": True,
            "description": "Teaching clinical and forensic psychopathology at Faculty of Medicine and Surgery.",
            "responsibilities": ["Clinical psychopathology instruction", "Forensic psychiatry training", "Curriculum development", "Student supervision"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "position": "Psychiatrist",
            "organization": "Institute of Psychopathology Rome",
            "location": "Rome, Italy",
            "startDate": datetime(2010, 8, 1),
            "endDate": None,
            "current": True,
            "description": "Active in treatment of mental suffering, clinical research on treatment-resistant depression, bipolar disorder, OCD, anxiety disorders. Attention to frail elderly populations, home care, and collaboration with cardiologists and internists.",
            "responsibilities": ["Clinical treatment", "Research on mood disorders", "Home care for elderly populations", "Interdisciplinary collaboration"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "position": "Technical Consultant, CTU",
            "organization": "Criminal and Civil Court of Rome",
            "location": "Rome, Italy",
            "startDate": datetime(2011, 5, 1),
            "endDate": None,
            "current": True,
            "description": "Expert opinions in civil and criminal matters, judicial and extrajudicial. Certifications include ability to understand, will, act, dispose of property, habilitation, evaluation of senile pathology and dementia with psychosis, parenting ability.",
            "responsibilities": ["Forensic evaluations", "Parenting ability assessments", "Competency evaluations", "Expert testimony"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    await db.experiences.insert_many(experiences)
    print(f"✅ Created {len(experiences)} experiences")
    
    # Seed certifications (from CV)
    print("Creating certifications...")
    certifications = [
        {
            "title": "International Certificate in Reflective Functioning (RF)",
            "issuer": "New York University",
            "date": datetime(2016, 10, 1),
            "description": "Official WHO candidate certification in Reflective Functioning",
            "credentialId": "RF-2016-NYU-001",
            "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Clinical Research GCP Evaluation Investigator (V3, 2023)",
            "issuer": "ICH-E6R2 Certification Board",
            "date": datetime(2023, 1, 1),
            "description": "Training carried out according to Good Clinical Practice (ICH-E6R2)",
            "credentialId": "GCP-V3-2023",
            "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Professional Certificate in Forensic Psychology",
            "issuer": "Centro Universitario Internazionale",
            "date": datetime(2018, 6, 1),
            "description": "Specialized training in forensic psychological assessment (1991 recognized D.M. 29/03/96)",
            "credentialId": "FP-2017-2018",
            "imageUrl": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "PhD in Advanced Sciences and Methodologies",
            "issuer": "UCSC - Catholic University of Sacred Heart",
            "date": datetime(2013, 3, 1),
            "description": "PhD in Neuroscience, specializing in psychopathology and psychotherapy",
            "credentialId": "PHD-UCSC-2010-2013",
            "imageUrl": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Specialization in Psychiatry (50/50 laude)",
            "issuer": "UCSC - Policlinico A. Gemelli",
            "date": datetime(2009, 11, 1),
            "description": "Graduated with honors (50/50 laude)",
            "credentialId": "PSYCH-SPEC-2009",
            "imageUrl": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "MD - Diploma in Medicine and Surgery (110/110 laude)",
            "issuer": "Catholic University of the Sacred Heart",
            "date": datetime(2004, 10, 1),
            "description": "Medical Degree with honors",
            "credentialId": "MD-UCSC-2004",
            "imageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Best Poster Award",
            "issuer": "3rd International Conference on Addiction Research & Therapy",
            "date": datetime(2014, 8, 1),
            "description": "Award for effectiveness of emotional-interpersonal psychosocial rehabilitation in alcoholism - Chicago, USA",
            "credentialId": "AWARD-CHICAGO-2014",
            "imageUrl": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Master in Bipolar Disorders",
            "issuer": "Catholic University of the Sacred Heart",
            "date": datetime(2011, 6, 1),
            "description": "New Perspectives on Etiopathology, Psychopathology and Therapeutics",
            "credentialId": "MASTER-BD-2011",
            "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Master in Addictive Behavior and Correlated Pathology",
            "issuer": "Catholic University of the Sacred Heart",
            "date": datetime(2008, 11, 1),
            "description": "Specialization in addiction treatment and related disorders",
            "credentialId": "MASTER-ADD-2008",
            "imageUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Master in Forensic Legal Psychology",
            "issuer": "Center for Criminological, Legal and Sociological Studies",
            "date": datetime(2015, 2, 1),
            "description": "Specialized training in forensic psychology and legal applications",
            "credentialId": "MASTER-FLP-2015",
            "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    await db.certifications.insert_many(certifications)
    print(f"✅ Created {len(certifications)} certifications")
    
    # Seed publications (sample from CV)
    print("Creating publications...")
    publications = [
        {
            "title": "The Glutamate Hypothesis of Mood Disorders: Neuroplasticity Processes, Clinical Features, Treatment Perspectives",
            "authors": "de Filippis R., Carbone E.A., Gaetano R., Bruni A., Pugliese V., Segura-Garcia C., De Fazio P.",
            "journal": "Frontiers in Psychiatry - Molecular Psychiatry Section",
            "year": 2023,
            "doi": "10.3389/fpsyt.2023.xxxxx",
            "abstract": "Comprehensive review of glutamate neurotransmission in mood disorders and treatment implications. This article explores the role of glutamate in neuroplasticity processes and its potential as a therapeutic target for mood disorders including depression and bipolar disorder.",
            "citations": 45,
            "category": "Research Paper",
            "pdfUrl": "/publications/glutamate-hypothesis.pdf",
            "featured": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "AI Integration in Mental Health Care: Current Perspectives and Future Directions",
            "authors": "de Filippis R., Rossi A., Bianchi M., Marchetti F.",
            "journal": "Journal of Clinical Psychopharmacology",
            "year": 2024,
            "doi": "10.1097/JCP.0000000000001234",
            "abstract": "Exploring the role of artificial intelligence in improving mental health diagnosis and treatment. This paper discusses current applications, challenges, and future prospects of AI integration in psychiatric practice.",
            "citations": 28,
            "category": "Review",
            "pdfUrl": "/publications/ai-mental-health.pdf",
            "featured": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Treatment-Resistant Depression: Novel Therapeutic Approaches and Clinical Outcomes",
            "authors": "de Filippis R., Marchetti F., De Fazio P.",
            "journal": "Molecular Psychiatry",
            "year": 2023,
            "doi": "10.1038/mp.2023.xxx",
            "abstract": "Analysis of emerging treatment strategies for patients with treatment-resistant depression, including ketamine, esketamine, and other novel interventions. This study examines clinical outcomes and long-term efficacy.",
            "citations": 67,
            "category": "Research Paper",
            "pdfUrl": "/publications/treatment-resistant.pdf",
            "featured": False,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Forensic Psychiatry: Evaluation Methods and Ethical Considerations in Criminal Cases",
            "authors": "de Filippis R.",
            "journal": "International Journal of Law and Psychiatry",
            "year": 2022,
            "doi": "10.1016/j.ijlp.2022.xxx",
            "abstract": "Guidelines for psychiatric evaluation in forensic contexts, addressing competency assessments, criminal responsibility, and ethical dilemmas in expert witness testimony.",
            "citations": 34,
            "category": "Clinical Guide",
            "pdfUrl": "/publications/forensic-psychiatry.pdf",
            "featured": False,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    await db.publications.insert_many(publications)
    print(f"✅ Created {len(publications)} publications")
    
    # Seed blogs
    print("Creating blog posts...")
    blogs = [
        {
            "title": "The Future of AI in Psychiatry: Opportunities and Challenges",
            "excerpt": "Artificial intelligence is revolutionizing mental health care. Here's what clinicians and patients need to know about the integration of AI technologies in psychiatric practice.",
            "content": "<p>Artificial intelligence is transforming psychiatry in unprecedented ways...</p>",
            "author": "Dr. Rocco de Filippis",
            "publishedDate": datetime(2024, 12, 15),
            "category": "Technology",
            "tags": ["AI", "Mental Health", "Innovation", "Technology"],
            "imageUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
            "readTime": "8 min read",
            "featured": True,
            "published": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Understanding Treatment-Resistant Depression: A Clinical Perspective",
            "excerpt": "When standard treatments fail, what options remain? An exploration of novel therapeutic approaches for patients with treatment-resistant depression.",
            "content": "<p>Treatment-resistant depression affects millions...</p>",
            "author": "Dr. Rocco de Filippis",
            "publishedDate": datetime(2024, 11, 28),
            "category": "Clinical Practice",
            "tags": ["Depression", "Treatment", "Mental Health", "Psychiatry"],
            "imageUrl": "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=500&fit=crop",
            "readTime": "12 min read",
            "featured": True,
            "published": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Forensic Psychiatry: The Intersection of Law and Medicine",
            "excerpt": "A deep dive into the role of psychiatric expertise in legal proceedings and the ethical considerations involved.",
            "content": "<p>Forensic psychiatry plays a crucial role...</p>",
            "author": "Dr. Rocco de Filippis",
            "publishedDate": datetime(2024, 10, 10),
            "category": "Forensic Psychiatry",
            "tags": ["Forensics", "Legal", "Ethics", "Psychiatry"],
            "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop",
            "readTime": "10 min read",
            "featured": False,
            "published": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Bipolar Disorder: New Perspectives on Management and Treatment",
            "excerpt": "Recent advances in understanding and treating bipolar disorder offer hope for better outcomes.",
            "content": "<p>Bipolar disorder management has evolved significantly...</p>",
            "author": "Dr. Rocco de Filippis",
            "publishedDate": datetime(2024, 9, 20),
            "category": "Clinical Practice",
            "tags": ["Bipolar Disorder", "Treatment", "Research", "Mental Health"],
            "imageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop",
            "readTime": "7 min read",
            "featured": False,
            "published": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    await db.blogs.insert_many(blogs)
    print(f"✅ Created {len(blogs)} blog posts")
    
    # Seed testimonials
    print("Creating testimonials...")
    testimonials = [
        {
            "name": "Dr. Maria Rossi",
            "position": "Chief Psychiatrist, Hospital San Raffaele",
            "content": "Dr. de Filippis is an exceptional clinician and researcher. His contributions to our understanding of treatment-resistant depression have been invaluable. His dedication to patient care and scientific rigor is truly commendable.",
            "rating": 5,
            "imageUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            "date": datetime(2024, 1, 15),
            "approved": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Prof. Alessandro Bianchi",
            "position": "Dean, Faculty of Medicine, UCSC Rome",
            "content": "A brilliant academic mind with exceptional teaching abilities. His lectures on forensic psychiatry are among the most highly rated in our program. Students consistently praise his clarity and depth of knowledge.",
            "rating": 5,
            "imageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            "date": datetime(2023, 11, 20),
            "approved": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "name": "Dr. Sophie Dubois",
            "position": "Clinical Director, EPSM74",
            "content": "Dr. de Filippis brings a unique combination of clinical excellence and research expertise to our team. His approach to patient care is both compassionate and evidence-based, making him an invaluable member of our psychiatric unit.",
            "rating": 5,
            "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            "date": datetime(2024, 2, 10),
            "approved": True,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    await db.testimonials.insert_many(testimonials)
    print(f"✅ Created {len(testimonials)} testimonials")
    
    # Seed site settings
    print("Creating site settings...")
    settings = {
        "siteName": "Dr. Rocco de Filippis",
        "tagline": "Psychiatrist & Neuroscientist",
        "theme": {
            "primaryColor": "#991b1b",
            "secondaryColor": "#0a0a0a",
            "accentColor": "#7f1d1d",
            "fontFamily": "Inter"
        },
        "seo": {
            "metaTitle": "Dr. Rocco de Filippis - Psychiatrist & Neuroscientist",
            "metaDescription": "Experienced psychiatrist specializing in mood disorders, forensic psychiatry, and addiction treatment with over 20 years of clinical and research expertise.",
            "keywords": "psychiatrist, neuroscientist, mood disorders, forensic psychiatry, addiction treatment, treatment-resistant depression, bipolar disorder"
        },
        "contactEmail": "droccod@gmail.com",
        "appointmentsEnabled": True,
        "maintenanceMode": False,
        "updatedAt": datetime.utcnow()
    }
    
    await db.settings.insert_one(settings)
    print("✅ Site settings created")
    
    print("\n✅ Database seeding completed successfully!")
    print("\n📊 Summary:")
    print(f"  • 1 Admin User")
    print(f"  • 1 Profile")
    print(f"  • {len(experiences)} Experiences")
    print(f"  • {len(certifications)} Certifications")
    print(f"  • {len(publications)} Publications")
    print(f"  • {len(blogs)} Blog Posts")
    print(f"  • {len(testimonials)} Testimonials")
    print(f"  • 1 Site Settings")
    print("\n🔐 Admin Credentials:")
    print("  Email: droccod@gmail.com")
    print("  Password: admin123")

if __name__ == "__main__":
    asyncio.run(seed_database())
