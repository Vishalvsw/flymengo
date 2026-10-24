import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Destination,
  HolidayPackage,
  FEATURED_DESTINATIONS,
  HOLIDAY_PACKAGES,
  BRAND_INFO,
} from '../data/travelData';

export interface EnrichedHolidayEnquiry {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  departureCity: string;
  travelDate: string;
  adults: string;
  children: string;
  budgetRange: string;
  travelPreference: string;
  additionalNotes: string;
  status: 'New' | 'In Progress' | 'Itinerary Sent' | 'Confirmed' | 'Archived';
  adminNotes?: string;
  createdAt: string;
}

export interface EnrichedFlightEnquiry {
  id: string;
  referenceId: string;
  tripType: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  cabinClass: string;
  name: string;
  phone: string;
  email: string;
  status: 'New' | 'Fare Quoted' | 'Option Selected' | 'Booked' | 'Closed';
  adminNotes?: string;
  createdAt: string;
}

export interface EnrichedJobApplication {
  id: string;
  candidateName: string;
  candidatePhone: string;
  candidateEmail: string;
  position: string;
  experience: string;
  qualification: string;
  fileName?: string;
  status: 'Applied' | 'Reviewing' | 'Interview Scheduled' | 'Shortlisted' | 'Rejected';
  adminNotes?: string;
  createdAt: string;
}

export interface AdminPromoOffer {
  id: string;
  badge: string;
  highlight: string;
  text: string;
  expiresText: string;
  destination: string;
  offerNote: string;
  active: boolean;
}

const DEFAULT_PROMO_OFFERS: AdminPromoOffer[] = [
  {
    id: 'dubai-super-saver',
    badge: 'FLASH SALE',
    highlight: 'Dubai Super Saver:',
    text: 'Flat ₹5,000 Off on 5D/4N Packages + Free Desert Safari BBQ Upgrade',
    expiresText: 'Limited 12 slots remaining this week',
    destination: 'Dubai',
    offerNote: '[FLASH SALE] Dubai Super Saver - Flat ₹5,000 Off & Free Desert Safari Upgrade',
    active: true,
  },
  {
    id: 'bali-honeymoon',
    badge: 'HONEYMOON SPECIAL',
    highlight: 'Bali Island Escape:',
    text: 'Complimentary Floating Breakfast & Nusa Penida Island Speedboat Tour',
    expiresText: 'Valid for bookings made this month',
    destination: 'Bali',
    offerNote: '[SEASONAL OFFER] Bali Honeymoon Special - Free Floating Breakfast & Nusa Penida Tour',
    active: true,
  },
  {
    id: 'kashmir-snow',
    badge: 'EARLY BIRD',
    highlight: 'Kashmir Paradise:',
    text: 'Free Dal Lake Shikara Sunset Ride & Gulmarg Gondola Priority Assistance',
    expiresText: 'Winter season special offer',
    destination: 'Kashmir',
    offerNote: '[EARLY BIRD] Kashmir Snow Special - Free Dal Lake Shikara Ride',
    active: true,
  },
  {
    id: 'maldives-luxury',
    badge: 'LUXURY RETREAT',
    highlight: 'Maldives Overwater:',
    text: 'Save up to 15% on All-Inclusive Water Bungalows with Speedboat Transfers',
    expiresText: 'Ends Sunday midnight',
    destination: 'Maldives',
    offerNote: '[LUXURY DISCOUNT] Maldives Overwater Villa 15% Seasonal Discount',
    active: true,
  },
  {
    id: 'zero-convenience-fee',
    badge: 'FLIGHT DESK',
    highlight: 'Zero Convenience Fee:',
    text: 'Exclusive airline fare desks for Gulf & South East Asia Round-Trips',
    expiresText: 'Today only special',
    destination: 'Other International',
    offerNote: '[PROMO] Flight Desk Zero Convenience Fee Special Fare Request',
    active: true,
  },
];

