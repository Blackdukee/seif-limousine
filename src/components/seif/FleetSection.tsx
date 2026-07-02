import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./Hero";
import { WhatsAppIcon, PhoneIcon } from "./Icons";
import { VEHICLES, type Vehicle } from "./fleetData";

function FleetCard({ v, index }: { v: Vehicle; index: number }) {
  const { t } = useTranslation();
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.16 + 0.05, duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ boxShadow: "0 16px 48px rgba(201,168,76,0.10)" }}
      className="group"
      style={{
        background: "var(--seif-surface)",
        border: "1px solid var(--seif-gold-border)",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "border-color 220ms ease",
        height: "100%",
        willChange: "transform, opacity",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
        <motion.img
          src={v.images[0]}
          alt={t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
        />
        {v.popular && (
          <div className="seif-popular-badge" style={{
            position: "absolute", top: 12, left: 12,
            background: "var(--seif-gold)", color: "var(--seif-black)",
            padding: "4px 10px", borderRadius: 2,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
            overflow: "hidden",
          }}>
            {t("fleet.popularBadge")}
            <span className="seif-shimmer" />
          </div>
        )}
      </div>

      <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        <div>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4,
          }}>{t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}</h3>
          <p style={{ fontSize: 13, color: "var(--seif-white-60)" }}>{t(`vehiclesData.${v.slug}.tagline`, { defaultValue: v.tagline })}</p>
        </div>

        <div style={{ borderTop: "1px solid var(--seif-gold-border)", paddingTop: 12 }}>
          <div style={{
            fontSize: 11, color: "var(--seif-gold)",
            textAlign: "center", letterSpacing: "0.08em",
          }}>
            {t("fleet.driverIncluded")}
          </div>
        </div>

        <Link
          to="/fleet/$slug"
          params={{ slug: v.slug }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            height: 46, borderRadius: 4,
            background: "transparent",
            border: "1px solid var(--seif-gold)",
            color: "var(--seif-gold)",
            fontWeight: 700, fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", textDecoration: "none",
            transition: "background 200ms ease, color 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--seif-gold)";
            e.currentTarget.style.color = "var(--seif-black)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--seif-gold)";
          }}
        >
          {t("fleet.btnDetails")}
        </Link>

        <div className="seif-fleet-cta-row" style={{ display: "flex", gap: 10, marginTop: "auto", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <CtaButton primary href="https://wa.me/201029582241" icon={<WhatsAppIcon size={16} />} label={t("fleet.btnWhatsapp")} />
          </div>
          <div style={{ flex: 1 }}>
            <CtaButton href="tel:+201029582241" icon={<PhoneIcon size={16} />} label={t("fleet.btnCall")} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function FleetSection() {
  const { t } = useTranslation();
  return (
    <section id="fleet" style={{ padding: "120px 24px", background: "var(--seif-black)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={t("fleet.eyebrow")}
          heading={t("fleet.heading")}
          goldWord={t("fleet.goldWord")}
          intro={
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <span style={{ color: "var(--seif-gold)", fontWeight: 700, fontSize: 18 }}>
                {t("fleet.modelYear")}
              </span>
              <span>{t("fleet.intro")}</span>
            </div>
          }
        />
        <div
          className="seif-fleet-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {VEHICLES.map((v, i) => <FleetCard key={v.slug} v={v} index={i} />)}
        </div>
      </div>
    </section>
  );
}
