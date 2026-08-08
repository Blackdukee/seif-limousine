# Rich Schema Markup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement structured JSON-LD schema markup (`LimousineService`, `Vehicle`, `BreadcrumbList`, `FAQPage`) across Seif Limousine to earn rich SERP snippets and Knowledge Graph placement.

**Architecture:** Inject validated JSON-LD schema objects into the `<head>` of `__root.tsx`, `$lang/index.tsx`, and `$lang/fleet.$slug.tsx` using `<script type="application/ld+json">`.

**Tech Stack:** React 19, `@tanstack/react-router`, TypeScript, Schema.org standard JSON-LD.

## Global Constraints

- Domain: `https://seif-limousine.online`
- Phone: `+201029582241`
- Schema format: Valid JSON-LD rendered via `<script type="application/ld+json">`

---

### Task 1: Add `LimousineService` & `LocalBusiness` Schema to Global Shell

**Files:**

- Modify: `src/routes/__root.tsx:130-152`

**Interfaces:**

- Consumes: `RootShell` component in `src/routes/__root.tsx`
- Produces: Enhanced `@graph` JSON-LD array containing `WebSite`, `Organization`, and `LimousineService`

- [ ] **Step 1: Update `jsonLd` object in `src/routes/__root.tsx`**

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://seif-limousine.online/#website",
      url: "https://seif-limousine.online/",
      name: "Seif Limousine",
      alternateName: ["SEIF LIMOUSINE", "Seif Limousine Egypt", "Seif Limo"],
      publisher: {
        "@id": "https://seif-limousine.online/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://seif-limousine.online/#organization",
      name: "Seif Limousine",
      url: "https://seif-limousine.online/",
      logo: "https://seif-limousine.online/favicon.png",
      telephone: "+201029582241",
    },
    {
      "@type": ["LimousineService", "TaxiService", "LocalBusiness"],
      "@id": "https://seif-limousine.online/#service",
      name: "Seif Limousine",
      url: "https://seif-limousine.online/",
      logo: "https://seif-limousine.online/favicon.png",
      telephone: "+201029582241",
      priceRange: "$$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Sharm El Sheikh" },
        { "@type": "City", name: "Hurghada" },
        { "@type": "City", name: "Alexandria" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Luxury Chauffeur Services",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Airport Transfers" },
          { "@type": "OfferCatalog", name: "Intercity Transfers" },
          { "@type": "OfferCatalog", name: "Hourly Private Driver Rental" },
        ],
      },
    },
  ],
};
```

- [ ] **Step 2: Run TypeScript check**

Run: `npx tsc --noEmit`  
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat(seo): add LimousineService and LocalBusiness schema to RootShell"
```

---

### Task 2: Add `FAQPage` Schema to Homepage Route

**Files:**

- Modify: `src/routes/$lang/index.tsx`

**Interfaces:**

- Consumes: Homepage component in `src/routes/$lang/index.tsx`
- Produces: Injected `FAQPage` JSON-LD `<script>` in homepage markup

- [ ] **Step 1: Add `FAQPage` JSON-LD inside `Index` component in `src/routes/$lang/index.tsx`**

```tsx
function Index() {
  useLenis();
  const [ready, setReady] = useState(false);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a private chauffeur in Egypt with Seif Limousine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can request an instant quote and book directly via WhatsApp or phone call 24/7.",
        },
      },
      {
        "@type": "Question",
        name: "Does Seif Limousine offer airport pickup and meet & greet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide professional airport transfer services with personalized flight tracking and meet & greet at Cairo, Sharm El Sheikh, and Hurghada airports.",
        },
      },
      {
        "@type": "Question",
        name: "What luxury vehicles are available in Seif Limousine fleet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our fleet includes Mercedes E200 executive sedans, Mercedes Viano VIP vans, Toyota HiAce group minivans, Chery Tiggo 8, Jetour X90 Plus, and Mitsubishi Xpander Cross.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <Hero />
        <TrustBar />
        <FeaturedDestinations />
        <FleetSection />
        <HowItWorks />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
      <span style={{ display: "none" }}>{ready ? "1" : "0"}</span>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/\$lang/index.tsx
git commit -m "feat(seo): add FAQPage schema to homepage route"
```

---

### Task 3: Add `Vehicle` & `BreadcrumbList` Schema to Fleet Detail Route

**Files:**

- Modify: `src/routes/$lang/fleet.$slug.tsx`

**Interfaces:**

- Consumes: Vehicle object `v` in `src/routes/$lang/fleet.$slug.tsx`
- Produces: Dynamically generated `Vehicle`, `Product`, and `BreadcrumbList` JSON-LD

- [ ] **Step 1: Add `Vehicle` and `BreadcrumbList` schema generation to `FleetDetail` in `src/routes/$lang/fleet.$slug.tsx`**

```tsx
function FleetDetail() {
  useLenis();
  const { t } = useTranslation();
  const { v, lang } = Route.useLoaderData() as { v: Vehicle; lang: "en" | "ar" };
  const [activeImg, setActiveImg] = useState(0);

  const vehicleName = t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name });
  const vehicleDesc = t(`vehiclesData.${v.slug}.description`, { defaultValue: v.description });
  const canonicalUrl = SITE_CONFIG.getCanonicalUrl(`/fleet/${v.slug}`, lang);

  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Vehicle", "Product"],
    name: `${vehicleName} With Chauffeur`,
    description: vehicleDesc,
    image: v.images.map((img) =>
      img.startsWith("http") ? img : `https://seif-limousine.online${img}`,
    ),
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": "https://seif-limousine.online/#organization",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("fleet.breadcrumbHome"),
        item: `https://seif-limousine.online/${lang}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("fleet.breadcrumbFleet"),
        item: `https://seif-limousine.online/${lang}/#fleet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicleName,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      {/* Rest of FleetDetail component */}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/\$lang/fleet.\$slug.tsx
git commit -m "feat(seo): add Vehicle and BreadcrumbList schema to fleet detail route"
```

---

### Task 4: Verify Build & TypeScript Compilation

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
git commit -m "chore(seo): verify Phase 2 schema markup build"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-05-rich-schema-markup.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach would you like to take?
