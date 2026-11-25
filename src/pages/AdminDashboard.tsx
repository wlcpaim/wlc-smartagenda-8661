import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AgendaView from '../components/admin/AgendaView';
import MetricsView from '../components/admin/MetricsView';
import SettingsView from '../components/admin/SettingsView';
import WalkInModal from '../components/pos/WalkInModal';
import { useAppointments } from '../hooks/useAppointments';
import { Scissors, Plus, Calendar, BarChart3, Settings as SettingsIcon, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<'agenda' | 'metrics' | 'settings'>('agenda');
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const { appointments, addAppointment, updateAppointmentStatus, deleteAppointment, refresh } = useAppointments();

  const handleLogout = () => {
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col md:flex-row">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="border-b border-zinc-800 bg-[#121216]/80 backdrop-blur sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">SmartAgenda <span className="text-red-500">Admin</span></h1>
              <p className="text-xs text-zinc-400">Painel de Gestão e Atendimento Presencial</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWalkInOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-red-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Novo Atendimento</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 max-w-7xl w-full mx-auto flex-1">
          {currentTab === 'agenda' && (
            <AgendaView
              appointments={appointments}
              onUpdateStatus={updateAppointmentStatus}
              onDelete={deleteAppointment}
              onOpenWalkIn={() => setIsWalkInOpen(true)}
            />
          )}
          {currentTab === 'metrics' && <MetricsView appointments={appointments} />}
          {currentTab === 'settings' && <SettingsView />}
        </div>
      </main>

      {isWalkInOpen && (
        <WalkInModal
          isOpen={isWalkInOpen}
          onClose={() => setIsWalkInOpen(false)}
          onSave={(newApp) => {
            addAppointment(newApp);
            setIsWalkInOpen(false);
          }}
        />
      )}
    </div>
  );
}
