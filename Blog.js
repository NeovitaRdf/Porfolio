import React, { useState, useEffect } from 'react';
import { blogsAPI } from '../services/api';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await blogsAPI.getAll({ published: true });
        setBlogs(res.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    };
    fetch();
  }, []);

  const categories = ['all', ...new Set(blogs.map(b => b.category))];
  const featuredBlog = blogs.find(b => b.featured);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-black">
      {featuredBlog && (
        <section className="relative bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 opacity-20"><img src={featuredBlog.imageUrl} alt="" className="w-full h-full object-cover" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <span className="inline-block text-red-500 font-semibold text-sm uppercase tracking-wider bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 mb-6">Featured Article</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">{featuredBlog.title}</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">{featuredBlog.excerpt}</p>
            <div className="flex items-center gap-6 text-gray-400 mb-8">
              <span className="flex items-center"><Calendar className="h-5 w-5 mr-2 text-red-500" />{new Date(featuredBlog.publishedDate).toLocaleDateString()}</span>
              <span className="flex items-center"><Clock className="h-5 w-5 mr-2 text-red-500" />{featuredBlog.readTime}</span>
              <span className="text-red-500 font-semibold">{featuredBlog.category}</span>
            </div>
            <Button className="bg-red-700 hover:bg-red-800 text-white">Read Article <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </section>
      )}

      <section className="py-8 px-6 bg-neutral-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input type="text" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-black border-gray-800 text-white placeholder-gray-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(cat => <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? 'bg-red-700 hover:bg-red-800 text-white' : 'border-gray-700 text-gray-300 hover:bg-white/10'}>{cat === 'all' ? 'All' : cat}</Button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-gray-400">Showing {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm mb-3">
                    <span className="text-red-500 font-semibold">{blog.category}</span><span className="text-gray-500">•</span>
                    <span className="text-gray-400 flex items-center"><Clock className="h-3 w-3 mr-1" />{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-sm text-gray-500">{new Date(blog.publishedDate).toLocaleDateString()}</span>
                    <Button variant="link" className="text-red-500 hover:text-red-400 p-0">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
