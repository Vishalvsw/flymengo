import React, { useState } from 'react';
import { Plane, Phone, Mail, MapPin, Clock, MessageSquare, X, ShieldCheck, Smartphone } from 'lucide-react';
import { ActiveTab } from './Header';
import { useTravel } from '../context/TravelContext';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPlanMyTrip: () => void;
  onOpenAdmin: () => void;
  onOpenInstallModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPlanMyTrip, onOpenAdmin, onOpenInstallModal }) => {
  const { brandInfo } = useTravel();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07152E] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1B3D] to-blue-600 flex items-center justify-center text-white border border-white/15">
                <Plane className="w-5 h-5 text-[#FF7A00] transform -rotate-45" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-display text-xl font-black text-white">FLYMEGO</span>
                  <span className="font-display text-xl font-bold text-[#FF7A00] ml-1">TOURS</span>
                </div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                  {brandInfo.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {brandInfo.positioning}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={brandInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                title="WhatsApp Quick Desk"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${brandInfo.phoneRaw}`}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#FF6B00] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                title="Call Flymego Tours"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${brandInfo.email}`}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('packages')} className="hover:text-white transition-colors">
                  Holiday Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('flights')} className="hover:text-white transition-colors">
                  Flight Tickets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Flymego
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded-sm font-semibold">Hiring</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              {onOpenInstallModal && (
                <li className="pt-1">
                  <button
                    onClick={onOpenInstallModal}
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Install Mobile App (APK)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Holiday Categories */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              Destinations & Tours
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('international')} className="hover:text-white transition-colors">
                  Dubai Holiday Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('international')} className="hover:text-white transition-colors">
                  Bali Island Honeymoons
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('international')} className="hover:text-white transition-colors">
                  Maldives Luxury Overwater Villas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('domestic')} className="hover:text-white transition-colors">
                  Kashmir & Gulmarg Valley
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('international')} className="hover:text-white transition-colors">
                  Singapore Family Getaways
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('international')} className="hover:text-white transition-colors">
                  Thailand Islands & Bazaars
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <a href={`tel:${brandInfo.phoneRaw}`} className="hover:text-white transition-colors">
                  {brandInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <a href={`mailto:${brandInfo.email}`} className="hover:text-white transition-colors">
                  {brandInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>{brandInfo.officeAddress}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>{brandInfo.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {brandInfo.name}. All rights reserved. Travel & Holiday Consultancy.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenPlanMyTrip}
              className="text-[#FF7A00] hover:underline font-semibold"
            >
              Request Free Quote
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-amber-300 hover:text-amber-100 font-bold transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legal Information Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-[#0B1B3D] mb-4">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>

            <div className="text-xs text-slate-600 leading-relaxed space-y-3 max-h-80 overflow-y-auto pr-2">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>{brandInfo.name}</strong> respects your privacy and is committed to protecting your personal information.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> We collect contact details exclusively to furnish customized travel itineraries, flight quotes, and holiday consulting services.
                  </p>
                  <p>
                    <strong>Data Confidentiality:</strong> Your information is never sold, leased, or disclosed to third-party marketing companies. It is utilized strictly by our appointed holiday consultants and airline/hotel partners to coordinate your holiday reservations.
                  </p>
                  <p>
                    For inquiries regarding your personal data, reach out to <strong>{brandInfo.email}</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Service Nature:</strong> {brandInfo.name} functions as a professional travel agency and holiday consultancy. All package descriptions and prices displayed are demonstrative and subject to seasonal flight tariffs, room availability, and government taxes.
                  </p>
                  <p>
                    <strong>Itinerary Customization:</strong> Final bookings and binding itineraries are confirmed only upon mutual agreement with our travel consultants and issuance of official travel vouchers.
                  </p>
                  <p>
                    <strong>Cancellation & Amendments:</strong> Airline and hotel cancellation policies apply in accordance with individual carrier and supplier conditions.
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setLegalModal(null)}
              className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[#0B1B3D] hover:bg-[#1E3A8A]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
