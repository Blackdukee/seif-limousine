import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  useEffect(() => {
    // Sync on mount/hydration
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    document.documentElement.classList.remove("lang-en", "lang-ar");
    document.documentElement.classList.add(`lang-${currentLang}`);
  }, [currentLang]);

  const setLanguage = (lang: "en" | "ar") => {
    if (lang === currentLang) return;
    i18n.changeLanguage(lang).then(() => {
      localStorage.setItem("i18nextLng", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      document.documentElement.classList.remove("lang-en", "lang-ar");
      document.documentElement.classList.add(`lang-${lang}`);
    });
  };

  return (
    <div
      className="seif-lang-toggle"
      style={{
        display: "inline-flex",
        background: "var(--seif-surface)",
        border: "1px solid var(--seif-gold-border)",
        padding: 3,
        borderRadius: 999,
        position: "relative",
      }}
    >
      <button
        onClick={() => setLanguage("en")}
        style={{
          background: currentLang === "en" ? "var(--seif-gold)" : "transparent",
          color: currentLang === "en" ? "var(--seif-black)" : "var(--seif-white-60)",
          border: "none",
          padding: "4px 10px",
          borderRadius: 999,
          cursor: "pointer",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.05em",
          transition: "all 200ms ease",
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ar")}
        style={{
          background: currentLang === "ar" ? "var(--seif-gold)" : "transparent",
          color: currentLang === "ar" ? "var(--seif-black)" : "var(--seif-white-60)",
          border: "none",
          padding: "4px 10px",
          borderRadius: 999,
          cursor: "pointer",
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "'Cairo', sans-serif",
          transition: "all 200ms ease",
        }}
      >
        عربي
      </button>
    </div>
  );
}
