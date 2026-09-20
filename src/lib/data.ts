// ─── Types ───────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  icon: string;
  nameKey: string;
  descKey: string;
  image: string;
}

export interface Package {
  id: string;
  nameKey: string;
  priceKey: string;
  features: string[];
  popular: boolean;
}

export interface ServicePricing {
  service: string;
  price: string;
}

export interface RoutePricing {
  route: string;
  moveType: string;
  price: string;
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  review: string;
  shortReview: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  roleHi: string;
  location: string;
}

export interface OperatingHub {
  city: string;
  role: string;
}

export interface Award {
  year: number;
  title: string;
  titleHi: string;
}

export interface Stat {
  value: number;
  labelEn: string;
  labelHi: string;
}

export interface GalleryImage {
  src: string;
  category: string;
  altEn: string;
  altHi: string;
}

// ─── 1. Hero Images ─────────────────────────────────────────────────────────

export const heroImages: string[] = [
  "/hero-packing.webp",
  "/hero-truck.webp",
  "/hero-family.webp",
  "/hero-loading.webp",
  "/hero-new-home.webp",
];

// ─── 2. Services ─────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: "household",
    icon: "Home",
    nameKey: "services.household.name",
    descKey: "services.household.desc",
    image: "/hero-packing.webp",
  },
  {
    id: "local",
    icon: "Building2",
    nameKey: "services.local.name",
    descKey: "services.local.desc",
    image: "/hero-family.webp",
  },
  {
    id: "intercity",
    icon: "MapPin",
    nameKey: "services.intercity.name",
    descKey: "services.intercity.desc",
    image: "/hero-truck.webp",
  },
  {
    id: "office",
    icon: "Briefcase",
    nameKey: "services.office.name",
    descKey: "services.office.desc",
    image: "/service-office.webp",
  },
  {
    id: "vehicle",
    icon: "Car",
    nameKey: "services.vehicle.name",
    descKey: "services.vehicle.desc",
    image: "/service-vehicle.webp",
  },
  {
    id: "packing",
    icon: "Package",
    nameKey: "services.packing.name",
    descKey: "services.packing.desc",
    image: "/service-packing.webp",
  },
  {
    id: "loading",
    icon: "Truck",
    nameKey: "services.loading.name",
    descKey: "services.loading.desc",
    image: "/service-loading.webp",
  },
  {
    id: "storage",
    icon: "Warehouse",
    nameKey: "services.storage.name",
    descKey: "services.storage.desc",
    image: "/service-storage.webp",
  },
  {
    id: "furniture",
    icon: "Wrench",
    nameKey: "services.furniture.name",
    descKey: "services.furniture.desc",
    image: "/service-furniture.webp",
  },
];

// ─── 3. Packages ─────────────────────────────────────────────────────────────

export const packages: Package[] = [
  {
    id: "essential",
    nameKey: "pricing.essential.name",
    priceKey: "pricing.essential.price",
    features: [
      "pricing.essential.f1",
      "pricing.essential.f2",
      "pricing.essential.f3",
      "pricing.essential.f4",
    ],
    popular: false,
  },
  {
    id: "protected",
    nameKey: "pricing.protected.name",
    priceKey: "pricing.protected.price",
    features: [
      "pricing.protected.f1",
      "pricing.protected.f2",
      "pricing.protected.f3",
      "pricing.protected.f4",
    ],
    popular: true,
  },
  {
    id: "complete",
    nameKey: "pricing.complete.name",
    priceKey: "pricing.complete.price",
    features: [
      "pricing.complete.f1",
      "pricing.complete.f2",
      "pricing.complete.f3",
      "pricing.complete.f4",
      "pricing.complete.f5",
    ],
    popular: false,
  },
];

// ─── 4. Service Pricing ──────────────────────────────────────────────────────

export const servicePricing: ServicePricing[] = [
  { service: "1 BHK Local Move", price: "₹3,499" },
  { service: "2 BHK Local Move", price: "₹5,499" },
  { service: "3 BHK Local Move", price: "₹7,499" },
  { service: "4 BHK Local Move", price: "₹10,499" },
  { service: "Office Relocation", price: "₹6,999" },
  { service: "Bike Transportation", price: "₹3,499" },
  { service: "Car Transportation", price: "₹7,999" },
  { service: "Packing Only", price: "₹2,499" },
  { service: "Loading/Unloading Only", price: "₹1,999" },
  { service: "Storage", price: "₹1,499/month" },
  { service: "Furniture Dismantling", price: "₹999" },
  { service: "Furniture Assembly", price: "₹999" },
];

// ─── 5. Route Pricing ────────────────────────────────────────────────────────

export const routePricing: RoutePricing[] = [
  { route: "Delhi → Gurugram", moveType: "1 BHK", price: "₹4,499" },
  { route: "Delhi → Noida", moveType: "1 BHK", price: "₹4,299" },
  { route: "Delhi → Ghaziabad", moveType: "2 BHK", price: "₹5,999" },
  { route: "Delhi → Faridabad", moveType: "2 BHK", price: "₹5,799" },
  { route: "Delhi → Jaipur", moveType: "1 BHK", price: "₹10,999" },
  { route: "Delhi → Chandigarh", moveType: "2 BHK", price: "₹12,499" },
  { route: "Delhi → Lucknow", moveType: "2 BHK", price: "₹14,999" },
  { route: "Delhi → Dehradun", moveType: "2 BHK", price: "₹13,499" },
  { route: "Delhi → Mumbai", moveType: "2 BHK", price: "₹24,999" },
  { route: "Delhi → Pune", moveType: "2 BHK", price: "₹23,999" },
  { route: "Delhi → Bengaluru", moveType: "2 BHK", price: "₹26,999" },
  { route: "Delhi → Hyderabad", moveType: "2 BHK", price: "₹24,499" },
  { route: "Delhi → Kolkata", moveType: "2 BHK", price: "₹25,499" },
];

// ─── 6. Reviews ──────────────────────────────────────────────────────────────

export const reviews: Review[] = [
  {
    name: "Iraaya Khanna",
    location: "Vasant Kunj, Delhi",
    rating: 5,
    review:
      "Everything was coordinated well from the initial estimate to the final unloading. The team packed our glassware and electronics particularly carefully, and the delivery reached us without any unpleasant surprises.",
    shortReview: "Professional from packing to delivery.",
  },
  {
    name: "Vedant Arora",
    location: "Sector 57, Gurugram",
    rating: 5,
    review:
      "We moved from Gurugram to Pune and had a fairly large household shipment. The inventory process was clear and the support team kept us updated throughout the journey.",
    shortReview: "Clear communication throughout the move.",
  },
  {
    name: "Maithili Saran",
    location: "Greater Kailash, Delhi",
    rating: 5,
    review:
      "The crew arrived on time, protected the floors and furniture properly, and finished the loading faster than expected. The whole move felt organized rather than chaotic.",
    shortReview: "The team was organized and careful.",
  },
  {
    name: "Zorawar Bedi",
    location: "Noida",
    rating: 4.5,
    review:
      "Used NorthArc for an intercity move to Bengaluru. Communication was prompt and the packing quality was good. A couple of cartons arrived with minor scuffing, but nothing inside was damaged.",
    shortReview: "Good packing quality and prompt communication.",
  },
  {
    name: "Anvitha D'Souza",
    location: "Dwarka, Delhi",
    rating: 5,
    review:
      "We booked a 2 BHK local move. The quotation was easy to understand and there were no unexpected additions on moving day.",
    shortReview: "Straightforward pricing and smooth execution.",
  },
  {
    name: "Revaan Mukherjee",
    location: "Saket, Delhi",
    rating: 5,
    review:
      "The team handled a piano, bookshelves and several fragile pieces for our relocation. They were methodical and communicated before moving anything unusually large.",
    shortReview: "Handled fragile and oversized items thoughtfully.",
  },
  {
    name: "Eshani Kapoor",
    location: "Indirapuram, Ghaziabad",
    rating: 4.5,
    review:
      "Good experience overall. The packing team was courteous and the delivery schedule was communicated clearly.",
    shortReview: "Courteous team with clear scheduling.",
  },
  {
    name: "Aaryanvi Shah",
    location: "Sector 18, Noida",
    rating: 5,
    review:
      "We needed office equipment moved over a weekend. The team worked around our schedule and completed the relocation without disrupting our Monday operations.",
    shortReview: "Smooth weekend office relocation.",
  },
];

// ─── 7. FAQ Data ─────────────────────────────────────────────────────────────

