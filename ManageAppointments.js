import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { appointmentsAPI } from '../../services/api';
import { Loader2, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const ManageAppointments = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentsAPI.getAll();
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load appointments', variant: 'destructive' });
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await appointmentsAPI.update(id, { status });
      toast({ title: 'Success!', description: `Appointment ${status}` });
      fetchAppointments();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await appointmentsAPI.delete(id);
      toast({ title: 'Success!', description: 'Appointment deleted' });
      fetchAppointments();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-950/30 text-yellow-500 border-yellow-900/50',
      confirmed: 'bg-green-950/30 text-green-500 border-green-900/50',
      completed: 'bg-blue-950/30 text-blue-500 border-blue-900/50',
      cancelled: 'bg-red-950/30 text-red-500 border-red-900/50'
    };
    return styles[status] || styles.pending;
  };

  if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-red-500" /></div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Manage Appointments</h1>
        <p className="text-gray-400">{appointments.length} total appointments</p>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <Card key={apt.id} className="bg-neutral-900 border-gray-800 hover:border-red-900 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{apt.patientName}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(apt.status)}`}>{apt.status}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                    <div><span className="text-gray-500">Email:</span> {apt.email}</div>
                    <div><span className="text-gray-500">Phone:</span> {apt.phone}</div>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-red-500" />{apt.date}</div>
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-red-500" />{apt.time}</div>
                  </div>
                  <div className="mb-3"><span className="text-gray-500 text-sm">Type:</span> <span className="text-white text-sm">{apt.type}</span></div>
                  {apt.notes && <div className="bg-black p-3 rounded border border-gray-800"><span className="text-gray-500 text-sm">Notes:</span><p className="text-gray-400 text-sm mt-1">{apt.notes}</p></div>}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  {apt.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateStatus(apt.id, 'confirmed')} className="bg-green-700 hover:bg-green-800 text-white"><CheckCircle className="h-4 w-4 mr-1" />Confirm</Button>
                      <Button size="sm" variant="outline" onClick={() => updateStatus(apt.id, 'cancelled')} className="border-red-700 text-red-500 hover:bg-red-950/30"><XCircle className="h-4 w-4 mr-1" />Cancel</Button>
                    </>
                  )}
                  {apt.status === 'confirmed' && <Button size="sm" onClick={() => updateStatus(apt.id, 'completed')} className="bg-blue-700 hover:bg-blue-800 text-white">Mark Complete</Button>}
                  <Button size="sm" variant="outline" onClick={() => handleDelete(apt.id)} className="border-gray-700 text-gray-400 hover:bg-white/10">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageAppointments;