import React, { useState } from 'react';
import { Appointment, Service, Barber } from '../../types';
import { Calendar as CalendarIcon, Clock, Phone, User, Play, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface AgendaViewProps {
  appointments: Appointment[];
  services: Service[];
  barbers: Barber[];
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
  onDelete: (id: string) => void;
  onOpenWalkIn: () => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  appointments,
  services,
  barbers,
  onUpdateStatus,
  onDelete,
  onOpenWalkIn
}) => {
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  const filtered = appointments.filter(a => a.date === filterDate);

  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || 'Serviço';
  const getBarberName = (id: string) => barbers.find(b => b.id === id)?.name || 'Barbeiro';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#121216] border border-zinc-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white">Agenda de Atendimentos</h2>
          <p className="text-xs text-zinc-400">Gerencie os horários marcados e clientes presenciais.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
          />
          <button
            onClick={onOpenWalkIn}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl transition"
          >
            + Atendimento
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="bg-[#121216] border border-zinc-800 p-12 rounded-2xl text-center space-y-3">
            <CalendarIcon className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 font-medium">Nenhum agendamento para esta data.</p>
          </div>
        ) : (
          filtered.map(app => (
            <div key={app.id} className="bg-[#121216] border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-red-600/10 text-red-500 text-xs font-bold rounded-lg border border-red-600/20">
                    {app.time}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    app.type === 'walk_in' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {app.type === 'walk_in' ? 'Presencial (Balcão)' : 'Online'}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    app.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                    app.status === 'in_progress' ? 'bg-amber-500/10 text-amber-500' :
                    app.status === 'completed' ? 'bg-zinc-700 text-zinc-300' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {app.status === 'confirmed' ? 'Confirmado' : app.status === 'in_progress' ? 'Em Andamento' : app.status === 'completed' ? 'Concluído' : 'Cancelado'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{app.clientName}</h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {app.clientPhone}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-red-500" /> {getBarberName(app.barberId)}</span>
                    <span className="text-white font-semibold">{getServiceName(app.serviceId)}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                {app.status === 'confirmed' && (
                  <button
                    onClick={() => onUpdateStatus(app.id, 'in_progress')}
                    className="p-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl transition title='Iniciar Atendimento'"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                {(app.status === 'confirmed' || app.status === 'in_progress') && (
                  <button
                    onClick={() => onUpdateStatus(app.id, 'completed')}
                    className="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(app.id)}
                  className="p-2.5 bg-zinc-800 hover:bg-red-500/20 hover:text-red-500 text-zinc-400 rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgendaView;