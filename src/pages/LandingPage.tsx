import React, { useState } from 'react';
import { Scissors, ShieldCheck, Star, Clock, MapPin, Phone, ArrowRight, Calendar } from 'lucide-react';
import { useAppointments } from '../hooks/useAppointments';
import { BookingModal } from '../components/landing/BookingModal';

export const LandingPage: React.FC = () => {
  const { services, barbers, addAppointment } = useAppointments();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/20">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Smart<span className="text-red-500">Agenda</span></span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'admin';
              }}
              className="text-xs font-semibold text-zinc-400 hover:text-white px-3 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 transition"
            >
              Painel Admin
            </a>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-600/20 transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Agendar Horário
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Barbearia Premium & Atendimento Exclusivo
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Estilo e Precisão em <span className="text-red-600">Cada Detalhe</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
              Agende seu horário online em segundos ou venha direto à barbearia. Desfrute de um ambiente moderno com os melhores profissionais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl shadow-xl shadow-red-600/25 transition flex items-center justify-center gap-2 text-base"
              >
                Agendar Agora <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold rounded-2xl transition text-center"
              >
                Conhecer Serviços
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 border-t border-zinc-800 bg-[#0c0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-white">Nossos Serviços</h2>
            <p className="text-zinc-400 text-sm">Escolha o tratamento ideal para o seu visual.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <div key={s.id} className="bg-[#121216] border border-zinc-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{s.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <span className="text-sm text-zinc-400 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-red-500" /> {s.durationMinutes} min
                  </span>
                  <span className="text-lg font-bold text-red-500">R$ {s.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-white">Nossa Equipe</h2>
            <p className="text-zinc-400 text-sm">Profissionais especializados e altamente qualificados.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {barbers.map(b => (
              <div key={b.id} className="bg-[#121216] border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
                <img src={b.avatar} alt={b.name} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-red-600/50 shadow-xl" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{b.name}</h3>
                  <p className="text-xs text-red-500 font-medium">{b.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-[#09090b] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
              <Scissors className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">Smart<span className="text-red-500">Agenda</span></span>
          </div>
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} SmartAgenda. Todos os direitos reservados.</p>
        </div>
      </footer>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        barbers={barbers}
        onConfirm={addAppointment}
      />
    </div>
  );
};