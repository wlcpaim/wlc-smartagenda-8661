import { Service, Barber, Appointment } from '../types';

export const INITIAL_SERVICES: Service[] = [
  { id: 's1', name: 'Corte Degradê Clássico', price: 45.00, durationMinutes: 30, description: 'Corte na tesoura e máquina com acabamento impecável.' },
  { id: 's2', name: 'Barba Terapia Completa', price: 40.00, durationMinutes: 30, description: 'Toalha quente, óleos essenciais e navalha afiada.' },
  { id: 's3', name: 'Combo Smart (Corte + Barba)', price: 75.00, durationMinutes: 60, description: 'O pacote completo para o homem moderno.' },
  { id: 's4', name: 'Acabamento / Pézinho', price: 20.00, durationMinutes: 15, description: 'Manutenção rápida do corte e contornos.' }
];

export const INITIAL_BARBERS: Barber[] = [
  { id: 'b1', name: 'Carlos "Blade" Silva', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', specialty: 'Degradê & Navalha' },
  { id: 'b2', name: 'Marcos Vinícius', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', specialty: 'Barba Clássica & Tesoura' },
  { id: 'b3', name: 'Rafael Santos', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80', specialty: 'Estilo Moderno & Coloração' }
];

const APPS_KEY = 'smartagenda_appointments';

export const getServices = (): Service[] => INITIAL_SERVICES;
export const getBarbers = (): Barber[] => INITIAL_BARBERS;

export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem(APPS_KEY);
  if (!data) {
    const mock: Appointment[] = [
      {
        id: 'app_1',
        clientName: 'Lucas Mendonça',
        clientPhone: '(11) 98765-4321',
        serviceId: 's1',
        barberId: 'b1',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        status: 'confirmed',
        type: 'online',
        totalPrice: 45.00
      },
      {
        id: 'app_2',
        clientName: 'Bruno Henrique',
        clientPhone: '(11) 91234-5678',
        serviceId: 's2',
        barberId: 'b2',
        date: new Date().toISOString().split('T')[0],
        time: '15:30',
        status: 'in_progress',
        type: 'walk_in',
        totalPrice: 40.00
      }
    ];
    localStorage.setItem(APPS_KEY, JSON.stringify(mock));
    return mock;
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveAppointments = (apps: Appointment[]): void => {
  localStorage.setItem(APPS_KEY, JSON.stringify(apps));
};