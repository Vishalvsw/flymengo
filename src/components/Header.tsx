import React, { useState } from 'react';
import { Plane, Phone, MessageSquare, Menu, X, Compass, ChevronRight, ShieldCheck, Smartphone } from 'lucide-react';
import { PromoBanner } from './PromoBanner';
import { PlanMyTripInitialData } from './HolidayEnquiryModal';
import { useTravel } from '../context/TravelContext';
import { PWAInstallButton } from './pwa/PWAInstallButton';

export type ActiveTab = 'home' | 'packages' | 'international' | 'domestic' | 'flights' | 'about' | 'contact' | 'careers';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPlanMyTrip: (initialData?: PlanMyTripInitialData) => void;
  onOpenAdmin: () => void;
  onOpenInstallModal?: () => void;
  isAppInstalled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPlanMyTrip,
  onOpenAdmin,
  onOpenInstallModal,
  isAppInstalled = false,
}) => {
  const { brandInfo, isAdminLoggedIn } = useTravel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Slim Promotional Urgency Banner with Rotating Limited-Time Offers */}
      <PromoBanner onClaimOffer={onOpenPlanMyTrip} />

      {/* Top Utility Bar */}
      <div className="bg-[#07152E] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-[#FF7A00] font-semibold">{brandInfo.name}:</span> {brandInfo.tagline}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Domestic & International Holiday Consultancy</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${brandInfo.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>{brandInfo.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Quick Chat</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-amber-300 hover:text-amber-100 bg-white/10 hover:bg-white/15 transition-colors border border-amber-400/30"
              title="Open Admin Management Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>{isAdminLoggedIn ? 'Admin Panel (Active)' : 'Admin Login'}</span>
            </button>
            {onOpenInstallModal && !isAppInstalled && (
              <>
                <span className="text-slate-600">|</span>
                <button
                  onClick={onOpenInstallModal}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 transition-colors border border-amber-400/40"
                  title="Install Flymego Mobile App (WebAPK)"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Install App (APK)</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Zone */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1B3D] to-[#1E3A8A] flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-[#FF7A00] transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-display text-xl font-black tracking-tight text-[#0B1B3D]">FLYMEGO</span>
                <span className="font-display text-xl font-bold tracking-tight text-[#FF7A00] ml-1">TOURS</span>
              </div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 -mt-0.5">
                Travel & Holiday Consultancy
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('packages')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              Holiday Packages
            </button>
            <button
              onClick={() => handleNavClick('international')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'international'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              International Tours
            </button>
            <button
              onClick={() => handleNavClick('domestic')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'domestic'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              Domestic Tours
            </button>
            <button
              onClick={() => handleNavClick('flights')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'flights'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              Flight Tickets
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'about'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'careers'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              Careers
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'text-[#0B1B3D] font-bold bg-slate-100/80'
                  : 'hover:text-[#FF7A00] hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {onOpenInstallModal && !isAppInstalled && (
              <PWAInstallButton
                onClick={onOpenInstallModal}
                variant="header"
                isInstalled={isAppInstalled}
              />
            )}

            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenPlanMyTrip()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] hover:to-[#FF7700] shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Compass className="w-4 h-4" />
              <span>Plan My Trip</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenInstallModal && !isAppInstalled && (
              <button
                onClick={onOpenInstallModal}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-500/40 rounded-lg text-xs font-black shadow-xs active:scale-95 transition-all"
                title="Install Flymego Mobile App (APK)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wide">APK</span>
              </button>
            )}

            <a
              href={brandInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200/50"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            {onOpenInstallModal && !isAppInstalled && (
              <div className="pb-1">
                <PWAInstallButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInstallModal();
                  }}
                  variant="drawer"
                  isInstalled={isAppInstalled}
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-1 text-sm font-medium text-slate-700">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'home' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('packages')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'packages' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>Holiday Packages</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('international')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'international' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>International Tours</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('domestic')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'domestic' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>Domestic Tours</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('flights')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'flights' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>Flight Tickets Enquiry</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'about' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>About Us</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('careers')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'careers' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>Careers & Hiring</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between ${
                  activeTab === 'contact' ? 'bg-orange-50 text-[#FF6B00] font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 mt-2"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF7A00]" />
                  <span>Admin Management Portal</span>
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanMyTrip();
                }}
                className="w-full py-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-center shadow-md shadow-orange-500/20"
              >
                Plan My Trip (Free Quote)
              </button>
              <a
                href={`tel:${brandInfo.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#0B1B3D]" />
                <span>Call {brandInfo.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
