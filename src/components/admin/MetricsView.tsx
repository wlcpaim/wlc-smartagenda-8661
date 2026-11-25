import React from 'react';
import { Appointment, Service } from '../../types';
import { DollarSign, TrendingUp, Users, Scissors } from 'lucide-react';

interface MetricsViewProps {
  appointments: Appointment[];
  services: Service[];
}

export const MetricsView: React.FC<MetricsViewProps> = ({ appointments, services }) => {
  const completed = appointments.filter(a => a.status === 'completed' || a.status === 'confirmed');
  const totalRevenue = completed.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalAppointments = appointments.length;
  const walkInsCount = appointments.filter(a => a.type === 'walk_in').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Faturamento & Métricas</h2>
        <p className="text-xs text-zinc-400">Acompanhe o desempenho financeiro e fluxo de clientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121216] border border-zinc-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Faturamento Total</span>
            <DollarSign className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-extrabold text-white">R$ {totalRevenue.toFixed(2)}</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +12.5% em relação ao mês anterior
          </div>
        </div>

        <div className="bg-[#121216] border border-zinc-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Total de Agendamentos</span>
            <Users className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalAppointments}</div>
          <div className="text-xs text-zinc-500">Incluindo online e presenciais</div>
        </div>

        <div className="bg-[#121216] border border-zinc-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold">Atendimentos Presenciais</span>
            <Scissors className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-extrabold text-white">{walkInsCount}</div>
          <div className="text-xs text-zinc-500">Balcão / Walk-in rápido</div>
        </div>
      </div>
    </div>
  );
};