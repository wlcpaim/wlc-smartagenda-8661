import React, { useState } from 'react';
import { Appointment, Service, Barber } from '../../types';
import { SERVICES, BARBERS } from '../../services/storage';
import { X, User, Phone, Scissors, Calendar, Clock, DollarSign, Check } from 'lucide-react';

interface WalkInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
}

export default function WalkInModal({ isOpen, onClose, onSave }: WalkInModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [barberId, setBarberId] = useState(BARBERS[0].id);
  const [startNow, setStartNow] = useState(true);
  const [customTime, setCustomTime] = useState(
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  );

  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Informe o nome do cliente');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const timeStr = startNow
      ? new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })
      : customTime;

    const newApp: Appointment = {
      id: 'walk_' + Date.now(),
      clientName,
      clientPhone: clientPhone || '(00) 00000-0000',
      serviceId,
      barberId,
      date: todayStr,
      time: timeStr,
      status: startNow ? 'in_progress' : 'confirmed',
      type: 'walk_in',
      totalPrice: selectedService.price,
    };

    onSave(newApp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121216] border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white">Novo Atendimento Presencial (Walk-In)</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nome do Cliente</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                placeholder="Ex: Carlos Silva"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Telefone / WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Ex: (11) 99999-9999"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Serviço</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
            >
              {SERVICES.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} — R$ {srv.price.toFixed(2)} ({srv.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Barbeiro Responsável</label>
            <select
              value={barberId}
              onChange={(e) => setBarberId(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-red-500"
            >
              {BARBERS.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name} ({barber.specialty})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <div>
              <span className="text-sm font-medium text-white">Iniciar Imediatamente?</span>
              <p className="text-xs text-zinc-400">O status será definido como Em Andamento</p>
            </div>
            <input
              type="checkbox"
              checked={startNow}
              onChange={(e) => setStartNow(e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-red-600/20 transition-all"
            >
              Cadastrar Atendimento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
