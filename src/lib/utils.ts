import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "201029582241";
export const DEFAULT_WHATSAPP_MESSAGE = "عايز أعرف أنسب عربية لرحلتي وكام هتكلف";

export function getWhatsAppUrl(text: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
