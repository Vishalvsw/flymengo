import React, { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { Hero } from './components/Hero';
import { TrustHighlights } from './components/TrustHighlights';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesSection } from './components/PackagesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCTA } from './components/FinalCTA';
import { FlightTicketingView } from './components/FlightTicketingView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { CareersView } from './components/CareersView';
import { HolidayEnquiryModal, PlanMyTripInitialData } from './components/HolidayEnquiryModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { Footer } from './components/Footer';
import { Destination, HolidayPackage } from './data/travelData';
import { MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { useTravel } from './context/TravelContext';
import { usePWAInstall } from './hooks/usePWAInstall';
import { PWAInstallModal } from './components/pwa/PWAInstallModal';
import { PWAInstallButton } from './components/pwa/PWAInstallButton';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

export default function App() {
  const { brandInfo, isAdminLoggedIn } = useTravel();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [isPlanMyTripOpen, setIsPlanMyTripOpen] = useState(false);
  const [planMyTripData, setPlanMyTripData] = useState<PlanMyTripInitialData | undefined>(undefined);

  // Admin View & Modal states
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // PWA Install state
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    isOnline,
    promptInstall,
  } = usePWAInstall();
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const handleOpenPlanMyTrip = (initialData?: PlanMyTripInitialData) => {
    setPlanMyTripData(initialData);
    setIsPlanMyTripOpen(true);
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handleRequestDestinationQuote = (destName: string) => {
    handleOpenPlanMyTrip({ destination: destName });
  };

  const handleSelectPackage = (pkg: HolidayPackage) => {
    setSelectedPackage(pkg);
  };

  const handleRequestPackageQuote = (packageName: string) => {
    handleOpenPlanMyTrip({ packageName });
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  // If Admin View is active, render the dedicated Admin Dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        onExitToStorefront={() => {
          setIsAdminView(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#FF6B00] selection:text-white">
      {/* Sticky Header with Navigation, Branding, and PWA Install */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPlanMyTrip={handleOpenPlanMyTrip}
        onOpenAdmin={handleOpenAdmin}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        isAppInstalled={isInstalled}
      />

      {/* Main Content Router */}
      <main className="grow">
        {/* VIEW 1: Home View */}
        {activeTab === 'home' && (
          <>
            <Hero
              setActiveTab={setActiveTab}
              onOpenPlanMyTrip={handleOpenPlanMyTrip}
            />
            <TrustHighlights
              setActiveTab={setActiveTab}
              onOpenPlanMyTrip={() => handleOpenPlanMyTrip()}
            />
            <DestinationsSection
              onSelectDestination={handleSelectDestination}
              onRequestQuote={handleRequestDestinationQuote}
            />
            <PackagesSection
              onSelectPackage={handleSelectPackage}
              onRequestPackageQuote={handleRequestPackageQuote}
            />
            <WhyChooseUs />
            <HowItWorks
              onOpenPlanMyTrip={() => handleOpenPlanMyTrip()}
            />
            <TestimonialsSection />
            <FinalCTA
              setActiveTab={setActiveTab}
              onOpenPlanMyTrip={() => handleOpenPlanMyTrip()}
            />
          </>
        )}

        {/* VIEW 2: Holiday Packages Listing View */}
        {activeTab === 'packages' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="bg-[#0B1B3D] text-white p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#FF7A00]">
                    All Holiday Catalog
                  </span>
                  <h1 className="font-display text-3xl font-extrabold mt-1">
                    Explore Curated Holiday Packages
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                    Discover flexible itineraries across international destinations and scenic Indian valleys. Fully customizable with our holiday consultancy.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenPlanMyTrip()}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF6B00] to-[#FF8800] hover:from-[#E65C00] shadow-md shadow-orange-500/20 whitespace-nowrap"
                >
                  Request Custom Package
                </button>
              </div>
            </div>
            <PackagesSection
              onSelectPackage={handleSelectPackage}
              onRequestPackageQuote={handleRequestPackageQuote}
              filterType="All"
            />
          </div>
        )}

        {/* VIEW 3: International Tours View */}
        {activeTab === 'international' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="bg-gradient-to-r from-[#0B1B3D] to-[#1E3A8A] text-white p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#FF7A00]">
                    Global Horizons
                  </span>
                  <h1 className="font-display text-3xl font-extrabold mt-1">
                    International Tours & Holidays
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                    Explore iconic international destinations: Dubai, Bali, Maldives, Singapore, and Thailand with flight ticketing and visa coordination.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenPlanMyTrip({ destination: 'International Destination' })}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#FF6B00] hover:bg-[#E65C00] shadow-md shadow-orange-500/20 whitespace-nowrap"
                >
                  Plan International Trip
                </button>
              </div>
            </div>
            <DestinationsSection
              onSelectDestination={handleSelectDestination}
              onRequestQuote={handleRequestDestinationQuote}
            />
            <PackagesSection
              onSelectPackage={handleSelectPackage}
              onRequestPackageQuote={handleRequestPackageQuote}
              filterType="International"
            />
          </div>
        )}

        {/* VIEW 4: Domestic Tours View */}
        {activeTab === 'domestic' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="bg-gradient-to-r from-[#0F244C] to-[#1E3A8A] text-white p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                    Incredible India
                  </span>
                  <h1 className="font-display text-3xl font-extrabold mt-1">
                    Domestic Tours: Kashmir & Beyond
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                    Experience paradise on earth: romantic shikaras on Dal Lake, cedar houseboats, Gulmarg snow gondolas, and customized family retreats.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenPlanMyTrip({ destination: 'Kashmir' })}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#FF6B00] hover:bg-[#E65C00] shadow-md shadow-orange-500/20 whitespace-nowrap"
                >
                  Plan Kashmir Holiday
                </button>
              </div>
            </div>
            <PackagesSection
              onSelectPackage={handleSelectPackage}
              onRequestPackageQuote={handleRequestPackageQuote}
              filterType="Domestic"
            />
          </div>
        )}

        {/* VIEW 5: Flight Tickets Enquiry View */}
        {activeTab === 'flights' && <FlightTicketingView />}

        {/* VIEW 6: About Us View */}
        {activeTab === 'about' && (
          <AboutView
            setActiveTab={setActiveTab}
            onOpenPlanMyTrip={() => handleOpenPlanMyTrip()}
          />
        )}

        {/* VIEW 7: Careers View */}
        {activeTab === 'careers' && <CareersView />}

        {/* VIEW 8: Contact Us View */}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Floating Action Button (WhatsApp Quick Desk, Install App APK & Admin indicator) */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {!isInstalled && (
          <PWAInstallButton
            variant="floating"
            onClick={() => setIsInstallModalOpen(true)}
            isInstalled={isInstalled}
          />
        )}

        <a
          href={brandInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 hover:shadow-2xl transition-all transform hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white text-emerald-500" />
          <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
            WhatsApp Consultant
          </span>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/90 text-amber-300 shadow-lg hover:bg-black transition-all text-xs font-bold border border-amber-400/30 backdrop-blur-xs"
            title="Open Admin Management Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? 'Admin Panel' : 'Admin'}</span>
          </button>

          <button
            onClick={() => handleOpenPlanMyTrip()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0B1B3D] text-white shadow-lg hover:bg-[#1E3A8A] transition-all text-xs font-bold border border-white/10"
          >
            <Compass className="w-4 h-4 text-[#FF7A00]" />
            <span className="hidden sm:inline">Plan My Trip</span>
          </button>
        </div>
      </aside>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPlanMyTrip={() => handleOpenPlanMyTrip()}
        onOpenAdmin={handleOpenAdmin}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Modals */}
      <HolidayEnquiryModal
        isOpen={isPlanMyTripOpen}
        onClose={() => setIsPlanMyTripOpen(false)}
        initialData={planMyTripData}
      />

      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        onRequestQuote={handleRequestDestinationQuote}
      />

      <PackageDetailModal
        packageData={selectedPackage}
        isOpen={Boolean(selectedPackage)}
        onClose={() => setSelectedPackage(null)}
        onRequestPackageQuote={handleRequestPackageQuote}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminView(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* PWA Mobile App / APK Installation Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        isAndroid={isAndroid}
        onPromptInstall={promptInstall}
      />

      {/* Network Connectivity Status Indicator */}
      <OfflineIndicator isOnline={isOnline} />
    </div>
  );
}
