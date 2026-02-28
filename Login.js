import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message || 'Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">RDF</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Sign in to access your dashboard</p>
        </div>

        <Card className="bg-neutral-900 border-gray-800">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-950/30 border border-red-900 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-red-500" />
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="droccod@gmail.com"
                  className="bg-black border-gray-800 text-white placeholder-gray-500"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-red-500" />
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-black border-gray-800 text-white placeholder-gray-500"
                  autoComplete="current-password"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 text-white py-6 text-lg font-semibold"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-black border border-gray-800 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">
                <strong className="text-white">Demo Credentials:</strong>
              </p>
              <p className="text-gray-500 text-xs font-mono">
                Email: droccod@gmail.com<br />
                Password: admin123
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-red-500 text-sm transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;