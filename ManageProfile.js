import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { profileAPI } from '../../services/api';
import { User, Save, Loader2 } from 'lucide-react';

const ManageProfile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    phone: '',
    alternatePhone: '',
    email: '',
    address: '',
    linkedin: '',
    researchgate: '',
    profileImage: '',
    cvUrl: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.get();
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await profileAPI.update(profile);
      toast({
        title: 'Success!',
        description: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Manage Profile</h1>
        <p className="text-gray-400">Update your professional profile information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8">
          {/* Profile Image */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="mr-2 h-5 w-5 text-red-500" />
                Profile Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                {profile.profileImage && (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-2 border-red-500"
                  />
                )}
                <div className="flex-1">
                  <Label htmlFor="profileImage" className="text-white">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    value={profile.profileImage}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-2">Enter a direct URL to your profile photo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="title" className="text-white">Professional Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={profile.title}
                    onChange={handleChange}
                    required
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-white">Biography *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-black border-gray-800 text-white mt-2 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alternatePhone" className="text-white">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    name="alternatePhone"
                    value={profile.alternatePhone}
                    onChange={handleChange}
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Links */}
          <Card className="bg-neutral-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Professional Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin" className="text-white">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="researchgate" className="text-white">ResearchGate URL</Label>
                  <Input
                    id="researchgate"
                    name="researchgate"
                    value={profile.researchgate}
                    onChange={handleChange}
                    placeholder="https://researchgate.net/profile/..."
                    className="bg-black border-gray-800 text-white mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cvUrl" className="text-white">CV/Resume URL</Label>
                <Input
                  id="cvUrl"
                  name="cvUrl"
                  value={profile.cvUrl}
                  onChange={handleChange}
                  placeholder="/documents/cv.pdf"
                  className="bg-black border-gray-800 text-white mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={saving}
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-lg"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageProfile;
