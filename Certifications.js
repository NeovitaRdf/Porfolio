import React, { useState, useEffect } from 'react';
import { certificationsAPI } from '../services/api';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await certificationsAPI.getAll();
        setCertifications(res.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block p-4 bg-red-950/30 rounded-3xl mb-6"><Award className="h-16 w-16 text-red-500" /></div>
          <h1 className="text-5xl font-bold text-white mb-4">Certifications & Awards</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Recognition of excellence in clinical practice, research, and contribution to psychiatry.</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <Card key={cert.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-all duration-300 overflow-hidden group">
                {cert.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3"><Calendar className="h-4 w-4 text-red-500" />{new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{cert.title}</h3>
                  <p className="text-gray-300 font-medium mb-3">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{cert.description}</p>
                  {cert.credentialId && <div className="text-xs text-gray-500 mb-4"><span className="font-semibold">Credential ID:</span> {cert.credentialId}</div>}
                  <Button variant="outline" size="sm" className="w-full border-gray-700 text-white hover:bg-white/10"><ExternalLink className="h-4 w-4 mr-2" />View Certificate</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
