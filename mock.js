// Mock data for Dr. Rocco de Filippis Portfolio

export const mockUser = {
  id: '1',
  email: 'droccod@gmail.com',
  name: 'Dr. Rocco de Filippis',
  title: 'MD, PhD, MSc - Psychiatrist & Neuroscientist',
  bio: 'Experienced psychiatrist and neuroscientist with over two decades of expertise in clinical practice, research, and academic roles. Specializes in mood disorders, forensic psychiatry, and addiction treatment.',
  phone: '+33(0)749121443',
  alternatePhone: '+393928795127',
  address: '112, viale Cortina d\'Ampezzo, ROMA, ITALIA',
  linkedin: 'https://www.linkedin.com/in/rocco-de-filippis-md-phd-2b205a4b/',
  researchgate: 'https://www.researchgate.net/profile/Rocco_De_Filippis',
  profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  cvUrl: '/documents/cv.pdf'
};

export const mockPublications = [
  {
    id: '1',
    title: 'The Glutamate Hypothesis of Mood Disorders: Neuroplasticity Processes',
    authors: 'de Filippis R., et al.',
    journal: 'Frontiers in Psychiatry',
    year: 2023,
    doi: '10.3389/fpsyt.2023.xxxxx',
    abstract: 'Comprehensive review of glutamate neurotransmission in mood disorders and treatment implications.',
    citations: 45,
    category: 'Research Paper',
    pdfUrl: '/publications/glutamate-hypothesis.pdf',
    featured: true
  },
  {
    id: '2',
    title: 'AI Integration in Mental Health Care: Current Perspectives',
    authors: 'de Filippis R., Rossi A., Bianchi M.',
    journal: 'Journal of Clinical Psychopharmacology',
    year: 2024,
    doi: '10.1097/JCP.0000000000001234',
    abstract: 'Exploring the role of artificial intelligence in improving mental health diagnosis and treatment.',
    citations: 28,
    category: 'Review',
    pdfUrl: '/publications/ai-mental-health.pdf',
    featured: true
  },
  {
    id: '3',
    title: 'Treatment-Resistant Depression: Novel Approaches',
    authors: 'de Filippis R., Marchetti F.',
    journal: 'Molecular Psychiatry',
    year: 2023,
    doi: '10.1038/mp.2023.xxx',
    abstract: 'Analysis of emerging treatment strategies for patients with treatment-resistant depression.',
    citations: 67,
    category: 'Research Paper',
    pdfUrl: '/publications/treatment-resistant.pdf',
    featured: false
  },
  {
    id: '4',
    title: 'Forensic Psychiatry: Evaluation Methods in Criminal Cases',
    authors: 'de Filippis R.',
    journal: 'International Journal of Law and Psychiatry',
    year: 2022,
    doi: '10.1016/j.ijlp.2022.xxx',
    abstract: 'Guidelines for psychiatric evaluation in forensic contexts.',
    citations: 34,
    category: 'Clinical Guide',
    featured: false
  }
];

