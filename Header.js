import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Publications', path: '/publications' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-black/90">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-900/50 transition-all duration-300">
              <span className="text-white font-bold text-xl">RDF</span>
            </div>
            <div className="hidden md:block">
              <div className="text-white font-bold text-lg">Dr. Rocco de Filippis</div>
              <div className="text-gray-400 text-xs">Psychiatrist & Neuroscientist</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  isActive(link.path) ? 'text-red-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 transition-transform duration-200 ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/appointments">
              <Button className="bg-red-700 hover:bg-red-800 text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30">
                Book Appointment
              </Button>
            </Link>
            {isAuthenticated() ? (
              <Link to="/admin">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-white/10">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 space-y-4 border-t border-gray-800 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-sm font-medium transition-colors py-2 ${
                  isActive(link.path) ? 'text-red-500' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="space-y-2 pt-4 border-t border-gray-800">
              <Link to="/appointments" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-red-700 hover:bg-red-800 text-white">
                  Book Appointment
                </Button>
              </Link>
              {isAuthenticated() ? (
                <Link to="/admin" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-white/10">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;