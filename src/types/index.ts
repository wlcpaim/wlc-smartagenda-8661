export type Service = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
};

export type Barber = {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
};

export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type AppointmentType = 'online' | 'walk_in';

export type Appointment = {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  barberId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  type: AppointmentType;
  totalPrice: number;
};

export type TelegramSettings = {
  token: string;
  chatId: string;
  enabled: boolean;
};