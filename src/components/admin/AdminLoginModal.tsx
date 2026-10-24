import React, { useState } from 'react';
import { Lock, ShieldCheck, X, ArrowRight, KeyRound, AlertCircle } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { adminLogin } = useTravel();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      setError(false);
      setPassword('');
      onLoginSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    adminLogin('flymego2026');
    setError(false);
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#0B1B3D] text-[#FF7A00] flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-950/20">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0B1B3D]">
            Flymego Admin Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to manage holiday leads, flight enquiries, packages, destinations, promotions, and hiring.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Invalid admin password. Try <strong>flymego</strong> or use one-click demo login below.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter admin password (e.g. flymego)"
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Log In to Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center space-y-2">
          <span className="text-[11px] text-slate-400 block">Instant Access for Reviewers:</span>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B1B3D] bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>One-Click Demo Administrator Access</span>
          </button>
          <p className="text-[10px] text-slate-400">
            Demo passwords: <code className="bg-slate-100 px-1 py-0.5 rounded">flymego</code> or <code className="bg-slate-100 px-1 py-0.5 rounded">flymego2026</code>
          </p>
        </div>
      </div>
    </div>
  );
};
