# Locale-Based Routing & Hreflang Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Seif Limousine to explicit URL-based locale subdirectories (`/en/`, `/ar/`) with dynamic HTML `lang`/`dir` attributes and complete hreflang XML sitemap annotations to enable full search engine indexation of Arabic content.

**Architecture:** TanStack Start (`@tanstack/react-router` + Vite SSR) parameterizes routes with `$lang` (`/src/routes/$lang/index.tsx` and `/src/routes/$lang/fleet.$slug.tsx`), synchronizing `i18n.changeLanguage(lang)` during server-side rendering, and outputting symmetrical hreflang `<link>` tags in `<head>` and `public/sitemap.xml`.

**Tech Stack:** `@tanstack/react-router`, `react-i18next`, `i18next`, TypeScript, Node.js (sitemap script).

## Global Constraints

- Domain: `https://seif-limousine.online`
- Supported Locales: `en`, `ar`
- Fallback Locale: `en`
- Sitemaps must include `xmlns:xhtml="http://www.w3.org/1999/xhtml"` with `xhtml:link` for `en`, `ar`, and `x-default`

---

### Task 1: Add Localized URL & Hreflang Helpers to Central Site Config

**Files:**

- Modify: `src/config/site.ts`

**Interfaces:**

- Consumes: `SITE_CONFIG` object
- Produces: `SITE_CONFIG.getLocalizedUrl(path, lang)`, `SITE_CONFIG.getHreflangLinks(path)`

- [ ] **Step 1: Update `src/config/site.ts` with helper methods**

```typescript
/**
 * Centralized Site Configuration for Seif Limousine
 */
export const SITE_CONFIG = {
  name: "Seif Limousine",
  domain: "seif-limousine.online",
  baseUrl: "https://seif-limousine.online",
  supportedLangs: ["en", "ar"] as const,
  defaultLang: "en" as const,
  defaultTitle: "Seif Limousine — Luxury Chauffeur & Private Driver Services in Egypt",
  defaultDescription:
    "SEIF LIMOUSINE offers premium chauffeur-driven luxury vehicle rentals, airport transfers, and intercity private drivers across Egypt.",
  whatsappNumber: "201029582241",
  getCanonicalUrl: (path: string = "", lang: "en" | "ar" = "en") => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const base = cleanPath === "/" ? "" : cleanPath;
    return `https://seif-limousine.online/${lang}${base}`;
  },
  getLocalizedUrl: (path: string = "", lang: "en" | "ar" = "en") => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const base = cleanPath === "/" ? "" : cleanPath;
    return `https://seif-limousine.online/${lang}${base}`;
  },
  getHreflangLinks: (path: string = "") => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const base = cleanPath === "/" ? "" : cleanPath;
    return [
      { rel: "alternate", hrefLang: "en", href: `https://seif-limousine.online/en${base}` },
      { rel: "alternate", hrefLang: "ar", href: `https://seif-limousine.online/ar${base}` },
      { rel: "alternate", hrefLang: "x-default", href: `https://seif-limousine.online/en${base}` },
    ];
  },
};
```

- [ ] **Step 2: Verify project builds**

Run: `npx tsc --noEmit`  
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/config/site.ts
git commit -m "feat(seo): add getLocalizedUrl and getHreflangLinks to SITE_CONFIG"
```

---

### Task 2: Update Sitemap Generator Script to Output Multilingual XML

**Files:**

- Modify: `scripts/generate-sitemap.js`

**Interfaces:**

- Consumes: `routes` array and `SITE_CONFIG` base URLs
- Produces: `public/sitemap.xml` with `xhtml:link` entries for `en`, `ar`, and `x-default`

- [ ] **Step 1: Update `scripts/generate-sitemap.js` implementation**

