
import React from 'react';
import { Home, PieChart, Briefcase, User } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Home', view: 'home' as AppView },
    { icon: PieChart, label: 'Portfolio', view: 'portfolio' as AppView },
    { icon: Briefcase, label: 'Invest', view: 'invest' as AppView },
    { icon: User, label: 'Profile', view: 'profile' as AppView },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-2 pointer-events-none">
      <nav className="mx-auto max-w-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[40px] p-2 flex justify-around items-center pointer-events-auto shadow-2xl shadow-blue-500/10 transition-all">
        {navItems.map((item, idx) => {
          const isActive = activeView === item.view;
          return (
            <button 
              key={idx} 
              onClick={() => onNavigate(item.view)}
              className={`relative flex flex-col items-center gap-1.5 py-3 px-5 transition-all active:scale-90 ${isActive ? 'text-blue-600 dark:text-white' : 'text-slate-400 dark:text-white/40'}`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-white/10 rounded-3xl animate-in fade-in zoom-in-95 duration-300"></div>
              )}
              <item.icon size={20} strokeWidth={isActive ? 3 : 2} className="relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-widest relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
