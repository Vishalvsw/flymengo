import React from 'react';
import { X, MapPin, Calendar, Clock, CheckCircle2, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Destination } from '../data/travelData';

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (destName: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  onRequestQuote,
}) => {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-6 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header with destination image */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-[11px] font-semibold mb-2">
              <span>{destination.type} Destination</span>
              <span>·</span>
              <span>{destination.country}</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h4 className="font-display text-sm font-bold text-[#0B1B3D] uppercase tracking-wider mb-2">
              About This Destination
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended Stay</span>
                <span className="font-bold text-slate-800">{destination.durationSuggestion}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Season</span>
                <span className="font-bold text-slate-800">{destination.bestTimeToVisit}</span>
              </div>
            </div>
          </div>

          {/* Highlights & Attractions */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-[#0B1B3D] uppercase tracking-wider">
              Must-Visit Highlights & Experiences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {destination.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions tags */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Iconic Sights Included in Itinerary:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {destination.popularAttractions.map((att, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700">
                  {att}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span className="font-semibold text-slate-800 block">Looking for a custom {destination.name} itinerary?</span>
            <span>Hotels, transfers & sightseeing customized to your schedule.</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(destination.name);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 whitespace-nowrap"
          >
            Request a Quote for {destination.name}
          </button>
        </div>
      </div>
    </div>
  );
};
