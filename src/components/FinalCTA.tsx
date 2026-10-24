import React from 'react';
import { Compass, PhoneCall, Sparkles } from 'lucide-react';
import { ActiveTab } from './Header';

interface FinalCTAProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPlanMyTrip: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ setActiveTab, onOpenPlanMyTrip }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07152E] via-[#0B1B3D] to-[#0D2554] text-white py-20">
      {/* Decorative subtle ambient ring */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FF9E40] text-xs font-semibold backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
          <span>Flymego Tours Travel Consultancy</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" style={{ textWrap: 'balance' }}>
          Let's Plan Your Next Journey
        </h2>

        <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl mx-auto leading-relaxed">
          Tell us where you want to go, and our team will help you explore your options.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenPlanMyTrip}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>Plan My Trip</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#FF7A00]" />
            <span>Contact Flymego Tours</span>
          </button>
        </div>
      </div>
    </section>
  );
};