export const faqData: FaqItem[] = [
  {
    question: "Do you provide local shifting services in Delhi?",
    answer:
      "Yes. NorthArc Relocations provides local household and office shifting services across Delhi and Delhi NCR.",
  },
  {
    question: "Do you move household goods outside Delhi?",
    answer:
      "Yes. Domestic relocation services are available from Delhi NCR to major cities throughout India.",
  },
  {
    question: "Do you provide packing services separately?",
    answer:
      "Yes. Customers can book packing-only services when transportation is not required.",
  },
  {
    question: "Do you transport cars?",
    answer:
      "Yes. Car transportation is available between Delhi NCR and multiple cities across India.",
  },
  {
    question: "Do you transport bikes and scooters?",
    answer:
      "Yes. Motorcycles and scooters can be transported using appropriate vehicle-handling and securing methods.",
  },
  {
    question: "Do you provide storage?",
    answer:
      "Yes. Short-term and long-term storage options are available for household and commercial goods.",
  },
  {
    question: "Can you dismantle furniture?",
    answer:
      "Yes. Suitable furniture can be dismantled before transportation and reassembled at the destination.",
  },
  {
    question: "How is the moving cost calculated?",
    answer:
      "Pricing generally depends on the volume of goods, distance, packing requirements, floor access, lift availability, vehicle requirements and additional services.",
  },
  {
    question: "Can I get an estimate before booking?",
    answer:
      "Yes. Customers can request an initial estimate by providing their pickup location, destination, moving date and approximate inventory.",
  },
  {
    question: "Do you provide insurance?",
    answer:
      "Transit protection options may be available depending on the shipment and service selected. Coverage terms should be confirmed before booking.",
  },
  {
    question: "How early should I book my move?",
    answer:
      "For planned household moves, booking several days in advance is recommended. Weekend, month-end and peak-season moves may require earlier scheduling.",
  },
  {
    question: "Do you move fragile items?",
    answer:
      "Yes. Fragile goods such as glassware, artwork, mirrors, electronics and crockery can receive specialized packing.",
  },
  {
    question: "Can I track my shipment?",
    answer:
      "Tracking availability depends on the transportation service and shipment type. Customers receive relevant movement updates from the operations team.",
  },
  {
    question: "Do you work on weekends?",
    answer:
      "Yes. Moving services are available seven days a week, subject to scheduling and availability.",
  },
  {
    question: "Do you provide office relocation services?",
    answer:
      "Yes. NorthArc handles office furniture, electronics, files, equipment and other workplace assets.",
  },
];

