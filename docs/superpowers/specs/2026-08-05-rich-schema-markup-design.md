# Design Spec: Rich Schema Markup & Structured Data (Phase 2 SEO Audit)

**Date:** 2026-08-05  
**Target Domain:** `https://seif-limousine.online`  
**Framework:** TanStack Start (`@tanstack/react-router` + Vite SSR)

---

## Executive Summary

This design specification defines the implementation of structured JSON-LD schema markup across Seif Limousine. It adds `LimousineService` / `LocalBusiness`, `Vehicle` / `Product`, `BreadcrumbList`, and `FAQPage` schemas to earn Google Rich Results, SERP Knowledge Panels, and AI Search Overview citations.

---

## 1. Global Service & Business Schema (`src/routes/__root.tsx`)

Add `LimousineService` to the global `@graph` array in `RootShell`:

```json
{
  "@type": ["LimousineService", "TaxiService", "LocalBusiness"],
  "@id": "https://seif-limousine.online/#service",
  "name": "Seif Limousine",
  "url": "https://seif-limousine.online/",
  "logo": "https://seif-limousine.online/favicon.png",
  "telephone": "+201029582241",
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    { "@type": "Country", "name": "Egypt" },
    { "@type": "City", "name": "Cairo" },
    { "@type": "City", "name": "Sharm El Sheikh" },
    { "@type": "City", "name": "Hurghada" },
    { "@type": "City", "name": "Alexandria" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Luxury Chauffeur Services",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Airport Transfers" },
      { "@type": "OfferCatalog", "name": "Intercity Transfers" },
      { "@type": "OfferCatalog", "name": "Hourly Private Driver Rental" }
    ]
  }
}
```

---

## 2. Vehicle & Product Schema (`src/routes/$lang/fleet.$slug.tsx`)

Dynamically generate `Vehicle` and `Product` JSON-LD for each fleet page:

```json
{
  "@context": "https://schema.org",
  "@type": ["Vehicle", "Product"],
  "name": "Vehicle Name With Chauffeur",
  "description": "Vehicle Description",
  "image": ["image_url_1", "image_url_2"],
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "url": "canonical_url",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@id": "https://seif-limousine.online/#organization"
    }
  }
}
```

---

## 3. BreadcrumbList Schema (`src/routes/$lang/fleet.$slug.tsx`)

Inject structured breadcrumbs JSON-LD into vehicle detail pages:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://seif-limousine.online/en/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Fleet",
      "item": "https://seif-limousine.online/en/#fleet"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Vehicle Name",
      "item": "https://seif-limousine.online/en/fleet/slug"
    }
  ]
}
```

---

## 4. FAQPage Schema (`src/routes/$lang/index.tsx`)

Inject `FAQPage` JSON-LD into localized homepages:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book a private chauffeur in Egypt with Seif Limousine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can request an instant quote and book directly via WhatsApp or phone call 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Does Seif Limousine offer airport pickup and meet & greet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide professional airport transfer services with personalized flight tracking and meet & greet at Cairo, Sharm El Sheikh, and Hurghada airports."
      }
    }
  ]
}
```

---

## 5. Self-Review Checklist

- [x] **Placeholder scan:** Explicit JSON-LD structures defined.
- [x] **Internal consistency:** Matches domain `https://seif-limousine.online` and existing organization structure.
- [x] **Scope check:** Strictly covers Phase 2 schema markup.
