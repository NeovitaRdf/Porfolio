import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { testimonialsAPI } from '../../services/api';
import { Loader2, CheckCircle, Trash2, Star } from 'lucide-react';

const ManageTestimonials = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll(false);
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load testimonials', variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await testimonialsAPI.update(id, { approved: true });
      toast({ title: 'Success!', description: 'Testimonial approved' });
      fetchTestimonials();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to approve', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      toast({ title: 'Success!', description: 'Testimonial deleted' });
      fetchTestimonials();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-red-500" /></div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Manage Testimonials</h1>
        <p className="text-gray-400">{testimonials.length} testimonials</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((test) => (
          <Card key={test.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                {test.imageUrl && <img src={test.imageUrl} alt={test.name} className="w-16 h-16 rounded-full object-cover" />}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{test.name}</h3>
                      <p className="text-sm text-gray-400">{test.position}</p>
                    </div>
                    {test.approved && <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">Approved</span>}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(test.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{test.content}</p>
              <div className="flex gap-2">
                {!test.approved && <Button size="sm" onClick={() => handleApprove(test.id)} className="bg-green-700 hover:bg-green-800 text-white"><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>}
                <Button size="sm" variant="outline" onClick={() => handleDelete(test.id)} className="border-red-700 text-red-500 hover:bg-red-950/30"><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageTestimonials;