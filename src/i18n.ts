import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

let initialLanguage = "en";

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("i18nextLng");
    if (saved && (saved === "en" || saved === "ar")) {
      initialLanguage = saved;
    } else {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en" || browserLang === "ar") {
        initialLanguage = browserLang;
      }
    }
  } catch (e) {
    console.error("Failed to detect language:", e);
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
    },
  });

export default i18n;
