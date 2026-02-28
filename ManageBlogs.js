import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { blogsAPI } from '../../services/api';
import { Plus, Edit, Trash2, Loader2, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const ManageBlogs = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', author: 'Dr. Rocco de Filippis', publishedDate: '',
    category: 'Clinical Practice', tags: '', imageUrl: '', readTime: '', featured: false, published: true
  });

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll({ published: false });
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load blogs', variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, publishedDate: new Date(formData.publishedDate).toISOString(), tags: formData.tags.split(',').map(t => t.trim()) };
      if (editingId) {
        await blogsAPI.update(editingId, data);
        toast({ title: 'Success!', description: 'Blog updated' });
      } else {
        await blogsAPI.create(data);
        toast({ title: 'Success!', description: 'Blog created' });
      }
      resetForm(); fetchBlogs();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    }
  };

  const handleEdit = (blog) => {
    setFormData({ ...blog, publishedDate: blog.publishedDate.split('T')[0], tags: blog.tags.join(', ') });
    setEditingId(blog.id); setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try { await blogsAPI.delete(id); toast({ title: 'Success!', description: 'Blog deleted' }); fetchBlogs(); }
    catch (error) { toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' }); }
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', author: 'Dr. Rocco de Filippis', publishedDate: '', category: 'Clinical Practice', tags: '', imageUrl: '', readTime: '', featured: false, published: true });
    setEditingId(null); setIsModalOpen(false);
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-red-500" /></div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div><h1 className="text-4xl font-bold text-white mb-2">Manage Blog Posts</h1><p className="text-gray-400">{blogs.length} posts</p></div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-red-700 hover:bg-red-800 text-white"><Plus className="mr-2 h-4 w-4" />Add Blog Post</Button>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors">
            <CardContent className="p-6 flex gap-6">
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-32 h-32 rounded-lg object-cover flex-shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                  {blog.featured && <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">Featured</span>}
                  {blog.published && <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Published</span>}
                </div>
                <p className="text-gray-400 text-sm mb-2">{blog.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{blog.category}</span><span>•</span><span>{blog.readTime}</span><span>•</span><span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(blog)} className="border-gray-700 text-white hover:bg-white/10"><Edit className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)} className="border-red-700 text-red-500 hover:bg-red-950/30"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-neutral-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl">{editingId ? 'Edit' : 'Create'} Blog Post</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div><Label>Title *</Label><Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="bg-black border-gray-800 text-white mt-2" /></div>
            <div><Label>Excerpt *</Label><Textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required rows={2} className="bg-black border-gray-800 text-white mt-2" /></div>
            <div><Label>Content *</Label><Textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required rows={10} className="bg-black border-gray-800 text-white mt-2" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-black border-gray-800 text-white mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-gray-800">
                    <SelectItem value="Clinical Practice" className="text-white">Clinical Practice</SelectItem>
                    <SelectItem value="Technology" className="text-white">Technology</SelectItem>
                    <SelectItem value="Forensic Psychiatry" className="text-white">Forensic Psychiatry</SelectItem>
                    <SelectItem value="Research" className="text-white">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Read Time</Label><Input value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} placeholder="5 min read" className="bg-black border-gray-800 text-white mt-2" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Publish Date *</Label><Input type="date" value={formData.publishedDate} onChange={(e) => setFormData({...formData, publishedDate: e.target.value})} required className="bg-black border-gray-800 text-white mt-2" /></div>
              <div><Label>Tags (comma-separated)</Label><Input value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="AI, Mental Health" className="bg-black border-gray-800 text-white mt-2" /></div>
            </div>
            <div><Label>Image URL</Label><Input value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." className="bg-black border-gray-800 text-white mt-2" /></div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-red-600 bg-black border-gray-800 rounded" /><Label>Featured</Label></div>
              <div className="flex items-center space-x-2"><input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} className="w-4 h-4 text-red-600 bg-black border-gray-800 rounded" /><Label>Published</Label></div>
            </div>
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

export default ManageBlogs;