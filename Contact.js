import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { contactsAPI, profileAPI } from '../services/api';

const Contact = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await profileAPI.get();
        setProfile(res.data);
      } catch (error) { console.error(error); }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactsAPI.create(formData);
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I will get back to you soon.',
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  if (!profile) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a question or want to schedule a consultation? I'm here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Feel free to reach out through any of the following channels. I typically respond within 24-48 hours.
              </p>
              
              <div className="space-y-6 mb-8">
                <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-950/30 rounded-xl group-hover:bg-red-900/40 transition-colors">
                        <Phone className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Phone</h3>
                        <p className="text-gray-400">{profile.phone}</p>
                        {profile.alternatePhone && <p className="text-gray-400 text-sm">{profile.alternatePhone}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-950/30 rounded-xl group-hover:bg-red-900/40 transition-colors">
                        <Mail className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email</h3>
                        <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-red-500 transition-colors">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-950/30 rounded-xl group-hover:bg-red-900/40 transition-colors">
                        <MapPin className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Address</h3>
                        <p className="text-gray-400">{profile.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {profile.linkedin && (
                  <Card className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-red-950/30 rounded-xl group-hover:bg-red-900/40 transition-colors">
                          <Linkedin className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
                          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                            Connect on LinkedIn
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="bg-neutral-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">Office Hours</h3>
                <div className="space-y-2 text-gray-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="bg-neutral-900 border-gray-800">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">Full Name *</label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-black border-gray-800 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">Email Address *</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-black border-gray-800 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 6 12 34 56 78"
                        className="bg-black border-gray-800 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white font-medium mb-2">Subject *</label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can I help you?"
                        className="bg-black border-gray-800 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-white font-medium mb-2">Message *</label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me more about your inquiry..."
                        rows={5}
                        className="bg-black border-gray-800 text-white placeholder-gray-500 resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-red-700 hover:bg-red-800 text-white py-6 text-lg font-semibold"
                    >
                      {loading ? 'Sending...' : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;