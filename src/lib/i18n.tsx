import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Lang = "en" | "hi";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("northarc-lang") as Lang) || "en"
  );

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("northarc-lang", l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const val = translations[lang]?.[key];
      if (val !== undefined) return val;
      return translations.en[key] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.locations": "Locations",
    "nav.gallery": "Gallery",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.getQuote": "Get Free Estimate",
    "nav.quote": "Quote",

    // Hero
    "hero.tagline": "Moving Life Forward",
    "hero.headline": "Move Without the Mayhem",
    "hero.sub": "Professional packing, shifting and relocation services from Delhi NCR to destinations across India.",
    "hero.cta1": "Get Free Estimate",
    "hero.cta2": "Talk to an Expert",

    // Marquee
    "marquee.homes": "18,500+ Homes Relocated",
    "marquee.cities": "120+ Cities Served",
    "marquee.satisfaction": "96% Customer Satisfaction",
    "marquee.experience": "12+ Years Experience",
    "marquee.fleet": "42 Vehicle Fleet",
    "marquee.corporate": "1,250+ Corporate Moves",
    "marquee.vehicles": "6,800+ Vehicles Transported",

    // Quick Quote
    "quickQuote.title": "Get a Quick Estimate",
    "quickQuote.pickup": "Pickup City",
    "quickQuote.destination": "Destination City",
    "quickQuote.propertyType": "Property Type",
    "quickQuote.date": "Moving Date",
    "quickQuote.submit": "Get Estimate on WhatsApp",
    "quickQuote.name": "Your Name",
    "quickQuote.phone": "Phone Number",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Complete relocation solutions for every need",
    "services.viewAll": "View All Services",
    "services.household.name": "Household Shifting",
    "services.household.desc": "Complete home shifting from 1BHK to villas — packing, loading, transport, unloading and placement.",
    "services.local.name": "Local Shifting",
    "services.local.desc": "Residential relocation within Delhi, Gurugram, Noida, Ghaziabad and Faridabad.",
    "services.intercity.name": "Intercity Relocation",
    "services.intercity.desc": "Door-to-door household relocation between Delhi NCR and cities across India.",
    "services.office.name": "Office Relocation",
    "services.office.desc": "Structured relocation for offices, startups, studios and commercial workplaces.",
    "services.vehicle.name": "Vehicle Transport",
    "services.vehicle.desc": "Transportation of cars, motorcycles and scooters across India with secure handling.",
    "services.packing.name": "Professional Packing",
    "services.packing.desc": "Expert packing with cartons, bubble wrap, stretch film and specialized materials.",
    "services.loading.name": "Loading & Unloading",
    "services.loading.desc": "Trained moving teams handle lifting, loading, unloading and careful placement.",
    "services.storage.name": "Storage Solutions",
    "services.storage.desc": "Secure short-term and long-term storage in our 18,000 sq ft facility.",
    "services.furniture.name": "Furniture Handling",
    "services.furniture.desc": "Dismantling, protective packing, transport and reassembly of furniture items.",
    "services.learnMore": "Learn More",
    "services.bookNow": "Book This Service",
    "services.hero.title": "Our Services",
    "services.hero.subtitle": "Comprehensive relocation solutions tailored to every need — from a single room to an entire office.",

    // How It Works
    "howItWorks.title": "How It Works",
    "howItWorks.subtitle": "Your move in 10 simple steps",
    "howItWorks.viewProcess": "See Full Process",
    "step.1": "Enquiry",
    "step.1.desc": "Share your pickup, destination, inventory and preferred moving date.",
    "step.2": "Assessment",
    "step.2.desc": "We evaluate shipment volume, access conditions and service requirements.",
    "step.3": "Quote",
    "step.3.desc": "Receive an estimated relocation cost and service summary.",
    "step.4": "Booking",
    "step.4.desc": "Confirm your moving date and required services.",
    "step.5": "Packing",
    "step.5.desc": "Our team packs belongings using appropriate protective materials.",
    "step.6": "Loading",
    "step.6.desc": "Packed goods are inventoried and loaded into the designated vehicle.",
    "step.7": "Transportation",
    "step.7.desc": "Your shipment travels to the destination via the assigned route.",
    "step.8": "Unloading",
    "step.8.desc": "Goods are carefully unloaded at the destination.",
    "step.9": "Unpacking",
    "step.9.desc": "Unpacking and basic placement assistance for your belongings.",
    "step.10": "Completion",
    "step.10.desc": "You verify delivery and the relocation order is closed.",

    // Pricing
    "pricing.title": "Transparent Pricing",
    "pricing.subtitle": "Clear packages with no hidden charges",
    "pricing.viewAll": "View All Pricing",
    "pricing.startingAt": "Starting at",
    "pricing.getQuote": "Get Quote",
    "pricing.essential.name": "Essential Move",
    "pricing.essential.price": "₹3,499",
    "pricing.essential.f1": "Basic packing",
    "pricing.essential.f2": "Loading",
    "pricing.essential.f3": "Transportation",
    "pricing.essential.f4": "Unloading",
    "pricing.protected.name": "Protected Move",
    "pricing.protected.price": "₹5,499",
    "pricing.protected.f1": "Professional packing",
    "pricing.protected.f2": "Furniture protection",
    "pricing.protected.f3": "Loading & transportation",
    "pricing.protected.f4": "Unloading & basic unpacking",
    "pricing.complete.name": "Complete Move",
    "pricing.complete.price": "₹7,499",
    "pricing.complete.f1": "Full household packing",
    "pricing.complete.f2": "Fragile-item protection",
    "pricing.complete.f3": "Furniture dismantling & reassembly",
    "pricing.complete.f4": "Loading, transport & unloading",
    "pricing.complete.f5": "Unpacking & placement",
    "pricing.popular": "Most Popular",
    "pricing.note": "Final pricing depends on inventory volume, distance, floor access, lift availability, packing requirements and additional services.",
    "pricing.hero.title": "Pricing & Packages",
    "pricing.hero.subtitle": "Transparent pricing with packages designed for every budget and need.",
    "pricing.serviceWise": "Service-Wise Pricing",
    "pricing.routeWise": "Route-Wise Pricing",
    "pricing.calculator": "Quick Estimator",
    "pricing.calculator.desc": "Select your move type to get an approximate range",
    "pricing.seasonalOffer": "Seasonal Offer",
    "pricing.seasonalOffer.desc": "10% off packing services for selected weekday bookings",
    "pricing.cta": "Get Your Personalized Quote",

    // Routes
    "routes.title": "Popular Routes",
    "routes.subtitle": "Most booked intercity routes from Delhi",
    "routes.viewAll": "View All Routes",
    "routes.bookNow": "Book Now",

    // Service Areas
    "areas.title": "Service Areas",
    "areas.subtitle": "Covering every corner of Delhi NCR and beyond",
    "areas.viewAll": "See All Locations",
    "areas.localities": "localities",
    "areas.sectors": "sectors & areas",

    // Reviews
    "reviews.title": "What Our Customers Say",
    "reviews.subtitle": "Real experiences from real people",
    "reviews.viewAll": "Read More Reviews",

    // Why Choose
    "whyChoose.title": "Why Choose NorthArc",
    "whyChoose.subtitle": "Trusted by thousands of families and businesses",
    "whyChoose.gps": "GPS Tracking",
    "whyChoose.gps.desc": "Track your shipment in real-time during transit.",
    "whyChoose.packing": "Professional Packing",
    "whyChoose.packing.desc": "Industry-grade materials and expert techniques.",
    "whyChoose.support": "7-Day Availability",
    "whyChoose.support.desc": "Moving services available all seven days of the week.",
    "whyChoose.dedicated": "Dedicated Support",
    "whyChoose.dedicated.desc": "A single point of contact throughout your move.",
    "whyChoose.transparent": "Transparent Pricing",
    "whyChoose.transparent.desc": "No hidden costs. What you see is what you pay.",
    "whyChoose.insured": "Transit Protection",
    "whyChoose.insured.desc": "Protection options available for your shipment.",

    // Corporate
    "corporate.title": "Trusted by Leading Companies",
    "corporate.subtitle": "Corporate relocation solutions",
    "corporate.viewAll": "Corporate Services",

    // Awards
    "awards.title": "Awards & Recognition",
    "awards.subtitle": "Recognized for excellence in relocation services",

    // Gallery
    "gallery.title": "Our Work in Action",
    "gallery.subtitle": "See how we handle every move with care",
    "gallery.viewAll": "View Full Gallery",
    "gallery.hero.title": "Gallery",
    "gallery.hero.subtitle": "See our work in action — from careful packing to safe delivery.",
    "gallery.all": "All",
    "gallery.packing": "Packing",
    "gallery.loading": "Loading",
    "gallery.transport": "Transport",
    "gallery.storage": "Storage",
    "gallery.vehicles": "Vehicles",

    // Seasonal Offer
    "offer.title": "Special Offer",
    "offer.desc": "Get 10% off on packing services for selected weekday bookings. Limited time offer!",
    "offer.cta": "Claim Offer",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know about our services",
    "faq.viewAll": "View All FAQs",
    "faq.hero.title": "FAQ",
    "faq.hero.subtitle": "Got questions? We have answers.",
    "faq.stillQuestions": "Still have questions?",
    "faq.stillQuestions.desc": "Our team is ready to help you with anything.",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "We'd love to hear from you",
    "contact.form.title": "Request a Quote",
    "contact.form.name": "Full Name",
    "contact.form.phone": "Phone Number",
    "contact.form.email": "Email Address",
    "contact.form.pickup": "Pickup Location",
    "contact.form.destination": "Destination",
    "contact.form.date": "Preferred Moving Date",
    "contact.form.propertyType": "Property Type",
    "contact.form.services": "Services Required",
    "contact.form.vehicleType": "Vehicle Type (if applicable)",
    "contact.form.additionalInfo": "Additional Information",
    "contact.form.submit": "Send Quote Request via WhatsApp",
    "contact.headOffice": "Head Office",
    "contact.opsOffice": "Operations Office",
    "contact.corporateDesk": "Corporate Desk",
    "contact.workingHours": "Working Hours",
    "contact.monSat": "Mon–Sat: 8:00 AM – 8:00 PM",
    "contact.sun": "Sunday: 9:00 AM – 5:00 PM",
    "contact.support": "Support: 8 AM – 9 PM, all days",
    "contact.hero.title": "Contact Us",
    "contact.hero.subtitle": "Get in touch for a free estimate or any questions about your move.",
    "contact.callUs": "Call Us",
    "contact.whatsapp": "WhatsApp",
    "contact.emailUs": "Email Us",

    // About
    "about.title": "About NorthArc",
    "about.subtitle": "Moving Life Forward since 2014",
    "about.hero.title": "About Us",
    "about.hero.subtitle": "Delhi's trusted relocation partner since 2014.",
    "about.story.title": "Our Story",
    "about.story.p1": "Founded in 2014 in New Delhi, NorthArc Relocations started with a simple mission — to make moving less stressful for families and businesses across India.",
    "about.story.p2": "Over 12 years, we've grown from a small team in Delhi to a nationwide network covering 120+ cities, with a fleet of 42 vehicles and 85+ trained professionals.",
    "about.story.p3": "Our brand promise remains unchanged: Careful packing. Clear communication. Reliable movement.",
    "about.team.title": "Meet Our Team",
    "about.team.subtitle": "The people behind every successful move",
    "about.fleet.title": "Our Fleet",
    "about.fleet.desc": "42 GPS-enabled vehicles ranging from mini trucks to container carriers, equipped with moving blankets and load-securing equipment.",
    "about.warehouse.title": "Our Warehouse",
    "about.warehouse.desc": "18,000 sq ft secure storage facility at Okhla Industrial Estate, featuring CCTV monitoring, controlled access, pest control and fire safety systems.",
    "about.awards.title": "Awards & Recognition",
    "about.credentials.title": "Business Credentials",
    "about.corporate.title": "Corporate Clients",

    // Locations
    "locations.hero.title": "Service Locations",
    "locations.hero.subtitle": "We cover Delhi NCR and beyond — 120+ cities across India.",
    "locations.ncr.title": "Delhi NCR Coverage",
    "locations.intercity.title": "Intercity Destinations",
    "locations.hubs.title": "Operating Hubs",
    "locations.popularRoutes": "Popular Routes with Pricing",
    "locations.northIndia": "North India",
    "locations.westIndia": "West India",
    "locations.southIndia": "South India",
    "locations.eastIndia": "East India",

    // Footer
    "footer.desc": "Delhi-based professional packers and movers providing household shifting, office relocation, vehicle transportation and storage services across India.",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contactInfo": "Contact Info",
    "footer.followUs": "Follow Us",
    "footer.rights": "All rights reserved.",
    "footer.gstin": "GSTIN",
    "footer.pan": "PAN",

    // Common
    "common.viewMore": "View More",
    "common.bookNow": "Book Now",
    "common.callNow": "Call Now",
    "common.whatsappNow": "WhatsApp Now",
    "common.since": "Since 2014",
    "common.from": "From",
    "common.perMonth": "/month",
    "common.startingAt": "Starting at",
    "common.selectOption": "Select an option",
    "common.select": "Select",
  },
  hi: {
    // Nav
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    "nav.pricing": "मूल्य",
    "nav.about": "हमारे बारे में",
    "nav.locations": "सेवा क्षेत्र",
    "nav.gallery": "गैलरी",
    "nav.faq": "FAQ",
    "nav.contact": "संपर्क",
    "nav.getQuote": "मुफ़्त अनुमान पाएं",
    "nav.quote": "कोटेशन",

    // Hero
    "hero.tagline": "जीवन को आगे बढ़ाना",
    "hero.headline": "बिना परेशानी के करें शिफ्टिंग",
    "hero.sub": "दिल्ली NCR से पूरे भारत में प्रोफेशनल पैकिंग, शिफ्टिंग और रिलोकेशन सेवाएं।",
    "hero.cta1": "मुफ़्त अनुमान पाएं",
    "hero.cta2": "विशेषज्ञ से बात करें",

    // Marquee
    "marquee.homes": "18,500+ घरों का स्थानांतरण",
    "marquee.cities": "120+ शहरों में सेवा",
    "marquee.satisfaction": "96% ग्राहक संतुष्टि",
    "marquee.experience": "12+ वर्षों का अनुभव",
    "marquee.fleet": "42 वाहनों का बेड़ा",
    "marquee.corporate": "1,250+ कॉर्पोरेट मूव्स",
    "marquee.vehicles": "6,800+ वाहन ट्रांसपोर्ट",

    // Quick Quote
    "quickQuote.title": "त्वरित अनुमान प्राप्त करें",
    "quickQuote.pickup": "पिकअप शहर",
    "quickQuote.destination": "गंतव्य शहर",
    "quickQuote.propertyType": "प्रॉपर्टी का प्रकार",
    "quickQuote.date": "शिफ्टिंग की तारीख",
    "quickQuote.submit": "WhatsApp पर अनुमान पाएं",
    "quickQuote.name": "आपका नाम",
    "quickQuote.phone": "फोन नंबर",

    // Services
    "services.title": "हमारी सेवाएं",
    "services.subtitle": "हर ज़रूरत के लिए संपूर्ण रिलोकेशन समाधान",
    "services.viewAll": "सभी सेवाएं देखें",
    "services.household.name": "घरेलू शिफ्टिंग",
    "services.household.desc": "1BHK से लेकर विला तक — पैकिंग, लोडिंग, ट्रांसपोर्ट, अनलोडिंग और सेटअप।",
    "services.local.name": "लोकल शिफ्टिंग",
    "services.local.desc": "दिल्ली, गुरुग्राम, नोएडा, गाज़ियाबाद और फरीदाबाद में स्थानीय शिफ्टिंग।",
    "services.intercity.name": "अंतरशहर रिलोकेशन",
    "services.intercity.desc": "दिल्ली NCR से पूरे भारत में डोर-टू-डोर रिलोकेशन सेवा।",
    "services.office.name": "ऑफिस रिलोकेशन",
    "services.office.desc": "ऑफिस, स्टार्टअप, स्टूडियो और कमर्शियल वर्कस्पेस के लिए व्यवस्थित शिफ्टिंग।",
    "services.vehicle.name": "वाहन ट्रांसपोर्ट",
    "services.vehicle.desc": "कार, मोटरसाइकिल और स्कूटर का सुरक्षित परिवहन पूरे भारत में।",
    "services.packing.name": "प्रोफेशनल पैकिंग",
    "services.packing.desc": "कार्टन, बबल रैप, स्ट्रेच फिल्म और विशेष सामग्री से विशेषज्ञ पैकिंग।",
    "services.loading.name": "लोडिंग और अनलोडिंग",
    "services.loading.desc": "प्रशिक्षित टीम द्वारा सावधानीपूर्वक लोडिंग, अनलोडिंग और व्यवस्थापन।",
    "services.storage.name": "स्टोरेज सुविधा",
    "services.storage.desc": "18,000 वर्ग फीट की सुरक्षित स्टोरेज — अल्पकालिक और दीर्घकालिक दोनों।",
    "services.furniture.name": "फर्नीचर हैंडलिंग",
    "services.furniture.desc": "फर्नीचर का विघटन, सुरक्षात्मक पैकिंग, परिवहन और पुनः संयोजन।",
    "services.learnMore": "और जानें",
    "services.bookNow": "यह सेवा बुक करें",
    "services.hero.title": "हमारी सेवाएं",
    "services.hero.subtitle": "हर ज़रूरत के अनुसार तैयार की गई व्यापक रिलोकेशन सेवाएं।",

    // How It Works
    "howItWorks.title": "कैसे काम करता है",
    "howItWorks.subtitle": "10 आसान चरणों में आपकी शिफ्टिंग",
    "howItWorks.viewProcess": "पूरी प्रक्रिया देखें",
    "step.1": "पूछताछ",
    "step.1.desc": "पिकअप, गंतव्य, सामान की सूची और तारीख बताएं।",
    "step.2": "मूल्यांकन",
    "step.2.desc": "हम शिपमेंट का आकलन और सेवा आवश्यकताओं का मूल्यांकन करते हैं।",
    "step.3": "कोटेशन",
    "step.3.desc": "अनुमानित लागत और सेवा विवरण प्राप्त करें।",
    "step.4": "बुकिंग",
    "step.4.desc": "शिफ्टिंग की तारीख और सेवाएं कन्फर्म करें।",
    "step.5": "पैकिंग",
    "step.5.desc": "हमारी टीम उचित सुरक्षा सामग्री से पैकिंग करती है।",
    "step.6": "लोडिंग",
    "step.6.desc": "पैक किए गए सामान की सूची बनाकर वाहन में लोड किया जाता है।",
    "step.7": "परिवहन",
    "step.7.desc": "आपका शिपमेंट निर्धारित मार्ग से गंतव्य तक पहुंचता है।",
    "step.8": "अनलोडिंग",
    "step.8.desc": "गंतव्य पर सामान सावधानीपूर्वक उतारा जाता है।",
    "step.9": "अनपैकिंग",
    "step.9.desc": "सामान खोलकर उचित स्थान पर रखने में सहायता।",
    "step.10": "समापन",
    "step.10.desc": "आप डिलीवरी की पुष्टि करें और ऑर्डर बंद हो जाता है।",

    // Pricing
    "pricing.title": "पारदर्शी मूल्य",
    "pricing.subtitle": "बिना छिपे शुल्क के स्पष्ट पैकेज",
    "pricing.viewAll": "सभी मूल्य देखें",
    "pricing.startingAt": "शुरुआत",
    "pricing.getQuote": "कोटेशन लें",
    "pricing.essential.name": "एसेंशियल मूव",
    "pricing.essential.price": "₹3,499",
    "pricing.essential.f1": "बेसिक पैकिंग",
    "pricing.essential.f2": "लोडिंग",
    "pricing.essential.f3": "ट्रांसपोर्टेशन",
    "pricing.essential.f4": "अनलोडिंग",
    "pricing.protected.name": "प्रोटेक्टेड मूव",
    "pricing.protected.price": "₹5,499",
    "pricing.protected.f1": "प्रोफेशनल पैकिंग",
    "pricing.protected.f2": "फर्नीचर सुरक्षा",
    "pricing.protected.f3": "लोडिंग और ट्रांसपोर्ट",
    "pricing.protected.f4": "अनलोडिंग और बेसिक अनपैकिंग",
    "pricing.complete.name": "कम्प्लीट मूव",
    "pricing.complete.price": "₹7,499",
    "pricing.complete.f1": "पूरे घर की पैकिंग",
    "pricing.complete.f2": "नाज़ुक सामान की सुरक्षा",
    "pricing.complete.f3": "फर्नीचर विघटन और पुनः संयोजन",
    "pricing.complete.f4": "लोडिंग, ट्रांसपोर्ट और अनलोडिंग",
    "pricing.complete.f5": "अनपैकिंग और सेटअप",
    "pricing.popular": "सबसे लोकप्रिय",
    "pricing.note": "अंतिम मूल्य सामान की मात्रा, दूरी, फ्लोर एक्सेस, लिफ्ट की उपलब्धता, पैकिंग आवश्यकताओं और अतिरिक्त सेवाओं पर निर्भर करता है।",
    "pricing.hero.title": "मूल्य और पैकेज",
    "pricing.hero.subtitle": "हर बजट और ज़रूरत के लिए पारदर्शी मूल्य निर्धारण।",
    "pricing.serviceWise": "सेवा अनुसार मूल्य",
    "pricing.routeWise": "मार्ग अनुसार मूल्य",
    "pricing.calculator": "त्वरित अनुमानक",
    "pricing.calculator.desc": "अनुमानित श्रेणी जानने के लिए अपना मूव टाइप चुनें",
    "pricing.seasonalOffer": "सीज़नल ऑफर",
    "pricing.seasonalOffer.desc": "चुनिंदा वीकडे बुकिंग पर पैकिंग सेवाओं में 10% की छूट",
    "pricing.cta": "अपना व्यक्तिगत कोटेशन पाएं",

    // Routes
    "routes.title": "लोकप्रिय मार्ग",
    "routes.subtitle": "दिल्ली से सर्वाधिक बुक किए जाने वाले मार्ग",
    "routes.viewAll": "सभी मार्ग देखें",
    "routes.bookNow": "अभी बुक करें",

    // Service Areas
    "areas.title": "सेवा क्षेत्र",
    "areas.subtitle": "दिल्ली NCR के हर कोने में और उससे आगे",
    "areas.viewAll": "सभी लोकेशन देखें",
    "areas.localities": "इलाके",
    "areas.sectors": "सेक्टर और क्षेत्र",

    // Reviews
    "reviews.title": "हमारे ग्राहक क्या कहते हैं",
    "reviews.subtitle": "वास्तविक लोगों के वास्तविक अनुभव",
    "reviews.viewAll": "और समीक्षाएं पढ़ें",

    // Why Choose
    "whyChoose.title": "NorthArc क्यों चुनें",
    "whyChoose.subtitle": "हज़ारों परिवारों और व्यवसायों का भरोसा",
    "whyChoose.gps": "GPS ट्रैकिंग",
    "whyChoose.gps.desc": "ट्रांज़िट के दौरान अपने शिपमेंट को रियल-टाइम में ट्रैक करें।",
    "whyChoose.packing": "प्रोफेशनल पैकिंग",
    "whyChoose.packing.desc": "उद्योग-स्तरीय सामग्री और विशेषज्ञ तकनीक।",
    "whyChoose.support": "सप्ताह के 7 दिन उपलब्ध",
    "whyChoose.support.desc": "सातों दिन शिफ्टिंग सेवाएं उपलब्ध।",
    "whyChoose.dedicated": "समर्पित सहायता",
    "whyChoose.dedicated.desc": "पूरी शिफ्टिंग के दौरान एक ही संपर्क व्यक्ति।",
    "whyChoose.transparent": "पारदर्शी मूल्य",
    "whyChoose.transparent.desc": "कोई छिपी लागत नहीं। जो दिखता है वही देना है।",
    "whyChoose.insured": "ट्रांज़िट सुरक्षा",
    "whyChoose.insured.desc": "आपके शिपमेंट के लिए सुरक्षा विकल्प उपलब्ध।",

    // Corporate
    "corporate.title": "प्रमुख कंपनियों का भरोसा",
    "corporate.subtitle": "कॉर्पोरेट रिलोकेशन समाधान",
    "corporate.viewAll": "कॉर्पोरेट सेवाएं",

    // Awards
    "awards.title": "पुरस्कार और मान्यता",
    "awards.subtitle": "रिलोकेशन सेवाओं में उत्कृष्टता के लिए सम्मानित",

    // Gallery
    "gallery.title": "हमारा काम देखें",
    "gallery.subtitle": "देखें कि हम हर शिफ्टिंग को कैसे संभालते हैं",
    "gallery.viewAll": "पूरी गैलरी देखें",
    "gallery.hero.title": "गैलरी",
    "gallery.hero.subtitle": "सावधानीपूर्वक पैकिंग से लेकर सुरक्षित डिलीवरी तक — हमारा काम देखें।",
    "gallery.all": "सभी",
    "gallery.packing": "पैकिंग",
    "gallery.loading": "लोडिंग",
    "gallery.transport": "ट्रांसपोर्ट",
    "gallery.storage": "स्टोरेज",
    "gallery.vehicles": "वाहन",

    // Seasonal Offer
    "offer.title": "विशेष ऑफर",
    "offer.desc": "चुनिंदा वीकडे बुकिंग पर पैकिंग सेवाओं में 10% की छूट। सीमित समय का ऑफर!",
    "offer.cta": "ऑफर लें",

    // FAQ
    "faq.title": "अक्सर पूछे जाने वाले प्रश्न",
    "faq.subtitle": "हमारी सेवाओं के बारे में सब कुछ जानें",
    "faq.viewAll": "सभी FAQ देखें",
    "faq.hero.title": "FAQ",
    "faq.hero.subtitle": "कोई सवाल है? हमारे पास जवाब हैं।",
    "faq.stillQuestions": "अभी भी सवाल हैं?",
    "faq.stillQuestions.desc": "हमारी टीम आपकी हर मदद के लिए तैयार है।",

    // Contact
    "contact.title": "संपर्क करें",
    "contact.subtitle": "हम आपसे सुनना चाहेंगे",
    "contact.form.title": "कोटेशन का अनुरोध करें",
    "contact.form.name": "पूरा नाम",
    "contact.form.phone": "फोन नंबर",
    "contact.form.email": "ईमेल पता",
    "contact.form.pickup": "पिकअप लोकेशन",
    "contact.form.destination": "गंतव्य",
    "contact.form.date": "शिफ्टिंग की तारीख",
    "contact.form.propertyType": "प्रॉपर्टी का प्रकार",
    "contact.form.services": "आवश्यक सेवाएं",
    "contact.form.vehicleType": "वाहन का प्रकार (यदि लागू हो)",
    "contact.form.additionalInfo": "अतिरिक्त जानकारी",
    "contact.form.submit": "WhatsApp पर कोटेशन भेजें",
    "contact.headOffice": "मुख्य कार्यालय",
    "contact.opsOffice": "ऑपरेशंस कार्यालय",
    "contact.corporateDesk": "कॉर्पोरेट डेस्क",
    "contact.workingHours": "कार्य समय",
    "contact.monSat": "सोम-शनि: सुबह 8 – रात 8",
    "contact.sun": "रविवार: सुबह 9 – शाम 5",
    "contact.support": "सहायता: सुबह 8 – रात 9, सभी दिन",
    "contact.hero.title": "संपर्क करें",
    "contact.hero.subtitle": "मुफ़्त अनुमान या अपने मूव से जुड़े किसी भी सवाल के लिए संपर्क करें।",
    "contact.callUs": "कॉल करें",
    "contact.whatsapp": "WhatsApp",
    "contact.emailUs": "ईमेल करें",

    // About
    "about.title": "NorthArc के बारे में",
    "about.subtitle": "2014 से जीवन को आगे बढ़ा रहे हैं",
    "about.hero.title": "हमारे बारे में",
    "about.hero.subtitle": "2014 से दिल्ली का विश्वसनीय रिलोकेशन पार्टनर।",
    "about.story.title": "हमारी कहानी",
    "about.story.p1": "2014 में नई दिल्ली में स्थापित, NorthArc Relocations एक सीधे उद्देश्य से शुरू हुआ — परिवारों और व्यवसायों के लिए शिफ्टिंग को कम तनावपूर्ण बनाना।",
    "about.story.p2": "12+ वर्षों में, हम दिल्ली की एक छोटी टीम से 120+ शहरों को कवर करने वाले देशव्यापी नेटवर्क तक पहुंचे हैं, जिसमें 42 वाहन और 85+ प्रशिक्षित पेशेवर शामिल हैं।",
    "about.story.p3": "हमारा ब्रांड वादा अभी भी वही है: सावधानीपूर्वक पैकिंग। स्पष्ट संवाद। विश्वसनीय परिवहन।",
    "about.team.title": "हमारी टीम से मिलें",
    "about.team.subtitle": "हर सफल शिफ्टिंग के पीछे ये लोग हैं",
    "about.fleet.title": "हमारा वाहन बेड़ा",
    "about.fleet.desc": "मिनी ट्रक से कंटेनर कैरियर तक 42 GPS-सक्षम वाहन, मूविंग ब्लैंकेट और लोड-सिक्योरिंग उपकरणों से लैस।",
    "about.warehouse.title": "हमारा वेयरहाउस",
    "about.warehouse.desc": "ओखला इंडस्ट्रियल एस्टेट में 18,000 वर्ग फीट का सुरक्षित स्टोरेज — CCTV, एक्सेस कंट्रोल, पेस्ट कंट्रोल और फायर सेफ्टी सिस्टम से लैस।",
    "about.awards.title": "पुरस्कार और मान्यता",
    "about.credentials.title": "व्यावसायिक प्रमाणपत्र",
    "about.corporate.title": "कॉर्पोरेट क्लाइंट",

    // Locations
    "locations.hero.title": "सेवा क्षेत्र",
    "locations.hero.subtitle": "दिल्ली NCR और उससे आगे — 120+ शहरों में सेवा।",
    "locations.ncr.title": "दिल्ली NCR कवरेज",
    "locations.intercity.title": "अंतरशहर गंतव्य",
    "locations.hubs.title": "ऑपरेटिंग हब",
    "locations.popularRoutes": "लोकप्रिय मार्ग और मूल्य",
    "locations.northIndia": "उत्तर भारत",
    "locations.westIndia": "पश्चिम भारत",
    "locations.southIndia": "दक्षिण भारत",
    "locations.eastIndia": "पूर्व भारत",

    // Footer
    "footer.desc": "दिल्ली स्थित प्रोफेशनल पैकर्स और मूवर्स — घरेलू शिफ्टिंग, ऑफिस रिलोकेशन, वाहन परिवहन और स्टोरेज सेवाएं पूरे भारत में।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.services": "सेवाएं",
    "footer.contactInfo": "संपर्क जानकारी",
    "footer.followUs": "सोशल मीडिया",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.gstin": "GSTIN",
    "footer.pan": "PAN",

    // Common
    "common.viewMore": "और देखें",
    "common.bookNow": "अभी बुक करें",
    "common.callNow": "अभी कॉल करें",
    "common.whatsappNow": "WhatsApp करें",
    "common.since": "2014 से",
    "common.from": "शुरुआत",
    "common.perMonth": "/माह",
    "common.startingAt": "शुरुआत",
    "common.selectOption": "एक विकल्प चुनें",
    "common.select": "चुनें",
  },
};
