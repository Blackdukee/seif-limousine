# High-Intent Landing Pages & Sitemap Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 4 targeted, search-optimized service landing pages (Cairo Airport, Sharm El Sheikh, Hurghada, Intercity Transfers) and expand `public/sitemap.xml` to 24 multilingual entries.

**Architecture:** A centralized data store (`src/data/servicesData.ts`) powers dynamic TanStack Start routes (`src/routes/$lang/services.$serviceSlug.tsx`), emitting localized meta, canonical links, hreflang tags, `Service` JSON-LD, and `BreadcrumbList` JSON-LD.

**Tech Stack:** React 19, `@tanstack/react-router`, TypeScript, i18next, Node.js (sitemap generator).

## Global Constraints

- Domain: `https://seif-limousine.online`
- Service slugs: `cairo-airport-limousine`, `sharm-el-sheikh-limousine`, `hurghada-limousine`, `intercity-limousine-egypt`
- All service routes must emit valid canonical, hreflang, `Service` JSON-LD, and `BreadcrumbList` JSON-LD

---

### Task 1: Create Services Data Store (`src/data/servicesData.ts`)

**Files:**
- Create: `src/data/servicesData.ts`

**Interfaces:**
- Consumes: Static localized copy for 4 services
- Produces: `SERVICES_DATA` dictionary, `getServiceData(slug)` helper function

- [ ] **Step 1: Create `src/data/servicesData.ts`**

```typescript
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
    heroImage: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Cairo Airport Limousine & Private Driver Service",
      eyebrow: "24/7 AIRPORT TRANSFERS EGYPT",
      description: "Premium Cairo International Airport (CAI) transfer service with professional private drivers, flight tracking, and meet & greet at Terminal 1, 2, & 3.",
      benefits: [
        "Personalized Meet & Greet with Name Sign",
        "Real-Time Flight Tracking for Delays",
        "Fixed All-Inclusive Pricing (No Hidden Fees)",
        "Luxury Mercedes, SUV, and Van Fleet"
      ],
      faqs: [
        {
          question: "How does the Cairo Airport meet & greet service work?",
          answer: "Your driver monitors your flight status and waits for you in the arrivals hall with a personalized sign, helping with your luggage to your vehicle."
        },
        {
          question: "Can I book a Cairo Airport transfer for late-night or early-morning flights?",
          answer: "Yes, our chauffeur service operates 24/7, 365 days a year across all Cairo Airport terminals."
        }
      ]
    },
    ar: {
      title: "خدمة ليموزين مطار القاهرة الدولي وسائق خاص",
      eyebrow: "توصيل مطار القاهرة 24 ساعة",
      description: "خدمة توصيل فاخرة من وإلى مطار القاهرة الدولي مع سائق خاص محترف، تتبع حالة الطيران، واستقبال فريد داخل الصالة.",
      benefits: [
        "استقبال في صالة الوصول مع لوحة اسم خاصة",
        "تتبع الرحلة والتأخيرات تلقائياً",
        "أسعار ثابتة وشاملة بدون أي رسوم خفية",
        "أسطول سيارات مرسيدس وفانيات فاخرة"
      ],
      faqs: [
        {
          question: "كيف تعمل خدمة الاستقبال في مطار القاهرة؟",
          answer: "يتتبع السائق موعد وصول طائرتك وينتظرك داخل صالة الوصول حاملاً لوحة باسمك للمساعدة في الحقائب والانطلاق فوراً."
        },
        {
          question: "هل تتوفر خدمة حجز ليموزين مطار القاهرة في الأوقات المتأخرة؟",
          answer: "نعم، نعمل على مدار 24 ساعة طوال أيام الأسبوع لتغطية جميع الرحلات في صالات 1 و 2 و 3."
        }
      ]
    }
  },
  "sharm-el-sheikh-limousine": {
    slug: "sharm-el-sheikh-limousine",
    iconName: "Sun",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Sharm El Sheikh Limousine & Resort Transfers",
      eyebrow: "RED SEA LUXURY TRANSPORT",
      description: "Exclusive chauffeur-driven vehicle rentals, airport transfers, and private drivers for resorts across Sharm El Sheikh, Naama Bay, and Ras Um Sid.",
      benefits: [
        "Direct Transfers to All Sharm El Sheikh Resorts",
        "Airport Pickup from Sharm El Sheikh International (SSH)",
        "Spacious Air-Conditioned VIP Vehicles",
        "Professional English & Arabic Speaking Chauffeurs"
      ],
      faqs: [
        {
          question: "Do you provide transfers to all resorts in Sharm El Sheikh?",
          answer: "Yes, we serve all hotels and resorts across Naama Bay, Nabq Bay, Hadaba, Ras Um Sid, and Sharks Bay."
        }
      ]
    },
    ar: {
      title: "ليموزين شرم الشيخ وتوصيل المنتجات الفندقية",
      eyebrow: "تنقلات فاخرة في البحر الأحمر",
      description: "خدمات ليموزين فاخرة مع سائق خاص لجميع الفنادق والمنتجعات ومطار شرم الشيخ الدولي بأعلى مستويات الراحة.",
      benefits: [
        "توصيل مباشر لجميع منتجعات شرم الشيخ",
        "استقبال من مطار شرم الشيخ الدولي",
        "سيارات VIP مجهزة ومكيفة بالكامل",
        "سائقون محترفون يتحدثون العربية والإنجليزية"
      ],
      faqs: [
        {
          question: "هل تغطون جميع فنداق ومنتجعات شرم الشيخ؟",
          answer: "نعم، نغطي جميع الفنادق والمنتجعات في خليج نعمة، خليج نبق، الهضبة، وشاركس باي."
        }
      ]
    }
  },
  "hurghada-limousine": {
    slug: "hurghada-limousine",
    iconName: "Anchor",
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Hurghada Limousine & Airport Private Driver",
      eyebrow: "EL GOUNA & HURGHADA PRIVATE TRANSFERS",
      description: "Luxury private transfers connecting Hurghada Airport (HRG), El Gouna, Sahl Hasheesh, and Makadi Bay with VIP chauffeured cars.",
      benefits: [
        "Direct Airport Transfers from Hurghada Airport (HRG)",
        "Exclusive El Gouna & Sahl Hasheesh Chauffeurs",
        "24/7 Availability with Instant Booking",
        "Luxury Sedans, SUVs & Executive Vians"
      ],
      faqs: [
        {
          question: "Can I book a private chauffeur between Hurghada and El Gouna?",
          answer: "Yes, we provide seamless door-to-door private driver transfers between Hurghada, El Gouna, Sahl Hasheesh, and Soma Bay."
        }
      ]
    },
    ar: {
      title: "ليموزين الغردقة وسائق خاص لمنتجعات الجونة",
      eyebrow: "توصيل فاخر الغردقة والجونة",
      description: "تنقلات فاخرة بسيارات حديثة وسائق خاص تربط مطار الغردقة الدولي بالجونة، سهل حشيش، ومكادي باي.",
      benefits: [
        "توصيل مباشر من وإلى مطار الغردقة الدولي",
        "خدمة سائق خاص للجونة وسهل حشيش",
        "تغطية شاملة على مدار 24 ساعة",
        "سيارات سيدان وسيارات فانيات عائلية فاخرة"
      ],
      faqs: [
        {
          question: "هل توفرون توصيل بين الغردقة والجونة؟",
          answer: "نعم، نوفر خدمة التوصيل الفاخر من الباب للباب بين الغردقة، الجونة، سهل حشيش، وسوما باي."
        }
      ]
    }
  },
  "intercity-limousine-egypt": {
    slug: "intercity-limousine-egypt",
    iconName: "MapPin",
    heroImage: "https://images.unsplash.com/photo-1572252821143-0259837f5b39?auto=format&fit=crop&w=1920&q=80",
    en: {
      title: "Intercity Limousine & Long-Distance Driver Egypt",
      eyebrow: "LONG-DISTANCE PRIVATE CHAUFFEUR EGYPT",
      description: "Travel comfortably across cities in Egypt with private chauffeurs from Cairo to Alexandria, Hurghada, Sharm El Sheikh, Luxor, and Aswan.",
      benefits: [
        "Safe & Comfortable Intercity Travel across Egypt",
        "Professional Long-Distance Experienced Drivers",
        "Door-to-Door Pickup and Drop-off",
        "Transparent Fixed Pricing Without Toll/Fuel Surcharges"
      ],
      faqs: [
        {
          question: "What intercity routes in Egypt do you cover?",
          answer: "We cover all major intercity routes including Cairo to Alexandria, Cairo to Hurghada, Cairo to Sharm El Sheikh, and Cairo to Luxor/Aswan."
        }
      ]
    },
    ar: {
      title: "ليموزين التنقل بين المحافظات وسائق خاص في مصر",
      eyebrow: "رحلات السفر بين المدن والمحافظات",
      description: "سافر برراحة وأمان تام بين المحافظات المصرية مع سائق خاص محترف من القاهرة إلى الإسكندرية، الغردقة، شرم الشيخ، والأقصر.",
      benefits: [
        "سفر آمن ومريح بين كافة المحافظات المصرية",
        "سائقون خبرا بطرق السفر الطويلة",
        "توصيل مباشر من الباب إلى الباب",
        "أسعار ثابتة دون أي زيادات على رسوم الطرق"
      ],
      faqs: [
        {
          question: "ما هي خطوط السفر بين المحافظات المتاحة؟",
          answer: "نوفر رحلات بين القاهرة والإسكندرية، القاهرة والغردقة، القاهرة وشرم الشيخ، والقاهرة والأقصر وأسوان."
        }
      ]
    }
  }
};

export function getServiceData(slug: string): ServiceInfo | undefined {
  return SERVICES_DATA[slug];
}
```

