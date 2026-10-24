import React, { useState } from 'react';
import { Clock, Check, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { HolidayPackage, HOLIDAY_PACKAGES } from '../data/travelData';

interface PackagesSectionProps {
  onSelectPackage: (pkg: HolidayPackage) => void;
  onRequestPackageQuote: (packageName: string) => void;
  filterType?: 'All' | 'International' | 'Domestic';
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
  onRequestPackageQuote,
  filterType = 'All',
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'International' | 'Domestic'>(filterType);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredPackages = HOLIDAY_PACKAGES.filter((pkg) => {
    if (activeFilter !== 'All' && pkg.type !== activeFilter) return false;
    if (categoryFilter !== 'All' && pkg.category !== categoryFilter) return false;
    return true;
  });

  return (
    <section id="holiday-packages-section" className="py-20 bg-[#F0F7FF] border-y border-blue-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailor-Made Vacation Plans</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              Featured Holiday Packages
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl">
              Curated itineraries designed with handpicked 4-star hotels, guided sightseeing, and flexible pacing. All prices and inclusions are customizable upon request.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setActiveFilter('All')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeFilter === 'All'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Packages
              </button>
              <button
                onClick={() => setActiveFilter('International')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeFilter === 'International'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                International
              </button>
              <button
                onClick={() => setActiveFilter('Domestic')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeFilter === 'Domestic'
                    ? 'bg-[#0B1B3D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Domestic
              </button>
            </div>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Package Image & Tag Strip */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Duration & Category pill overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#FF7A00]" />
                    <span>{pkg.duration}</span>
                  </span>
                  <span className="bg-[#0B1B3D]/80 backdrop-blur-xs text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {pkg.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-medium text-slate-300 block">
                    {pkg.destination}, {pkg.country}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-snug drop-shadow-xs line-clamp-1">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {pkg.overview}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Highlights
                    </span>
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Inclusions Preview */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-5">
                    <span className="text-[11px] font-bold text-slate-600 block mb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Package Inclusions</span>
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-500">
                      <span>4★ Hotels</span>
                      <span>·</span>
                      <span>Daily Breakfast</span>
                      <span>·</span>
                      <span>Private Transfers</span>
                      <span>·</span>
                      <span>Sightseeing Tours</span>
                    </div>
                  </div>

                  {/* Demo Price Placeholder notice */}
                  <div className="text-xs font-semibold text-slate-900 bg-amber-50/70 border border-amber-200/60 rounded-lg px-3 py-2 text-center text-[11px]">
                    <span className="text-amber-800 font-bold block">{pkg.pricePlaceholder}</span>
                    <span className="text-slate-400 text-[10px] font-normal">Pricing based on travel dates & group size</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B1B3D] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Get Package Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestPackageQuote(pkg.title)}
                    className="py-2.5 px-3.5 rounded-xl text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E65C00] shadow-xs transition-colors whitespace-nowrap"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
