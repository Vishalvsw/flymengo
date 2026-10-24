export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  type: 'International' | 'Domestic';
  image: string;
  description: string;
  durationSuggestion: string;
  bestTimeToVisit: string;
  keyHighlights: string[];
  popularAttractions: string[];
  startingQuotePlaceholder: string;
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  country: string;
  type: 'International' | 'Domestic';
  category: 'Family' | 'Honeymoon' | 'Adventure' | 'Leisure';
  duration: string;
  image: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  pricePlaceholder: string;
}

export interface JobPosition {
  id: string;
  title: string;
  type: 'Full-time' | 'Consultancy';
  department: string;
  salary: string;
  salaryNote?: string;
  experienceRequired: string;
  openings: string;
  keyRequirements: string[];
  preferredBackground: string[];
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  trip: string;
  location: string;
  rating: number;
}

export const BRAND_INFO = {
  name: "Flymego Tours",
  tagline: "Explore • Travel • Create Memories",
  positioning: "A professional travel agency helping customers plan holidays, explore destinations, and arrange seamless travel services.",
  phone: "+91 87222 07700",
  phoneRaw: "+918722207700",
  email: "flymegotours@gmail.com",
  officeAddress: "Flymego Tours Holidays, 2nd Floor, Commercial Plaza, Brigade Road / MG Road Junction, Bengaluru, Karnataka 560001",
  businessHours: "Mon – Sat: 9:30 AM – 7:30 PM | Sun: On Appointment",
  whatsappUrl: "https://wa.me/918722207700?text=Hello%20Flymego%20Tours%2C%20I%20would%20like%20to%20enquire%20about%20a%20holiday%20package!",
};

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'Futuristic Luxury & Golden Desert Dunes',
    type: 'International',
    image: '/src/assets/images/dest_dubai_skyline_1792831851592.jpg',
    description: 'Experience dazzling architectural marvels, world-class luxury shopping, thrilling desert safari dune bashes, and serene marina yacht cruises.',
    durationSuggestion: '5 to 6 Days',
    bestTimeToVisit: 'November to April',
    keyHighlights: ['Burj Khalifa Observation Deck', 'Desert Safari & BBQ Dinner', 'Dubai Marina Cruise', 'Miracle Garden & Frame'],
    popularAttractions: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari Camp', 'Dubai Marina'],
    startingQuotePlaceholder: 'Custom quotes on request'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Tropical Temples, Emerald Terraces & Serenity',
    type: 'International',
    image: '/src/assets/images/dest_bali_temple_1792831851269.jpg',
    description: 'An idyllic island paradise boasting ancient water temples, vibrant rice paddies in Ubud, volcanic sunrises, and sunset beach clubs in Seminyak.',
    durationSuggestion: '6 to 7 Days',
    bestTimeToVisit: 'April to October',
    keyHighlights: ['Ubud Culture & Rice Terraces', 'Tanah Lot & Uluwatu Sunsets', 'Nusa Penida Island Tour', 'Traditional Balinese Spa'],
    popularAttractions: ['Ulun Danu Beratan', 'Tegallalang Rice Terrace', 'Kelingking Beach', 'Uluwatu Temple', 'Seminyak Beach'],
    startingQuotePlaceholder: 'Custom quotes on request'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Republic of Maldives',
    tagline: 'Turquoise Lagoons & Private Overwater Villas',
    type: 'International',
    image: '/src/assets/images/dest_maldives_beach_1792831851789.jpg',
    description: 'The ultimate barefoot luxury retreat with crystal clear waters, coral reef snorkeling, romantic sunset cruises, and secluded overwater villas.',
    durationSuggestion: '4 to 5 Days',
    bestTimeToVisit: 'November to April',
    keyHighlights: ['Overwater Bungalow Stay', 'Manta Ray & Turtle Snorkeling', 'Speedboat / Seaplane Transfers', 'Private Candlelight Beach Dinners'],
    popularAttractions: ['North Malé Atoll', 'Ari Atoll Coral Reefs', 'Bioluminescent Beach', 'Sandbank Picnics'],
    startingQuotePlaceholder: 'Custom quotes on request'
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    country: 'India',
    tagline: 'Paradise on Earth with Snow Peaks & Dal Lake',
    type: 'Domestic',
    image: '/src/assets/images/dest_kashmir_mountains_1792831852980.jpg',
    description: 'Immerse in heaven on earth with serene Dal Lake Shikara rides, heritage houseboats, snow adventures in Gulmarg, and lush pine valleys in Pahalgam.',
    durationSuggestion: '6 to 7 Days',
    bestTimeToVisit: 'Year-Round (Spring Blooms / Winter Snow)',
    keyHighlights: ['Dal Lake Shikara & Houseboat Stay', 'Gulmarg Gondola Snow Ride', 'Pahalgam Valley & Betaab Valley', 'Mughal Gardens of Srinagar'],
    popularAttractions: ['Dal Lake Srinagar', 'Gulmarg Gondola', 'Betaab Valley', 'Sonmarg Glacier', 'Shankaracharya Temple'],
    startingQuotePlaceholder: 'Custom quotes on request'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    tagline: 'Garden City Marvels & High-Energy Attractions',
    type: 'International',
    image: '/src/assets/images/hero_travel_adventure_1792831850437.jpg',
    description: 'A vibrant cosmopolitan hub combining futuristic botanical gardens, Sentosa Island excitement, world-class family entertainment, and diverse cuisine.',
    durationSuggestion: '4 to 5 Days',
    bestTimeToVisit: 'Year-round destination',
    keyHighlights: ['Gardens by the Bay & Supertree Grove', 'Sentosa Island & Universal Studios', 'Night Safari Experience', 'Marina Bay Sands SkyPark'],
    popularAttractions: ['Gardens by the Bay', 'Universal Studios Singapore', 'Marina Bay Sands', 'Sentosa Island Cable Car', 'Jewel Changi'],
    startingQuotePlaceholder: 'Custom quotes on request'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    tagline: 'Golden Shrines, Island Hopping & Warm Hospitality',
    type: 'International',
    image: '/src/assets/images/dest_bali_temple_1792831851269.jpg',
    description: 'Encounter Thailand’s sparkling islands, Phi Phi limestone cliffs, bustling night bazaars, ornate Buddhist temples, and legendary culinary culture.',
    durationSuggestion: '5 to 7 Days',
    bestTimeToVisit: 'November to April',
    keyHighlights: ['Phuket & Krabi Island Hopping', 'Phi Phi Islands Speedboat Tour', 'Bangkok Grand Palace & Temples', 'Vibrant Night Markets & Street Food'],
    popularAttractions: ['Phi Phi Islands', 'Railay Beach Krabi', 'Wat Arun Bangkok', 'Big Buddha Phuket', 'Floating Markets'],
    startingQuotePlaceholder: 'Custom quotes on request'
  }
];

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-dubai-grand',
    title: 'Splendors of Dubai & Desert Adventure',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    type: 'International',
    category: 'Family',
    duration: '5 Days / 4 Nights',
    image: '/src/assets/images/dest_dubai_skyline_1792831851592.jpg',
    overview: 'A balanced blend of iconic city sights, modern architectural wonders, and an exhilarating desert safari with traditional Arabian hospitality.',
    highlights: [
      'Burj Khalifa 124th Floor observation deck entry',
      '4x4 Desert Safari with Dune Bashing, Tanoura show & BBQ dinner',
      'Dubai Marina Dhow Cruise with international buffet',
      'Half-day guided Dubai city tour with Dubai Frame stop'
    ],
    inclusions: [
      '4 Nights accommodation in 4-Star city center hotel',
      'Daily breakfast at hotel',
      'Return airport transfers in private AC vehicle',
      'Desert Safari with BBQ dinner and live entertainment',
      'Dubai Marina Dhow Cruise with dinner',
      'Burj Khalifa entry tickets with transfers'
    ],
    exclusions: [
      'International airfare (available via flight ticketing desk)',
      'UAE tourist visa fees (assistance provided)',
      'Tourism Dirham tax paid directly at hotel check-in',
      'Personal expenses, tips and optional activities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai & Evening Marina Cruise', details: 'Meet & greet at Dubai International Airport. Private transfer to hotel. Relax before an enchanting evening Marina Dhow Cruise.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa At The Top', details: 'Morning city tour covering Jumeirah Mosque, Burj Al Arab photo stop, Dubai Frame, followed by sunset views from Burj Khalifa.' },
      { day: 3, title: 'Leisure Morning & 4x4 Desert Safari', details: 'Free morning for shopping. Afternoon departure for desert dune bashing, sandboarding, camel ride, and BBQ dinner under starlit skies.' },
      { day: 4, title: 'Miracle Garden & Global Village (Seasonal)', details: 'Visit world’s largest natural flower garden and explore diverse cultural pavilions at Global Village.' },
      { day: 5, title: 'Souk Shopping & Departure', details: 'Check out, visit Gold and Spice Souks for souvenirs, followed by private airport transfer for onward journey.' }
    ],
    pricePlaceholder: 'Starting from ₹42,500 / person (approx. demo quote)'
  },
  {
    id: 'pkg-bali-escape',
    title: 'Bali Tropical Island Bliss & Ubud Culture',
    destination: 'Bali',
    country: 'Indonesia',
    type: 'International',
    category: 'Honeymoon',
    duration: '6 Days / 5 Nights',
    image: '/src/assets/images/dest_bali_temple_1792831851269.jpg',
    overview: 'Designed for couples and leisure seekers: lush Ubud rainforests, cascading waterfalls, private pool villa experience, and ocean cliffside sunsets.',
    highlights: [
      '2 Nights Ubud Nature Resort + 3 Nights Private Pool Villa',
      'Kintamani Volcano, Coffee Plantation & Tegallalang Rice Terrace',
      'Nusa Penida West Island day excursion by fast boat',
      'Romantic cliffside Uluwatu Temple & Kecak fire dance'
    ],
    inclusions: [
      '5 Nights accommodation with daily breakfast',
      'Private airport and inter-hotel transfers',
      'Full-day Kintamani and Ubud tour with lunch',
      'Nusa Penida Island day tour with snorkeling gear & guide',
      'Uluwatu Sunset tour with entry tickets',
      'Complimentary honeymoon cake & flower petal bath arrangement'
    ],
    exclusions: [
      'International flights (can be bundled upon request)',
      'Indonesia Visa on Arrival (approx. 500k IDR)',
      'Water sports beyond specified inclusions',
      'Personal laundry and telephone charges'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bali & Ubud Transfer', details: 'Warm traditional Balinese welcome at Denpasar Airport. Transfer to your serene Ubud sanctuary.' },
      { day: 2, title: 'Ubud Artisans, Rice Terraces & Waterfall', details: 'Visit Celuk craft village, Tegenungan Waterfall, and the iconic Bali swing overlooking emerald rice terraces.' },
      { day: 3, title: 'Kintamani Batur View & Transfer to Beach Villa', details: 'Spectacular views of Mount Batur with buffet lunch. Transfer to luxury private pool villa in South Bali.' },
      { day: 4, title: 'Exotic Nusa Penida Island Day Tour', details: 'Speedboat to Nusa Penida to photograph Kelingking T-Rex cliff, Broken Beach, and Angel’s Billabong.' },
      { day: 5, title: 'Water Sports & Uluwatu Cliff Temple', details: 'Morning banana boat and parasailing. Evening drive to Uluwatu Temple perched 70 meters above the Indian Ocean.' },
      { day: 6, title: 'Villa Breakfast & Airport Farewell', details: 'Enjoy floating breakfast in your private pool before your chauffeur transfers you to the airport.' }
    ],
    pricePlaceholder: 'Starting from ₹38,900 / person (approx. demo quote)'
  },
  {
    id: 'pkg-maldives-luxury',
    title: 'Maldives Paradise & Overwater Villa Retreat',
    destination: 'Maldives',
    country: 'Republic of Maldives',
    type: 'International',
    category: 'Honeymoon',
    duration: '5 Days / 4 Nights',
    image: '/src/assets/images/dest_maldives_beach_1792831851789.jpg',
    overview: 'Unwind on powdery white sand beaches and dive directly from your sundeck into turquoise lagoon waters with world-class resort comforts.',
    highlights: [
      'Stay in luxury Beach Villa + Water Villa combination',
      'Speedboat or scenic seaplane transfers included',
      'Complimentary house reef snorkeling gear and kayak usage',
      'Sunset dolphin cruise with refreshments'
    ],
    inclusions: [
      '4 Nights luxury resort stay (2N Beach Villa + 2N Overwater Villa)',
      'All-Inclusive meal plan (Breakfast, Lunch, Dinner & Select Beverages)',
      'Round-trip airport speedboat / seaplane transfers',
      'Complimentary non-motorized water sports',
      'Maldives Green Tax and service charges included'
    ],
    exclusions: [
      'International flight tickets (enquire with our flight desk)',
      'Motorized water sports and scuba diving certification courses',
      'Spa treatments and private sandbank dining experiences'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Velana International Airport & Speedboat Transfer', details: 'Chauffeur assists to resort jetty. Speedboat across turquoise waters to island resort. Check-in and relax.' },
      { day: 2, title: 'Beachfront Relaxation & Coral Reef Snorkeling', details: 'Awaken to ocean waves. Explore the vibrant house reef teeming with colorful reef fish and rays.' },
      { day: 3, title: 'Move to Overwater Villa & Sunset Dolphin Cruise', details: 'Check into your overwater villa. Late afternoon cruise into open waters in search of spinner dolphins.' },
      { day: 4, title: 'Kayaking, Spa Wellness & Starlit Dinner', details: 'Paddle across calm lagoons, indulge in optional spa therapy, and enjoy international gourmet cuisine.' },
      { day: 5, title: 'Island Farewell & Speedboat to Airport', details: 'Final morning swim in the lagoon. Transfer back to Malé airport for flight home.' }
    ],
    pricePlaceholder: 'Starting from ₹74,500 / person (approx. demo quote)'
  },
  {
    id: 'pkg-kashmir-heaven',
    title: 'Kashmir Valley & Gulmarg Snow Wonderland',
    destination: 'Kashmir',
    country: 'India',
    type: 'Domestic',
    category: 'Family',
    duration: '6 Days / 5 Nights',
    image: '/src/assets/images/dest_kashmir_mountains_1792831852980.jpg',
    overview: 'Explore the Crown of India with romantic Shikara rides on Dal Lake, heritage cedar houseboats, snow adventures in Gulmarg, and saffron fields in Pahalgam.',
    highlights: [
      '1 Night in handcrafted Dal Lake Heritage Houseboat',
      'Srinagar Mughal Gardens (Nishat & Shalimar Bagh)',
      'Gulmarg Gondola cable car ride to Kongdoori / Apharwat peak',
      'Pahalgam Lidder River valley and Betaab Valley excursion'
    ],
    inclusions: [
      '5 Nights accommodation (4N Premium Hotel + 1N Houseboat)',
      'Daily breakfast and dinner (MAP plan)',
      'Private non-sharing vehicle for all transfers and sightseeing',
      '1 Hour complimentary Shikara boat ride on Dal Lake',
      'Toll tax, parking fees, and driver allowances'
    ],
    exclusions: [
      'Airfare to and from Srinagar Airport',
      'Gondola cable car tickets (recommended to book in advance)',
      'Pony rides in Gulmarg / Pahalgam and local union cab fees',
      'Personal expenses and garden entry tickets'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake Shikara Ride', details: 'Arrive at Srinagar Airport. Check into premium houseboat. Enjoy a romantic 1-hour Shikara ride watching floating markets.' },
      { day: 2, title: 'Srinagar to Gulmarg Day Trip', details: 'Drive through weeping willow landscapes to Gulmarg. Experience the world famous Gondola ride with panoramic snow views.' },
      { day: 3, title: 'Srinagar to Pahalgam (Valley of Shepherds)', details: 'Drive past saffron fields and Avantipura ruins to Pahalgam. Stroll along the crystalline Lidder River.' },
      { day: 4, title: 'Explore Betaab Valley & Aru Valley', details: 'Visit scenic Bollywood film locations, pine forests, and meadows surrounded by towering peaks.' },
      { day: 5, title: 'Return to Srinagar & Mughal Gardens', details: 'Drive back to Srinagar. Explore historical Nishat Bagh, Shalimar Bagh, and local handicraft bazaars for Pashmina shawls.' },
      { day: 6, title: 'Airport Drop & Sweet Memories', details: 'Transfer to Srinagar Airport with treasured memories of Kashmir paradise.' }
    ],
    pricePlaceholder: 'Starting from ₹24,900 / person (approx. demo quote)'
  },
  {
    id: 'pkg-singapore-fun',
    title: 'Singapore City Lights & Sentosa Island Fun',
    destination: 'Singapore',
    country: 'Singapore',
    type: 'International',
    category: 'Family',
    duration: '5 Days / 4 Nights',
    image: '/src/assets/images/hero_travel_adventure_1792831850437.jpg',
    overview: 'An action-packed holiday for families and explorers featuring Gardens by the Bay, Universal Studios, Marina Bay viewpoints, and world-class attractions.',
    highlights: [
      'Gardens by the Bay (Flower Dome & Cloud Forest)',
      'Full Day Universal Studios Singapore with express passes option',
      'Sentosa Cable Car, Wings of Time show & S.E.A. Aquarium',
      'Night Safari with guided tram expedition'
    ],
    inclusions: [
      '4 Nights accommodation in central Singapore hotel',
      'Daily breakfast at hotel',
      'Return airport transfers on private basis',
      'Universal Studios Singapore admission ticket',
      'Gardens by the Bay conservatory access',
      'Sentosa pass with Wings of Time night spectacle'
    ],
    exclusions: [
      'International flights (booking assistance via our ticketing desk)',
      'Singapore Tourist Visa',
      'Meals not mentioned in inclusions',
      'Personal expenses and travel insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Singapore & Night Safari', details: 'Arrive at Changi Airport. Transfer to hotel. Evening adventure into world’s first nocturnal wildlife park.' },
      { day: 2, title: 'Half-Day City Tour & Gardens by the Bay', details: 'Explore Merlion Park, Chinatown, Little India. Afternoon in the mist-filled Cloud Forest and Supertree Grove light show.' },
      { day: 3, title: 'Full Day Universal Studios Adventure', details: 'Spend a thrilling day at Southeast Asia’s only Universal Studios theme park on Sentosa.' },
      { day: 4, title: 'Sentosa Island Explorations & S.E.A. Aquarium', details: 'Ride the scenic scenic cable car, discover 100,000 marine animals, and witness the Wings of Time pyrotechnic show.' },
      { day: 5, title: 'Jewel Changi & Departure', details: 'Visit Jewel Changi’s Rain Vortex before departing for your home destination.' }
    ],
    pricePlaceholder: 'Starting from ₹46,800 / person (approx. demo quote)'
  },
  {
    id: 'pkg-thailand-islands',
    title: 'Thailand Highlights: Bangkok & Phuket Escapade',
    destination: 'Thailand',
    country: 'Thailand',
    type: 'International',
    category: 'Adventure',
    duration: '6 Days / 5 Nights',
    image: '/src/assets/images/dest_bali_temple_1792831851269.jpg',
    overview: 'Experience the best of both worlds: the vibrant energetic pulse of Bangkok and the sun-kissed emerald waters and limestone karsts of Phuket.',
    highlights: [
      '3 Nights Phuket Beach Resort + 2 Nights Bangkok City Hotel',
      'Phi Phi Islands full-day speedboat excursion with buffet lunch',
      'Phuket City Tour & Big Buddha viewpoint',
      'Bangkok Temple Tour (Golden Buddha & Marble Temple)'
    ],
    inclusions: [
      '5 Nights accommodation with daily buffet breakfast',
      'Internal flight assistance & airport transfers in private vehicle',
      'Full-day Phi Phi Island tour with snorkeling gear & lunch',
      'Phuket half-day island highlights tour',
      'Bangkok half-day temples and city orientation'
    ],
    exclusions: [
      'International airfares',
      'Thailand Visa fees / National Park fees payable on arrival',
      'Personal beverages and optional water activities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Phuket & Beach Check-in', details: 'Arrive at Phuket International Airport. Transfer to your resort. Relax on the sandy shores of Patong or Karon.' },
      { day: 2, title: 'Speedboat Tour to Phi Phi & Maya Bay', details: 'Cruise to Phi Phi Don and Phi Phi Leh. Swim in crystalline waters, see Maya Bay and Viking Cave.' },
      { day: 3, title: 'Phuket Viewpoints & Big Buddha', details: 'Visit Karon Viewpoint, Wat Chalong, and Big Buddha perched atop Nakkerd Hill.' },
      { day: 4, title: 'Fly to Bangkok & Chao Phraya Evening', details: 'Short domestic flight to Bangkok. Check in and experience evening riverside nightlife or night markets.' },
      { day: 5, title: 'Bangkok Historic Temples & Shopping', details: 'Guided visit to Wat Traimit and Wat Benchamabophit. Afternoon shopping at CentralWorld or MBK.' },
      { day: 6, title: 'Bangkok Departure', details: 'Check out and transfer to Suvarnabhumi Airport for homeward flight.' }
    ],
    pricePlaceholder: 'Starting from ₹34,500 / person (approx. demo quote)'
  }
];

