import React from 'react';
import { Compass, Users2, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Personalized Itineraries',
      desc: 'Every trip is customized to your travel rhythm, hotel preference, dietary needs, and must-see attractions.',
      icon: <Compass className="w-6 h-6 text-[#FF6B00]" />
    },
    {
      title: 'Convenient Trip Planning',
      desc: 'From flight tickets and hotel reservations to ground transportation and day tours, we manage the logistics.',
      icon: <Sparkles className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Dedicated Travel Assistance',
      desc: 'Direct consultation with experienced holiday planners who assist you before, during, and after your holiday.',
      icon: <Headphones className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Options for Families, Couples & Groups',
      desc: 'Whether it is a romantic honeymoon in Bali, a family holiday in Dubai, or a corporate group retreat.',
      icon: <Users2 className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
              Travel With Confidence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              Why Plan With Flymego Tours?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe a great holiday is more than just booking flights and rooms—it’s about thoughtful planning, reliable coordination, and creating lifetime memories without the stress.
            </p>

            <div className="pt-2 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent quotation without hidden surcharge clauses</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Handpicked 3-star, 4-star, and luxury 5-star hotel options</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>End-to-end guidance from visa checklist to return flight</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center mb-4 shadow-2xs">
                    {pt.icon}
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0B1B3D] mb-1.5">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