```javascript
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://seif-limousine.online";
const TODAY = new Date().toISOString().split("T")[0];

const routePaths = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "/fleet/jetour-x90-plus", priority: "0.8", changefreq: "weekly" },
  { path: "/fleet/mitsubishi-xpander-cross-25", priority: "0.8", changefreq: "weekly" },
  { path: "/fleet/chery-tiggo-8", priority: "0.8", changefreq: "weekly" },
  { path: "/fleet/toyota-hiace", priority: "0.8", changefreq: "weekly" },
  { path: "/fleet/soueast-s07", priority: "0.8", changefreq: "weekly" },
  { path: "/fleet/mercedes-e200", priority: "0.8", changefreq: "weekly" },
  { path: "/fleet/mercedes-viano", priority: "0.8", changefreq: "weekly" },
];

function generateSitemap() {
  const languages = ["en", "ar"];
  let xmlEntries = "";

  for (const item of routePaths) {
    for (const lang of languages) {
      const locUrl = `${BASE_URL}/${lang}${item.path}`;
      xmlEntries += `  <url>
    <loc>${locUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${item.path}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${BASE_URL}/ar${item.path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${item.path}"/>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>\n`;
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries}</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

  const publicDir = path.join(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

  console.log(
    `[Sitemap Generator] Successfully generated multilingual sitemap.xml & robots.txt using base URL: ${BASE_URL}`,
  );
}

generateSitemap();
```

- [ ] **Step 2: Run sitemap generator script**

Run: `node scripts/generate-sitemap.js`  
Expected: Outputs `[Sitemap Generator] Successfully generated multilingual sitemap.xml & robots.txt`.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-sitemap.js public/sitemap.xml public/robots.txt
git commit -m "feat(seo): update sitemap generator with multilingual xhtml:link annotations"
```

---

### Task 3: Create Localized Route Structure (`$lang/index.tsx` & `$lang/fleet.$slug.tsx`)

**Files:**

- Create: `src/routes/$lang/index.tsx`
- Create: `src/routes/$lang/fleet.$slug.tsx`
- Modify: `src/routes/index.tsx` (redirect root `/` to `/en/`)

**Interfaces:**

- Consumes: `$lang` param (`en` | `ar`), `i18n.changeLanguage()`, `SITE_CONFIG.getHreflangLinks()`
- Produces: SSR localized rendered landing page & vehicle detail page

- [ ] **Step 1: Modify root `src/routes/index.tsx` to handle root redirection**

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/$lang",
      params: { lang: "en" },
    });
  },
});
```

- [ ] **Step 2: Create `src/routes/$lang/index.tsx`**

```tsx
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useLenis } from "@/components/seif/useLenis";
import { Preloader } from "@/components/seif/Preloader";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Hero } from "@/components/seif/Hero";
import { FleetSection } from "@/components/seif/FleetSection";
import { HowItWorks } from "@/components/seif/HowItWorks";
import { FinalCta, Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";
import { TrustBar } from "@/components/seif/TrustBar";
import { FeaturedDestinations } from "@/components/seif/FeaturedDestinations";
import { Testimonials } from "@/components/seif/Testimonials";

import heroImg from "@/assets/seif-hero.webp";
import i18n from "@/i18n";
import { SITE_CONFIG } from "@/config/site";

export const Route = createFileRoute("/$lang/")({
  loader: ({ params }) => {
    const lang = params.lang as "en" | "ar";
    if (lang !== "en" && lang !== "ar") {
      throw notFound();
    }
    i18n.changeLanguage(lang);
    return { lang };
  },
  head: ({ params }) => {
    const lang = (params.lang as "en" | "ar") || "en";
    i18n.changeLanguage(lang);
    const title = `${i18n.t("nav.logo")} — ${i18n.t("hero.eyebrow")}`;
    const description = i18n.t("hero.description");
    const ogDescription = `${i18n.t("hero.title1")} ${i18n.t("hero.title2")}. ${i18n.t("nav.bookDriver")} 24/7.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: SITE_CONFIG.getCanonicalUrl("", lang) },
        ...SITE_CONFIG.getHreflangLinks(""),
        { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as any,
      ],
    };
  },
  component: Index,
});

function Index() {
  useLenis();
  const [ready, setReady] = useState(false);

  return (
    <>
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

- [ ] **Step 3: Create `src/routes/$lang/fleet.$slug.tsx`**

```tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React, { useState } from "react";
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
import { getVehicle, AT_A_GLANCE_BADGES, VEHICLES, Vehicle } from "@/components/seif/fleetData";
import { SITE_CONFIG } from "@/config/site";

const getBadgeKey = (b: string) => {
  if (b.includes("Chauffeur")) return "chauffeur";
  if (b.includes("Deposit")) return "noDeposit";
  if (b.includes("Cancellation")) return "freeCancellation";
  if (b.includes("Door")) return "doorToDoor";
  if (b.includes("Meet")) return "meetGreet";
  return "";
};

export const Route = createFileRoute("/$lang/fleet/$slug")({
  loader: ({ params }) => {
    const lang = params.lang as "en" | "ar";
    if (lang !== "en" && lang !== "ar") throw notFound();
    i18n.changeLanguage(lang);
    const v = getVehicle(params.slug);
    if (!v) throw notFound();
    return { v, lang };
  },
  head: ({ params }) => {
    const lang = (params.lang as "en" | "ar") || "en";
    i18n.changeLanguage(lang);
    const v = getVehicle(params.slug);
    const name = v ? i18n.t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name }) : "";
    const withChauffeur = i18n.t("fleet.withChauffeur");
    const title = v ? `${name} ${withChauffeur} — SEIF Limousine` : "Vehicle — SEIF Limousine";
    const description = v
      ? i18n.t(`vehiclesData.${v.slug}.description`, { defaultValue: v.description })
      : "Chauffeur-driven luxury vehicles across Egypt.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(v ? [{ property: "og:image", content: v.images[0] }] : []),
      ],
      links: [
        { rel: "canonical", href: SITE_CONFIG.getCanonicalUrl(`/fleet/${params.slug}`, lang) },
        ...SITE_CONFIG.getHreflangLinks(`/fleet/${params.slug}`),
      ],
    };
  },
  notFoundComponent: () => {
    const { t } = useTranslation();
    const { params } = Route.useMatch();
    const lang = params?.lang || "en";
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          background: "var(--seif-black)",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 12 }}>{t("notFound.vehicleTitle")}</h1>
          <Link to="/$lang" params={{ lang }} style={{ color: "var(--seif-gold)" }}>
            {t("notFound.backToHome")}
          </Link>
        </div>
      </div>
    );
  },
  component: FleetDetail,
});

