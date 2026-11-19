/**
 * Cairo Airport transfer — destination & indicative starting prices.
 *
 * HOW TO EDIT PRICES:
 *   Change the `startingPrice` value (EGP, integer) for any destination below.
 *   Set `startingPrice: null` to show "Request a Quote" instead of a price.
 *
 * HOW TO ADD A DESTINATION:
 *   1. Add an entry here with a unique `id` and a `startingPrice`.
 *   2. Add its label under `airportBooking.destinations.<id>` in BOTH
 *      src/locales/en/translation.json and src/locales/ar/translation.json.
 *
 * Prices are indicative starting prices, not final quotations.
 * They are rendered only in the dedicated price area — never in the dropdown.
 */

export type AirportDestinationId = "newCairo" | "octoberCity" | "giza" | "mohandessin" | "other";

export interface AirportDestination {
  id: AirportDestinationId;
  /** Indicative starting price in EGP. `null` = "Request a Quote". */
  startingPrice: number | null;
}

/** Shown before a destination is selected. */
export const AIRPORT_BASE_STARTING_PRICE = 1200;

export const AIRPORT_DESTINATIONS: readonly AirportDestination[] = [
  { id: "newCairo", startingPrice: 1200 },
  { id: "octoberCity", startingPrice: 1500 },
  { id: "giza", startingPrice: 1200 },
  { id: "mohandessin", startingPrice: 1200 },
  { id: "other", startingPrice: null },
];

/** The vehicle featured on the Cairo Airport service page. */
export const AIRPORT_FEATURED_VEHICLE = {
  name: "Mitsubishi Xpander Cross",
  seats: 7,
  fleetSlug: "mitsubishi-xpander-cross-25",
} as const;

/** Locale-independent thousands formatting (identical on server and client). */
export function formatEgp(amount: number): string {
  return String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

