import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRightLeft, Send, CheckCircle2, Info, Sparkles, Shield, Clock, Phone } from 'lucide-react';
import { BRAND_INFO } from '../data/travelData';
import { useTravel } from '../context/TravelContext';

export const FlightTicketingView: React.FC = () => {
  const { addFlightEnquiry } = useTravel();
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [fromCity, setFromCity] = useState('Bengaluru (BLR)');
  const [toCity, setToCity] = useState('Dubai (DXB)');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [flightRemarks, setFlightRemarks] = useState('');
  const [submittedEnquiry, setSubmittedEnquiry] = useState<any | null>(null);

  const handleSwapAirports = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'FLIGHT-' + Math.floor(100000 + Math.random() * 900000);
    const enquiry = {
      referenceId: ref,
      tripType: tripType === 'round-trip' ? 'Round Trip' : 'One Way',
      from: fromCity,
      to: toCity,
      departureDate: departureDate || 'Flexible / Next month',
      returnDate: tripType === 'round-trip' ? (returnDate || 'Flexible') : 'N/A',
      passengers: `${adults} Adult(s)${children !== '0' ? `, ${children} Child(ren)` : ''}`,
      cabinClass,
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addFlightEnquiry(enquiry);
    setSubmittedEnquiry(enquiry);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60 mb-3">
            <Plane className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Flymego Ticketing Desk</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Flight Ticketing Assistance
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Submit your flight requirements. Our dedicated ticketing agents find the most convenient routes, fare combinations, and baggage allowances for you.
          </p>

          {/* Transparent Notice */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs text-left flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Enquiry-Based Flight Assistance</span>
              <p className="text-amber-800 leading-relaxed">
                This is a personalized flight consultation service. Rather than impersonal algorithms, our travel desk checks multiple airline GDS inventories to propose the best flight schedules, transit times, and promotional fares after receiving your enquiry.
              </p>
            </div>
          </div>
        </div>

        {/* Enquiry Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8">
          {/* Trip Type Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <button
              type="button"
              onClick={() => setTripType('round-trip')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                tripType === 'round-trip'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType('one-way')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                tripType === 'one-way'
                  ? 'bg-[#0B1B3D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              One Way
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Origin & Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  From (Departure City / Airport)
                </label>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  placeholder="e.g. Bengaluru (BLR)"
                  required
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-colors"
                />
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center py-1">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                  title="Swap Origin and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="md:col-span-5">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  To (Arrival Destination / Airport)
                </label>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  placeholder="e.g. Dubai (DXB) or Bali (DPS)"
                  required
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            {/* Quick Airport tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-400">Popular:</span>
              {['Bengaluru (BLR)', 'Mumbai (BOM)', 'Delhi (DEL)', 'Dubai (DXB)', 'Singapore (SIN)', 'Bali (DPS)', 'Malé (MLE)', 'Bangkok (BKK)'].map((apt) => (
                <button
                  key={apt}
                  type="button"
                  onClick={() => {
                    if (!fromCity) setFromCity(apt);
                    else setToCity(apt);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {apt.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Dates & Passengers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Departure Date</span>
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                />
              </div>

              {tripType === 'round-trip' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Return Date</span>
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Adult Passengers (12+ yrs)</span>
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5+">5+ Adults (Group)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cabin Class
                </label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business Class">Business Class</option>
                </select>
              </div>
            </div>

            {/* Passenger Contact Info for the Enquiry */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-display text-sm font-bold text-[#0B1B3D] mb-3">
                Where should we send flight fare quotes?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. S. Sharma"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#FF6B00]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero spam guarantee · Your contact is shared only with your ticketing agent.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 transition-all whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>Search Flights & Request Quote</span>
              </button>
            </div>
          </form>
        </div>

        {/* Success Modal if Submitted */}
        {submittedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl font-bold text-[#0B1B3D] text-center">
                Flight Ticket Enquiry Received!
              </h2>
              <p className="text-xs text-slate-500 text-center mt-1">
                Reference ID: <span className="font-mono font-bold text-slate-700">{submittedEnquiry.referenceId}</span>
              </p>

              <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-800">{submittedEnquiry.from} ➔ {submittedEnquiry.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Trip Type:</span>
                  <span className="font-medium text-slate-800">{submittedEnquiry.tripType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passengers & Class:</span>
                  <span className="font-medium text-slate-800">{submittedEnquiry.passengers} · {submittedEnquiry.cabinClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Client:</span>
                  <span className="font-medium text-slate-800">{submittedEnquiry.name} ({submittedEnquiry.phone})</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-center mb-6">
                Our ticketing agent will review airline availability and WhatsApp / call you with 2–3 best fare and schedule options within business hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/918722207700?text=Hi%20Flymego%20Tours%2C%20I%20just%20submitted%20Flight%20Enquiry%20${submittedEnquiry.referenceId}%20for%20${submittedEnquiry.from}%20to%20${submittedEnquiry.to}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 text-center hover:bg-emerald-100 transition-colors"
                >
                  Open WhatsApp Chat
                </a>
                <button
                  onClick={() => setSubmittedEnquiry(null)}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] text-center hover:bg-[#1E3A8A] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
