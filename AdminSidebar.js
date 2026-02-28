import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Award, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { mockUser } from '../../mock';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Publications', path: '/admin/publications', icon: BookOpen },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Certifications', path: '/admin/certifications', icon: Award },
    { name: 'Blog Posts', path: '/admin/blogs', icon: FileText },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-neutral-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">RDF</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">Admin Dashboard</div>
            <div className="text-gray-400 text-xs">Portfolio Manager</div>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-950/30 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">{user?.name || 'Admin'}</div>
            <div className="text-gray-400 text-xs truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-red-900/30 text-red-500 border border-red-900/50'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-gray-700 text-gray-400 hover:bg-red-950/30 hover:text-red-500 hover:border-red-900"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <Link to="/" className="block mt-3">
          <Button variant="ghost" className="w-full text-gray-500 hover:text-white hover:bg-white/5 text-sm">
            View Portfolio →
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;