import React, { useState, useEffect } from 'react';
import { publicationsAPI } from '../services/api';
import { Search, Filter, ExternalLink, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('year');

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await publicationsAPI.getAll();
      setPublications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(publications.map(p => p.category))];
  const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);

  const filteredPublications = publications
    .filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pub.authors.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || pub.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'citations') return b.citations - a.citations;
      return 0;
    });

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Research Publications</h1>
          <p className="text-xl text-gray-400 mb-8">Contributing to the advancement of psychiatric science through rigorous research and clinical studies.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{publications.length}</div>
              <div className="text-gray-400 text-sm">Total Publications</div>
            </div>
            <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{totalCitations}</div>
              <div className="text-gray-400 text-sm">Total Citations</div>
            </div>
            <div className="bg-black border border-gray-800 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">{new Date().getFullYear()}</div>
              <div className="text-gray-400 text-sm">Latest Year</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-6 bg-neutral-900 border-b border-gray-800 sticky top-16 z-40 backdrop-blur-lg bg-neutral-900/95">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input type="text" placeholder="Search publications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-black border-gray-800 text-white placeholder-gray-500" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-black border-gray-800 text-white"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter by category" /></SelectTrigger>
              <SelectContent className="bg-neutral-900 border-gray-800">{categories.map(cat => <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-800">{cat === 'all' ? 'All Categories' : cat}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black border-gray-800 text-white"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent className="bg-neutral-900 border-gray-800"><SelectItem value="year" className="text-white hover:bg-gray-800">Year (Newest)</SelectItem><SelectItem value="citations" className="text-white hover:bg-gray-800">Citations (Most)</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-gray-400">Showing {filteredPublications.length} of {publications.length} publications</div>
          <div className="space-y-6">
            {filteredPublications.map((pub) => (
              <Card key={pub.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">{pub.category}</span>
                        {pub.featured && <span className="text-xs font-semibold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">Featured</span>}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{pub.title}</h3>
                      <p className="text-gray-400 mb-3">{pub.authors}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center"><FileText className="h-4 w-4 mr-1 text-red-500" />{pub.journal}</span><span>•</span><span>{pub.year}</span><span>•</span><span className="flex items-center"><TrendingUp className="h-4 w-4 mr-1 text-red-500" />{pub.citations} citations</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed mb-4">{pub.abstract}</p>
                      <div className="text-sm text-gray-500"><span className="font-semibold">DOI:</span> {pub.doi}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-white/10"><ExternalLink className="h-4 w-4 mr-2" />View Publication</Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10"><FileText className="h-4 w-4 mr-2" />Download PDF</Button>
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

export default Publications;
