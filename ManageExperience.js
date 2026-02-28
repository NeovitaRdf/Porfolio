import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { experiencesAPI } from '../../services/api';
import { Plus, Edit, Trash2, Loader2, X, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const ManageExperience = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    position: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    responsibilities: []
  });
  const [responsibilityInput, setResponsibilityInput] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await experiencesAPI.getAll();
      setExperiences(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast({ title: 'Error', description: 'Failed to load experiences', variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'current' && checked ? { endDate: '' } : {})
    }));
  };

  const addResponsibility = () => {
    if (responsibilityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibilityInput.trim()]
      }));
      setResponsibilityInput('');
    }
  };

  const removeResponsibility = (index) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.current ? null : (formData.endDate ? new Date(formData.endDate).toISOString() : null)
      };
      
      if (editingId) {
        await experiencesAPI.update(editingId, data);
        toast({ title: 'Success!', description: 'Experience updated successfully' });
      } else {
        await experiencesAPI.create(data);
        toast({ title: 'Success!', description: 'Experience created successfully' });
      }
      resetForm();
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast({ title: 'Error', description: 'Failed to save experience', variant: 'destructive' });
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      position: exp.position,
      organization: exp.organization,
      location: exp.location,
      startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      current: exp.current,
      description: exp.description,
      responsibilities: exp.responsibilities || []
    });
    setEditingId(exp.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    try {
      await experiencesAPI.delete(id);
      toast({ title: 'Success!', description: 'Experience deleted successfully' });
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({ title: 'Error', description: 'Failed to delete experience', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setFormData({
      position: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      responsibilities: []
    });
    setResponsibilityInput('');
    setEditingId(null);
    setIsModalOpen(false);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Manage Experience</h1>
          <p className="text-gray-400">{experiences.length} positions</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-red-700 hover:bg-red-800 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-6 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-950/30 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                      {exp.current && (
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-gray-300 mb-1">{exp.organization}</p>
                    <p className="text-sm text-gray-500 mb-3">{exp.location}</p>
                    <p className="text-gray-400 text-sm mb-3">{exp.description}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1">
                        {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-500 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(exp)} className="border-gray-700 text-white hover:bg-white/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(exp.id)} className="border-red-700 text-red-500 hover:bg-red-950/30">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-neutral-900 border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl">{editingId ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}><X className="h-4 w-4" /></Button>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="position">Position/Title *</Label>
              <Input id="position" name="position" value={formData.position} onChange={handleChange} required className="bg-black border-gray-800 text-white mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organization">Organization *</Label>
                <Input id="organization" name="organization" value={formData.organization} onChange={handleChange} required className="bg-black border-gray-800 text-white mt-2" />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleChange} required className="bg-black border-gray-800 text-white mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required className="bg-black border-gray-800 text-white mt-2" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} disabled={formData.current} className="bg-black border-gray-800 text-white mt-2" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="current" name="current" checked={formData.current} onChange={handleChange} className="w-4 h-4 text-red-600 bg-black border-gray-800 rounded" />
              <Label htmlFor="current" className="cursor-pointer">Currently working here</Label>
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} className="bg-black border-gray-800 text-white mt-2 resize-none" />
            </div>
            <div>
              <Label>Responsibilities</Label>
              <div className="flex gap-2 mt-2">
                <Input value={responsibilityInput} onChange={(e) => setResponsibilityInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())} placeholder="Add a responsibility" className="bg-black border-gray-800 text-white" />
                <Button type="button" onClick={addResponsibility} className="bg-red-700 hover:bg-red-800"><Plus className="h-4 w-4" /></Button>
              </div>
              {formData.responsibilities.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {formData.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-center justify-between bg-black p-2 rounded border border-gray-800">
                      <span className="text-sm text-gray-300">{resp}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeResponsibility(idx)} className="text-red-500 hover:bg-red-950/30"><X className="h-4 w-4" /></Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={resetForm} className="border-gray-700 text-white hover:bg-white/10">Cancel</Button>
              <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white">{editingId ? 'Update' : 'Create'} Experience</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageExperience;