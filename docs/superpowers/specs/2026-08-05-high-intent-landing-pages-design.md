# Design Spec: High-Intent Landing Pages & Sitemap Expansion (Phase 3 SEO Audit)

**Date:** 2026-08-05  
**Target Domain:** `https://seif-limousine.online`  
**Framework:** TanStack Start (`@tanstack/react-router` + Vite SSR)

---

## Executive Summary

This design specification defines the creation of 4 high-intent, search-optimized landing pages targeting high-volume commercial keywords in Egypt (Cairo Airport transfers, Sharm El Sheikh, Hurghada, and Intercity private drivers) and expands the sitemap from 16 to 24 multilingual URLs.

---

## 1. Services Data Store (`src/data/servicesData.ts`)

Centralized service data module storing English and Arabic content:

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
```

Target Slugs:

- `cairo-airport-limousine`
- `sharm-el-sheikh-limousine`
- `hurghada-limousine`
- `intercity-limousine-egypt`

---

## 2. Route Architecture (`src/routes/$lang/services.$serviceSlug.tsx`)

### 2.1 Route Handler

- URL Pattern: `/$lang/services/$serviceSlug`
- Loader: Validates `lang` as `"en"` | `"ar"` and `serviceSlug` against `servicesData`. Calls `i18n.changeLanguage(lang)`.
- Head: Emits localized meta title, description, canonical link, hreflang links, `Service` JSON-LD schema, and `BreadcrumbList` JSON-LD schema.

---

## 3. Multilingual Sitemap Expansion (`scripts/generate-sitemap.js`)

Add service landing page paths to `scripts/generate-sitemap.js`:

- `/services/cairo-airport-limousine` (priority 0.9)
- `/services/sharm-el-sheikh-limousine` (priority 0.9)
- `/services/hurghada-limousine` (priority 0.9)
- `/services/intercity-limousine-egypt` (priority 0.9)

Result: Generates 24 total `<url>` entries in `public/sitemap.xml` with `xhtml:link` alternate tags for `en`, `ar`, and `x-default`.

---

## 4. Self-Review Checklist

- [x] **Placeholder scan:** Exact route patterns and data store structures defined.
- [x] **Internal consistency:** Matches `SITE_CONFIG` canonical and hreflang generators.
- [x] **Scope check:** Strictly covers Phase 3 service landing pages and sitemap expansion.
