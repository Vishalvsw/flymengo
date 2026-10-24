import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Compass, MapPin, Calendar, Users, Shield, Send, Sparkles, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/travelData';

export interface PlanMyTripInitialData {
  destination?: string;
  departureCity?: string;
  travellers?: string;
  packageName?: string;
}

interface HolidayEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: PlanMyTripInitialData;
}

export const HolidayEnquiryModal: React.FC<HolidayEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Dubai');
  const [departureCity, setDepartureCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [budgetRange, setBudgetRange] = useState('₹40,000 - ₹75,000 / person');
  const [travelPreference, setTravelPreference] = useState('Family Holiday');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  useEffect(() => {
    if (initialData) {
      if (initialData.destination) setDestination(initialData.destination);
      if (initialData.departureCity) setDepartureCity(initialData.departureCity);
      if (initialData.packageName) setAdditionalNotes(`Enquiring for package: ${initialData.packageName}`);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'FMT-' + Math.floor(100000 + Math.random() * 900000);
    setEnquiryRef(ref);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-[#0B1B3D]">
                Holiday Enquiry Received!
              </h3>
              <p className="text-xs text-slate-500">
                Booking Enquiry Ref: <span className="font-mono font-bold text-slate-800">{enquiryRef}</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left text-xs space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-[#0B1B3D]">{destination}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Departure From:</span>
                <span className="font-medium text-slate-800">{departureCity || 'To be specified'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Travel Date / Month:</span>
                <span className="font-medium text-slate-800">{travelDate || 'Flexible'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Travellers:</span>
                <span className="font-medium text-slate-800">{adults} Adult(s), {children} Child(ren) · {travelPreference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client Contact:</span>
                <span className="font-semibold text-slate-800">{fullName} ({phone})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your inquiry has been allocated to a dedicated Flymego Tours Holiday Consultant. We will curate a personalized itinerary with hotels, sightseeing, and flight options and reach out shortly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <a
                href={`https://wa.me/918722207700?text=Hi%20Flymego%20Tours%2C%20I%20have%20submitted%20Holiday%20Enquiry%20${enquiryRef}%20for%20${destination}.%20Please%20assist!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect on WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-[#1E3A8A] transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-orange-50 text-[#FF6B00] text-[11px] font-bold uppercase tracking-wider mb-1">
                <Compass className="w-3 h-3" />
                <span>Personalized Vacation Planning</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0B1B3D]">
                Plan My Trip With Flymego Tours
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Share your travel preferences below. Our holiday consultants will design a tailored holiday quotation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Email & Departure City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Departure City *
                  </label>
                  <input
                    type="text"
                    required
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Mumbai, Chennai"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Destination & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Destination *
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  >
                    <option value="Dubai">Dubai, UAE</option>
                    <option value="Bali">Bali, Indonesia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Kashmir">Kashmir (Srinagar & Gulmarg)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Other International">Other International</option>
                    <option value="Other Domestic India">Other Domestic India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tentative Travel Date / Month
                  </label>
                  <input
                    type="text"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    placeholder="e.g. Next month, Nov 15th, or Flexible"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Travellers & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adults (12+ yrs)</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                    <option value="5+">5+ Adults (Group)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Children (2-11 yrs)</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="0">0 Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3+">3+ Children</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Style</label>
                  <select
                    value={travelPreference}
                    onChange={(e) => setTravelPreference(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="Family Holiday">Family Holiday</option>
                    <option value="Honeymoon / Couple">Honeymoon / Couple</option>
                    <option value="Friends / Group">Friends / Group</option>
                    <option value="Solo Exploration">Solo Exploration</option>
                    <option value="Luxury Relaxation">Luxury Relaxation</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Budget Range (Per Person)
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="Economy (₹25,000 - ₹40,000 / person)">Economy (₹25,000 - ₹40,000 / person)</option>
                  <option value="Standard (₹40,000 - ₹75,000 / person)">Standard (₹40,000 - ₹75,000 / person)</option>
                  <option value="Premium (₹75,000 - ₹1,25,000 / person)">Premium (₹75,000 - ₹1,25,000 / person)</option>
                  <option value="Luxury (₹1,25,000+ / person)">Luxury (₹1,25,000+ / person)</option>
                  <option value="Flexible / Custom Quotation">Flexible / Custom Quotation</option>
                </select>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Requests / Hotel Preference / Flight Need
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Vegetarian food preference, 4-star beach resort, need flight tickets included, anniversary celebration..."
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 transition-all"
                >
                  Submit Holiday Enquiry & Get Tailored Quote
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Flymego Tours respects your privacy. Details are used solely to draft your holiday itinerary.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
