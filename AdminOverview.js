import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Briefcase, 
  Award, 
  FileText, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowRight,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { mockStats, mockAppointments, mockBlogs } from '../../mock';

const AdminOverview = () => {
  const recentAppointments = mockAppointments.slice(0, 5);
  const recentBlogs = mockBlogs.slice(0, 3);

  const stats = [
    { 
      title: 'Total Publications', 
      value: mockStats.totalPublications, 
      icon: BookOpen, 
      color: 'text-blue-500',
      bg: 'bg-blue-950/30',
      link: '/admin/publications'
    },
    { 
      title: 'Active Cases', 
      value: mockStats.activeCases, 
      icon: Briefcase, 
      color: 'text-green-500',
      bg: 'bg-green-950/30',
      link: '/admin/experience'
    },
    { 
      title: 'Certifications', 
      value: mockStats.certifications, 
      icon: Award, 
      color: 'text-yellow-500',
      bg: 'bg-yellow-950/30',
      link: '/admin/certifications'
    },
    { 
      title: 'Blog Posts', 
      value: mockStats.blogPosts, 
      icon: FileText, 
      color: 'text-purple-500',
      bg: 'bg-purple-950/30',
      link: '/admin/blogs'
    },
    { 
      title: 'Pending Appointments', 
      value: mockStats.pendingAppointments, 
      icon: Calendar, 
      color: 'text-red-500',
      bg: 'bg-red-950/30',
      link: '/admin/appointments'
    },
    { 
      title: 'Total Citations', 
      value: mockStats.totalCitations, 
      icon: TrendingUp, 
      color: 'text-indigo-500',
      bg: 'bg-indigo-950/30'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-950/30 text-yellow-500 border-yellow-900/50',
      confirmed: 'bg-green-950/30 text-green-500 border-green-900/50',
      completed: 'bg-blue-950/30 text-blue-500 border-blue-900/50',
      cancelled: 'bg-red-950/30 text-red-500 border-red-900/50'
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-4 ${stat.bg} rounded-2xl group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                {stat.link && (
                  <Link to={stat.link} className="mt-4 text-red-500 text-sm font-medium flex items-center hover:text-red-400 transition-colors">
                    Manage <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Appointments */}
        <Card className="bg-neutral-900 border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-red-500" />
                Recent Appointments
              </CardTitle>
              <Link to="/admin/appointments">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-950/30">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-red-900 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-semibold">{appointment.patientName}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{appointment.type}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card className="bg-neutral-900 border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 h-5 w-5 text-red-500" />
                Recent Blog Posts
              </CardTitle>
              <Link to="/admin/blogs">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-950/30">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="flex items-start gap-4 p-4 bg-black border border-gray-800 rounded-lg hover:border-red-900 transition-colors">
                  <img src={blog.imageUrl} alt={blog.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold mb-1 line-clamp-1">{blog.title}</h4>
                    <p className="text-gray-400 text-xs mb-2">{blog.category}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {blog.readTime}
                      </span>
                      <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-neutral-900 border-gray-800">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/admin/publications">
              <Button className="w-full bg-blue-950/30 hover:bg-blue-900/40 text-blue-500 border border-blue-900/50">
                <BookOpen className="mr-2 h-4 w-4" />
                Add Publication
              </Button>
            </Link>
            <Link to="/admin/blogs">
              <Button className="w-full bg-purple-950/30 hover:bg-purple-900/40 text-purple-500 border border-purple-900/50">
                <FileText className="mr-2 h-4 w-4" />
                Write Blog Post
              </Button>
            </Link>
            <Link to="/admin/certifications">
              <Button className="w-full bg-yellow-950/30 hover:bg-yellow-900/40 text-yellow-500 border border-yellow-900/50">
                <Award className="mr-2 h-4 w-4" />
                Add Certification
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button className="w-full bg-red-950/30 hover:bg-red-900/40 text-red-500 border border-red-900/50">
                <Settings className="mr-2 h-4 w-4" />
                Site Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;