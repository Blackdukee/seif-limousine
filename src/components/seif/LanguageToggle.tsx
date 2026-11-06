import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "@tanstack/react-router";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const params = useParams({ strict: false }) as { lang?: string };
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatch = location.pathname.match(/^\/(en|ar)(\/|$)/);
  const currentLang = (pathMatch?.[1] || params.lang || i18n.language || "en").startsWith("ar")
    ? "ar"
    : "en";
  const targetLang = currentLang === "ar" ? "en" : "ar";

  const pathname = location.pathname;
  const targetPath =
    pathname.startsWith("/en") || pathname.startsWith("/ar")
      ? pathname.replace(/^\/(en|ar)/, `/${targetLang}`)
      : `/${targetLang}`;

  function toggleLanguage(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    i18n.changeLanguage(targetLang);
    try {
      localStorage.setItem("i18nextLng", targetLang);
    } catch (err) {
      void err;
    }

    navigate({ to: targetPath });
  }

  return (
    <a
      href={targetPath}
      hrefLang={targetLang}
      onClick={toggleLanguage}
      style={{ textDecoration: "none" }}
      className="seif-lang-toggle flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--seif-gold-border)] text-xs font-semibold uppercase tracking-wider text-white hover:border-[var(--seif-gold)] transition-colors cursor-pointer"
      aria-label={`Switch to ${currentLang === "ar" ? "English" : "Arabic"}`}
    >
      <span className={currentLang === "en" ? "text-[var(--seif-gold)]" : "text-white/60"}>EN</span>
      <span className="text-[var(--seif-gold)]">/</span>
      <span className={currentLang === "ar" ? "text-[var(--seif-gold)]" : "text-white/60"}>
        عربي
      </span>
    </a>
  );
}
