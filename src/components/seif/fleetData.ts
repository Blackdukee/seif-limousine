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
import hiace1 from "@/assets/hiace-1.png";
import hiace2 from "@/assets/hiace-2.png";

import soueast1 from "@/assets/Soueast-1.png";
import soueast2 from "@/assets/Soueast-2.png";
import soueast3 from "@/assets/Soueast-3.png";

import e2001 from "@/assets/e200-1.png";
import e2002 from "@/assets/e200-2.png";
import e2003 from "@/assets/e200-3.png";

import viano1 from "@/assets/viano-1.png";
import viano2 from "@/assets/viano-2.png";
import viano3 from "@/assets/viano-3.png";

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
    images: [hiace1, hiace2],
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
  {
    slug: "soueast-s07",
    name: "Soueast S07",
    tagline: "Stylish comfort SUV",
    category: "Premium SUV",
    passengers: "Up to 7 passengers",
    luggage: "3 suitcases",
    images: [soueast1, soueast2, soueast3],
    description:
      "The Soueast DX7 combines contemporary styling with a roomy, well-appointed cabin. Equipped with modern infotainment and a smooth ride, it is a versatile choice for both city transfers and intercity journeys across Egypt.",
    features: [
      "Leather seating",
      "Panoramic sunroof",
      "Touchscreen infotainment",
      "Rear AC vents",
      "USB charging ports",
      "Complimentary water",
    ],
  },
  {
    slug: "mercedes-e200",
    name: "Mercedes E200",
    tagline: "Executive sedan elegance",
    category: "Executive Sedan",
    passengers: "Up to 4 passengers",
    luggage: "2 suitcases",
    images: [e2001, e2002, e2003],
    description:
      "The Mercedes-Benz E200 is the benchmark of executive sedan travel. Its long wheelbase, handcrafted leather interior, and whisper-quiet cabin make it the premier choice for VIP airport transfers, business meetings, and special occasions.",
    features: [
      "Premium leather interior",
      "Ambient lighting",
      "Widescreen cockpit display",
      "Climate control",
      "Wireless charging",
      "Complimentary water",
    ],
  },
  {
    slug: "mercedes-viano",
    name: "Mercedes Viano",
    tagline: "Luxury group travel redefined",
    category: "Luxury MPV",
    passengers: "Up to 7 passengers",
    luggage: "5 suitcases",
    images: [viano1, viano2, viano3],
    description:
      "The Mercedes-Benz Viano sets the gold standard for premium group travel. Configured with facing lounge seats, integrated tables, and a superbly quiet cabin, it is the first-class choice for VIP delegations, corporate groups, and luxury family trips.",
    features: [
      "Lounge-style seating",
      "Integrated tables",
      "Individual climate zones",
      "Privacy glass",
      "USB charging ports",
      "Complimentary refreshments",
    ],
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}