export const mockExperiences = [
  {
    id: '1',
    position: 'Practitioner Attached',
    organization: 'EPSM74 - ARAVIS Unit',
    location: 'Public Psychiatric Hospital',
    startDate: '2024-06-01',
    endDate: null,
    current: true,
    description: 'Main technical acts: detoxification, psychiatric classification, administration of medications, rehabilitation.',
    responsibilities: ['Detoxification procedures', 'Psychiatric assessment and classification', 'Medication administration', 'Patient rehabilitation programs']
  },
  {
    id: '2',
    position: 'Technical Consulting Psychiatrist',
    organization: 'Amtrust Europe & French Sham Assurance',
    location: 'Nationwide',
    startDate: '2016-11-01',
    endDate: null,
    current: true,
    description: 'Drafting prosecutor opinions, advising on professional liability proceedings.',
    responsibilities: ['Medical negligence consultations', 'Professional liability assessments', 'Technical advice on medical culpability', 'Expert witness testimony']
  },
  {
    id: '3',
    position: 'Professor',
    organization: 'UCSC Rome - School of Specialization in Psychiatry',
    location: 'Rome, Italy',
    startDate: '2017-10-01',
    endDate: null,
    current: true,
    description: 'Teaching clinical and forensic psychopathology.',
    responsibilities: ['Clinical psychopathology instruction', 'Forensic psychiatry training', 'Curriculum development', 'Student supervision']
  },
  {
    id: '4',
    position: 'Psychiatrist',
    organization: 'Institute of Psychopathology Rome',
    location: 'Rome, Italy',
    startDate: '2010-08-01',
    endDate: null,
    current: true,
    description: 'Clinical research on treatment-resistant depression, bipolar disorder, OCD, anxiety disorders.',
    responsibilities: ['Clinical treatment', 'Research on mood disorders', 'Home care for elderly populations', 'Interdisciplinary collaboration']
  },
  {
    id: '5',
    position: 'Technical Consultant, CTU',
    organization: 'Criminal and Civil Court of Rome',
    location: 'Rome, Italy',
    startDate: '2011-05-01',
    endDate: null,
    current: true,
    description: 'Expert opinions in civil and criminal matters.',
    responsibilities: ['Forensic evaluations', 'Parenting ability assessments', 'Competency evaluations', 'Expert testimony']
  }
];

export const mockCertifications = [
  {
    id: '1',
    title: 'International Certificate in Reflective Functioning (RF)',
    issuer: 'New York University',
    date: '2016-10-01',
    description: 'Official WHO candidate certification',
    credentialId: 'RF-2016-NYU-001',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Clinical Research GCP Evaluation Investigator',
    issuer: 'ICH-E6R2 Certification Board',
    date: '2023-01-01',
    description: 'Training in Good Clinical Practice (ICH-E6R2)',
    credentialId: 'GCP-V3-2023',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Professional Certificate in Forensic Psychology',
    issuer: 'Centro Universitario Internazionale',
    date: '2018-06-01',
    description: 'Specialized training in forensic psychological assessment',
    credentialId: 'FP-2017-2018',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'PhD in Advanced Sciences and Methodologies',
    issuer: 'UCSC - Catholic University of Sacred Heart',
    date: '2013-03-01',
    description: 'PhD in Neuroscience, specializing in psychopathology and psychotherapy',
    credentialId: 'PHD-UCSC-2010-2013',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Specialization in Psychiatry',
    issuer: 'UCSC - Policlinico A. Gemelli',
    date: '2009-11-01',
    description: 'Graduated with honors (50/50 laude)',
    credentialId: 'PSYCH-SPEC-2009',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'Best Poster Award',
    issuer: '3rd International Conference on Addiction Research & Therapy',
    date: '2014-08-01',
    description: 'Effectiveness of emotional-interpersonal psychosocial rehabilitation in alcoholism',
    credentialId: 'AWARD-CHICAGO-2014',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop'
  }
];

