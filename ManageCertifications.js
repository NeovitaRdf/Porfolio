import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { certificationsAPI } from '../../services/api';
import { Plus, Edit, Trash2, Loader2, X, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const ManageCertifications = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [certifications, setCertifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    credentialId: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await certificationsAPI.getAll();
      setCertifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Error', description: 'Failed to load certifications', variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, date: new Date(formData.date).toISOString() };
      if (editingId) {
        await certificationsAPI.update(editingId, data);
        toast({ title: 'Success!', description: 'Certification updated' });
      } else {
        await certificationsAPI.create(data);
        toast({ title: 'Success!', description: 'Certification created' });
      }
      resetForm();
      fetchCertifications();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    }
  };

  const handleEdit = (cert) => {
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date.split('T')[0],
      description: cert.description || '',
      credentialId: cert.credentialId || '',
      imageUrl: cert.imageUrl || ''
    });
    setEditingId(cert.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await certificationsAPI.delete(id);
      toast({ title: 'Success!', description: 'Certification deleted' });
      fetchCertifications();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', issuer: '', date: '', description: '', credentialId: '', imageUrl: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-red-500" /></div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Manage Certifications</h1>
          <p className="text-gray-400">{certifications.length} certifications</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-red-700 hover:bg-red-800 text-white">
          <Plus className="mr-2 h-4 w-4" />Add Certification</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <Card key={cert.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors overflow-hidden">
            {cert.imageUrl && <img src={cert.imageUrl} alt={cert.title} className="w-full h-48 object-cover" />}
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Award className="h-8 w-8 text-red-500 flex-shrink-0" />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(cert)} className="border-gray-700 text-white hover:bg-white/10"><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(cert.id)} className="border-red-700 text-red-500 hover:bg-red-950/30"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{cert.issuer}</p>
              <p className="text-gray-500 text-xs mb-3">{new Date(cert.date).toLocaleDateString()}</p>
              <p className="text-gray-400 text-sm line-clamp-2">{cert.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-neutral-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{editingId ? 'Edit' : 'Add'} Certification</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div><Label>Title *</Label><Input name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="bg-black border-gray-800 text-white mt-2" /></div>
            <div><Label>Issuer *</Label><Input name="issuer" value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} required className="bg-black border-gray-800 text-white mt-2" /></div>
            <div><Label>Date *</Label><Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required className="bg-black border-gray-800 text-white mt-2" /></div>
            <div><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="bg-black border-gray-800 text-white mt-2 resize-none" /></div>
            <div><Label>Credential ID</Label><Input value={formData.credentialId} onChange={(e) => setFormData({...formData, credentialId: e.target.value})} className="bg-black border-gray-800 text-white mt-2" /></div>
            <div><Label>Image URL</Label><Input value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." className="bg-black border-gray-800 text-white mt-2" /></div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={resetForm} className="border-gray-700 text-white hover:bg-white/10">Cancel</Button>
              <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white">{editingId ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCertifications;