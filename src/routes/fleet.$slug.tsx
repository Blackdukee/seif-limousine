import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useLenis } from "@/components/seif/useLenis";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";
import { CtaButton } from "@/components/seif/Hero";
import { WhatsAppIcon, PhoneIcon } from "@/components/seif/Icons";
import { getVehicle, PRICING, AT_A_GLANCE_BADGES, VEHICLES, Vehicle } from "@/components/seif/fleetData";

const getBadgeKey = (b: string) => {
  if (b.includes("Chauffeur")) return "chauffeur";
  if (b.includes("Deposit")) return "noDeposit";
  if (b.includes("Cancellation")) return "freeCancellation";
  if (b.includes("Door")) return "doorToDoor";
  if (b.includes("Meet")) return "meetGreet";
  return "";
};

export const Route = createFileRoute("/fleet/$slug")({
  head: ({ params }) => {
    const v = getVehicle(params.slug);
    const name = v ? i18n.t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name }) : "";
    const withChauffeur = i18n.t("fleet.withChauffeur");
    const title = v ? `${name} ${withChauffeur} — SEIF Limousine` : "Vehicle — SEIF Limousine";
    const description = v ? i18n.t(`vehiclesData.${v.slug}.description`, { defaultValue: v.description }) : "Chauffeur-driven luxury vehicles across Egypt.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(v ? [{ property: "og:image", content: v.images[0] }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const v = getVehicle(params.slug);
    if (!v) throw notFound();
    return v;
  },
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
      <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", background: "var(--seif-black)", color: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 12 }}>{t("notFound.vehicleTitle")}</h1>
          <Link to="/" style={{ color: "var(--seif-gold)" }}>{t("notFound.backToHome")}</Link>
        </div>
      </div>
    );
  },
  component: FleetDetail,
});

// ── Inline style helper for form inputs ──────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--seif-black)",
  border: "1px solid var(--seif-gold-border)",
  borderRadius: 4,
  padding: "10px 12px",
  color: "#fff",
  fontSize: 13,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 200ms ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--seif-gold)",
  marginBottom: 6,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

function BookingCard({
  v,
  t,
}: {
  v: { slug: string; name: string };
  t: (key: string, opts?: Record<string, unknown>) => string;
}) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const vehicleName = t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name });

  function buildWhatsAppUrl() {
    const lines: string[] = [];
    if (isRTL) {
      lines.push(`🚗 *طلب حجز — ${vehicleName}*`);
      if (pickup) lines.push(`📍 نقطة الانطلاق: ${pickup}`);
      if (dropoff) lines.push(`🏁 الوجهة: ${dropoff}`);
      if (date) lines.push(`📅 التاريخ: ${date}`);
      if (time) lines.push(`⏰ الوقت: ${time}`);
      lines.push(`\nأرجو التأكيد والحصول على السعر.`);
    } else {
      lines.push(`🚗 *Booking Request — ${vehicleName}*`);
      if (pickup) lines.push(`📍 Pickup: ${pickup}`);
      if (dropoff) lines.push(`🏁 Drop-off: ${dropoff}`);
      if (date) lines.push(`📅 Date: ${date}`);
      if (time) lines.push(`⏰ Time: ${time}`);
      lines.push(`\nPlease confirm availability and provide a quote.`);
    }
    return `https://wa.me/201029582241?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--seif-gold)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--seif-gold-border)";
  }

  return (
    <aside
      className="seif-booking-aside"
      style={{
        background: "var(--seif-surface)",
        border: "1px solid var(--seif-gold-border)",
        borderRadius: 8,
        padding: 28,
        alignSelf: "start",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Heading — gold */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 24,
          marginBottom: 6,
          color: "var(--seif-gold)",
        }}
      >
        {t("fleet.requestQuote")}
      </h3>
      <p style={{ fontSize: 13, color: "var(--seif-white-60)", marginBottom: 20 }}>
        {t("fleet.tellUsDetails")}
      </p>

      {/* Form fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        {/* Pickup */}
        <div>
          <label style={labelStyle}>
            {isRTL ? "📍 نقطة الانطلاق" : "📍 Pickup Location"}
          </label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isRTL ? "مثال: مطار القاهرة، شرم..." : "e.g. Cairo Airport, Sharm..."}
            style={inputStyle}
          />
        </div>

        {/* Drop-off */}
        <div>
          <label style={labelStyle}>
            {isRTL ? "🏁 الوجهة" : "🏁 Drop-off Location"}
          </label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isRTL ? "مثال: فندق فور سيزونز، الغردقة..." : "e.g. Four Seasons Hotel, Hurghada..."}
            style={inputStyle}
          />
        </div>

        {/* Date & Time row */}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>
              {isRTL ? "📅 التاريخ" : "📅 Date"}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                colorScheme: "dark",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>
              {isRTL ? "⏰ الوقت" : "⏰ Time"}
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                ...inputStyle,
                colorScheme: "dark",
              }}
            />
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height: 48,
            borderRadius: 4,
            background: "var(--seif-gold)",
            color: "var(--seif-black)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 200ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          <WhatsAppIcon size={16} />
          {t("fleet.btnWhatsappBook")}
        </a>
        <a
          href="tel:+201029582241"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height: 48,
            borderRadius: 4,
            background: "transparent",
            border: "1px solid var(--seif-gold-border)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "border-color 200ms ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--seif-gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--seif-gold-border)"; }}
        >
          <PhoneIcon size={16} />
          <span dir="ltr">{t("hero.btnCall")}</span>
        </a>
      </div>

      <div style={{ fontSize: 11, color: "var(--seif-white-60)", textAlign: "center", marginTop: 18, letterSpacing: "0.08em" }}>
        {t("fleet.bookingNotes")}
      </div>
    </aside>
  );
}

function FleetDetail() {
  useLenis();
  const { t } = useTranslation();
  const v = Route.useLoaderData() as Vehicle;
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />

      <main className="seif-fleet-detail-main" style={{ background: "var(--seif-black)", color: "#fff", paddingTop: 120, paddingBottom: 80 }}>
        <div className="seif-fleet-detail-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--seif-white-60)", marginBottom: 24 }}>
            <Link to="/" style={{ color: "var(--seif-white-60)", textDecoration: "none" }}>{t("fleet.breadcrumbHome")}</Link>
            <span style={{ margin: "0 10px", color: "var(--seif-gold)" }}>/</span>
            <Link to="/" hash="fleet" style={{ color: "var(--seif-white-60)", textDecoration: "none" }}>{t("fleet.breadcrumbFleet")}</Link>
            <span style={{ margin: "0 10px", color: "var(--seif-gold)" }}>/</span>
            <span style={{ color: "#fff" }}>{t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}</span>
          </nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 14,
            }}
          >
            {t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}{" "}
            <span style={{ color: "var(--seif-gold)" }}>{t("fleet.withChauffeur")}</span>
          </motion.h1>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", color: "var(--seif-white-60)", fontSize: 13, marginBottom: 40 }}>
            <span>{t(`vehiclesData.${v.slug}.category`, { defaultValue: v.category })}</span>
            <span>|</span>
            <span>{t(`vehiclesData.${v.slug}.passengers`, { defaultValue: v.passengers })}</span>
            {(v.vip || v.slug.includes("mercedes")) && (
              <>
                <span>|</span>
                <span
                  style={{
                    color: "var(--seif-gold)",
                    border: "1px solid var(--seif-gold)",
                    background: "rgba(201, 168, 76, 0.12)",
                    padding: "3px 10px",
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                  VIP EXCLUSIVE
                </span>
              </>
            )}
          </div>

          {/* Gallery + Booking */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 32, marginBottom: 64 }} className="seif-detail-grid">
            <div>
              <div style={{
                position: "relative", aspectRatio: "16/10", overflow: "hidden", borderRadius: 8,
                border: "1px solid var(--seif-gold-border)", background: "var(--seif-surface)",
              }}>
                <motion.img
                  key={activeImg}
                  src={v.images[activeImg]}
                  alt={t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}
                  initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                {v.images.length > 1 && (
                  <div className="seif-gallery-counter" style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(0,0,0,0.6)", color: "#fff",
                    padding: "4px 10px", fontSize: 11, letterSpacing: "0.12em",
                  }}>{activeImg + 1} / {v.images.length}</div>
                )}
              </div>
              {v.images.length > 1 && (
                <div className="seif-thumb-strip" style={{ display: "grid", gridTemplateColumns: `repeat(${v.images.length}, 1fr)`, gap: 12, marginTop: 12 }}>
                  {v.images.map((src: string, i: number) => (
                    <button
                      key={src}
                      onClick={() => setActiveImg(i)}
                      style={{
                        position: "relative", aspectRatio: "16/10", overflow: "hidden",
                        borderRadius: 6, padding: 0, cursor: "pointer",
                        border: i === activeImg ? "2px solid var(--seif-gold)" : "1px solid var(--seif-gold-border)",
                        background: "transparent",
                      }}
                    >
                      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: i === activeImg ? 1 : 0.7 }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Booking card */}
            <BookingCard v={v} t={t} />
          </div>

          {/* About */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 12 }}>{t("fleet.aboutVehicle")}</h2>
            <p style={{ color: "var(--seif-white-60)", fontSize: 16, lineHeight: 1.7, maxWidth: 780 }}>{t(`vehiclesData.${v.slug}.description`, { defaultValue: v.description })}</p>
          </section>

          {/* At a Glance */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 18 }}>{t("fleet.atGlance")}</h2>
            <div className="seif-atglance-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              border: "1px solid var(--seif-gold-border)", borderRadius: 8, overflow: "hidden",
            }}>
              {[
                t(`vehiclesData.${v.slug}.category`, { defaultValue: v.category }),
                t(`vehiclesData.${v.slug}.passengers`, { defaultValue: v.passengers }),
                t(`vehiclesData.${v.slug}.luggage`, { defaultValue: v.luggage }),
                t("vehiclesData.badges.chauffeur"),
                t("vehiclesData.badges.climateControl"),
                t("vehiclesData.badges.complimentaryWater"),
              ].map((item) => (
                <div key={item} style={{
                  padding: "18px 20px",
                  borderRight: "1px solid var(--seif-gold-border)",
                  borderBottom: "1px solid var(--seif-gold-border)",
                  color: "var(--seif-gold)", fontSize: 14,
                }}>
                  ◆ <span style={{ color: "#fff", marginInlineStart: 8 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 18 }}>{t("fleet.featuresAmenities")}</h2>
            <div className="seif-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {v.features.map((f: string, idx: number) => (
                <div key={f} style={{
                  padding: "14px 16px", border: "1px solid var(--seif-gold-border)",
                  borderRadius: 6, background: "var(--seif-surface)", fontSize: 14,
                }}>
                  <span style={{ color: "var(--seif-gold)", marginInlineEnd: 8 }}>✓</span>
                  {t(`vehiclesData.${v.slug}.features.${idx}`, { defaultValue: f })}
                </div>
              ))}
            </div>
          </section>
          {/* Badges */}
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {AT_A_GLANCE_BADGES.map((b) => {
                const bKey = getBadgeKey(b);
                return (
                  <div key={b} style={{
                    padding: "10px 16px", border: "1px solid var(--seif-gold-border)",
                    borderRadius: 999, fontSize: 12, color: "var(--seif-gold)",
                    letterSpacing: "0.08em",
                  }}>
                    ✓ <span style={{ color: "#fff", marginInlineStart: 6 }}>
                      {bKey ? t(`vehiclesData.badges.${bKey}`) : b}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Related */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 18 }}>{t("fleet.otherVehicles")}</h2>
            <div className="seif-related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {VEHICLES.filter((x) => x.slug !== v.slug).slice(0, 4).map((o) => (
                <Link key={o.slug} to="/fleet/$slug" params={{ slug: o.slug }} style={{
                  background: "var(--seif-surface)", border: "1px solid var(--seif-gold-border)",
                  borderRadius: 8, overflow: "hidden", textDecoration: "none", color: "#fff",
                }}>
                  <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                    <img src={o.images[0]} alt={t(`vehiclesData.${o.slug}.name`, { defaultValue: o.name })} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t(`vehiclesData.${o.slug}.name`, { defaultValue: o.name })}</div>
                    <div style={{ fontSize: 12, color: "var(--seif-white-60)", marginTop: 2 }}>{t(`vehiclesData.${o.slug}.tagline`, { defaultValue: o.tagline })}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />

      <style>{`
        @media (max-width: 860px) {
          .seif-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
