import React from 'react';
import { Smartphone, Download } from 'lucide-react';

interface PWAInstallButtonProps {
  onClick: () => void;
  variant?: 'header' | 'drawer' | 'floating' | 'badge';
  className?: string;
  isInstalled?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onClick,
  variant = 'header',
  className = '',
  isInstalled = false,
}) => {
  if (isInstalled) {
    return null;
  }

  if (variant === 'header') {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-amber-400 hover:bg-amber-300 transition-all shadow-xs border border-amber-500/30 group ${className}`}
        title="Install Flymego Tours Mobile App / APK"
      >
        <Smartphone className="w-3.5 h-3.5 text-slate-900 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Install App</span>
        <span className="px-1.5 py-0.2 bg-slate-900 text-amber-300 text-[10px] rounded font-mono font-bold uppercase">
          APK
        </span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#1E3A8A] text-white shadow-md font-semibold text-xs transition-transform active:scale-98 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#FF7A00]">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="font-bold text-white leading-tight">Install Mobile App</p>
            <p className="text-[10px] text-slate-300">Android APK & iOS Home Screen</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#FF7A00] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase">
          <Download className="w-3 h-3" />
          <span>Get APK</span>
        </div>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all transform hover:scale-105 border border-amber-300/40 ${className}`}
        aria-label="Install Flymego Mobile App (APK)"
      >
        <Smartphone className="w-4 h-4 text-slate-950" />
        <span>Install App (APK)</span>
      </button>
    );
  }

  // default badge
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-colors ${className}`}
    >
      <Smartphone className="w-3 h-3" />
      <span>Install App</span>
    </button>
  );
};
