import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Clock, ArrowRight, ChevronLeft, ChevronRight, X, Flame } from 'lucide-react';
import { PlanMyTripInitialData } from './HolidayEnquiryModal';
import { useTravel } from '../context/TravelContext';

interface PromoBannerProps {
  onClaimOffer: (initialData: PlanMyTripInitialData) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onClaimOffer }) => {
  const { promoOffers } = useTravel();
  const activeOffers = promoOffers.filter((p) => p.active);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate every 4.5 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused || !isVisible || activeOffers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeOffers.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, isVisible, activeOffers.length]);

  if (!isVisible || activeOffers.length === 0) return null;

  const safeIndex = currentIndex % activeOffers.length;
  const currentOffer = activeOffers[safeIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + activeOffers.length) % activeOffers.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % activeOffers.length);
  };

  const handleClaim = () => {
    onClaimOffer({
      destination: currentOffer.destination,
      packageName: currentOffer.offerNote,
    });
  };

  return (
    <div
      role="region"
      aria-label="Limited-time travel promotions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-50 bg-gradient-to-r from-[#D9480F] via-[#FF6B00] to-[#E8590C] text-white py-1.5 px-3 sm:px-6 shadow-xs select-none transition-all border-b border-orange-600/40 text-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-h-[30px]">
        {/* Left: Navigation arrow (desktop) */}
        {activeOffers.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous promotional offer"
            className="hidden md:flex p-1 rounded-md hover:bg-black/15 active:bg-black/25 text-white/90 hover:text-white transition-colors shrink-0"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Center: Rotating Offer Content */}
        <div
          onClick={handleClaim}
          className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center cursor-pointer group overflow-hidden"
        >
          {/* Urgency Badge */}
          <span className="hidden sm:inline-flex items-center gap-1 bg-black/25 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm shrink-0 border border-white/20">
            <Flame className="w-3 h-3 text-yellow-300 fill-yellow-300" />
            <span>{currentOffer.badge}</span>
          </span>

          {/* Marquee/Offer Content */}
          <div className="truncate flex items-center gap-1.5 leading-snug">
            <span className="font-extrabold text-amber-200 tracking-tight shrink-0">
              {currentOffer.highlight}
            </span>
            <span className="font-medium text-white/95 truncate">
              {currentOffer.text}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-orange-100 font-normal pl-2 border-l border-white/25 shrink-0">
              <Clock className="w-3 h-3 text-yellow-200" />
              <span>{currentOffer.expiresText}</span>
            </span>
          </div>

          {/* Claim Call to Action Button */}
          <span className="inline-flex items-center gap-1 bg-white text-[#D9480F] group-hover:bg-amber-100 group-hover:text-orange-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-md shadow-xs transition-colors shrink-0 whitespace-nowrap ml-1">
            <span>Claim Offer</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Right Controls: Next arrow, Dots, and Dismiss button */}
        <div className="flex items-center gap-1 shrink-0">
          {activeOffers.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next promotional offer"
              className="hidden md:flex p-1 rounded-md hover:bg-black/15 active:bg-black/25 text-white/90 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Rotating dots indicator */}
          {activeOffers.length > 1 && (
            <div className="hidden sm:flex items-center gap-1 mx-1.5" aria-hidden="true">
              {activeOffers.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === safeIndex ? 'bg-white scale-110 w-3' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Dismiss button */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close promotional banner"
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-black/15 active:bg-black/25 transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