export const faqDataHi: FaqItem[] = [
  {
    question: "क्या आप दिल्ली में लोकल शिफ्टिंग सेवाएं प्रदान करते हैं?",
    answer:
      "हाँ। नॉर्थआर्क रिलोकेशन्स दिल्ली और दिल्ली NCR में घरेलू और ऑफिस शिफ्टिंग सेवाएं प्रदान करता है।",
  },
  {
    question: "क्या आप दिल्ली के बाहर घरेलू सामान भेजते हैं?",
    answer:
      "हाँ। दिल्ली NCR से भारत भर के प्रमुख शहरों तक घरेलू रिलोकेशन सेवाएं उपलब्ध हैं।",
  },
  {
    question: "क्या आप अलग से पैकिंग सेवाएं प्रदान करते हैं?",
    answer:
      "हाँ। जब ट्रांसपोर्टेशन की आवश्यकता न हो तो ग्राहक केवल पैकिंग सेवा बुक कर सकते हैं।",
  },
  {
    question: "क्या आप कार ट्रांसपोर्ट करते हैं?",
    answer:
      "हाँ। दिल्ली NCR और भारत भर के कई शहरों के बीच कार ट्रांसपोर्टेशन उपलब्ध है।",
  },
  {
    question: "क्या आप बाइक और स्कूटर ट्रांसपोर्ट करते हैं?",
    answer:
      "हाँ। मोटरसाइकिल और स्कूटर को उचित वाहन-हैंडलिंग और सुरक्षित तरीकों से ट्रांसपोर्ट किया जा सकता है।",
  },
  {
    question: "क्या आप स्टोरेज की सुविधा देते हैं?",
    answer:
      "हाँ। घरेलू और व्यावसायिक सामान के लिए अल्पकालिक और दीर्घकालिक स्टोरेज विकल्प उपलब्ध हैं।",
  },
  {
    question: "क्या आप फर्नीचर को खोल सकते हैं?",
    answer:
      "हाँ। उपयुक्त फर्नीचर को ट्रांसपोर्टेशन से पहले खोला जा सकता है और गंतव्य पर फिर से जोड़ा जा सकता है।",
  },
  {
    question: "मूविंग की लागत कैसे निर्धारित होती है?",
    answer:
      "कीमत आम तौर पर सामान की मात्रा, दूरी, पैकिंग आवश्यकताओं, फ्लोर एक्सेस, लिफ्ट उपलब्धता, वाहन आवश्यकताओं और अतिरिक्त सेवाओं पर निर्भर करती है।",
  },
  {
    question: "क्या मैं बुकिंग से पहले अनुमान प्राप्त कर सकता हूँ?",
    answer:
      "हाँ। ग्राहक अपना पिकअप स्थान, गंतव्य, मूविंग तिथि और अनुमानित सामान की जानकारी देकर प्रारंभिक अनुमान का अनुरोध कर सकते हैं।",
  },
  {
    question: "क्या आप बीमा प्रदान करते हैं?",
    answer:
      "ट्रांजिट सुरक्षा विकल्प शिपमेंट और चुनी गई सेवा के आधार पर उपलब्ध हो सकते हैं। कवरेज की शर्तों की पुष्टि बुकिंग से पहले की जानी चाहिए।",
  },
  {
    question: "मुझे अपना मूव कितने पहले बुक करना चाहिए?",
    answer:
      "नियोजित घरेलू मूव्स के लिए कई दिन पहले बुकिंग की सिफारिश की जाती है। वीकेंड, महीने के अंत और पीक-सीज़न मूव्स के लिए पहले से शेड्यूलिंग आवश्यक हो सकती है।",
  },
  {
    question: "क्या आप नाज़ुक सामान भी ले जाते हैं?",
    answer:
      "हाँ। काँच के बर्तन, कलाकृतियाँ, शीशे, इलेक्ट्रॉनिक्स और क्रॉकरी जैसे नाज़ुक सामान को विशेष पैकिंग दी जा सकती है।",
  },
  {
    question: "क्या मैं अपने शिपमेंट को ट्रैक कर सकता हूँ?",
    answer:
      "ट्रैकिंग उपलब्धता ट्रांसपोर्टेशन सेवा और शिपमेंट प्रकार पर निर्भर करती है। ग्राहकों को ऑपरेशन टीम से प्रासंगिक मूवमेंट अपडेट प्राप्त होते हैं।",
  },
  {
    question: "क्या आप वीकेंड पर काम करते हैं?",
    answer:
      "हाँ। मूविंग सेवाएं सप्ताह के सातों दिन उपलब्ध हैं, शेड्यूलिंग और उपलब्धता के अधीन।",
  },
  {
    question: "क्या आप ऑफिस रिलोकेशन सेवाएं प्रदान करते हैं?",
    answer:
      "हाँ। नॉर्थआर्क ऑफिस फर्नीचर, इलेक्ट्रॉनिक्स, फाइलें, उपकरण और अन्य कार्यस्थल संपत्तियों को संभालता है।",
  },
];

// ─── 8. Team Members ─────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    name: "Aviraj Sen",
    role: "Managing Director",
    roleHi: "प्रबंध निदेशक",
    location: "Delhi",
  },
  {
    name: "Mihira Vaid",
    role: "Operations Director",
    roleHi: "संचालन निदेशक",
    location: "Delhi",
  },
  {
    name: "Reyansh Batra",
    role: "Head of Customer Experience",
    roleHi: "ग्राहक अनुभव प्रमुख",
    location: "Noida",
  },
  {
    name: "Tavishi Mehra",
    role: "Regional Operations Manager",
    roleHi: "क्षेत्रीय संचालन प्रबंधक",
    location: "Delhi NCR",
  },
  {
    name: "Ishaan Daryani",
    role: "Relocation Consultant",
    roleHi: "रिलोकेशन सलाहकार",
    location: "Gurugram",
  },
  {
    name: "Nakul Bhandari",
    role: "Fleet & Transport Manager",
    roleHi: "बेड़ा और परिवहन प्रबंधक",
    location: "Delhi",
  },
  {
    name: "Eshaan Kohli",
    role: "Corporate Relocation Manager",
    roleHi: "कॉर्पोरेट रिलोकेशन प्रबंधक",
    location: "Gurugram",
  },
  {
    name: "Varenya Sethi",
    role: "Warehouse Manager",
    roleHi: "वेयरहाउस प्रबंधक",
    location: "Delhi",
  },
  {
    name: "Ronav Malhotra",
    role: "Quality & Claims Manager",
    roleHi: "गुणवत्ता और दावा प्रबंधक",
    location: "Delhi",
  },
  {
    name: "Ahaana Grover",
    role: "Customer Support Lead",
    roleHi: "ग्राहक सहायता प्रमुख",
    location: "Delhi",
  },
];

