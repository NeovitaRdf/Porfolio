import React, { useState, useEffect } from 'react';
import { experiencesAPI } from '../services/api';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await experiencesAPI.getAll();
        setExperiences(res.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    };
    fetch();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Professional Experience</h1>
          <p className="text-xl text-gray-400">Over two decades of clinical practice, research, and academic excellence.</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Current Positions</h2>
          <div className="space-y-6">
            {experiences.filter(e => e.current).map((exp) => (
              <Card key={exp.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors">
                <CardContent className="p-6 flex gap-6">
                  <div className="w-12 h-12 bg-red-950/30 rounded-xl flex items-center justify-center flex-shrink-0"><Briefcase className="h-6 w-6 text-red-500" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">Current</span>
                    </div>
                    <p className="text-lg text-gray-300 mb-1">{exp.organization}</p>
                    <div className="flex gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-1 text-red-500" />{exp.location}</span>
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-red-500" />{formatDate(exp.startDate)} - Present</span>
                    </div>
                    <p className="text-gray-400 mb-3">{exp.description}</p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-500 flex items-start"><span className="text-red-500 mr-2">•</span>{resp}</li>
                        ))}
                      </ul>
                    )}
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

export default Experience;
