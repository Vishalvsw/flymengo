import React, { useState } from 'react';
import { MapPin, ArrowRight, Sparkles, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Destination } from '../data/travelData';
import { useTravel } from '../context/TravelContext';

interface DestinationsSectionProps {
  onSelectDestination: (dest: Destination) => void;
  onRequestQuote: (destinationName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  onRequestQuote,
}) => {
  const { destinations } = useTravel();
  const [filter, setFilter] = useState<'All' | 'International' | 'Domestic'>('All');

  const filteredDestinations = destinations.filter((item) => {
    if (filter === 'All') return true;
    return item.type === filter;
  });

  return (
    <section id="destinations-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Getaways</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              Featured Travel Destinations
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              From exotic island retreats to majestic mountain valleys, explore our most popular holiday consultancy destinations.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/60 self-start md:self-auto">
            <button
              onClick={() => setFilter('All')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'All'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Destinations ({destinations.length})
            </button>
            <button
              onClick={() => setFilter('International')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'International'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              International
            </button>
            <button
              onClick={() => setFilter('Domestic')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === 'Domestic'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Domestic
            </button>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-[#F8FAFC] rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Area */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Unboxed Metadata on Top */}
                <div className="absolute top-3 left-3 text-white text-[11px] font-semibold bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  <span>{dest.type}</span>
                  <span className="mx-1.5 opacity-60">·</span>
                  <span>{dest.country}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display text-2xl font-bold tracking-tight drop-shadow-xs">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 opacity-90">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {dest.description}
                  </p>

                  {/* Quick specs */}
                  <div className="space-y-2 py-3 border-y border-slate-200/60 text-xs text-slate-600 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Recommended Stay:</span>
                      </span>
                      <span className="font-semibold text-slate-800">{dest.durationSuggestion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ideal Season:</span>
                      </span>
                      <span className="font-semibold text-slate-800">{dest.bestTimeToVisit}</span>
                    </div>
                  </div>

                  {/* Highlights list snippet */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Popular Sightseeing
                    </span>
                    <div className="space-y-1.5">
                      {dest.keyHighlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B1B3D] bg-white border border-slate-300 hover:border-[#0B1B3D] hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestQuote(dest.name)}
                    className="py-2.5 px-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-xs transition-all whitespace-nowrap"
                  >
                    Request a Quote
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
