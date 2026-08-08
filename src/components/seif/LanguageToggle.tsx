import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "@tanstack/react-router";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const params = useParams({ strict: false }) as { lang?: string };
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = params.lang || i18n.language || "en";

  function toggleLanguage() {
    const targetLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(targetLang);
    try {
      localStorage.setItem("i18nextLng", targetLang);
    } catch (e) {
      void e;
    }

    const pathname = location.pathname;
    let targetPath = `/${targetLang}`;
    if (pathname.startsWith("/en") || pathname.startsWith("/ar")) {
      targetPath = pathname.replace(/^\/(en|ar)/, `/${targetLang}`);
    }

    navigate({ to: targetPath });
  }

  return (
    <button
      onClick={toggleLanguage}
      className="seif-lang-toggle flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--seif-gold-border)] text-xs font-semibold uppercase tracking-wider text-white hover:border-[var(--seif-gold)] transition-colors cursor-pointer"
      aria-label={`Switch to ${currentLang === "ar" ? "English" : "Arabic"}`}
    >
      <span className={currentLang === "en" ? "text-[var(--seif-gold)]" : "text-white/60"}>EN</span>
      <span className="text-[var(--seif-gold)]">/</span>
      <span className={currentLang === "ar" ? "text-[var(--seif-gold)]" : "text-white/60"}>
        عربي
      </span>
    </button>
  );
}
