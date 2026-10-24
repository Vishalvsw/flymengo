import React, { useState } from 'react';
import { X, Clock, Calendar, Check, AlertCircle, ShieldCheck, MapPin, Send, ArrowRight } from 'lucide-react';
import { HolidayPackage } from '../data/travelData';

interface PackageDetailModalProps {
  packageData: HolidayPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestPackageQuote: (packageName: string) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  packageData,
  isOpen,
  onClose,
  onRequestPackageQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions'>('itinerary');

  if (!isOpen || !packageData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-6 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero banner */}
        <div className="relative h-60 sm:h-64 w-full shrink-0 bg-slate-900">
          <img
            src={packageData.image}
            alt={packageData.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/50 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
              <span className="bg-[#FF6B00] px-2.5 py-0.5 rounded-md text-white">
                {packageData.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                {packageData.category}
              </span>
              <span className="text-slate-300">· {packageData.destination}, {packageData.country}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              {packageData.title}
            </h2>
          </div>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'itinerary'
                ? 'border-[#FF6B00] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Day-by-Day Itinerary ({packageData.itinerary.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'inclusions'
                ? 'border-[#FF6B00] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Inclusions & Exclusions
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                {packageData.overview}
              </p>

              <div className="space-y-4">
                {packageData.itinerary.map((day) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#0B1B3D] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                        {day.day}
                      </div>
                      <div className="w-0.5 h-full bg-slate-200 my-1 grow" />
                    </div>

                    <div className="pb-4">
                      <h4 className="font-display text-sm font-bold text-[#0B1B3D]">
                        Day {day.day}: {day.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {day.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-display text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Package Inclusions (Covered)</span>
                </h4>
                <div className="space-y-2">
                  {packageData.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Exclusions (Not Included)</span>
                </h4>
                <div className="space-y-2">
                  {packageData.exclusions.map((exc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-rose-500 font-bold shrink-0">✕</span>
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Price notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
            <span className="font-bold text-amber-900 block">Indicative Tariff:</span>
            <span className="text-slate-700 font-semibold">{packageData.pricePlaceholder}</span>
            <span className="block text-[11px] text-amber-800 mt-0.5">
              Exact package cost varies based on your travel dates, flight availability, and selected hotel category.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>Need customization for flights or hotel upgrade?</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestPackageQuote(packageData.title);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 whitespace-nowrap"
          >
            Get Custom Quote for This Package
          </button>
        </div>
      </div>
    </div>
  );
};
