import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./Hero";
import { WhatsAppIcon, PhoneIcon } from "./Icons";
import { VEHICLES, type Vehicle } from "./fleetData";

const CrownVipIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ color: "var(--seif-gold)" }}
  >
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
  </svg>
);

function FleetCard({ v, index }: { v: Vehicle; index: number }) {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || "en").startsWith("ar") ? "ar" : "en";
  const isVip = v.vip || v.slug.includes("mercedes");

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
        border: isVip ? "1px solid var(--seif-gold)" : "1px solid var(--seif-gold-border)",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 220ms ease, box-shadow 220ms ease",
        height: "100%",
        position: "relative",
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
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {v.popular && (
          <div
            className="seif-popular-badge"
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "var(--seif-gold)",
              color: "var(--seif-black)",
              padding: "4px 10px",
              borderRadius: 2,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            {t("fleet.popularBadge")}
            <span className="seif-shimmer" />
          </div>
        )}
        {isVip && (
          <div
            className="seif-vip-badge"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background:
                "linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(35, 28, 16, 0.98) 100%)",
              color: "var(--seif-gold)",
              border: "1px solid var(--seif-gold)",
              padding: "4px 10px",
              borderRadius: 3,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.18em",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              boxShadow: "0 4px 16px rgba(0,0,0,0.6), 0 0 10px rgba(201,168,76,0.3)",
              backdropFilter: "blur(6px)",
              overflow: "hidden",
              zIndex: 3,
            }}
          >
            <CrownVipIcon />
            <span>VIP</span>
            <span className="seif-shimmer" />
          </div>
        )}
      </div>

      <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        <div>
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <span>{t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}</span>
            {isVip && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "var(--seif-gold)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  background: "rgba(201, 168, 76, 0.08)",
                  padding: "2px 8px",
                  borderRadius: 3,
                  letterSpacing: "0.12em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <CrownVipIcon /> VIP
              </span>
            )}
          </h3>
          <p style={{ fontSize: 13, color: "var(--seif-white-60)" }}>
            {t(`vehiclesData.${v.slug}.tagline`, { defaultValue: v.tagline })}
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--seif-gold-border)", paddingTop: 12 }}>
          <div
            style={{
              fontSize: 11,
              color: "var(--seif-gold)",
              textAlign: "center",
              letterSpacing: "0.08em",
            }}
          >
            {t("fleet.driverIncluded")}
          </div>
        </div>

        <Link
          to="/$lang/fleet/$slug"
          params={{ lang: currentLang, slug: v.slug }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            height: 46,
            borderRadius: 4,
            background: "transparent",
            border: "1px solid var(--seif-gold)",
            color: "var(--seif-gold)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
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

        <div
          className="seif-fleet-cta-row"
          style={{ display: "flex", gap: 10, marginTop: "auto", flexDirection: "row" }}
        >
          <div style={{ flex: 1 }}>
            <CtaButton
              primary
              href="https://wa.me/201029582241"
              icon={<WhatsAppIcon size={16} />}
              label={t("fleet.btnWhatsapp")}
            />
          </div>
          <div style={{ flex: 1 }}>
            <CtaButton
              href="tel:+201029582241"
              icon={<PhoneIcon size={16} />}
              label={t("fleet.btnCall")}
            />
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
            <span
              style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}
            >
              <span style={{ color: "var(--seif-gold)", fontWeight: 700, fontSize: 18 }}>
                {t("fleet.modelYear")}
              </span>
              <span>{t("fleet.intro")}</span>
            </span>
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
          {VEHICLES.map((v, i) => (
            <FleetCard key={v.slug} v={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
