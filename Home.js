import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Award, Calendar, Mail, Brain, Microscope, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { profileAPI, publicationsAPI, blogsAPI, statsAPI } from '../services/api';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [featuredPublications, setFeaturedPublications] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, statsRes, pubsRes, blogsRes] = await Promise.all([
        profileAPI.get(),
        statsAPI.get(),
        publicationsAPI.getAll({ featured: true }),
        blogsAPI.getAll({ featured: true })
      ]);
      
      setProfile(profileRes.data);
      setStats(statsRes.data);
      setFeaturedPublications(pubsRes.data.slice(0, 3));
      setFeaturedBlogs(blogsRes.data.slice(0, 2));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading || !profile || !stats) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-950 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                  Psychiatrist & Neuroscientist
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {profile.name}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {profile.title}
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                {profile.bio}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/appointments">
                  <Button className="bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-900/30">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/publications">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 text-lg transition-all duration-300">
                    <BookOpen className="mr-2 h-5 w-5" />
                    View Research
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-3xl blur-2xl"></div>
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border border-gray-800 transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group transition-transform duration-300 hover:scale-110">
              <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-3 group-hover:bg-red-900/40 transition-colors">
                <BookOpen className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.totalPublications}+</div>
              <div className="text-gray-400">Publications</div>
            </div>
            <div className="text-center group transition-transform duration-300 hover:scale-110">
              <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-3 group-hover:bg-red-900/40 transition-colors">
                <TrendingUp className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.totalCitations}+</div>
              <div className="text-gray-400">Citations</div>
            </div>
            <div className="text-center group transition-transform duration-300 hover:scale-110">
              <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-3 group-hover:bg-red-900/40 transition-colors">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.currentPositions}+</div>
              <div className="text-gray-400">Current Positions</div>
            </div>
            <div className="text-center group transition-transform duration-300 hover:scale-110">
              <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-3 group-hover:bg-red-900/40 transition-colors">
                <Award className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stats.certifications}+</div>
              <div className="text-gray-400">Certifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Areas of Expertise</h2>
            <p className="text-xl text-gray-400">Specialized clinical and research focus</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 group">
              <CardContent className="p-8">
                <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-6 group-hover:bg-red-900/40 transition-colors">
                  <Brain className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mood Disorders</h3>
                <p className="text-gray-400 leading-relaxed">
                  Expert treatment of depression, bipolar disorder, and treatment-resistant conditions using evidence-based and innovative approaches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 group">
              <CardContent className="p-8">
                <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-6 group-hover:bg-red-900/40 transition-colors">
                  <Microscope className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Clinical Research</h3>
                <p className="text-gray-400 leading-relaxed">
                  Leading research in psychopharmacology, neuroplasticity, and the integration of AI technologies in mental health care.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 group">
              <CardContent className="p-8">
                <div className="inline-block p-4 bg-red-950/30 rounded-2xl mb-6 group-hover:bg-red-900/40 transition-colors">
                  <Award className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Forensic Psychiatry</h3>
                <p className="text-gray-400 leading-relaxed">
                  Comprehensive forensic evaluations, expert witness testimony, and technical consultations in legal proceedings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-20 bg-neutral-900 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Featured Research</h2>
              <p className="text-gray-400">Recent publications and studies</p>
            </div>
            <Link to="/publications">
              <Button variant="outline" className="border-gray-700 text-white hover:bg-white/10">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPublications.map((pub) => (
              <Card key={pub.id} className="bg-black border-gray-800 hover:border-red-900 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 group">
                <CardContent className="p-6">
                  <div className="text-sm text-red-500 font-semibold mb-3">{pub.journal} • {pub.year}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">{pub.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{pub.abstract}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{pub.citations} citations</span>
                    <span className="text-red-500 font-semibold">{pub.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-20 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Latest Insights</h2>
              <p className="text-gray-400">Thoughts on mental health and psychiatry</p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="border-gray-700 text-white hover:bg-white/10">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredBlogs.map((blog) => (
              <Card key={blog.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 overflow-hidden group">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <span className="text-red-500 font-semibold">{blog.category}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(blog.publishedDate).toLocaleDateString()}</span>
                    <Button variant="link" className="text-red-500 hover:text-red-400 p-0">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-950 to-black px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Schedule a Consultation?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Professional psychiatric care with over two decades of clinical excellence and research expertise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/appointments">
              <Button className="bg-white text-red-950 hover:bg-gray-100 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-all duration-300">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;