// ─── 9. Corporate Clients ────────────────────────────────────────────────────

export const corporateClients: string[] = [
  "Meridian Pixelworks Pvt. Ltd.",
  "Asterion Analytics India",
  "Velora Foods & Beverages",
  "Kestrel Mobility Solutions",
  "Bluehaven Digital Systems",
  "Arclight Design Studio",
  "Nivara Financial Services",
  "Terranova Consulting Group",
];

// ─── 10. Location Data ──────────────────────────────────────────────────────

export const locationData: Record<string, string[]> = {
  delhi: [
    "Saket",
    "Vasant Kunj",
    "Vasant Vihar",
    "Hauz Khas",
    "Greater Kailash",
    "Defence Colony",
    "Lajpat Nagar",
    "Kalkaji",
    "South Extension",
    "Dwarka",
    "Janakpuri",
    "Rajouri Garden",
    "Punjabi Bagh",
    "Pitampura",
    "Rohini",
    "Shalimar Bagh",
    "Model Town",
    "Civil Lines",
    "Karol Bagh",
    "Patel Nagar",
    "Mayur Vihar",
    "Preet Vihar",
    "Laxmi Nagar",
    "Shahdara",
    "Okhla",
    "Chattarpur",
    "Mehrauli",
    "Paschim Vihar",
  ],
  gurugram: [
    "DLF Phase 1-4",
    "Golf Course Road",
    "Golf Course Extension Road",
    "Sohna Road",
    "Sector 14",
    "Sector 21",
    "Sector 43",
    "Sector 49",
    "Sector 56",
    "Sector 57",
    "New Gurgaon",
    "Dwarka Expressway",
  ],
  noida: [
    "Sector 15",
    "Sector 18",
    "Sector 27",
    "Sector 34",
    "Sector 50",
    "Sector 51",
    "Sector 62",
    "Sector 75",
    "Sector 76",
    "Sector 93",
    "Sector 100",
    "Sector 137",
    "Sector 143",
    "Greater Noida",
  ],
  ghaziabad: [
    "Indirapuram",
    "Vaishali",
    "Vasundhara",
    "Raj Nagar",
    "Raj Nagar Extension",
    "Crossings Republik",
    "Kaushambi",
    "Sahibabad",
  ],
  faridabad: [
    "Sector 15",
    "Sector 16",
    "Sector 21",
    "Sector 28",
    "Sector 37",
    "Sector 46",
    "Neharpar",
    "Greater Faridabad",
  ],
};

// ─── 11. Intercity Destinations ──────────────────────────────────────────────

export const intercityDestinations: Record<string, string[]> = {
  north: [
    "Chandigarh",
    "Mohali",
    "Jaipur",
    "Ajmer",
    "Dehradun",
    "Haridwar",
    "Lucknow",
    "Kanpur",
    "Amritsar",
    "Jammu",
  ],
  west: [
    "Mumbai",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Nashik",
    "Indore",
    "Bhopal",
    "Udaipur",
  ],
  south: [
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kochi",
    "Coimbatore",
    "Mysuru",
    "Madurai",
    "Vijayawada",
  ],
  east: [
    "Kolkata",
    "Bhubaneswar",
    "Ranchi",
    "Patna",
    "Jamshedpur",
    "Guwahati",
  ],
};

// ─── 12. Operating Hubs ─────────────────────────────────────────────────────

export const operatingHubs: OperatingHub[] = [
  { city: "Delhi NCR", role: "Delhi NCR Hub" },
  { city: "Chandigarh", role: "North Hub" },
  { city: "Jaipur", role: "West Hub" },
  { city: "Indore", role: "Central Hub" },
  { city: "Mumbai", role: "West Coast Hub" },
  { city: "Bengaluru", role: "South Hub" },
  { city: "Kolkata", role: "East Hub" },
];

// ─── 13. Awards ──────────────────────────────────────────────────────────────