- [ ] **Step 2: Check TypeScript compilation**

Run: `npx tsc --noEmit`  
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/servicesData.ts
git commit -m "feat(seo): create services data store for high-intent landing pages"
```

---

### Task 2: Create Dynamic Service Landing Route (`src/routes/$lang/services.$serviceSlug.tsx`)

**Files:**
- Create: `src/routes/$lang/services.$serviceSlug.tsx`

**Interfaces:**
- Consumes: `$lang` (`en`|`ar`), `$serviceSlug`, `getServiceData()`, `SITE_CONFIG`
- Produces: Search-optimized service landing page emitting `Service` JSON-LD and `BreadcrumbList` JSON-LD

- [ ] **Step 1: Create `src/routes/$lang/services.$serviceSlug.tsx`**

```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useLenis } from "@/components/seif/useLenis";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";
import { WhatsAppIcon, PhoneIcon } from "@/components/seif/Icons";
import { getServiceData, ServiceInfo } from "@/data/servicesData";
import { SITE_CONFIG } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/utils";

export const Route = createFileRoute("/$lang/services/$serviceSlug")({
  loader: ({ params }) => {
    const lang = params.lang as "en" | "ar";
    if (lang !== "en" && lang !== "ar") throw notFound();
    i18n.changeLanguage(lang);
    const service = getServiceData(params.serviceSlug);
    if (!service) throw notFound();
    return { service, lang };
  },
  head: ({ params }) => {
    const lang = (params.lang as "en" | "ar") || "en";
    i18n.changeLanguage(lang);
    const service = getServiceData(params.serviceSlug);
    const title = service ? `${service[lang].title} — SEIF Limousine` : "Service — SEIF Limousine";
    const description = service ? service[lang].description : "Luxury chauffeur service in Egypt.";
    const canonicalUrl = SITE_CONFIG.getCanonicalUrl(`/services/${params.serviceSlug}`, lang);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(service ? [{ property: "og:image", content: service.heroImage }] : []),
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        ...SITE_CONFIG.getHreflangLinks(`/services/${params.serviceSlug}`),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  useLenis();
  const { t } = useTranslation();
  const { service, lang } = Route.useLoaderData() as { service: ServiceInfo; lang: "en" | "ar" };
  const data = service[lang];
  const canonicalUrl = SITE_CONFIG.getCanonicalUrl(`/services/${service.slug}`, lang);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.description,
    "provider": {
      "@id": "https://seif-limousine.online/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Egypt"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("fleet.breadcrumbHome"),
        "item": `https://seif-limousine.online/${lang}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": data.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />

      <main style={{ background: "var(--seif-black)", color: "#fff", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <nav style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--seif-white-60)", marginBottom: 24 }}>
            <Link to="/$lang" params={{ lang }} style={{ color: "var(--seif-white-60)", textDecoration: "none" }}>{t("fleet.breadcrumbHome")}</Link>
            <span style={{ margin: "0 10px", color: "var(--seif-gold)" }}>/</span>
            <span style={{ color: "#fff" }}>{data.title}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.2, marginBottom: 16 }}
          >
            {data.title}
          </motion.h1>
          <p style={{ color: "var(--seif-white-60)", fontSize: 18, lineHeight: 1.7, maxWidth: 800, marginBottom: 40 }}>
            {data.description}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
            <a
              href={getWhatsAppUrl(`Booking inquiry: ${data.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, height: 50, padding: "0 28px",
                borderRadius: 4, background: "var(--seif-gold)", color: "var(--seif-black)",
                fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none"
              }}
            >
              <WhatsAppIcon size={18} />
              Book Service via WhatsApp
            </a>
            <a
              href="tel:+201029582241"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, height: 50, padding: "0 28px",
                borderRadius: 4, background: "transparent", border: "1px solid var(--seif-gold-border)", color: "#fff",
                fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none"
              }}
            >
              <PhoneIcon size={18} />
              Call +20 102 958 2241
            </a>
          </div>

          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 20, color: "var(--seif-gold)" }}>Service Benefits & Features</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {data.benefits.map((b) => (
                <div key={b} style={{ padding: 20, border: "1px solid var(--seif-gold-border)", borderRadius: 6, background: "var(--seif-surface)" }}>
                  <span style={{ color: "var(--seif-gold)", marginInlineEnd: 10, fontWeight: 800 }}>✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </section>

          {data.faqs && data.faqs.length > 0 && (
            <section style={{ marginBottom: 60 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 20, color: "var(--seif-gold)" }}>Frequently Asked Questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {data.faqs.map((faq) => (
                  <div key={faq.question} style={{ padding: 24, border: "1px solid var(--seif-gold-border)", borderRadius: 6, background: "var(--seif-surface)" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{faq.question}</h3>
                    <p style={{ color: "var(--seif-white-60)", fontSize: 15, lineHeight: 1.6 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/\$lang/services.\$serviceSlug.tsx
git commit -m "feat(seo): create dynamic service landing route with schema and hreflang"
```

---

### Task 3: Update Sitemap Generator Script to Include Service Landing Routes

**Files:**
- Modify: `scripts/generate-sitemap.js`

**Interfaces:**
- Consumes: `routePaths` array in `scripts/generate-sitemap.js`
- Produces: `public/sitemap.xml` with 24 total multilingual URLs

- [ ] **Step 1: Update `scripts/generate-sitemap.js`**

```javascript
const routePaths = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/fleet/jetour-x90-plus', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mitsubishi-xpander-cross-25', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/chery-tiggo-8', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/toyota-hiace', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/soueast-s07', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mercedes-e200', priority: '0.8', changefreq: 'weekly' },
  { path: '/fleet/mercedes-viano', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/cairo-airport-limousine', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/sharm-el-sheikh-limousine', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/hurghada-limousine', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/intercity-limousine-egypt', priority: '0.9', changefreq: 'weekly' },
];
```

- [ ] **Step 2: Run sitemap generator script**

Run: `node scripts/generate-sitemap.js`  
Expected: Generates 24 total URL entries in `public/sitemap.xml`.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-sitemap.js public/sitemap.xml public/robots.txt
git commit -m "feat(seo): expand sitemap generator with 4 high-intent service landing routes"
```

---

### Task 4: Verify Build & Test Complete Service Routing Flow

**Files:**
- Test build output

- [ ] **Step 1: Check TypeScript compilation**

Run: `npx tsc --noEmit`  
Expected: PASS with 0 errors.

- [ ] **Step 2: Test full project build**

Run: `npm run build`  
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit verification**

```bash
git add .
git commit -m "chore(seo): verify Phase 3 high-intent landing pages build"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-05-high-intent-landing-pages.md`.

Two execution options:
1. **Subagent-Driven (recommended)** - Dispatch fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach would you like to take?
