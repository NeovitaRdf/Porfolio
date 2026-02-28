import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminOverview from './AdminOverview';
import ManagePublications from './ManagePublications';
import ManageExperience from './ManageExperience';
import ManageCertifications from './ManageCertifications';
import ManageBlogs from './ManageBlogs';
import ManageTestimonials from './ManageTestimonials';
import ManageAppointments from './ManageAppointments';
import ManageProfile from './ManageProfile';
import SiteSettings from './SiteSettings';

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/publications" element={<ManagePublications />} />
          <Route path="/experience" element={<ManageExperience />} />
          <Route path="/certifications" element={<ManageCertifications />} />
          <Route path="/blogs" element={<ManageBlogs />} />
          <Route path="/testimonials" element={<ManageTestimonials />} />
          <Route path="/appointments" element={<ManageAppointments />} />
          <Route path="/profile" element={<ManageProfile />} />
          <Route path="/settings" element={<SiteSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
