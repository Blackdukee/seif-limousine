// ─── Car images — imported so Vite hashes and optimises them at build time ────
import jetour1 from "@/assets/jetour-1.webp";
import jetour2 from "@/assets/jetour-2.webp";
import jetour3 from "@/assets/jetour-3.webp";
import jetour4 from "@/assets/jetour-4.jpg";

import mitsubishi1 from "@/assets/mitsubishi-1.webp";
import mitsubishi2 from "@/assets/mitsubishi-2.webp";
import mitsubishi3 from "@/assets/mitsubishi-3.webp";
import mitsubishi4 from "@/assets/mitsubishi-4.webp";

import chery1 from "@/assets/chery-1.webp";
import chery2 from "@/assets/chery-2.webp";
import chery3 from "@/assets/chery-3.webp";
import chery4 from "@/assets/chery-4.webp";
import hiace1 from "@/assets/hiace-1.webp";
import hiace2 from "@/assets/hiace-2.png";
import hiace3 from "@/assets/hiace-3.png";
import hiace4 from "@/assets/hiace-4.png";

export interface Vehicle {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  passengers: string;
  luggage: string;
  images: string[];
  popular?: boolean;
  description: string;
  features: string[];
}

export const PRICING: [string, string, string][] = [
  ["ONE WAY", "1,500", "Point-to-point"],
  ["2 HOURS", "2,800", "Short errands"],
  ["5 HOURS", "5,500", "Half day"],
  ["10 HOURS", "9,000", "Full day"],
];

export const AT_A_GLANCE_BADGES = [
  "Chauffeur Included",
  "Door-to-Door",
  "Meet & Greet",
];

export const VEHICLES: Vehicle[] = [
  {
    slug: "jetour-x70-plus",
    name: "Jetour X70 Plus",
    tagline: "Spacious SUV comfort",
    category: "Premium SUV",
    passengers: "Up to 7 passengers",
    luggage: "3 suitcases",
    popular: true,
    images: [jetour1, jetour2, jetour3, jetour4],
    description:
      "The Jetour X70 Plus delivers a premium SUV experience with a refined, spacious cabin, advanced infotainment, and a smooth ride — ideal for executive airport transfers and corporate commutes across Cairo and beyond.",
    features: [
      "Leather seats",
      "Dual-zone climate control",
      "Large touchscreen infotainment",
      "USB fast charging",
      "Complimentary water",
    ],
  },
  {
    slug: "mitsubishi-xpander-cross-25",
    name: "Mitsubishi Xpander Cross",
    tagline: "Versatile family & corporate MPV",
    category: "Executive MPV",
    passengers: "Up to 7 passengers",
    luggage: "4 suitcases",
    images: [mitsubishi1, mitsubishi2, mitsubishi3, mitsubishi4],
    description:
      "The Mitsubishi Xpander Cross combines bold SUV styling with flexible 7-seat MPV practicality. Its elevated ground clearance, spacious cabin, and abundant luggage room make it the top choice for family trips and group corporate travel.",
    features: [
      "7-seat flexible layout",
      "High ground clearance",
      "Rear AC vents",
      "Fold-flat third row",
      "Phone chargers",
      "Tinted windows",
    ],
  },
  {
    slug: "chery-tiggo-8",
    name: "Chery Tiggo 8",
    tagline: "Feature-rich luxury crossover",
    category: "Luxury Crossover",
    passengers: "Up to 7 passengers",
    luggage: "4 suitcases",
    images: [chery1, chery2, chery3, chery4],
    description:
      "The Chery Tiggo 8 is a statement in modern luxury — a feature-loaded 7-seat crossover with panoramic roof, premium ambient lighting, and an impressively quiet cabin. Perfect for VIP transfers and high-profile arrivals.",
    features: [
      "Premium ambient lighting",
      "360° camera system",
      "Ventilated front seats",
      "Large floating display",
      "Quiet luxury cabin",
    ],
  },
  {
    slug: "toyota-hiace",
    name: "Toyota Hiace",
    tagline: "Premium spacious group transport",
    category: "Luxury Van",
    passengers: "Up to 14 passengers",
    luggage: "6-8 suitcases",
    images: [hiace1, hiace2, hiace3, hiace4],
    description:
      "The Toyota Hiace is Egypt's leading choice for premium group travel. Offering a high-roof design, comfortable seating for up to 14 passengers, and dedicated luggage space, it is perfect for large families, corporate delegations, and VIP tours.",
    features: [
      "14-passenger capacity",
      "High-roof spacious design",
      "Dedicated luggage area",
      "Rear climate control vents",
      "USB charging ports",
      "Complimentary water",
    ],
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}
