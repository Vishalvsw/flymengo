import React from 'react';
import { Star, MessageSquareQuote, Info } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
            Traveller Experiences
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] tracking-tight mt-1">
            What Our Clients Say
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Read sample feedback from families and holidaymakers who planned their vacations with our consultancy.
          </p>

          {/* Explicit disclaimer as per instructions */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-500 text-[11px]">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Sample customer reviews for demonstration purposes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#0B1B3D]">{item.author}</h4>
                  <p className="text-[11px] text-slate-500">{item.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-[#FF6B00] bg-orange-50 px-2 py-0.5 rounded-sm">
                    {item.trip}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