const INITIAL_HOLIDAY_ENQUIRIES: EnrichedHolidayEnquiry[] = [
  {
    id: 'enq-101',
    referenceId: 'FMT-839210',
    fullName: 'Rahul & Sneha Sharma',
    phone: '+91 98450 12345',
    email: 'rahul.sharma@gmail.com',
    destination: 'Dubai',
    departureCity: 'Bengaluru',
    travelDate: '15th November 2026',
    adults: '2',
    children: '1',
    budgetRange: '₹40,000 - ₹75,000 / person',
    travelPreference: 'Family Holiday',
    additionalNotes: 'Require Burj Khalifa at sunset slot and vegetarian meal options for dinner cruise.',
    status: 'In Progress',
    adminNotes: 'Assigned to Pooja R. Sent 4-star hotel options in Deira & Downtown.',
    createdAt: '24 Oct 2026, 09:30 AM',
  },
  {
    id: 'enq-102',
    referenceId: 'FMT-921478',
    fullName: 'Arjun Menon',
    phone: '+91 97401 99887',
    email: 'arjun.m@outlook.com',
    destination: 'Bali',
    departureCity: 'Mumbai',
    travelDate: 'December 2026',
    adults: '2',
    children: '0',
    budgetRange: '₹75,000 - ₹1,25,000 / person',
    travelPreference: 'Honeymoon / Couple',
    additionalNotes: 'Need 3 nights in Ubud pool villa + 2 nights Seminyak beachfront.',
    status: 'Itinerary Sent',
    adminNotes: 'Itinerary v2 sent via WhatsApp. Client reviewing villa choices.',
    createdAt: '23 Oct 2026, 04:15 PM',
  },
  {
    id: 'enq-103',
    referenceId: 'FMT-562109',
    fullName: 'Suresh & Group (Family of 6)',
    phone: '+91 94481 33221',
    email: 'suresh.k@yahoo.com',
    destination: 'Kashmir',
    departureCity: 'Delhi',
    travelDate: 'Mid December (Snow time)',
    adults: '5+',
    children: '2',
    budgetRange: 'Standard (₹40,000 - ₹75,000 / person)',
    travelPreference: 'Family Holiday',
    additionalNotes: 'Need Gondola Phase 1 & 2 tickets pre-booked + luxury cedar houseboat on Dal Lake.',
    status: 'New',
    adminNotes: 'New inbound lead from website homepage quick quote.',
    createdAt: '24 Oct 2026, 11:20 AM',
  },
];

const INITIAL_FLIGHT_ENQUIRIES: EnrichedFlightEnquiry[] = [
  {
    id: 'flt-201',
    referenceId: 'FLIGHT-647201',
    tripType: 'Round Trip',
    from: 'Bengaluru (BLR)',
    to: 'Dubai (DXB)',
    departureDate: '2026-11-20',
    returnDate: '2026-11-26',
    passengers: '2 Adult(s)',
    cabinClass: 'Economy',
    name: 'Vikram Joshi',
    phone: '+91 98860 55443',
    email: 'vikram.j@gmail.com',
    status: 'Fare Quoted',
    adminNotes: 'Emirates direct quoted at ₹28,400 return per pax.',
    createdAt: '24 Oct 2026, 10:10 AM',
  },
  {
    id: 'flt-202',
    referenceId: 'FLIGHT-918234',
    tripType: 'One Way',
    from: 'Mumbai (BOM)',
    to: 'Singapore (SIN)',
    departureDate: '2026-12-05',
    returnDate: 'N/A',
    passengers: '1 Adult(s)',
    cabinClass: 'Premium Economy',
    name: 'Deepak Rao',
    phone: '+91 98200 11223',
    email: 'deepak.rao@corp.com',
    status: 'New',
    adminNotes: 'Checking Singapore Airlines SQ 421 flight options.',
    createdAt: '24 Oct 2026, 01:45 PM',
  },
];

const INITIAL_JOB_APPLICATIONS: EnrichedJobApplication[] = [
  {
    id: 'job-app-301',
    candidateName: 'Megha Sundaram',
    candidatePhone: '+91 98452 77889',
    candidateEmail: 'megha.sundaram@gmail.com',
    position: 'Holiday Consultant',
    experience: '5 years with Thomas Cook & SOTC',
    qualification: 'Diploma in Tourism & Travel Management, B.Com',
    fileName: 'Megha_Sundaram_Resume.pdf',
    status: 'Shortlisted',
    adminNotes: 'Strong outbound sales experience in Dubai & South East Asia. Schedule interview for Monday 11 AM.',
    createdAt: '23 Oct 2026, 02:00 PM',
  },
  {
    id: 'job-app-302',
    candidateName: 'Karthik Varma',
    candidatePhone: '+91 91081 44556',
    candidateEmail: 'karthik.varma@gmail.com',
    position: 'Ticketing Agent',
    experience: 'Fresher (Completed IATA Ticketing course)',
    qualification: 'BBA with Amadeus GDS Certification',
    fileName: 'Karthik_Varma_CV.docx',
    status: 'Reviewing',
    adminNotes: 'Knowledge of Amadeus ticketing. Good communication skills.',
    createdAt: '24 Oct 2026, 08:30 AM',
  },
];

