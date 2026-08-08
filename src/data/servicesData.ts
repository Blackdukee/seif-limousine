export interface ServiceInfo {
  slug: string;
  iconName: string;
  heroImage: string;
  en: {
    title: string;
    eyebrow: string;
    description: string;
    benefits: string[];
    faqs: { question: string; answer: string }[];
  };
  ar: {
    title: string;
    eyebrow: string;
    description: string;
    benefits: string[];
    faqs: { question: string; answer: string }[];
  };
}

export const SERVICES_DATA: Record<string, ServiceInfo> = {
  "cairo-airport-limousine": {
    slug: "cairo-airport-limousine",
    iconName: "Plane",
    heroImage:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Cairo Airport Limousine & Private Driver Service",
      eyebrow: "24/7 AIRPORT TRANSFERS EGYPT",
      description:
        "Premium Cairo International Airport (CAI) transfer service with professional private drivers, flight tracking, and meet & greet at Terminal 1, 2, & 3.",
      benefits: [
        "Personalized Meet & Greet with Name Sign",
        "Real-Time Flight Tracking for Delays",
        "Fixed All-Inclusive Pricing (No Hidden Fees)",
        "Luxury Mercedes, SUV, and Van Fleet",
      ],
      faqs: [
        {
          question: "How does the Cairo Airport meet & greet service work?",
          answer:
            "Your driver monitors your flight status and waits for you in the arrivals hall with a personalized sign, helping with your luggage to your vehicle.",
        },
        {
          question: "Can I book a Cairo Airport transfer for late-night or early-morning flights?",
          answer:
            "Yes, our chauffeur service operates 24/7, 365 days a year across all Cairo Airport terminals.",
        },
      ],
    },
    ar: {
      title: "خدمة ليموزين مطار القاهرة الدولي وسائق خاص",
      eyebrow: "توصيل مطار القاهرة 24 ساعة",
      description:
        "خدمة توصيل فاخرة من وإلى مطار القاهرة الدولي مع سائق خاص محترف، تتبع حالة الطيران، واستقبال فريد داخل الصالة.",
      benefits: [
        "استقبال في صالة الوصول مع لوحة اسم خاصة",
        "تتبع الرحلة والتأخيرات تلقائياً",
        "أسعار ثابتة وشاملة بدون أي رسوم خفية",
        "أسطول سيارات مرسيدس وفانيات فاخرة",
      ],
      faqs: [
        {
          question: "كيف تعمل خدمة الاستقبال في مطار القاهرة؟",
          answer:
            "يتتبع السائق موعد وصول طائرتك وينتظرك داخل صالة الوصول حاملاً لوحة باسمك للمساعدة في الحقائب والانطلاق فوراً.",
        },
        {
          question: "هل تتوفر خدمة حجز ليموزين مطار القاهرة في الأوقات المتأخرة؟",
          answer:
            "نعم، نعمل على مدار 24 ساعة طوال أيام الأسبوع لتغطية جميع الرحلات في صالات 1 و 2 و 3.",
        },
      ],
    },
  },
  "sharm-el-sheikh-limousine": {
    slug: "sharm-el-sheikh-limousine",
    iconName: "Sun",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Sharm El Sheikh Limousine & Resort Transfers",
      eyebrow: "RED SEA LUXURY TRANSPORT",
      description:
        "Exclusive chauffeur-driven vehicle rentals, airport transfers, and private drivers for resorts across Sharm El Sheikh, Naama Bay, and Ras Um Sid.",
      benefits: [
        "Direct Transfers to All Sharm El Sheikh Resorts",
        "Airport Pickup from Sharm El Sheikh International (SSH)",
        "Spacious Air-Conditioned VIP Vehicles",
        "Professional English & Arabic Speaking Chauffeurs",
      ],
      faqs: [
        {
          question: "Do you provide transfers to all resorts in Sharm El Sheikh?",
          answer:
            "Yes, we serve all hotels and resorts across Naama Bay, Nabq Bay, Hadaba, Ras Um Sid, and Sharks Bay.",
        },
      ],
    },
    ar: {
      title: "ليموزين شرم الشيخ وتوصيل المنتجات الفندقية",
      eyebrow: "تنقلات فاخرة في البحر الأحمر",
      description:
        "خدمات ليموزين فاخرة مع سائق خاص لجميع الفنادق والمنتجعات ومطار شرم الشيخ الدولي بأعلى مستويات الراحة.",
      benefits: [
        "توصيل مباشر لجميع منتجعات شرم الشيخ",
        "استقبال من مطار شرم الشيخ الدولي",
        "سيارات VIP مجهزة ومكيفة بالكامل",
        "سائقون محترفون يتحدثون العربية والإنجليزية",
      ],
      faqs: [
        {
          question: "هل تغطون جميع فنداق ومنتجعات شرم الشيخ؟",
          answer: "نعم، نغطي جميع الفنادق والمنتجعات في خليج نعمة، خليج نبق، الهضبة، وشاركس باي.",
        },
      ],
    },
  },
  "hurghada-limousine": {
    slug: "hurghada-limousine",
    iconName: "Anchor",
    heroImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Hurghada Limousine & Airport Private Driver",
      eyebrow: "EL GOUNA & HURGHADA PRIVATE TRANSFERS",
      description:
        "Luxury private transfers connecting Hurghada Airport (HRG), El Gouna, Sahl Hasheesh, and Makadi Bay with VIP chauffeured cars.",
      benefits: [
        "Direct Airport Transfers from Hurghada Airport (HRG)",
        "Exclusive El Gouna & Sahl Hasheesh Chauffeurs",
        "24/7 Availability with Instant Booking",
        "Luxury Sedans, SUVs & Executive Vians",
      ],
      faqs: [
        {
          question: "Can I book a private chauffeur between Hurghada and El Gouna?",
          answer:
            "Yes, we provide seamless door-to-door private driver transfers between Hurghada, El Gouna, Sahl Hasheesh, and Soma Bay.",
        },
      ],
    },
    ar: {
      title: "ليموزين الغردقة وسائق خاص لمنتجعات الجونة",
      eyebrow: "توصيل فاخر الغردقة والجونة",
      description:
        "تنقلات فاخرة بسيارات حديثة وسائق خاص تربط مطار الغردقة الدولي بالجونة، سهل حشيش، ومكادي باي.",
      benefits: [
        "توصيل مباشر من وإلى مطار الغردقة الدولي",
        "خدمة سائق خاص للجونة وسهل حشيش",
        "تغطية شاملة على مدار 24 ساعة",
        "سيارات سيدان وسيارات فانيات عائلية فاخرة",
      ],
      faqs: [
        {
          question: "هل توفرون توصيل بين الغردقة والجونة؟",
          answer:
            "نعم، نوفر خدمة التوصيل الفاخر من الباب للباب بين الغردقة، الجونة، سهل حشيش، وسوما باي.",
        },
      ],
    },
  },
  "intercity-limousine-egypt": {
    slug: "intercity-limousine-egypt",
    iconName: "MapPin",
    heroImage:
      "https://images.unsplash.com/photo-1572252821143-0259837f5b39?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Intercity Limousine & Long-Distance Driver Egypt",
      eyebrow: "LONG-DISTANCE PRIVATE CHAUFFEUR EGYPT",
      description:
        "Travel comfortably across cities in Egypt with private chauffeurs from Cairo to Alexandria, Hurghada, Sharm El Sheikh, Luxor, and Aswan.",
      benefits: [
        "Safe & Comfortable Intercity Travel across Egypt",
        "Professional Long-Distance Experienced Drivers",
        "Door-to-Door Pickup and Drop-off",
        "Transparent Fixed Pricing Without Toll/Fuel Surcharges",
      ],
      faqs: [
        {
          question: "What intercity routes in Egypt do you cover?",
          answer:
            "We cover all major intercity routes including Cairo to Alexandria, Cairo to Hurghada, Cairo to Sharm El Sheikh, and Cairo to Luxor/Aswan.",
        },
      ],
    },
    ar: {
      title: "ليموزين التنقل بين المحافظات وسائق خاص في مصر",
      eyebrow: "رحلات السفر بين المدن والمحافظات",
      description:
        "سافر برراحة وأمان تام بين المحافظات المصرية مع سائق خاص محترف من القاهرة إلى الإسكندرية، الغردقة، شرم الشيخ، والأقصر.",
      benefits: [
        "سفر آمن ومريح بين كافة المحافظات المصرية",
        "سائقون خبرا بطرق السفر الطويلة",
        "توصيل مباشر من الباب إلى الباب",
        "أسعار ثابتة دون أي زيادات على رسوم الطرق",
      ],
      faqs: [
        {
          question: "ما هي خطوط السفر بين المحافظات المتاحة؟",
          answer:
            "نوفر رحلات بين القاهرة والإسكندرية، القاهرة والغردقة، القاهرة وشرم الشيخ، والقاهرة والأقصر وأسوان.",
        },
      ],
    },
  },
};

export function getServiceData(slug: string): ServiceInfo | undefined {
  return SERVICES_DATA[slug];
}
