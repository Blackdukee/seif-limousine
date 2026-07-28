/**
 * Centralized Site Configuration for Seif Limousine
 * Ensures strict usage of production domain across canonical tags, sitemap, and SEO metadata.
 */

export const SITE_CONFIG = {
  name: "Seif Limousine",
  domain: "seif-limousine.online",
  baseUrl: "https://seif-limousine.online",
  defaultTitle: "Seif Limousine — Luxury Chauffeur & Private Driver Services in Egypt",
  defaultDescription:
    "SEIF LIMOUSINE offers premium chauffeur-driven luxury vehicle rentals, airport transfers, and intercity private drivers across Egypt.",
  whatsappNumber: "201029582241",
  getCanonicalUrl: (path: string = "") => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `https://seif-limousine.online${cleanPath === "/" ? "/" : cleanPath}`;
  },
};
