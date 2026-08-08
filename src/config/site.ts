/**
 * Centralized Site Configuration for Seif Limousine
 * Ensures strict usage of production domain across canonical tags, sitemap, and SEO metadata.
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
