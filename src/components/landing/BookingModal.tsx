import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2 } from 'lucide-react';
import { Service, Barber } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  barbers: Barber[];
  onConfirm: (data: {
    clientName: string;
    clientPhone: string;
    serviceId: string;
    barberId: string;
    date: string;
    time: string;
    totalPrice: number;
    type: 'online';
    status: 'confirmed';
  }) => Promise<void>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  barbers,
  onConfirm
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service>(services[0] || {});
  const [selectedBarber, setSelectedBarber] = useState<Barber>(barbers[0] || {});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !selectedService.id) return alert('Selecione um serviço');
    if (step === 2 && !selectedBarber.id) return alert('Selecione um barbeiro');
    if (step === 3 && (!date || !time)) return alert('Selecione data e horário');
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Preencha seu nome e telefone.');
      return;
    }

    setLoading(true);
    try {
      await onConfirm({
        clientName,
        clientPhone,
        serviceId: selectedService.id,
        barberId: selectedBarber.id,
        date,
        time,
        totalPrice: selectedService.price,
        type: 'online',
        status: 'confirmed'
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Erro ao confirmar agendamento.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccess(false);
    setClientName('');
    setClientPhone('');
    onClose();
  };

  const availableTimes = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h3 className="text-lg font-bold text-white">
            {success ? 'Agendamento Confirmado!' : `Agendar Atendimento (Passo ${step}/4)`}
          </h3>
          <button onClick={resetAndClose} className="p-2 text-zinc-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Tudo pronto, {clientName}!</h4>
              <p className="text-sm text-zinc-400">
                Seu horário para <span className="text-white font-semibold">{selectedService.name}</span> foi confirmado com <span className="text-white font-semibold">{selectedBarber.name}</span> no dia {date} às {time}.
              </p>
              <button
                onClick={resetAndClose}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition"
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-300">Escolha o Serviço</label>
                  <div className="grid gap-3">
                    {services.map(s => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          selectedService.id === s.id
                            ? 'border-red-600 bg-red-600/10'
                            : 'border-zinc-800 bg-[#18181b] hover:border-zinc-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-white">{s.name}</p>
                          <p className="text-xs text-zinc-400">{s.durationMinutes} min</p>
                        </div>
                        <span className="font-bold text-red-500">R$ {s.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-300">Escolha o Profissional</label>
                  <div className="grid gap-3">
                    {barbers.map(b => (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBarber(b)}
                        className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-4 ${
                          selectedBarber.id === b.id
                            ? 'border-red-600 bg-red-600/10'
                            : 'border-zinc-800 bg-[#18181b] hover:border-zinc-700'
                        }`}
                      >
                        <img src={b.avatar} alt={b.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-white">{b.name}</p>
                          <p className="text-xs text-zinc-400">{b.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-red-500" /> Data do Atendimento
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-4 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" /> Horários Disponíveis
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`py-2 rounded-xl text-sm font-semibold border transition ${
                            time === t
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-red-500" /> Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Silva"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-red-500" /> Telefone / WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="(11) 99999-9999"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    className="px-5 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white transition"
                  >
                    Voltar
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition disabled:opacity-50"
                  >
                    {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};