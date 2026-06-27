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
  "No Deposit",
  "Free Cancellation",
  "Door-to-Door",
  "Meet & Greet",
];

export const VEHICLES: Vehicle[] = [
  {
    slug: "toyota-land-cruiser-vxr",
    name: "Toyota Land Cruiser VXR",
    tagline: "Executive flagship 4x4 SUV",
    category: "Executive Luxury SUV",
    passengers: "Up to 6 passengers",
    luggage: "4 suitcases",
    popular: true,
    images: [
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=land-cruiser&zoomType=fullscreen&width=800&angle=01&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=land-cruiser&zoomType=fullscreen&width=800&angle=21&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=land-cruiser&zoomType=fullscreen&width=800&angle=29&paintDescription=black",
    ],
    description:
      "The Toyota Land Cruiser VXR is the pinnacle of luxury offroad travel — rugged outside, incredibly plush inside with premium leather seats and multi-zone climate control. The preferred choice for executive travel across Cairo and long journeys across Egypt.",
    features: ["Premium leather interior", "Tri-zone climate control", "All-terrain capability", "Complimentary water", "Phone chargers", "Privacy windows"],
  },
  {
    slug: "cadillac-escalade-esv",
    name: "Cadillac Escalade ESV",
    tagline: "Statement SUV for arrivals",
    category: "Full-Size Luxury SUV",
    passengers: "Up to 6 passengers",
    luggage: "6 suitcases",
    images: [
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=cadillac&modelFamily=escalade&zoomType=fullscreen&width=800&angle=01&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=cadillac&modelFamily=escalade&zoomType=fullscreen&width=800&angle=21&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=cadillac&modelFamily=escalade&zoomType=fullscreen&width=800&angle=29&paintDescription=black",
    ],
    description:
      "Commanding presence with limousine-grade comfort. The Escalade ESV pairs cinema-grade rear seating with serious luggage space — perfect for VIP arrivals and family travel.",
    features: ["Captain's chairs", "Panoramic roof", "Bose audio", "Ample luggage", "USB-C fast charging", "Tinted privacy glass"],
  },
  {
    slug: "toyota-hiace-vip-lounge",
    name: "Toyota Hiace VIP Lounge",
    tagline: "First-class group travel lounge",
    category: "VIP Luxury Van",
    passengers: "Up to 9 passengers",
    luggage: "8 suitcases",
    images: [
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=hiace&zoomType=fullscreen&width=800&angle=01&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=hiace&zoomType=fullscreen&width=800&angle=21&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=hiace&zoomType=fullscreen&width=800&angle=29&paintDescription=black",
    ],
    description:
      "Experience first-class group travel. Fitted with bespoke captain reclining seats, conference tables, and custom ambient lighting, the Toyota Hiace VIP Lounge offers boardroom comfort on wheels for executive delegations and VIP private transfers.",
    features: ["Bespoke reclining chairs", "Onboard conference table", "Ambient mood lighting", "Multi-zone climate", "USB fast outlets", "Privacy partition"],
  },
  {
    slug: "toyota-fortuner",
    name: "Toyota Fortuner",
    tagline: "Premium versatile SUV",
    category: "Premium SUV",
    passengers: "Up to 4 passengers",
    luggage: "3 suitcases",
    images: [
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=fortuner&zoomType=fullscreen&width=800&angle=01&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=fortuner&zoomType=fullscreen&width=800&angle=21&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=fortuner&zoomType=fullscreen&width=800&angle=29&paintDescription=black",
    ],
    description:
      "A perfect blend of versatility and luxury. The Toyota Fortuner offers a highly refined ride with elevated seating, leather seats, and great cargo space. Ideal for daily corporate commutes, weddings, and airport transfers.",
    features: ["Refined leather seats", "Dual climate control", "Ample cabin space", "Phone chargers", "Complimentary water", "Rear parking sensors"],
  },
  {
    slug: "range-rover-vogue",
    name: "Range Rover Vogue",
    tagline: "Refined SUV presence",
    category: "Luxury SUV",
    passengers: "Up to 4 passengers",
    luggage: "4 suitcases",
    images: [
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=land-rover&modelFamily=range-rover&zoomType=fullscreen&width=800&angle=01&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=land-rover&modelFamily=range-rover&zoomType=fullscreen&width=800&angle=21&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=land-rover&modelFamily=range-rover&zoomType=fullscreen&width=800&angle=29&paintDescription=black",
    ],
    description:
      "Effortless poise on any road. The Vogue blends British craftsmanship with elevated SUV comfort — equally at home at a hotel forecourt or a desert lodge.",
    features: ["Premium leather", "Meridian audio", "Heated rear seats", "Panoramic roof", "All-terrain capable", "Privacy glass"],
  },
  {
    slug: "toyota-hiace-luxury-tourer",
    name: "Toyota Hiace Luxury Tourer",
    tagline: "Spacious group travel companion",
    category: "Executive MPV / Van",
    passengers: "Up to 12 passengers",
    luggage: "10 suitcases",
    images: [
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=hiace&zoomType=fullscreen&width=800&angle=05&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=hiace&zoomType=fullscreen&width=800&angle=23&paintDescription=black",
      "https://cdn.imagin.studio/getImage?customer=hrjavascript-mastery&make=toyota&modelFamily=hiace&zoomType=fullscreen&width=800&angle=33&paintDescription=black",
    ],
    description:
      "The ultimate group travel companion. With a high roof, ergonomic seating for up to 12 passengers, and massive luggage capacity, the Toyota Hiace Luxury Tourer is the perfect choice for corporate team trips, tourism, and airport pickups.",
    features: ["High-roof spacious cabin", "Ergonomic group seats", "Dual air conditioning", "Rear luggage bay", "USB ports in rows", "Tinted passenger windows"],
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}
