import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/travelData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenPlanMyTrip: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenPlanMyTrip }) => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple & Transparent</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Planning your dream holiday with Flymego Tours is simple, transparent, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-3xl font-black text-[#FF6B00]/30 block mb-2">
                  {step.step}
                </span>
                <h3 className="font-display text-base font-bold text-[#0B1B3D] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 text-slate-300">
                  <ArrowRight className="w-6 h-6 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenPlanMyTrip}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0B1B3D] hover:bg-[#1E3A8A] transition-colors shadow-sm"
          >
            <span>Start Step 1: Share Your Travel Plans</span>
            <ArrowRight className="w-4 h-4 text-[#FF7A00]" />
          </button>
        </div>
      </div>
    </section>
  );
};
