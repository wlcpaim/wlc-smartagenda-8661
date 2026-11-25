import { useState, useEffect, useCallback } from 'react';
import { Appointment, Service, Barber } from '../types';
import { getAppointments, saveAppointments, getServices, getBarbers } from '../services/storage';
import { sendTelegramNotification } from '../services/telegram';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);

  const refresh = useCallback(() => {
    setAppointments(getAppointments());
  }, []);

  useEffect(() => {
    setAppointments(getAppointments());
    setServices(getServices());
    setBarbers(getBarbers());
  }, []);

  const addAppointment = async (newApp: Omit<Appointment, 'id'>) => {
    const id = 'app_' + Math.random().toString(36).substr(2, 9);
    const appointment: Appointment = { ...newApp, id };
    const current = getAppointments();
    const updated = [appointment, ...current];
    setAppointments(updated);
    saveAppointments(updated);

    const srv = services.find(s => s.id === appointment.serviceId);
    const brb = barbers.find(b => b.id === appointment.barberId);
    if (srv && brb) {
      await sendTelegramNotification(appointment, srv.name, brb.name);
    }

    return appointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const current = getAppointments();
    const updated = current.map(a => a.id === id ? { ...a, status } : a);
    setAppointments(updated);
    saveAppointments(updated);
  };

  const deleteAppointment = (id: string) => {
    const current = getAppointments();
    const updated = current.filter(a => a.id !== id);
    setAppointments(updated);
    saveAppointments(updated);
  };

  return {
    appointments,
    services,
    barbers,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    refresh
  };
};