export const CAREER_POSITIONS: JobPosition[] = [
  {
    id: 'ticketing-agent',
    title: 'Ticketing Agent',
    type: 'Full-time',
    department: 'Aviation & Ticketing Desk',
    salary: 'Up to ₹12,000 / month',
    salaryNote: 'Competitive baseline with performance incentives',
    experienceRequired: 'Freshers & Experienced Candidates Welcome',
    openings: '2 Positions',
    keyRequirements: [
      'Good communication and interpersonal skills',
      'Basic knowledge of flight bookings, PNR generation, and airline ticketing preferred',
      'Sound computer operating knowledge (MS Office, Web Browsers, Emailing)',
      'Enthusiasm to assist customers with flight schedules and route queries',
      'Freshers with relevant diploma or keen interest may also apply'
    ],
    preferredBackground: [
      'Travel & Tourism Diploma or Certification',
      'Customer support / Back-office operations',
      'Basic familiarity with GDS (Amadeus/Galileo) or airline portals is an added advantage'
    ],
    description: 'We are seeking an energetic and attentive Ticketing Agent to manage flight ticket inquiries, issue tickets, handle re-issuance/rescheduling requests, and provide polite travel assistance to our valued clients.'
  },
  {
    id: 'holiday-consultant',
    title: 'Holiday Consultant',
    type: 'Full-time',
    department: 'Holiday Packages & Client Advisory',
    salary: 'Starting from ₹15,000 and above',
    salaryNote: 'Final salary based on experience, skills, and calibre',
    experienceRequired: 'Minimum 4 Years of Experience',
    openings: '2 Positions',
    keyRequirements: [
      'Minimum 4 years of proven professional experience',
      'Strong client advisory, itinerary curation, and customer handling abilities',
      'Excellent verbal and written communication in English and local languages',
      'Ability to design custom domestic and international tour packages',
      'Candidate preference as per hiring reference guidelines: Women candidates preferred for this consultative role'
    ],
    preferredBackground: [
      'Travel / Holiday Consulting & Tour Operations',
      'B.Ed / Teaching & Educational Counselling background',
      'Banking / Customer Relationship Management',
      'Accounting & Client Financial Advisory'
    ],
    description: 'As a Holiday Consultant at Flymego Tours, you will understand client travel aspirations, tailor domestic and international dream vacation itineraries, coordinate with ground partners, and deliver end-to-end holiday consulting.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: "Flymego Tours meticulously curated our 5-day Dubai trip. Every transfer was punctual, hotel was excellent, and the desert safari was unforgettable. Highly recommended!",
    author: "Rajesh & Priya Kulkarni",
    trip: "Dubai Holiday Package",
    location: "Bengaluru, India",
    rating: 5
  },
  {
    id: 't-2',
    quote: "Our Bali honeymoon was seamless from start to finish! The private pool villa and Nusa Penida island arrangement were extraordinary. Responsive team on WhatsApp throughout.",
    author: "Ananya & Rohan Mehta",
    trip: "Bali Romantic Escape",
    location: "Mumbai, India",
    rating: 5
  },
  {
    id: 't-3',
    quote: "Outstanding flight ticketing support and Kashmir itinerary. As a group of 8 family members, everything went like clockwork. Fair pricing and transparent guidance.",
    author: "Dr. Vikram Sampath",
    trip: "Kashmir Family Tour",
    location: "Hyderabad, India",
    rating: 5
  }
];

