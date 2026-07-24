import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CharReveal } from "./CharReveal";
import { MagneticButton } from "./MagneticButton";
import { WhatsAppIcon } from "./Icons";
import { LanguageToggle } from "./LanguageToggle";
import { getWhatsAppUrl } from "@/lib/utils";

const NAV_LINKS = [
  { label: "FLEET", key: "fleet", href: "/#fleet" },
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

function HamburgerIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
      <rect y="0" width="22" height="2" rx="1" fill="currentColor" />
      <rect y="6" width="16" height="2" rx="1" fill="currentColor" />
      <rect y="12" width="22" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [announcementHidden] = useAnnouncementState();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
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
        <div
          className="seif-nav-inner"
          style={{
            maxWidth: 1280, margin: "0 auto", padding: "16px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
          }}
        >
          {/* Logo */}
          <a href="/" style={{
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
            textDecoration: "none",
          }}>
            {t("nav.logo")}
          </a>

          {/* Center nav — desktop only (hidden below 1024px) */}
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

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* CTA button — desktop only */}
            <div className="hidden lg:flex">
              <MagneticButton
                href="https://wa.me/201029582241"
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
            </div>

            {/* Language toggle — visible on desktop & mobile beside menu */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <LanguageToggle />
            </div>

            {/* Hamburger button — mobile only (visible below 1024px) */}
            <button
              className="flex lg:hidden items-center justify-center"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              style={{
                color: "#fff", background: "none", border: "none",
                cursor: "pointer", padding: 10,
                minWidth: 44, minHeight: 44,
              }}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile navigation drawer ───────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "var(--seif-black)",
              display: "flex", flexDirection: "column",
              overflow: "auto",
            }}
          >
            {/* Grain texture overlay */}
            <div className="seif-grain" style={{ opacity: 0.35 }} />
            {/* Diagonal gold line accent */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0 1px, transparent 1px 22px)",
            }} />

            {/* Drawer header: logo + close */}
            <div style={{
              position: "relative", zIndex: 1,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 20px",
              height: 68,
              borderBottom: "1px solid var(--seif-gold-border)",
              flexShrink: 0,
            }}>
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "inline-flex",
                  border: "1px solid var(--seif-white-80)",
                  padding: "6px 14px", borderRadius: 2,
                  color: "#fff",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800, letterSpacing: "0.05em",
                  fontSize: 14, textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {t("nav.logo")}
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  color: "#fff", background: "none", border: "none",
                  cursor: "pointer", padding: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  minWidth: 44, minHeight: 44,
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Mobile navigation"
              style={{
                position: "relative", zIndex: 1,
                flex: 1,
                display: "flex", flexDirection: "column",
                padding: "8px 20px 0",
              }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.07, duration: 0.38, ease: "easeOut" }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "#fff",
                    fontSize: 28, fontWeight: 700,
                    letterSpacing: "0.03em", textTransform: "uppercase",
                    padding: "20px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--seif-gold-border)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                >
                  {t("nav." + l.key)}
                  <span style={{
                    color: "var(--seif-gold)",
                    fontSize: 18, fontWeight: 300, opacity: 0.8,
                  }}>→</span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom: CTA + Language toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              style={{
                position: "relative", zIndex: 1,
                padding: "24px 20px",
                paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
                display: "flex", flexDirection: "column", gap: 16,
                borderTop: "1px solid var(--seif-gold-border)",
              }}
            >
              <a
                href="https://wa.me/201029582241"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  height: 54,
                  background: "var(--seif-gold)", color: "var(--seif-black)",
                  borderRadius: 4, fontWeight: 700, fontSize: 12, letterSpacing: "0.16em",
                  textDecoration: "none", textTransform: "uppercase",
                }}
              >
                <WhatsAppIcon size={18} />
                {t("nav.bookDriver")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
      className="seif-announcement-bar"
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