interface TravelContextType {
  // Brand & Settings
  brandInfo: typeof BRAND_INFO;
  updateBrandInfo: (updated: Partial<typeof BRAND_INFO>) => void;

  // Destinations
  destinations: Destination[];
  addDestination: (dest: Destination) => void;
  updateDestination: (id: string, updated: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  // Packages
  packages: HolidayPackage[];
  addPackage: (pkg: HolidayPackage) => void;
  updatePackage: (id: string, updated: Partial<HolidayPackage>) => void;
  deletePackage: (id: string) => void;

  // Promo Offers
  promoOffers: AdminPromoOffer[];
  addPromoOffer: (offer: AdminPromoOffer) => void;
  updatePromoOffer: (id: string, updated: Partial<AdminPromoOffer>) => void;
  deletePromoOffer: (id: string) => void;
  togglePromoOffer: (id: string) => void;

  // Holiday Enquiries
  holidayEnquiries: EnrichedHolidayEnquiry[];
  addHolidayEnquiry: (enquiry: Omit<EnrichedHolidayEnquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateHolidayEnquiryStatus: (id: string, status: EnrichedHolidayEnquiry['status'], adminNotes?: string) => void;
  deleteHolidayEnquiry: (id: string) => void;

  // Flight Enquiries
  flightEnquiries: EnrichedFlightEnquiry[];
  addFlightEnquiry: (enquiry: Omit<EnrichedFlightEnquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateFlightEnquiryStatus: (id: string, status: EnrichedFlightEnquiry['status'], adminNotes?: string) => void;
  deleteFlightEnquiry: (id: string) => void;

  // Job Applications
  jobApplications: EnrichedJobApplication[];
  addJobApplication: (app: Omit<EnrichedJobApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateJobApplicationStatus: (id: string, status: EnrichedJobApplication['status'], adminNotes?: string) => void;
  deleteJobApplication: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  resetAllToDefaults: () => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BRAND: 'fmt_brand_info',
  DESTINATIONS: 'fmt_destinations',
  PACKAGES: 'fmt_packages',
  PROMOS: 'fmt_promos',
  HOLIDAY_ENQ: 'fmt_holiday_enquiries',
  FLIGHT_ENQ: 'fmt_flight_enquiries',
  JOB_APPS: 'fmt_job_applications',
  ADMIN_AUTH: 'fmt_admin_authenticated',
};

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [brandInfo, setBrandInfo] = useState<typeof BRAND_INFO>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
    return saved ? JSON.parse(saved) : BRAND_INFO;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    return saved ? JSON.parse(saved) : FEATURED_DESTINATIONS;
  });

  const [packages, setPackages] = useState<HolidayPackage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    return saved ? JSON.parse(saved) : HOLIDAY_PACKAGES;
  });

  const [promoOffers, setPromoOffers] = useState<AdminPromoOffer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROMOS);
    return saved ? JSON.parse(saved) : DEFAULT_PROMO_OFFERS;
  });

  const [holidayEnquiries, setHolidayEnquiries] = useState<EnrichedHolidayEnquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOLIDAY_ENQ);
    return saved ? JSON.parse(saved) : INITIAL_HOLIDAY_ENQUIRIES;
  });

  const [flightEnquiries, setFlightEnquiries] = useState<EnrichedFlightEnquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FLIGHT_ENQ);
    return saved ? JSON.parse(saved) : INITIAL_FLIGHT_ENQUIRIES;
  });

  const [jobApplications, setJobApplications] = useState<EnrichedJobApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOB_APPS);
    return saved ? JSON.parse(saved) : INITIAL_JOB_APPLICATIONS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Persist handlers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brandInfo));
  }, [brandInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promoOffers));
  }, [promoOffers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOLIDAY_ENQ, JSON.stringify(holidayEnquiries));
  }, [holidayEnquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FLIGHT_ENQ, JSON.stringify(flightEnquiries));
  }, [flightEnquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOB_APPS, JSON.stringify(jobApplications));
  }, [jobApplications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Brand Info
  const updateBrandInfo = (updated: Partial<typeof BRAND_INFO>) => {
    setBrandInfo((prev) => ({ ...prev, ...updated }));
  };

  // Destinations
  const addDestination = (dest: Destination) => {
    setDestinations((prev) => [dest, ...prev]);
  };

  const updateDestination = (id: string, updated: Partial<Destination>) => {
    setDestinations((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  // Packages
  const addPackage = (pkg: HolidayPackage) => {
    setPackages((prev) => [pkg, ...prev]);
  };

  const updatePackage = (id: string, updated: Partial<HolidayPackage>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  // Promos
  const addPromoOffer = (offer: AdminPromoOffer) => {
    setPromoOffers((prev) => [offer, ...prev]);
  };

  const updatePromoOffer = (id: string, updated: Partial<AdminPromoOffer>) => {
    setPromoOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updated } : o)));
  };

  const deletePromoOffer = (id: string) => {
    setPromoOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const togglePromoOffer = (id: string) => {
    setPromoOffers((prev) => prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o)));
  };

  // Holiday Enquiries
  const addHolidayEnquiry = (enquiry: Omit<EnrichedHolidayEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const id = 'enq-' + Date.now();
    const createdAt = new Date().toLocaleString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const newEnq: EnrichedHolidayEnquiry = {
      ...enquiry,
      id,
      createdAt,
      status: 'New',
    };
    setHolidayEnquiries((prev) => [newEnq, ...prev]);
    return enquiry.referenceId;
  };

  const updateHolidayEnquiryStatus = (id: string, status: EnrichedHolidayEnquiry['status'], adminNotes?: string) => {
    setHolidayEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : e))
    );
  };

  const deleteHolidayEnquiry = (id: string) => {
    setHolidayEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // Flight Enquiries
  const addFlightEnquiry = (enquiry: Omit<EnrichedFlightEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const id = 'flt-' + Date.now();
    const createdAt = new Date().toLocaleString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const newFlight: EnrichedFlightEnquiry = {
      ...enquiry,
      id,
      createdAt,
      status: 'New',
    };
    setFlightEnquiries((prev) => [newFlight, ...prev]);
    return enquiry.referenceId;
  };

  const updateFlightEnquiryStatus = (id: string, status: EnrichedFlightEnquiry['status'], adminNotes?: string) => {
    setFlightEnquiries((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : f))
    );
  };

  const deleteFlightEnquiry = (id: string) => {
    setFlightEnquiries((prev) => prev.filter((f) => f.id !== id));
  };

  // Job Applications
  const addJobApplication = (app: Omit<EnrichedJobApplication, 'id' | 'createdAt' | 'status'>) => {
    const id = 'app-' + Date.now();
    const createdAt = new Date().toLocaleString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const newApp: EnrichedJobApplication = {
      ...app,
      id,
      createdAt,
      status: 'Applied',
    };
    setJobApplications((prev) => [newApp, ...prev]);
  };

  const updateJobApplicationStatus = (id: string, status: EnrichedJobApplication['status'], adminNotes?: string) => {
    setJobApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : a))
    );
  };

  const deleteJobApplication = (id: string) => {
    setJobApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Admin Auth
  const adminLogin = (password: string): boolean => {
    // Password check: Accepts "flymego" or "admin" or "flymego2026"
    const valid = password.trim() === 'flymego' || password.trim() === 'admin' || password.trim() === 'flymego2026';
    if (valid) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const resetAllToDefaults = () => {
    setBrandInfo(BRAND_INFO);
    setDestinations(FEATURED_DESTINATIONS);
    setPackages(HOLIDAY_PACKAGES);
    setPromoOffers(DEFAULT_PROMO_OFFERS);
    setHolidayEnquiries(INITIAL_HOLIDAY_ENQUIRIES);
    setFlightEnquiries(INITIAL_FLIGHT_ENQUIRIES);
    setJobApplications(INITIAL_JOB_APPLICATIONS);
    localStorage.clear();
  };

  return (
    <TravelContext.Provider
      value={{
        brandInfo,
        updateBrandInfo,
        destinations,
        addDestination,
        updateDestination,
        deleteDestination,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        promoOffers,
        addPromoOffer,
        updatePromoOffer,
        deletePromoOffer,
        togglePromoOffer,
        holidayEnquiries,
        addHolidayEnquiry,
        updateHolidayEnquiryStatus,
        deleteHolidayEnquiry,
        flightEnquiries,
        addFlightEnquiry,
        updateFlightEnquiryStatus,
        deleteFlightEnquiry,
        jobApplications,
        addJobApplication,
        updateJobApplicationStatus,
        deleteJobApplication,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        resetAllToDefaults,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
