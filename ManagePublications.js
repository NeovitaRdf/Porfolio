import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { publicationsAPI } from '../../services/api';
import { Plus, Edit, Trash2, Loader2, X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const ManagePublications = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [publications, setPublications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    doi: '',
    abstract: '',
    citations: 0,
    category: 'Research Paper',
    pdfUrl: '',
    featured: false
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await publicationsAPI.getAll();
      setPublications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching publications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load publications',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await publicationsAPI.update(editingId, formData);
        toast({ title: 'Success!', description: 'Publication updated successfully' });
      } else {
        await publicationsAPI.create(formData);
        toast({ title: 'Success!', description: 'Publication created successfully' });
      }
      resetForm();
      fetchPublications();
    } catch (error) {
      console.error('Error saving publication:', error);
      toast({
        title: 'Error',
        description: 'Failed to save publication',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (pub) => {
    setFormData({
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: pub.year,
      doi: pub.doi || '',
      abstract: pub.abstract,
      citations: pub.citations,
      category: pub.category,
      pdfUrl: pub.pdfUrl || '',
      featured: pub.featured
    });
    setEditingId(pub.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;
    
    try {
      await publicationsAPI.delete(id);
      toast({ title: 'Success!', description: 'Publication deleted successfully' });
      fetchPublications();
    } catch (error) {
      console.error('Error deleting publication:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete publication',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      authors: '',
      journal: '',
      year: new Date().getFullYear(),
      doi: '',
      abstract: '',
      citations: 0,
      category: 'Research Paper',
      pdfUrl: '',
      featured: false
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Manage Publications</h1>
          <p className="text-gray-400">{publications.length} publications</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-red-700 hover:bg-red-800 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Publication
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search publications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-neutral-900 border-gray-800 text-white"
          />
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPublications.map((pub) => (
          <Card key={pub.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{pub.title}</h3>
                    {pub.featured && (
                      <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-2">{pub.authors}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{pub.journal}</span>
                    <span>•</span>
                    <span>{pub.year}</span>
                    <span>•</span>
                    <span>{pub.citations} citations</span>
                    <span>•</span>
                    <span className="text-red-500">{pub.category}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{pub.abstract}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(pub)}
                    className="border-gray-700 text-white hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(pub.id)}
                    className="border-red-700 text-red-500 hover:bg-red-950/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-neutral-900 border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl">
                {editingId ? 'Edit Publication' : 'Add New Publication'}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-black border-gray-800 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="authors">Authors *</Label>
              <Input
                id="authors"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                required
                placeholder="de Filippis R., et al."
                className="bg-black border-gray-800 text-white mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="journal">Journal *</Label>
                <Input
                  id="journal"
                  name="journal"
                  value={formData.journal}
                  onChange={handleChange}
                  required
                  className="bg-black border-gray-800 text-white mt-2"
                />
              </div>
              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="bg-black border-gray-800 text-white mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-black border-gray-800 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-gray-800">
                    <SelectItem value="Research Paper" className="text-white">Research Paper</SelectItem>
                    <SelectItem value="Review" className="text-white">Review</SelectItem>
                    <SelectItem value="Clinical Guide" className="text-white">Clinical Guide</SelectItem>
                    <SelectItem value="Case Study" className="text-white">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="citations">Citations</Label>
                <Input
                  id="citations"
                  name="citations"
                  type="number"
                  value={formData.citations}
                  onChange={handleChange}
                  className="bg-black border-gray-800 text-white mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="doi">DOI</Label>
              <Input
                id="doi"
                name="doi"
                value={formData.doi}
                onChange={handleChange}
                placeholder="10.xxxx/xxxxx"
                className="bg-black border-gray-800 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="abstract">Abstract *</Label>
              <Textarea
                id="abstract"
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                required
                rows={5}
                className="bg-black border-gray-800 text-white mt-2 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="pdfUrl">PDF URL</Label>
              <Input
                id="pdfUrl"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleChange}
                placeholder="/publications/file.pdf"
                className="bg-black border-gray-800 text-white mt-2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-red-600 bg-black border-gray-800 rounded focus:ring-red-500"
              />
              <Label htmlFor="featured" className="cursor-pointer">Mark as featured</Label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={resetForm} className="border-gray-700 text-white hover:bg-white/10">
                Cancel
              </Button>
              <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white">
                {editingId ? 'Update' : 'Create'} Publication
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePublications;