export const mockBlogs = [
  {
    id: '1',
    title: 'The Future of AI in Psychiatry: Opportunities and Challenges',
    excerpt: 'Artificial intelligence is revolutionizing mental health care. Here\'s what clinicians and patients need to know about the integration of AI technologies in psychiatric practice.',
    content: '<p>Full blog content here...</p>',
    author: 'Dr. Rocco de Filippis',
    publishedDate: '2024-12-15',
    category: 'Technology',
    tags: ['AI', 'Mental Health', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Understanding Treatment-Resistant Depression',
    excerpt: 'When standard treatments fail, what options remain? An exploration of novel therapeutic approaches for patients with treatment-resistant depression.',
    content: '<p>Full blog content here...</p>',
    author: 'Dr. Rocco de Filippis',
    publishedDate: '2024-11-28',
    category: 'Clinical Practice',
    tags: ['Depression', 'Treatment', 'Mental Health'],
    imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=500&fit=crop',
    readTime: '12 min read',
    featured: true
  },
  {
    id: '3',
    title: 'Forensic Psychiatry: The Intersection of Law and Medicine',
    excerpt: 'A deep dive into the role of psychiatric expertise in legal proceedings and the ethical considerations involved.',
    content: '<p>Full blog content here...</p>',
    author: 'Dr. Rocco de Filippis',
    publishedDate: '2024-10-10',
    category: 'Forensic Psychiatry',
    tags: ['Forensics', 'Legal', 'Ethics'],
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
    readTime: '10 min read',
    featured: false
  },
  {
    id: '4',
    title: 'Bipolar Disorder: New Perspectives on Management',
    excerpt: 'Recent advances in understanding and treating bipolar disorder offer hope for better outcomes.',
    content: '<p>Full blog content here...</p>',
    author: 'Dr. Rocco de Filippis',
    publishedDate: '2024-09-20',
    category: 'Clinical Practice',
    tags: ['Bipolar Disorder', 'Treatment', 'Research'],
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop',
    readTime: '7 min read',
    featured: false
  }
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'Dr. Maria Rossi',
    position: 'Chief Psychiatrist, Hospital San Raffaele',
    content: 'Dr. de Filippis is an exceptional clinician and researcher. His contributions to our understanding of treatment-resistant depression have been invaluable.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Prof. Alessandro Bianchi',
    position: 'Dean, Faculty of Medicine, UCSC Rome',
    content: 'A brilliant academic mind with exceptional teaching abilities. His lectures on forensic psychiatry are among the most highly rated in our program.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    date: '2023-11-20'
  },
  {
    id: '3',
    name: 'Dr. Sophie Dubois',
    position: 'Clinical Director, EPSM74',
    content: 'Dr. de Filippis brings a unique combination of clinical excellence and research expertise to our team. His approach to patient care is both compassionate and evidence-based.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    date: '2024-02-10'
  }
];

export const mockAppointments = [
  {
    id: '1',
    patientName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+33 6 12 34 56 78',
    date: '2025-01-25',
    time: '10:00',
    type: 'Initial Consultation',
    status: 'pending',
    notes: 'Referred by Dr. Martin for depression evaluation',
    createdAt: '2025-01-20'
  },
  {
    id: '2',
    patientName: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    phone: '+33 6 98 76 54 32',
    date: '2025-01-26',
    time: '14:30',
    type: 'Follow-up',
    status: 'confirmed',
    notes: 'Bipolar disorder management - medication review',
    createdAt: '2025-01-18'
  },
  {
    id: '3',
    patientName: 'Pierre Laurent',
    email: 'pierre.laurent@email.com',
    phone: '+33 7 45 23 67 89',
    date: '2025-01-24',
    time: '09:00',
    type: 'Forensic Evaluation',
    status: 'completed',
    notes: 'Court-ordered evaluation completed',
    createdAt: '2025-01-10'
  }
];

export const mockSiteSettings = {
  id: '1',
  siteName: 'Dr. Rocco de Filippis',
  tagline: 'Psychiatrist & Neuroscientist',
  theme: {
    primaryColor: '#991b1b',
    secondaryColor: '#0a0a0a',
    accentColor: '#7f1d1d',
    fontFamily: 'Inter'
  },
  seo: {
    metaTitle: 'Dr. Rocco de Filippis - Psychiatrist & Neuroscientist',
    metaDescription: 'Experienced psychiatrist specializing in mood disorders, forensic psychiatry, and addiction treatment with over 20 years of clinical and research expertise.',
    keywords: 'psychiatrist, neuroscientist, mood disorders, forensic psychiatry, addiction treatment'
  },
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/rocco-de-filippis-md-phd-2b205a4b/',
    researchgate: 'https://www.researchgate.net/profile/Rocco_De_Filippis',
    twitter: '',
    facebook: ''
  },
  contactEmail: 'droccod@gmail.com',
  appointmentsEnabled: true,
  maintenanceMode: false
};

export const mockStats = {
  totalPublications: 87,
  totalCitations: 1234,
  yearsExperience: 20,
  patientsHelped: 2500,
  activeCases: 45,
  pendingAppointments: 12,
  blogPosts: 28,
  certifications: 15
};