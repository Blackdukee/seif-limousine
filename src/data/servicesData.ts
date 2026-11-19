export interface ServiceLocaleContent {
  title: string;
  eyebrow: string;
  description: string;
  overview: string[];
  popularRoutes: { route: string; duration: string; details: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceInfo {
  slug: string;
  iconName: string;
  heroImage: string;
  recommendedVehicleSlugs: string[];
  en: ServiceLocaleContent;
  ar: ServiceLocaleContent;
}

export const SERVICES_DATA: Record<string, ServiceInfo> = {
  "cairo-airport-limousine": {
    slug: "cairo-airport-limousine",
    iconName: "Plane",
    heroImage:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1920&q=80",
    recommendedVehicleSlugs: ["mitsubishi-xpander-cross-25", "mercedes-e200", "mercedes-viano"],
    en: {
      title: "Cairo Airport Limousine & Private Driver Service",
      eyebrow: "24/7 AIRPORT TRANSFERS EGYPT",
      description:
        "Premium Cairo International Airport (CAI) transfer service with professional private drivers, flight tracking, and meet & greet at Terminal 1, 2, & 3.",
      overview: [
        "Arriving at Cairo International Airport after a long flight should feel calm and predictable. Seif Limousine dispatches a dedicated, licensed chauffeur to track your flight in real time, greet you outside customs at Terminal 1, Terminal 2, Terminal 3, or the Seasonal Terminal, and escort you straight to a clean, air-conditioned private vehicle without negotiating fares or waiting in taxi queues.",
        "Whether you are heading to New Cairo, 6th of October City, Giza, El Mohandessin, Maadi, Zamalek, or connecting onward across Egypt, every transfer features a pre-agreed starting rate, spacious luggage capacity, complimentary bottled water, and direct 24/7 dispatch support by WhatsApp or phone on +20 102 958 2241.",
      ],
      popularRoutes: [
        {
          route: "Cairo Airport (CAI) ↔ New Cairo & Fifth Settlement",
          duration: "25–40 min",
          details:
            "Fast ring-road access to Rehab City, Madinaty, Tagamoa, and Fifth Settlement business parks and residences.",
        },
        {
          route: "Cairo Airport (CAI) ↔ Giza & El Mohandessin",
          duration: "40–60 min",
          details:
            "Direct door-to-door pickups to Zamalek, Dokki, El Mohandessin, and Pyramids-area hotels.",
        },
        {
          route: "Cairo Airport (CAI) ↔ 6th of October & Sheikh Zayed",
          duration: "50–75 min",
          details:
            "Comfortable cross-city transfer via Rod El Farag Axis or Ring Road to Smart Village, Sheikh Zayed, and October City.",
        },
        {
          route: "Cairo Airport (CAI) ↔ Downtown Cairo & Nile Corniche",
          duration: "30–50 min",
          details:
            "Executive hotel drop-offs along the Nile Corniche, Garden City, Tahrir, and Heliopolis.",
        },
      ],
      benefits: [
        "Personalized Meet & Greet with Name Sign",
        "Real-Time Flight Tracking for Delays",
        "Fixed All-Inclusive Pricing (No Hidden Fees)",
        "Luxury Mercedes, SUV, and Van Fleet",
        "Complimentary Waiting Time After Landing",
        "24/7 English & Arabic WhatsApp Dispatch",
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
        {
          question: "What happens if my flight into Cairo International Airport is delayed?",
          answer:
            "When you share your flight number during booking, our team tracks actual landing times automatically and adjusts your chauffeur's arrival with no extra delay surcharge.",
        },
        {
          question: "Which vehicles are available for families or large groups with heavy luggage?",
          answer:
            "We recommend the 7-seat Mitsubishi Xpander Cross for up to 4 suitcases, the VIP Mercedes Viano for 5 suitcases, or our 14-seat Toyota Hiace van for large delegations.",
        },
      ],
    },
    ar: {
      title: "خدمة ليموزين مطار القاهرة الدولي وسائق خاص",
      eyebrow: "توصيل مطار القاهرة 24 ساعة",
      description:
        "خدمة توصيل فاخرة من وإلى مطار القاهرة الدولي مع سائق خاص محترف، تتبع حالة الطيران، واستقبال فريد داخل الصالة.",
      overview: [
        "يبدأ وصولك المريح إلى مصر من اللحظة الأولى في مطار القاهرة الدولي. يتابع فريق سيف ليموزين رقم رحلتك الجوية لحظة بلحظة لتفادي أي انتظار عند التأخير، وينتظرك سائقك المرخص في صالة الوصول بمبنى 1 أو 2 أو 3 أو الصالة الموسمية لمساعدتك في حمل الحقائب والتوجه مباشرة إلى سيارة حديثة ومكيفة دون مفاوضات أسعار أو زحام.",
        "نغطي جميع مناطق القاهرة الكبرى والجيزة بما يشمل القاهرة الجديدة والتجمع الخامس ومدينة 6 أكتوبر والشيخ زايد والمهندسين والزمالك ووسط البلد والمعادي، مع أسعار واضحة تبدأ من تعريفة محددة مسبقاً ودعم فوري عبر واتساب أو الهاتف على 2241 958 102 20+ طوال 24 ساعة يومياً.",
      ],
      popularRoutes: [
        {
          route: "مطار القاهرة ↔ القاهرة الجديدة والتجمع الخامس",
          duration: "25 إلى 40 دقيقة",
          details: "توصيل سريع إلى التجمع الأول والخامس والرحاب ومدينتي والعاصمة الإدارية الجديدة.",
        },
        {
          route: "مطار القاهرة ↔ الجيزة والمهندسين والزمالك",
          duration: "40 إلى 60 دقيقة",
          details:
            "انتقال مباشر من الباب للباب إلى المهندسين والدقي والزمالك وفنادق منطقة الأهرامات.",
        },
        {
          route: "مطار القاهرة ↔ مدينة 6 أكتوبر والشيخ زايد",
          duration: "50 إلى 75 دقيقة",
          details: "رحلة مريحة عبر المحاور السريعة إلى الشيخ زايد والقرية الذكية ومدينة 6 أكتوبر.",
        },
        {
          route: "مطار القاهرة ↔ وسط البلد وكورنيش النيل",
          duration: "30 إلى 50 دقيقة",
          details:
            "توصيل تنفيذي إلى كافة الفنادق الكبرى على كورنيش النيل وجاردن سيتي ومصر الجديدة.",
        },
      ],
      benefits: [
        "استقبال في صالة الوصول مع لوحة اسم خاصة",
        "تتبع الرحلة والتأخيرات تلقائياً",
        "أسعار ثابتة وشاملة بدون أي رسوم خفية",
        "أسطول سيارات مرسيدس وفانيات فاخرة",
        "فترة انتظار مجانية بعد هبوط الطائرة",
        "حجز وتواصل فوري 24/7 بالعربية والإنجليزية",
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
        {
          question: "ماذا يحدث إذا تأخرت طائرتي عن موعد الهبوط المحدد؟",
          answer:
            "بمجرد إرسال رقم الرحلة عند الحجز، نتابع التحديثات المباشرة لحركة الطيران ويضبط السائق موعد حضوره تلقائياً دون أي رسوم إضافية على التأخير.",
        },
        {
          question: "ما السيارة الأنسب للعائلات أو لمن لديهم عدد كبير من الحقائب؟",
          answer:
            "تناسب سيارة ميتسوبيشي اكسباندر كروس 7 مقاعد مع 4 حقائب، ومرسيدس فيانو لـ 5 حقائب، وتويوتا هاي إس للمجموعات حتى 14 راكباً و8 حقائب.",
        },
      ],
    },
  },
  "sharm-el-sheikh-limousine": {
    slug: "sharm-el-sheikh-limousine",
    iconName: "Sun",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    recommendedVehicleSlugs: ["soueast-s07", "chery-tiggo-8", "toyota-hiace"],
    en: {
      title: "Sharm El Sheikh Limousine & Resort Transfers",
      eyebrow: "RED SEA LUXURY TRANSPORT",
      description:
        "Exclusive chauffeur-driven vehicle rentals, airport transfers, and private drivers for resorts across Sharm El Sheikh, Naama Bay, and Ras Um Sid.",
      overview: [
        "Travel smoothly from Sharm El Sheikh International Airport (SSH) directly to your resort lobby in air-conditioned comfort. Seif Limousine provides punctual private drivers for solo executives, couples, and families staying across Sharks Bay, Naama Bay, Nabq Bay, Hadaba, Old Market, and Ras Um Sid—as well as private full-day charters for dining, SOHO Square outings, or diving excursions.",
        "We also arrange long-distance direct limousine transfers connecting Sharm El Sheikh and Dahab, Saint Catherine, Nuweiba, or Cairo in modern 7-seat SUVs and 14-seat Toyota Hiace vans. Every vehicle is inspected before dispatch and operated by courteous, licensed drivers who know South Sinai roads thoroughly.",
      ],
      popularRoutes: [
        {
          route: "Sharm Airport (SSH) ↔ Sharks Bay & SOHO Square",
          duration: "10–15 min",
          details:
            "Immediate curbside airport pickup straight to beachfront resorts in Sharks Bay and White Knight Bay.",
        },
        {
          route: "Sharm Airport (SSH) ↔ Naama Bay & Nabq Bay",
          duration: "15–25 min",
          details:
            "Private hotel-door drop-offs throughout Naama Bay, Nabq Bay resort strip, and Domina Coral Bay.",
        },
        {
          route: "Sharm El Sheikh ↔ Dahab",
          duration: "60–75 min",
          details:
            "Scenic private coastal transfer through South Sinai with flexible stopovers and return pickup options.",
        },
        {
          route: "Sharm El Sheikh ↔ Cairo City / CAI Airport",
          duration: "5.5–6.5 hr",
          details:
            "Door-to-door private intercity SUV or Hiace journey through Ahmed Hamdi Tunnel and Suez.",
        },
      ],
      benefits: [
        "Direct Transfers to All Sharm El Sheikh Resorts",
        "Airport Pickup from Sharm El Sheikh International (SSH)",
        "Spacious Air-Conditioned VIP Vehicles",
        "Professional English & Arabic Speaking Chauffeurs",
        "Private Charters to Dahab & Saint Catherine",
        "Fixed Rates Agreed Prior to Pickup",
      ],
      faqs: [
        {
          question: "Do you provide transfers to all resorts in Sharm El Sheikh?",
          answer:
            "Yes, we serve all hotels and resorts across Naama Bay, Nabq Bay, Hadaba, Ras Um Sid, and Sharks Bay.",
        },
        {
          question: "Can I book a private round-trip transfer between Sharm El Sheikh and Dahab?",
          answer:
            "Yes. We provide both one-way drop-offs and same-day wait-and-return private drivers between Sharm El Sheikh and Dahab, Saint Catherine, or Taba.",
        },
        {
          question: "Are diving bags, strollers, and extra luggage accommodated?",
          answer:
            "Yes. Mention your luggage count or dive equipment on WhatsApp so we assign an appropriate 7-seat SUV or spacious Toyota Hiace van.",
        },
        {
          question:
            "Do you offer private intercity limousine service from Cairo to Sharm El Sheikh?",
          answer:
            "Yes, we operate direct point-to-point chauffeur transfers between Cairo and Sharm El Sheikh year-round at transparent fixed rates.",
        },
      ],
    },
    ar: {
      title: "ليموزين شرم الشيخ وتوصيل المنتجعات الفندقية",
      eyebrow: "تنقلات فاخرة في البحر الأحمر",
      description:
        "خدمات ليموزين فاخرة مع سائق خاص لجميع الفنادق والمنتجعات ومطار شرم الشيخ الدولي بأعلى مستويات الراحة.",
      overview: [
        "استمتع بتوصيل مريح وفوري من مطار شرم الشيخ الدولي إلى باب الفندق أو المنتجع دون انتظار حافلات أو مفاوضات في صالة الوصول. توفر سيف ليموزين سيارات حديثة ومكيفة مع سائق خاص محترف لجميع مناطق شرم الشيخ بما فيها خليج نعمة وخليج نبق وشاركس باي وسوهو سكوير والهضبة ورأس أم السيد.",
        "نوفر أيضاً خدمات السائق بالساعة للتنقلات المسائية والمطاعم، بالإضافة إلى رحلات خاصة بين شرم الشيخ ودهب وسانت كاترين أو خط القاهرة – شرم الشيخ المباشر بسيارات عائلية ذات 7 مقاعد أو فان تويوتا هاي إس المجهزة بالكامل لراحة المجموعات والعائلات.",
      ],
      popularRoutes: [
        {
          route: "مطار شرم الشيخ ↔ شاركس باي وسوهو سكوير",
          duration: "10 إلى 15 دقيقة",
          details:
            "استقبال سريع من المطار وتوصيل مباشر إلى جميع منتجعات شاركس باي وخليج وايت نايت.",
        },
        {
          route: "مطار شرم الشيخ ↔ خليج نعمة وخليج نبق والهضبة",
          duration: "15 إلى 25 دقيقة",
          details:
            "انتقال خاص ومكيف للعائلات والأفراد إلى كافة المنتجعات السياحية في خليج نعمة ونبق.",
        },
        {
          route: "شرم الشيخ ↔ دهب وسانت كاترين",
          duration: "60 إلى 75 دقيقة",
          details:
            "رحلات خاصة ذهاباً أو ذهاباً وعودة في نفس اليوم مع سائقين ذوي خبرة بطرق جنوب سيناء.",
        },
        {
          route: "شرم الشيخ ↔ القاهرة ومطار القاهرة الدولي",
          duration: "5.5 إلى 6.5 ساعات",
          details: "توصيل مباشر من الباب إلى الباب بسيارات فسيحة مجهزة للسفر الطويل.",
        },
      ],
      benefits: [
        "توصيل مباشر لجميع منتجعات شرم الشيخ",
        "استقبال من مطار شرم الشيخ الدولي",
        "سيارات VIP مجهزة ومكيفة بالكامل",
        "سائقون محترفون يتحدثون العربية والإنجليزية",
        "رحلات خاصة إلى دهب وطابا وسانت كاترين",
        "حجز فوري وأسعار واضحة متفق عليها مسبقاً",
      ],
      faqs: [
        {
          question: "هل تغطون جميع فنادق ومنتجعات شرم الشيخ؟",
          answer: "نعم، نغطي جميع الفنادق والمنتجعات في خليج نعمة، خليج نبق، الهضبة، وشاركس باي.",
        },
        {
          question: "هل يمكن حجز سيارة بسائق للذهاب إلى دهب والعودة في نفس اليوم؟",
          answer:
            "نعم، نوفر توصيل اتجاه واحد أو باقات انتظار وعودة في نفس اليوم من شرم الشيخ إلى دهب أو سانت كاترين.",
        },
        {
          question: "هل تتوفر سيارات تتسع لمعدات الغوص أو الحقائب الكبيرة؟",
          answer:
            "بالتأكيد، فقط أخبرنا بعدد الحقائب والمعدات عبر واتساب لنخصص لك SUV واسعة أو فان تويوتا هاي إس.",
        },
        {
          question: "هل توفرون توصيلاً مباشراً بالسيارة من القاهرة إلى شرم الشيخ؟",
          answer:
            "نعم، ننفذ رحلات ليموزين خاصة ومباشرة طوال السنة من أي عنوان أو فندق في القاهرة إلى فنادق شرم الشيخ.",
        },
      ],
    },
  },
  "hurghada-limousine": {
    slug: "hurghada-limousine",
    iconName: "Anchor",
    heroImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
    recommendedVehicleSlugs: ["jetour-x90-plus", "mitsubishi-xpander-cross-25", "toyota-hiace"],
    en: {
      title: "Hurghada Limousine & Airport Private Driver",
      eyebrow: "EL GOUNA & HURGHADA PRIVATE TRANSFERS",
      description:
        "Luxury private transfers connecting Hurghada Airport (HRG), El Gouna, Sahl Hasheesh, and Makadi Bay with VIP chauffeured cars.",
      overview: [
        "Enjoy effortless coastal transfers across the Red Sea Governorate from the moment your flight lands at Hurghada International Airport (HRG). Seif Limousine meets arriving guests on time for direct door-to-door drives to El Gouna lagoons and marinas, Sahl Hasheesh resorts, Makadi Bay, Soma Bay, and Safaga.",
        "Beyond airport pickups, guests rely on our private drivers for marina evenings in El Gouna, inter-resort dining transfers, full-day Red Sea standby, and direct intercity trips between Hurghada and Cairo or Luxor. Every vehicle undergoes strict cleanliness and air-conditioning checks to guarantee comfort in warm coastal weather.",
      ],
      popularRoutes: [
        {
          route: "Hurghada Airport (HRG) ↔ El Gouna Hotels & Marinas",
          duration: "30–40 min",
          details:
            "Direct private transfers to Abu Tig Marina, Downtown El Gouna, villas, and beachfront resorts.",
        },
        {
          route: "Hurghada Airport (HRG) ↔ Sahl Hasheesh & Makadi Bay",
          duration: "25–35 min",
          details:
            "Prompt arrivals-hall pickup straight to Sahl Hasheesh boardwalk hotels and Makadi resorts.",
        },
        {
          route: "Hurghada ↔ Soma Bay & Safaga",
          duration: "45–55 min",
          details:
            "Spacious SUVs and vans for kite-surfers, golfers, and resort guests traveling south to Soma Bay.",
        },
        {
          route: "Hurghada ↔ Cairo or Luxor",
          duration: "4–5 hr",
          details:
            "Comfortable private highway transfers between the Red Sea, Cairo, and Upper Egypt hotels or cruise ports.",
        },
      ],
      benefits: [
        "Direct Airport Transfers from Hurghada Airport (HRG)",
        "Exclusive El Gouna & Sahl Hasheesh Chauffeurs",
        "24/7 Availability with Instant Booking",
        "Luxury Sedans, SUVs & Executive Vans",
        "Private Coastal Routes to Soma Bay & Marsa Alam",
        "Door-to-Door Luggage Assistance Included",
      ],
      faqs: [
        {
          question: "Can I book a private chauffeur between Hurghada and El Gouna?",
          answer:
            "Yes, we provide seamless door-to-door private driver transfers between Hurghada, El Gouna, Sahl Hasheesh, and Soma Bay.",
        },
        {
          question: "Do your drivers enter private residential compounds and villas in El Gouna?",
          answer:
            "Yes. Simply share your compound name, hotel booking, or villa access instructions so our chauffeur drops you directly at the doorstep.",
        },
        {
          question: "Can I book a direct car with driver from Hurghada to Luxor or Cairo?",
          answer:
            "Yes. Many guests pair their Red Sea holiday with a private chauffeur transfer to Luxor Nile cruises or back to Cairo International Airport.",
        },
        {
          question: "How do I confirm my Hurghada airport pickup rate?",
          answer:
            "Send your flight arrival date, time, passenger count, and resort name on WhatsApp (+20 102 958 2241) and receive a confirmed rate in minutes.",
        },
      ],
    },
    ar: {
      title: "ليموزين الغردقة وسائق خاص لمنتجعات الجونة",
      eyebrow: "توصيل فاخر الغردقة والجونة",
      description:
        "تنقلات فاخرة بسيارات حديثة وسائق خاص تربط مطار الغردقة الدولي بالجونة، سهل حشيش، ومكادي باي.",
      overview: [
        "سافر بكل راحة وخصوصية على ساحل البحر الأحمر فور وصولك إلى مطار الغردقة الدولي. تستقبلك سيف ليموزين في الموعد المحدد بسيارات حديثة ومكيفة لتوصيلك مباشرة إلى الجونة ومرسى أبو تيج وسهل حشيش ومكادي باي وسوما باي وسفاجا دون انتظار أو مشاركة المركبة مع مسافرين آخرين.",
        "كما نخدم التنقلات المسائية بين المنتجعات والمراسي، والحجز اليومي بالساعة، والرحلات البرية المباشرة بين الغردقة والقاهرة أو الغردقة والأقصر مع سائقين محترفين على دراية كاملة بطرق البحر الأحمر وصعيد مصر، ومعايير نظافة وفحص فني صارمة قبل كل رحلة.",
      ],
      popularRoutes: [
        {
          route: "مطار الغردقة ↔ منتجعات وفيلات الجونة",
          duration: "30 إلى 40 دقيقة",
          details: "توصيل مباشر إلى فنادق الجونة ومارينا أبو تيج والمجمعات السكنية الخاصة.",
        },
        {
          route: "مطار الغردقة ↔ سهل حشيش ومكادي باي",
          duration: "25 إلى 35 دقيقة",
          details: "استقبال من صالة الوصول وتوصيل مريح لفنادق ومنتجعات سهل حشيش وخليج مكادي.",
        },
        {
          route: "الغردقة ↔ سوما باي وسفاجا",
          duration: "45 إلى 55 دقيقة",
          details:
            "سيارات SUV واسعة ومناسبة لحقائب السفر ومعدات الرياضات البحرية إلى خليج سوما باي.",
        },
        {
          route: "الغردقة ↔ القاهرة أو الأقصر",
          duration: "4 إلى 5 ساعات",
          details:
            "سفر بري آمن ومريح بين ساحل البحر الأحمر والقاهرة أو فنادق ومراكب الأقصر النيلية.",
        },
      ],
      benefits: [
        "توصيل مباشر من وإلى مطار الغردقة الدولي",
        "خدمة سائق خاص للجونة وسهل حشيش",
        "تغطية شاملة على مدار 24 ساعة",
        "سيارات سيدان وسيارات فان عائلية فاخرة",
        "توصيل إلى سوما باي وسفاجا والأقصر",
        "مساعدة كاملة في الحقائب ومن الباب للباب",
      ],
      faqs: [
        {
          question: "هل توفرون توصيلاً بين الغردقة والجونة؟",
          answer:
            "نعم، نوفر خدمة التوصيل الفاخر من الباب للباب بين الغردقة، الجونة، سهل حشيش، وسوما باي.",
        },
        {
          question: "هل يصل السائق إلى داخل الفيلات والكمبوندات السكنية في الجونة؟",
          answer:
            "نعم، بمجرد مشاركة اسم الفندق أو الحي أو تفاصيل الدخول يصل السائق إلى باب السكن مباشرة.",
        },
        {
          question: "هل يمكن حجز سيارة بسائق من الغردقة إلى الأقصر أو القاهرة؟",
          answer:
            "بالتأكيد، ننفذ رحلات يومية خاصة بين الغردقة والأقصر لزيارة المعابد أو اللحاق بالمراكب النيلية، وكذلك إلى مطار القاهرة ووسط العاصمة.",
        },
        {
          question: "كيف أعرف التكلفة وأحجز توصيل مطار الغردقة؟",
          answer:
            "أرسل موعد الرحلة واسم المنتجع وعدد المسافرين عبر واتساب على 2241 958 102 20+ لنرسل لك التأكيد والسعر في دقائق.",
        },
      ],
    },
  },
  "intercity-limousine-egypt": {
    slug: "intercity-limousine-egypt",
    iconName: "MapPin",
    heroImage:
      "https://images.unsplash.com/photo-1572252821143-0259837f5b39?auto=format&fit=crop&w=1920&q=80",
    recommendedVehicleSlugs: ["mercedes-e200", "mercedes-viano", "jetour-x90-plus"],
    en: {
      title: "Intercity Limousine & Long-Distance Driver Egypt",
      eyebrow: "LONG-DISTANCE PRIVATE CHAUFFEUR EGYPT",
      description:
        "Travel comfortably across cities in Egypt with private chauffeurs from Cairo to Alexandria, Hurghada, Sharm El Sheikh, Luxor, and Aswan.",
      overview: [
        "Cross Egypt's highways at your own pace in a private luxury sedan, executive SUV, or VIP group van without airport check-in lines or rigid train schedules. Seif Limousine connects Cairo with Alexandria, the North Coast, Ain Sokhna, Hurghada, El Gouna, Sharm El Sheikh, Fayoum, Luxor, and Aswan via door-to-door long-distance chauffeur service.",
        "Every intercity trip is scheduled around your preferred departure hour, rests whenever you want along modern highway service plazas, and operates with transparent route quotes that already account for fuel and standard highway tolls. Business teams use the quiet cabin to work en route, while families enjoy unhurried travel with room for every suitcase.",
      ],
      popularRoutes: [
        {
          route: "Cairo ↔ Alexandria & Borg El Arab",
          duration: "2.5–3 hr",
          details:
            "Same-day round-trip business meetings, coastal dining, and Mediterranean hotel transfers via Cairo–Alexandria Desert Road.",
        },
        {
          route: "Cairo ↔ North Coast (Sahel & New Alamein)",
          duration: "3–3.5 hr",
          details:
            "Summer and weekend door-to-door chauffeur transfers to Marassi, Hacienda, Marina, and New Alamein City.",
        },
        {
          route: "Cairo ↔ Ain Sokhna & El Galala",
          duration: "1.5–2 hr",
          details:
            "Quick weekend getaway transfers to Red Sea resorts along the Galala plateau and Sokhna coast.",
        },
        {
          route: "Cairo ↔ Hurghada, Sharm El Sheikh & Upper Egypt",
          duration: "4.5–8+ hr",
          details:
            "Direct private long-distance sedans, Mercedes Viano lounges, and Hiace vans for resort and Nile cruise itineraries.",
        },
      ],
      benefits: [
        "Safe & Comfortable Intercity Travel across Egypt",
        "Professional Long-Distance Experienced Drivers",
        "Door-to-Door Pickup and Drop-off",
        "Transparent Fixed Pricing Without Toll/Fuel Surcharges",
        "Flexible Rest Stops & Custom Schedules",
        "Same-Day Return or Multi-Day Driver Standby",
      ],
      faqs: [
        {
          question: "What intercity routes in Egypt do you cover?",
          answer:
            "We cover all major intercity routes including Cairo to Alexandria, Cairo to Hurghada, Cairo to Sharm El Sheikh, and Cairo to Luxor/Aswan.",
        },
        {
          question:
            "Can I book a same-day round trip from Cairo to Alexandria with driver wait time?",
          answer:
            "Yes. We regularly arrange same-day return charters where your chauffeur stays on standby during your meetings or sightseeing before driving you back.",
        },
        {
          question: "Are highway tolls and fuel included in intercity limousine pricing?",
          answer:
            "Yes. Every confirmed intercity quote includes fuel and standard highway tolls so there are no surprise charges on arrival.",
        },
        {
          question: "Can the driver accompany us for multi-day coastal or cultural trips?",
          answer:
            "Yes. For North Coast summer stays or multi-city tours across Egypt, you can reserve one-way drop-off, round-trip pickup, or dedicated multi-day chauffeur coverage.",
        },
      ],
    },
    ar: {
      title: "ليموزين التنقل بين المحافظات وسائق خاص في مصر",
      eyebrow: "رحلات السفر بين المدن والمحافظات",
      description:
        "سافر براحة وأمان تام بين المحافظات المصرية مع سائق خاص محترف من القاهرة إلى الإسكندرية، الغردقة، شرم الشيخ، والأقصر.",
      overview: [
        "تنقّل بين محافظات مصر بالوقت الذي يناسبك دون التقيد بمواعيد القطارات أو إجراءات الطيران الداخلي. تقدم سيف ليموزين خدمة السفر البري الفاخر من الباب إلى الباب لربط القاهرة بالإسكندرية والعلمين والساحل الشمالي والعين السخنة والفيوم والغردقة والجونة وشرم الشيخ والأقصر وأسوان بسيارات حديثة ومكيفة.",
        "تشمل رحلات المحافظات سائقين متمرسين في الطرق السريعة، ومرونة كاملة في التوقف للاستراحة أثناء الطريق، مع اتفاق مسبق واضح على التكلفة الإجمالية شاملة الوقود ورسوم المحاور والطرق. تناسب الخدمة العائلات في الإجازات الصيفية ورجال الأعمال لإنجاز المهام اليومية والعودة في نفس اليوم.",
      ],
      popularRoutes: [
        {
          route: "القاهرة ↔ الإسكندرية وبرج العرب",
          duration: "2.5 إلى 3 ساعات",
          details:
            "رحلات العمل والزيارات اليومية ذهاباً وعودة عبر طريق القاهرة – الإسكندرية الصحراوي.",
        },
        {
          route: "القاهرة ↔ الساحل الشمالي والعلمين الجديدة",
          duration: "3 إلى 3.5 ساعات",
          details: "توصيل صيفي مريح ومباشر إلى مراسي وهاسيندا ومارينا وأبراج العلمين وقرى الساحل.",
        },
        {
          route: "القاهرة ↔ العين السخنة وهضبة الجلالة",
          duration: "1.5 إلى ساعتين",
          details: "انتقالات سريعة لقضاء عطلات نهاية الأسبوع في منتجعات العين السخنة والجلالة.",
        },
        {
          route: "القاهرة ↔ الغردقة وشرم الشيخ وصعيد مصر",
          duration: "4.5 إلى 8+ ساعات",
          details:
            "سفر مريح للمسافات الطويلة بسيارات مرسيدس فيانو أو SUV أو هاي إس لمنتجعات البحر الأحمر والأقصر.",
        },
      ],
      benefits: [
        "سفر آمن ومريح بين كافة المحافظات المصرية",
        "سائقون خبراء بطرق السفر الطويلة",
        "توصيل مباشر من الباب إلى الباب",
        "أسعار ثابتة دون أي زيادات على رسوم الطرق",
        "مرونة كاملة في موعد الانطلاق والاستراحات",
        "متاح بنظام الذهاب فقط أو العودة في نفس اليوم",
      ],
      faqs: [
        {
          question: "ما هي خطوط السفر بين المحافظات المتاحة؟",
          answer:
            "نوفر رحلات بين القاهرة والإسكندرية، القاهرة والغردقة، القاهرة وشرم الشيخ، والقاهرة والأقصر وأسوان.",
        },
        {
          question: "هل يمكن حجز رحلة ذهاب وعودة في نفس اليوم من القاهرة إلى الإسكندرية؟",
          answer:
            "نعم، نوفر رحلات اليوم الواحد مع انتظار السائق طوال مدة اجتماعاتك أو جولتك ثم العودة بك إلى القاهرة بأمان.",
        },
        {
          question: "هل يشمل سعر الرحلة بين المحافظات الوقود ورسوم الطرق (الكارتة)؟",
          answer:
            "نعم، نؤكد لك قبل التحرك سعراً واضحاً يشمل السيارة والسائق والوقود ورسوم الطرق الاعتيادية دون أي مفاجآت عند الوصول.",
        },
        {
          question: "هل تتوفر الخدمة للإقامات لعدة أيام في الساحل الشمالي أو الغردقة؟",
          answer:
            "نعم، يمكنك اختيار التوصيل في اتجاه واحد مع تحديد موعد العودة لاحقاً أو التعاقد على بقاء السائق والسيارة طوال فترة الإقامة.",
        },
      ],
    },
  },
};

export function getServiceData(slug: string): ServiceInfo | undefined {
  return SERVICES_DATA[slug];
}