function FleetDetail() {
  useLenis();
  const { t } = useTranslation();
  const { v, lang } = Route.useLoaderData() as { v: Vehicle; lang: "en" | "ar" };
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main
        className="seif-fleet-detail-main"
        style={{
          background: "var(--seif-black)",
          color: "#fff",
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        <div
          className="seif-fleet-detail-container"
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
        >
          <nav
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--seif-white-60)",
              marginBottom: 24,
            }}
          >
            <Link
              to="/$lang"
              params={{ lang }}
              style={{ color: "var(--seif-white-60)", textDecoration: "none" }}
            >
              {t("fleet.breadcrumbHome")}
            </Link>
            <span style={{ margin: "0 10px", color: "var(--seif-gold)" }}>/</span>
            <Link
              to="/$lang"
              params={{ lang }}
              hash="fleet"
              style={{ color: "var(--seif-white-60)", textDecoration: "none" }}
            >
              {t("fleet.breadcrumbFleet")}
            </Link>
            <span style={{ margin: "0 10px", color: "var(--seif-gold)" }}>/</span>
            <span style={{ color: "#fff" }}>
              {t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}
            </span>
          </nav>
          <h1>
            {t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}{" "}
            <span style={{ color: "var(--seif-gold)" }}>{t("fleet.withChauffeur")}</span>
          </h1>
          <p style={{ color: "var(--seif-white-60)", marginTop: 14 }}>
            {t(`vehiclesData.${v.slug}.description`, { defaultValue: v.description })}
          </p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </>
  );
}
```

- [ ] **Step 4: Commit localized routes**

```bash
git add src/routes/index.tsx src/routes/\$lang/index.tsx src/routes/\$lang/fleet.\$slug.tsx
git commit -m "feat(seo): implement $lang route handlers for homepage and fleet detail"
```

---

### Task 4: Adapt LanguageToggle Component to Navigate Locale URLs

**Files:**

- Modify: `src/components/seif/LanguageToggle.tsx`

**Interfaces:**

- Consumes: TanStack Router `useParams`, `useNavigate`
- Produces: Click handler that navigates between `/en/...` and `/ar/...`

- [ ] **Step 1: Update `src/components/seif/LanguageToggle.tsx`**

```tsx
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "@tanstack/react-router";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const params = useParams({ strict: false }) as { lang?: string };
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = params.lang || i18n.language || "en";

  function toggleLanguage() {
    const targetLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(targetLang);
    try {
      localStorage.setItem("i18nextLng", targetLang);
    } catch (e) {}

    // Replace lang prefix in current pathname or navigate to target lang home
    const pathname = location.pathname;
    let targetPath = `/${targetLang}`;
    if (pathname.startsWith("/en") || pathname.startsWith("/ar")) {
      targetPath = pathname.replace(/^\/(en|ar)/, `/${targetLang}`);
    }

    navigate({ to: targetPath });
  }

  return (
    <button
      onClick={toggleLanguage}
      className="seif-lang-toggle flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--seif-gold-border)] text-xs font-semibold uppercase tracking-wider text-white hover:border-[var(--seif-gold)] transition-colors cursor-pointer"
      aria-label={`Switch to ${currentLang === "ar" ? "English" : "Arabic"}`}
    >
      <span className={currentLang === "en" ? "text-[var(--seif-gold)]" : "text-white/60"}>EN</span>
      <span className="text-[var(--seif-gold)]">/</span>
      <span className={currentLang === "ar" ? "text-[var(--seif-gold)]" : "text-white/60"}>
        عربي
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Commit LanguageToggle changes**

```bash
git add src/components/seif/LanguageToggle.tsx
git commit -m "feat(i18n): update LanguageToggle to navigate localized route paths"
```

---

### Task 5: Verify Build & Test Complete Routing Flow

**Files:**

- Test build output and verify router generation

- [ ] **Step 1: Check TypeScript compilation**

Run: `npx tsc --noEmit`  
Expected: PASS with 0 errors.

- [ ] **Step 2: Test project build**

Run: `npm run build`  
Expected: PASS. Sitemap and Vite production build generate successfully.

- [ ] **Step 3: Commit final plan verification**

```bash
git add .
git commit -m "chore(seo): verify Phase 1 locale routing and hreflang tags build"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-05-locale-routing-hreflang.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach would you like to take?