export const TRUST_FEATURES = [
  {
    title: 'Personalized Travel Planning',
    desc: 'Bespoke itineraries tailored to your dates, preferences, pace, and travel style.',
    icon: 'Compass'
  },
  {
    title: 'Domestic & International Holidays',
    desc: 'From Kashmir and Kerala to Dubai, Bali, and the Maldives—curated holiday options.',
    icon: 'Globe'
  },
  {
    title: 'Flight Ticketing Assistance',
    desc: 'Dedicated flight desk assistance for domestic and international air ticket bookings.',
    icon: 'Plane'
  },
  {
    title: 'Dedicated Travel Support',
    desc: 'Reliable holiday consultant guidance before, during, and after your trip.',
    icon: 'HeartHandshake'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Share Your Travel Plans',
    desc: 'Tell us where you want to go, your dates, group size, and preferred holiday style.'
  },
  {
    step: '02',
    title: 'Receive a Personalized Itinerary',
    desc: 'Our holiday consultants craft a transparent itinerary with hotel and sightseeing options.'
  },
  {
    step: '03',
    title: 'Confirm Details with Travel Team',
    desc: 'Review inclusions, fine-tune hotel choices or activities, and confirm your booking.'
  },
  {
    step: '04',
    title: 'Get Ready for Your Trip',
    desc: 'Receive comprehensive travel vouchers, tips, and ongoing support for a memorable holiday.'
  }
];
