import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import heroImg from "@/assets/seif-hero.webp";
import { GoldRule } from "./GoldRule";
import { CharReveal } from "./CharReveal";
import { WordReveal } from "./WordReveal";
import { MagneticButton } from "./MagneticButton";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

import { useTranslation } from "react-i18next";

// Delays for the very first page load (long, cinematic)
const LOAD_DELAYS = {
  rule: 1.3,
  eyebrow: 1.5,
  title1: 2.0,
  title2: 2.2,
  description: 2.7,
  badges: 2.9,
  btn1: 3.1,
  btn2: 3.2,
};

// Delays when re-entering after a language switch (fast, crisp)
const SWITCH_DELAYS = {
  rule: 0.0,
  eyebrow: 0.05,
  title1: 0.1,
  title2: 0.18,
  description: 0.25,
  badges: 0.32,
  btn1: 0.38,
  btn2: 0.44,
};

export function Hero() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const bgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Track whether this is the initial mount or a language switch
  const isFirstMount = useRef(true);
  useEffect(() => {
    // After first render, mark as switched so subsequent language changes use fast delays
    isFirstMount.current = false;
  }, []);

  // Combined scroll + mouse parallax — background only, never affects layout.
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    let targetX = 0, targetY = 0, curX = 0, curY = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    const tick = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY < vh) {
        curX += (targetX - curX) * 0.06;
        curY += (targetY - curY) * 0.06;
        if (bgRef.current) {
          const y = isCoarse ? 0 : scrollY * 0.12;
          const mx = isCoarse ? 0 : curX * 6;
          const my = isCoarse ? 0 : curY * 4;
          bgRef.current.style.transform = `translate3d(${mx}px, ${-y + my}px, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    if (!isCoarse) window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pick delay set: cinematic on first load, snappy on language switch
  const d = isFirstMount.current ? LOAD_DELAYS : SWITCH_DELAYS;

  return (
    <section style={{ position: "relative", height: "100dvh", minHeight: 640, overflow: "hidden" }} id="top">
      <div
        ref={bgRef}
        className="seif-hero-bg"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          willChange: "transform",
        }}
      />
      {/* Gradient overlay */}
      <div className="seif-hero-gradient" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.55) 55%, rgba(8,8,8,0.35) 100%), linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 60%)",
      }} />
      <div className="seif-grain" />

      <div
        className="seif-hero-inner"
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 1280, margin: "0 auto", height: "100%",
          padding: "120px 24px 40px",
          display: "flex", alignItems: "flex-end",
        }}
      >
        {/* key={i18n.language} forces the content to fully remount on language switch,
            replaying the entrance animation with the fast SWITCH_DELAYS set */}
        <div
          key={i18n.language}
          ref={contentRef}
          className="seif-hero-content"
          style={{ maxWidth: 620, willChange: "transform" }}
        >
          <GoldRule delay={d.rule} />

          {/* Location / Eyebrow container matching the yellow marker style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: d.eyebrow }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {t("hero.eyebrow")}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--seif-gold)" style={{ display: "inline-block" }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </motion.div>

          <h1
            className="seif-hero-title"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(34px, 5.5vw, 60px)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "#fff",
              marginBottom: 20,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ display: "block" }}>
              <WordReveal text={t("hero.title1")} delay={d.title1} />
            </span>
            <span style={{ display: "block", color: "var(--seif-gold)", position: "relative" }}>
              <WordReveal text={t("hero.title2")} delay={d.title2} />
              {/* Double underline decoration below the gold title mimicking the image */}
              <span
                style={{
                  display: "block",
                  position: "absolute",
                  bottom: -6,
                  insetInlineStart: 0,
                  width: "120px",
                  height: 4,
                  borderBottom: "2px solid var(--seif-gold)",
                  borderTop: "1px solid var(--seif-gold)",
                  opacity: 0.8,
                }}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: d.description, duration: 0.6 }}
            className="seif-hero-desc"
            style={{
              color: "var(--seif-white-60)",
              fontSize: 16, lineHeight: 1.7,
              maxWidth: 460, marginBottom: 28,
              willChange: "transform, opacity",
            }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d.badges, duration: 0.5 }}
            className="seif-hero-badges"
            style={{
              display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
              color: "var(--seif-white-60)",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
              marginBottom: 36,
              willChange: "transform, opacity",
            }}
          >

            <span>{t("hero.badge1")}</span>
            <span style={{ color: "var(--seif-gold)" }}>|</span>
            <span>{t("hero.badge2")}</span>
            <span style={{ color: "var(--seif-gold)" }}>|</span>
            <span>{t("hero.badge3")}</span>
          </motion.div>

          <div className="seif-hero-buttons" style={{ display: "flex", flexWrap: "wrap", gap: 14, flexDirection: "row" }}>
            <HeroButton primary delay={d.btn1} href="https://wa.me/201034743315" icon={<WhatsAppIcon />} label={t("hero.btnWhatsapp")} />
            <HeroButton delay={d.btn2} href="tel:+201034743315" icon={<PhoneIcon />} label={t("hero.btnCall")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroButton({
  primary, delay, href, icon, label,
}: { primary?: boolean; delay: number; href: string; icon: React.ReactNode; label: string }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <motion.div
      initial={{ x: isRTL ? 24 : -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
    >
      <CtaButton primary={primary} href={href} icon={icon} label={label} mountDelay={delay + 0.05} />
    </motion.div>
  );
}

import { useState } from "react";

export function CtaButton({
  primary, href, onClick, icon, label, mountDelay = 0,
}: { primary?: boolean; href?: string; onClick?: () => void; icon?: React.ReactNode; label: string; mountDelay?: number }) {
  const [hovered, setHovered] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <MagneticButton
      href={href}
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); setKey((k) => k + 1); }}
      onMouseLeave={() => setHovered(false)}
      className="seif-btn group"
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        height: 54, padding: "0 24px", borderRadius: 4,
        background: primary ? (hovered ? "var(--seif-gold-light)" : "var(--seif-gold)") : "var(--seif-surface)",
        color: primary ? "var(--seif-black)" : "#fff",
        border: primary ? "none" : "1px solid var(--seif-gold-border)",
        fontWeight: 700, fontSize: 12, letterSpacing: "0.16em",
        textTransform: "uppercase", textDecoration: "none", cursor: "pointer",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      <CharReveal text={label} delay={hovered ? 0 : mountDelay} stagger={hovered ? 0.018 : 0.035} triggerKey={key} />
      <span className="seif-shimmer" />
    </MagneticButton>
  );
}
