import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CharReveal } from "./CharReveal";
import { MagneticButton } from "./MagneticButton";
import { WhatsAppIcon } from "./Icons";
import { LanguageToggle } from "./LanguageToggle";

const NAV_LINKS = [
  { label: "SERVICES", key: "services", href: "/#services" },
  { label: "FLEET", key: "fleet", href: "/#fleet" },
  { label: "ABOUT", key: "about", href: "/#about" },
  { label: "CONTACT", key: "contact", href: "/#contact" },
];

// Global state to share announcement visibility across components & routing page switches
let globalAnnouncementHidden = false;
const listeners = new Set<(hidden: boolean) => void>();

function setGlobalAnnouncementHidden(hidden: boolean) {
  globalAnnouncementHidden = hidden;
  listeners.forEach((l) => l(hidden));
}

function useAnnouncementState() {
  const [hidden, setHidden] = useState(globalAnnouncementHidden);

  useEffect(() => {
    const listener = (h: boolean) => setHidden(h);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return [hidden, setGlobalAnnouncementHidden] as const;
}

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [announcementHidden] = useAnnouncementState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{
        top: announcementHidden ? 0 : 40,
      }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: "fixed", left: 0, right: 0, zIndex: 50,
        background: scrolled ? "var(--seif-black)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--seif-gold-border)" : "1px solid transparent",
        transition: "background 280ms ease, border-color 280ms ease, backdrop-filter 280ms ease",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        {/* Logo */}
        <a href="#top" style={{
          display: "inline-flex",
          border: "1px solid var(--seif-white-80)",
          padding: "6px 14px",
          borderRadius: 2,
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          letterSpacing: "0.05em",
          fontSize: 14,
          textTransform: "uppercase",
        }}>
          {t("nav.logo")}
        </a>

        {/* Center nav */}
        <nav className="hidden lg:flex" style={{ gap: 40 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="seif-link-underline"
              style={{
                color: "var(--seif-white-80)",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {t("nav." + l.key)}
            </a>
          ))}
        </nav>

        {/* Right side controls (Language Switcher & CTA) */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <MagneticButton
            href="https://wa.me/20000000000"
            className="seif-btn group"
            onMouseEnter={() => { setHovered(true); setHoverKey((k) => k + 1); }}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--seif-gold)",
              color: "var(--seif-black)",
              padding: "12px 20px",
              borderRadius: 4,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.14em",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
            }}
          >
            <span style={{ display: "inline-flex", color: "var(--seif-black)" }}>
              <WhatsAppIcon size={16} />
            </span>
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            >
              <CharReveal
                text={t("nav.bookDriver")}
                delay={hovered ? 0 : 1.4}
                stagger={hovered ? 0.018 : 0.04}
                triggerKey={hoverKey}
              />
            </motion.span>
            <span className="seif-shimmer" />
          </MagneticButton>
          <LanguageToggle />
        </div>
      </div>
    </motion.header>
  );
}

export function AnnouncementBar() {
  const { t } = useTranslation();
  const [hidden, setHidden] = useAnnouncementState();

  useEffect(() => {
    if (!hidden) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hidden, setHidden]);

  return (
    <motion.div
      initial={{ height: 40, opacity: 1 }}
      animate={{
        height: hidden ? 0 : 40,
        opacity: hidden ? 0 : 1,
        y: hidden ? -40 : 0,
      }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 51,
        background: "var(--seif-black)",
        borderBottom: hidden ? "1px solid transparent" : "1px solid var(--seif-gold-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
        overflow: "hidden",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <span style={{ color: "var(--seif-gold)", fontWeight: 600 }}>{t("announcement.offer")}</span>
      <span style={{ color: "var(--seif-white-35)", margin: "0 14px" }}>·</span>
      <span style={{ color: "var(--seif-white-80)" }}>{t("announcement.discount")}</span>
    </motion.div>
  );
}
