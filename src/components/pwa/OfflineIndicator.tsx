import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white px-4 py-2.5 shadow-md flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold transition-all animate-in slide-in-from-top"
      >
        <WifiOff className="w-4 h-4 shrink-0 text-amber-200" />
        <span>
          <strong>Offline Mode Active:</strong> You're browsing cached packages and destinations. Enquiries will sync once connection returns.
        </span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed top-0 left-0 right-0 z-50 bg-emerald-600 text-white px-4 py-2.5 shadow-md flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold transition-all animate-in slide-in-from-top"
      >
        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-200" />
        <Wifi className="w-4 h-4 shrink-0 text-emerald-200" />
        <span>You are back online! Fresh packages and live quotes ready.</span>
      </div>
    );
  }

  return null;
};
