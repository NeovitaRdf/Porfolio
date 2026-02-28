import React, { useState, useEffect } from 'react';
import { profileAPI, statsAPI } from '../services/api';
import { Award, BookOpen, Users, Calendar, Linkedin, Mail, Phone, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, statsRes] = await Promise.all([profileAPI.get(), statsAPI.get()]);
      setProfile(profileRes.data);
      setStats(statsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading || !profile || !stats) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={profile.profileImage} alt={profile.name} className="rounded-3xl shadow-2xl w-full h-[600px] object-cover border border-gray-800" />
            </div>
            <div className="space-y-6">
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 inline-block">About Me</span>
              <h1 className="text-5xl font-bold text-white leading-tight">{profile.name}</h1>
              <p className="text-xl text-gray-400">{profile.title}</p>
              <p className="text-gray-400 leading-relaxed">{profile.bio}</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400"><Phone className="h-5 w-5 text-red-500" /><span>{profile.phone}</span></div>
                <div className="flex items-center space-x-3 text-gray-400"><Mail className="h-5 w-5 text-red-500" /><span>{profile.email}</span></div>
                <div className="flex items-center space-x-3 text-gray-400"><Linkedin className="h-5 w-5 text-red-500" /><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">LinkedIn Profile</a></div>
              </div>
              <Button className="bg-red-700 hover:bg-red-800 text-white"><Download className="mr-2 h-4 w-4" />Download CV</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="bg-black border-gray-800 text-center hover:border-red-900 transition-colors">
              <CardContent className="p-6"><BookOpen className="h-10 w-10 text-red-500 mx-auto mb-3" /><div className="text-4xl font-bold text-white mb-2">{stats.totalPublications}+</div><div className="text-gray-400">Publications</div></CardContent>
            </Card>
            <Card className="bg-black border-gray-800 text-center hover:border-red-900 transition-colors">
              <CardContent className="p-6"><Users className="h-10 w-10 text-red-500 mx-auto mb-3" /><div className="text-4xl font-bold text-white mb-2">{stats.currentPositions}+</div><div className="text-gray-400">Active Positions</div></CardContent>
            </Card>
            <Card className="bg-black border-gray-800 text-center hover:border-red-900 transition-colors">
              <CardContent className="p-6"><Award className="h-10 w-10 text-red-500 mx-auto mb-3" /><div className="text-4xl font-bold text-white mb-2">{stats.certifications}+</div><div className="text-gray-400">Certifications</div></CardContent>
            </Card>
            <Card className="bg-black border-gray-800 text-center hover:border-red-900 transition-colors">
              <CardContent className="p-6"><Calendar className="h-10 w-10 text-red-500 mx-auto mb-3" /><div className="text-4xl font-bold text-white mb-2">20+</div><div className="text-gray-400">Years Experience</div></CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">Professional Background</h2>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>{profile.bio}</p>
            <p>Throughout my career, I have maintained a strong focus on forensic psychiatry, addiction treatment, and rehabilitation strategies for vulnerable populations. My clinical work is complemented by extensive research.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
