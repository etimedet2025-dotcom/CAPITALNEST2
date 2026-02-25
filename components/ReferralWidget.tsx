
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const ReferralWidget: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "capitalnest.io/ref/ALEX88";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card mt-6 p-5 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full"></div>
      <div className="relative z-10">
        <div className="text-[10px] font-black text-blue-500 dark:text-blue-400 mb-1 uppercase tracking-[0.2em]">Rewards Program</div>
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 tracking-tight">Invite Friends & Earn</h3>
        <div className="flex items-center gap-3 bg-slate-500/5 dark:bg-white/5 p-3 rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="text-sm text-slate-500 dark:text-white/60 font-mono truncate flex-1">{referralLink}</div>
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-xl transition-all active:scale-90 ${copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};