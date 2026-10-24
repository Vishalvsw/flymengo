import React from 'react';
import { Plane, Compass, HeartHandshake, ShieldCheck, Users, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/travelData';
import { ActiveTab } from './Header';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPlanMyTrip: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab, onOpenPlanMyTrip }) => {
  const serviceCategories = [
    {
      title: 'International Holidays',
      description: 'Carefully curated holiday itineraries to premier global destinations like Dubai, Bali, Maldives, Singapore, and Thailand.',
      icon: <Plane className="w-5 h-5 text-[#FF6B00]" />
    },
    {
      title: 'Domestic Tours & Hill Stations',
      description: 'Explore incredible India—from the snow-clad valleys and houseboats of Kashmir to serene backwaters and heritage circuits.',
      icon: <Compass className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'Flight Ticketing & Air Reservations',
      description: 'Professional ticketing assistance with transparent routing advice, group airfares, and prompt support for date changes.',
      icon: <Plane className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Family, Couple & Group Packages',
      description: 'Custom travel planning tailored for couples on honeymoon, multi-generational families, or group adventures.',
      icon: <Users className="w-5 h-5 text-amber-500" />
    }
  ];

  const teamPlaceholders = [
    {
      role: 'Lead Holiday Consultant',
      name: 'Pooja R. (Consultant Lead)',
      desc: 'Specializes in family holiday planning, custom international itineraries, and hotel selection.'
    },
    {
      role: 'Ticketing & Aviation Executive',
      name: 'Sunil V. (Flight Desk)',
      desc: 'Manages domestic and international air ticket bookings, baggage allowances, and flight re-routing.'
    },
    {
      role: 'Client Relationship & Operations',
      name: 'Ananya S. (Operations)',
      desc: 'Ensures seamless ground coordination, driver pickups, and 24/7 client communication during trips.'
    }
  ];

  return (
    <div className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner inside About */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Flymego Tours</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] tracking-tight">
            Explore • Travel • Create Memories
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Flymego Tours is a professional travel and holiday consultancy brand dedicated to helping travellers discover unforgettable destinations and stress-free holiday experiences.
          </p>
        </div>

        {/* Travel Planning Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200/80">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
              Our Philosophy
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B3D]">
              Travel Designed Around People, Not Pre-Packaged Templates
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We understand that every traveller has unique desires—some seek tranquil beaches with sunset walks, others crave mountain adventures, and families look for convenience and child-friendly itineraries.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              At Flymego Tours, our approach is consultative. We listen to your vacation goals, budget, and travel style, and then construct a clear, transparent itinerary with reliable ground partners.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Honest advice on hotel ratings, locations, and seasonal travel weather</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Transparent quotes without surprise surcharges</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Accessible travel consultant support via phone and WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 relative">
            <img
              src="/src/assets/images/dest_bali_temple_1792831851269.jpg"
              alt="Holiday Planning with Flymego Tours"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#FF7A00] font-bold">Consultancy Focus</span>
                <p className="text-sm font-semibold">Creating memories that stay with you forever</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B3D]">
              Our Travel Services
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              End-to-end holiday planning and ticketing solutions for individual travellers and groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="font-display text-base font-bold text-[#0B1B3D] mb-2">{service.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section (Editable Placeholders as requested) */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Holiday Advisory</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1B3D] mt-1">
              Meet Your Travel Consultants
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Dedicated travel advisors assisting with itinerary design and flight bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamPlaceholders.map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B1B3D] to-blue-700 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg shadow-sm">
                  {member.name.charAt(0)}
                </div>
                <h4 className="font-display text-sm font-bold text-[#0B1B3D]">{member.name}</h4>
                <p className="text-[11px] font-semibold text-[#FF6B00] mb-2">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-[#0B1B3D] rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Ready to discuss your holiday ideas?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Reach out to our team via call, WhatsApp, or request a custom itinerary callback.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenPlanMyTrip}
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] shadow-md shadow-orange-500/20"
            >
              Request Custom Itinerary
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              View Contact Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
