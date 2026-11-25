import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'landing' | 'admin'>(
    window.location.hash === '#admin' ? 'admin' : 'landing'
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {currentRoute === 'landing' ? <LandingPage /> : <AdminDashboard />}
    </div>
  );
}