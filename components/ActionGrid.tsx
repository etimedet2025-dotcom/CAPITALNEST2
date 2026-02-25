
import React from 'react';
import { ACTIONS, ICON_MAP } from '../constants';
import { AppView } from '../types';

interface ActionGridProps {
  onNavigate: (view: AppView) => void;
}

export const ActionGrid: React.FC<ActionGridProps> = ({ onNavigate }) => {
  const handleAction = (id: AppView) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
    onNavigate(id);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {ACTIONS.map((action) => {
        const Icon = ICON_MAP[action.icon];
        return (
          <button
            key={action.id}
            onClick={() => handleAction(action.id)}
            className="glass-card p-5 rounded-[32px] flex flex-col gap-4 text-left transition-all active:scale-[0.96] duration-200 hover:shadow-xl group"
          >
            <div className="w-12 h-12 bg-blue-500/10 dark:bg-white/5 rounded-2xl flex items-center justify-center text-blue-600 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <Icon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{action.label}</div>
              <div className="text-[9px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-wider mt-1">{action.description}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
