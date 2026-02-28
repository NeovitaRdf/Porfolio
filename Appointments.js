import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, FileText } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { appointmentsAPI } from '../services/api';

const Appointments = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const appointmentTypes = [
    'Initial Consultation',
    'Follow-up',
    'Forensic Evaluation',
    'Medication Review',
    'Therapy Session'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await appointmentsAPI.create(formData);
      toast({
        title: 'Appointment Request Submitted!',
        description: 'Your appointment request has been received. You will receive a confirmation email shortly.',
      });
      setFormData({
        patientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        type: '',
        notes: ''
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit appointment request. Please try again.',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-900 to-black py-20 px-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block p-4 bg-red-950/30 rounded-3xl mb-6">
            <CalendarIcon className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Book an Appointment</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Schedule a consultation with Dr. Rocco de Filippis. Please fill out the form below and we'll confirm your appointment.
          </p>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-neutral-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <CalendarIcon className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-400 text-sm">Choose from available time slots that fit your schedule</p>
              </CardContent>
            </Card>
            <Card className="bg-neutral-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Quick Confirmation</h3>
                <p className="text-gray-400 text-sm">Receive confirmation within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="bg-neutral-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <User className="h-10 w-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Professional Care</h3>
                <p className="text-gray-400 text-sm">Expert psychiatric consultation and treatment</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-neutral-900 border-gray-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Appointment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="patientName" className="block text-white font-medium mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2 text-red-500" />
                      Full Name *
                    </label>
                    <Input
                      id="patientName"
                      name="patientName"
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="bg-black border-gray-800 text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-red-500" />
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-black border-gray-800 text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-red-500" />
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="bg-black border-gray-800 text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-white font-medium mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-red-500" />
                      Appointment Type *
                    </label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})} required>
                      <SelectTrigger className="bg-black border-gray-800 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-gray-800">
                        {appointmentTypes.map(type => (
                          <SelectItem key={type} value={type} className="text-white hover:bg-gray-800">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-white font-medium mb-2 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-red-500" />
                      Preferred Date *
                    </label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={getTomorrowDate()}
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-black border-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-white font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-red-500" />
                      Preferred Time *
                    </label>
                    <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})} required>
                      <SelectTrigger className="bg-black border-gray-800 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-gray-800">
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time} className="text-white hover:bg-gray-800">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-white font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-red-500" />
                    Additional Notes
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Please provide any relevant information about your appointment..."
                    rows={4}
                    className="bg-black border-gray-800 text-white placeholder-gray-500 resize-none"
                  />
                </div>

                <div className="bg-black border border-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Note:</strong> This is a request form. Your appointment will be confirmed via email 
                    within 24 hours. For urgent matters, please call {' '}
                    <a href="tel:+33749121443" className="text-red-500 hover:underline">+33(0)749121443</a>
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-red-700 hover:bg-red-800 text-white py-6 text-lg font-semibold"
                >
                  {loading ? 'Submitting...' : 'Request Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Appointments;