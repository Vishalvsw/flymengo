import React, { useState } from 'react';
import { Compass, Calendar, Users, MapPin, Send, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ActiveTab } from './Header';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPlanMyTrip: (initialData?: { destination?: string; departureCity?: string; travellers?: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, onOpenPlanMyTrip }) => {
  const [destination, setDestination] = useState('Dubai');
  const [departureCity, setDepartureCity] = useState('Bengaluru');
  const [travelDate, setTravelDate] = useState('');
  const [travellers, setTravellers] = useState('2 Travellers');

  const handleHeroEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenPlanMyTrip({
      destination,
      departureCity,
      travellers,
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#07152E] text-white">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_travel_adventure_1792831850437.jpg"
          alt="Luxury Tropical Holiday with Flymego Tours"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
          referrerPolicy="no-referrer"
        />
        {/* Navy gradient scrim to guarantee AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07152E]/95 via-[#07152E]/80 to-[#0B1B3D]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07152E] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md text-[#FFB366] border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Explore • Travel • Create Memories</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Your Next Adventure <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFA439] to-amber-300">
                Starts Here
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed">
              Discover unforgettable destinations, personalized holiday packages, and travel experiences designed around you with Flymego Tours.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('packages');
                  const el = document.getElementById('holiday-packages-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Holiday Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenPlanMyTrip()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xs transition-colors"
              >
                <Compass className="w-4 h-4 text-[#FF7A00]" />
                <span>Plan My Trip</span>
              </button>
            </div>

            {/* Quiet Trust Signals */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Tailored Itineraries</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Hidden Fees</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dedicated Holiday Consultant</span>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Enquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-slate-800">
              <div className="border-b border-slate-100 pb-4 mb-5">
                <span className="text-xs uppercase tracking-wider font-bold text-[#FF6B00]">Quick Quote Enquiry</span>
                <h2 className="font-display text-xl font-bold text-[#0B1B3D] mt-0.5">Find Your Dream Holiday</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Share your tentative plans and our travel desk will get in touch with customized options.
                </p>
              </div>

              <form onSubmit={handleHeroEnquiry} className="space-y-4">
                {/* Destination */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Destination</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-colors"
                  >
                    <option value="Dubai">Dubai, UAE</option>
                    <option value="Bali">Bali, Indonesia</option>
                    <option value="Maldives">Maldives Islands</option>
                    <option value="Kashmir">Kashmir Valley, India</option>
                    <option value="Singapore">Singapore & Sentosa</option>
                    <option value="Thailand">Thailand (Phuket & Bangkok)</option>
                    <option value="Other">Other / Custom Destination</option>
                  </select>
                </div>

                {/* Departure City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    <span>Departure City</span>
                  </label>
                  <input
                    type="text"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Mumbai, Delhi"
                    required
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                {/* Travel Date & Travellers in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Travel Month/Date</span>
                    </label>
                    <input
                      type="text"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      placeholder="e.g. Next month or Nov"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span>Travellers</span>
                    </label>
                    <select
                      value={travellers}
                      onChange={(e) => setTravellers(e.target.value)}
                      className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-colors"
                    >
                      <option value="1 Solo Traveller">1 Solo Traveller</option>
                      <option value="2 Travellers (Couple / Friends)">2 Travellers (Couple)</option>
                      <option value="3-4 Travellers (Small Family)">3-4 Travellers (Family)</option>
                      <option value="5+ Travellers (Group)">5+ Travellers (Group)</option>
                    </select>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry & Get Free Itinerary</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Enquiry-only demo · No online payment required · Direct travel consultant consultation
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
