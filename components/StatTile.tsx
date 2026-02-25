
import React from 'react';
import { ICON_MAP } from '../constants';
import { FinancialStat } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatTile: React.FC<{ stat: FinancialStat }> = ({ stat }) => {
  const Icon = ICON_MAP[stat.icon];
  
  const handlePress = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(10);
  };
  
  return (
    <div 
      onClick={handlePress}
      className="glass-card p-5 rounded-[32px] flex flex-col justify-between h-36 transition-all active:scale-95 duration-200 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-2xl bg-slate-500/5 dark:bg-white/5 ${stat.color}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black tracking-wider ${stat.trend >= 0 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
          {stat.trend >= 0 ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
          {Math.abs(stat.trend)}%
        </div>
      </div>
      <div>
        <div className="text-slate-400 dark:text-white/40 text-[9px] font-black uppercase tracking-[0.15em] mb-1">{stat.label}</div>
        <div className="text-slate-900 dark:text-white text-xl font-black tracking-tight">{stat.value}</div>
      </div>
    </div>
  );
};
