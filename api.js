import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  verify: () => api.get('/auth/verify'),
  logout: () => api.post('/auth/logout'),
};

// Publications API
export const publicationsAPI = {
  getAll: (params) => api.get('/publications', { params }),
  getById: (id) => api.get(`/publications/${id}`),
  create: (data) => api.post('/publications', data),
  update: (id, data) => api.put(`/publications/${id}`, data),
  delete: (id) => api.delete(`/publications/${id}`),
};

// Experiences API
export const experiencesAPI = {
  getAll: () => api.get('/experiences'),
  getById: (id) => api.get(`/experiences/${id}`),
  create: (data) => api.post('/experiences', data),
  update: (id, data) => api.put(`/experiences/${id}`, data),
  delete: (id) => api.delete(`/experiences/${id}`),
};

// Certifications API
export const certificationsAPI = {
  getAll: () => api.get('/certifications'),
  getById: (id) => api.get(`/certifications/${id}`),
  create: (data) => api.post('/certifications', data),
  update: (id, data) => api.put(`/certifications/${id}`, data),
  delete: (id) => api.delete(`/certifications/${id}`),
};

// Blogs API
export const blogsAPI = {
  getAll: (params) => api.get('/blogs', { params }),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  delete: (id) => api.delete(`/blogs/${id}`),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (approved = true) => api.get('/testimonials', { params: { approved } }),
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// Contacts API
export const contactsAPI = {
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  create: (data) => api.post('/contacts', data),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Profile API
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

// Stats API
export const statsAPI = {
  get: () => api.get('/stats'),
};

export default api;
