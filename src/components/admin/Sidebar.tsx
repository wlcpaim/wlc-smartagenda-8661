import React from 'react';
import { Calendar, BarChart3, Settings, Scissors, LogOut } from 'lucide-react';

interface SidebarProps {
  currentTab: 'agenda' | 'metrics' | 'settings';
  setCurrentTab: (tab: 'agenda' | 'metrics' | 'settings') => void;
  onOpenWalkIn?: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, onOpenWalkIn, onLogout }) => {
  return (
    <aside className="w-full md:w-64 bg-[#121216] border-r border-zinc-800 flex flex-col justify-between p-6 shrink-0">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
            <Scissors className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold text-white">Smart<span className="text-red-500">Agenda</span></span>
        </div>

        {onOpenWalkIn && (
          <button
            onClick={onOpenWalkIn}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
          >
            + Novo Atendimento
          </button>
        )}

        <nav className="space-y-1">
          <button
            onClick={() => setCurrentTab('agenda')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              currentTab === 'agenda'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Calendar className="w-4 h-4" /> Agenda
          </button>
          <button
            onClick={() => setCurrentTab('metrics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              currentTab === 'metrics'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Métricas
          </button>
          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              currentTab === 'settings'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Settings className="w-4 h-4" /> Configurações
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-zinc-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition"
        >
          <LogOut className="w-4 h-4" /> Sair do Painel
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;