export const awards: Award[] = [
  {
    year: 2025,
    title: "Delhi NCR Relocation Service Excellence Award",
    titleHi: "दिल्ली NCR रिलोकेशन सेवा उत्कृष्टता पुरस्कार",
  },
  {
    year: 2024,
    title: "Customer Service Recognition – North India Logistics Forum",
    titleHi: "ग्राहक सेवा मान्यता – उत्तर भारत लॉजिस्टिक्स फोरम",
  },
  {
    year: 2023,
    title: "Emerging Relocation Brand – Delhi Business Network",
    titleHi: "उभरता रिलोकेशन ब्रांड – दिल्ली बिज़नेस नेटवर्क",
  },
];

// ─── 14. Stats ───────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { value: 18500, labelEn: "Homes Relocated", labelHi: "घरों का स्थानांतरण" },
  { value: 120, labelEn: "Cities Served", labelHi: "शहरों में सेवा" },
  { value: 1250, labelEn: "Corporate Moves", labelHi: "कॉर्पोरेट मूव्स" },
  {
    value: 6800,
    labelEn: "Vehicles Transported",
    labelHi: "वाहन ट्रांसपोर्ट",
  },
  { value: 42, labelEn: "Active Fleet", labelHi: "सक्रिय बेड़ा" },
  {
    value: 96,
    labelEn: "Customer Satisfaction %",
    labelHi: "ग्राहक संतुष्टि %",
  },
  { value: 85, labelEn: "Moving Staff", labelHi: "मूविंग स्टाफ" },
  {
    value: 18000,
    labelEn: "Storage (sq ft)",
    labelHi: "स्टोरेज (वर्ग फीट)",
  },
];

// ─── 15. Gallery Images ─────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  {
    src: "/service-packing.webp",
    category: "packing",
    altEn: "Professional packing services",
    altHi: "प्रोफेशनल पैकिंग",
  },
  {
    src: "/gallery-1.webp",
    category: "loading",
    altEn: "Organized truck loading",
    altHi: "व्यवस्थित ट्रक लोडिंग",
  },
  {
    src: "/gallery-2.webp",
    category: "packing",
    altEn: "Electronics protection",
    altHi: "इलेक्ट्रॉनिक्स सुरक्षा",
  },
  {
    src: "/gallery-3.webp",
    category: "loading",
    altEn: "Furniture unloading",
    altHi: "फर्नीचर अनलोडिंग",
  },
  {
    src: "/gallery-4.webp",
    category: "packing",
    altEn: "Ready for pickup",
    altHi: "पिकअप के लिए तैयार",
  },
  {
    src: "/gallery-5.webp",
    category: "vehicles",
    altEn: "Bike transport",
    altHi: "बाइक ट्रांसपोर्ट",
  },
  {
    src: "/gallery-6.webp",
    category: "storage",
    altEn: "Warehouse storage",
    altHi: "वेयरहाउस स्टोरेज",
  },
  {
    src: "/service-office.webp",
    category: "loading",
    altEn: "Office relocation",
    altHi: "ऑफिस रिलोकेशन",
  },
  {
    src: "/service-vehicle.webp",
    category: "vehicles",
    altEn: "Car transport",
    altHi: "कार ट्रांसपोर्ट",
  },
  {
    src: "/service-storage.webp",
    category: "storage",
    altEn: "Storage facility",
    altHi: "स्टोरेज सुविधा",
  },
  {
    src: "/fleet.webp",
    category: "vehicles",
    altEn: "Moving fleet",
    altHi: "मूविंग फ्लीट",
  },
  {
    src: "/service-furniture.webp",
    category: "packing",
    altEn: "Furniture handling",
    altHi: "फर्नीचर हैंडलिंग",
  },
  {
    src: "/service-loading.webp",
    category: "loading",
    altEn: "Loading assistance",
    altHi: "लोडिंग सहायता",
  },
  {
    src: "/hero-loading.webp",
    category: "loading",
    altEn: "Professional loading",
    altHi: "प्रोफेशनल लोडिंग",
  },
];

// ─── 16. Property Types ─────────────────────────────────────────────────────

export const propertyTypes: string[] = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Villa",
  "Office",
  "Other",
];

// ─── 17. Service Options ────────────────────────────────────────────────────

export const serviceOptions: string[] = [
  "Packing",
  "Loading",
  "Transportation",
  "Unloading",
  "Unpacking",
  "Furniture Dismantling",
  "Furniture Assembly",
  "Vehicle Transportation",
  "Storage",
];

// ─── 18. Vehicle Types ──────────────────────────────────────────────────────

export const vehicleTypes: string[] = [
  "Car",
  "Bike",
  "Scooter",
  "Not Applicable",
];
