import React from 'react';
import { Compass, Globe, Plane, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { TRUST_FEATURES } from '../data/travelData';
import { ActiveTab } from './Header';

interface TrustHighlightsProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPlanMyTrip: () => void;
}

export const TrustHighlights: React.FC<TrustHighlightsProps> = ({ setActiveTab, onOpenPlanMyTrip }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#FF6B00]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-600" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#FF6B00]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-emerald-600" />;
    }
  };

  const handleCardClick = (title: string) => {
    if (title.includes('Flight')) {
      setActiveTab('flights');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (title.includes('Domestic & International')) {
      setActiveTab('packages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onOpenPlanMyTrip();
    }
  };

  return (
    <section className="relative -mt-6 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_FEATURES.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(item.title)}
            className="group bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1B3D] group-hover:text-[#FF6B00] transition-colors flex items-center justify-between">
                <span>{item.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
              <span className="text-slate-400">Consultancy Service</span>
              <span className="text-[#FF6B00] group-hover:underline">Learn more</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
