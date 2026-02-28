import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Publications from "./pages/Publications";
import Experience from "./pages/Experience";
import Certifications from "./pages/Certifications";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Layout wrapper for public pages
const PublicLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/publications" element={<PublicLayout><Publications /></PublicLayout>} />
              <Route path="/experience" element={<PublicLayout><Experience /></PublicLayout>} />
              <Route path="/certifications" element={<PublicLayout><Certifications /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/appointments" element={<PublicLayout><Appointments /></PublicLayout>} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
