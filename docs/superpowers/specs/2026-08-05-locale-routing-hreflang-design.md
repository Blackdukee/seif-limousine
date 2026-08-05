# Design Spec: Locale-Based Routing & Hreflang Tags (Phase 1 SEO Audit)

**Date:** 2026-08-05  
**Target Domain:** `https://seif-limousine.online`  
**Framework:** TanStack Start (`@tanstack/react-router` + Vite SSR + React 19)

---

## Executive Summary
This design specification defines the migration of Seif Limousine from single-URL client-side language switching to explicit URL-based locale subdirectories (`/en/`, `/ar/`). This resolves the critical SEO flaw where search engines (Google, Bing) were unable to crawl or index Arabic content.

---

## 1. Route Architecture & TanStack Router Layout

### 1.1 Directory & File Map
- `src/routes/index.tsx`: Root route at `/`. Handles root access by detecting client language or defaulting to `en`, performing a 307 redirect to `/en/` or `/ar/`.
- `src/routes/$lang/index.tsx`: Main landing page for target language (`/en/`, `/ar/`).
- `src/routes/$lang/fleet.$slug.tsx`: Fleet vehicle detail page (`/en/fleet/mercedes-e200`, `/ar/fleet/mercedes-e200`).

### 1.2 Route Validation & Parameter Safety
- A route loader validator ensures `$lang` matches strictly `"en"` or `"ar"`.
- Accessing unsupported language prefixes (e.g. `/fr/`) throws a `notFound()` or redirects cleanly to `/en/`.

---

## 2. Server-Side Rendering (SSR) & i18n Synchronization

### 2.1 Language Sync on Request
During SSR request handling:
1. `i18n.changeLanguage(params.lang)` is executed in the route loader before rendering components or generating metadata.
2. `RootShell` in `src/routes/__root.tsx` receives the active locale and renders:
   ```html
   <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} class={`lang-${lang}`}>
   ```
3. Eliminates client-side layout shifts (RTL vs LTR) and ensures Googlebot parses the rendered language immediately.

---

## 3. Metadata & Hreflang Tag Specification

### 3.1 Centralized Helpers (`src/config/site.ts`)
```typescript
export const SITE_CONFIG = {
  name: "Seif Limousine",
  domain: "seif-limousine.online",
  baseUrl: "https://seif-limousine.online",
  supportedLangs: ["en", "ar"] as const,
  defaultLang: "en" as const,
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

### 3.2 Route Head Outputs
Every localized route will return canonical and hreflang links via `Route.head()`:
- `rel: "canonical"` pointing to the current localized URL (e.g. `https://seif-limousine.online/ar/fleet/mercedes-e200`).
- `rel: "alternate"` for `en`, `ar`, and `x-default`.

---

## 4. UI Components & Navigation Adaptation

### 4.1 Language Toggle (`src/components/seif/LanguageToggle.tsx`)
- When the user toggles between `EN` and `AR`, `LanguageToggle` reads the current route matching pattern and navigates to the equivalent URL in the target language (e.g., from `/en/fleet/mercedes-e200` to `/ar/fleet/mercedes-e200`).

### 4.2 Internal Navigation Links
- All internal links rendered in `Navbar.tsx`, `Footer`, `FleetSection.tsx`, and `FeaturedDestinations.tsx` will prepend the current `$lang` context (e.g. `/$lang/fleet/$slug`).

---

## 5. Multilingual XML Sitemap

Update `scripts/generate-sitemap.js` to build `public/sitemap.xml` with Google International Sitemap annotations:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://seif-limousine.online/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://seif-limousine.online/en/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://seif-limousine.online/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://seif-limousine.online/en/"/>
    <lastmod>2026-08-05</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seif-limousine.online/ar/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://seif-limousine.online/en/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://seif-limousine.online/ar/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://seif-limousine.online/en/"/>
    <lastmod>2026-08-05</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- Fleet detail routes for /en/ and /ar/ -->
</urlset>
```

---

## 6. Self-Review Checklist
- [x] **Placeholder scan:** No TBDs or TODOs.
- [x] **Internal consistency:** URLs, canonicals, hreflang links, and i18n SSR logic match across all files.
- [x] **Scope check:** Strictly focused on Phase 1 (routing + i18n + hreflang + sitemap).
- [x] **Ambiguity check:** All routes and fallback behaviors defined explicitly.
