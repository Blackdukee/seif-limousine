import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
import { getVehicle, PRICING, AT_A_GLANCE_BADGES, VEHICLES } from "@/components/seif/fleetData";

const getPricingKey = (label: string) => {
  if (label.includes("ONE")) return "oneWay";
  if (label.includes("2")) return "hours2";
  if (label.includes("5")) return "hours5";
  if (label.includes("10")) return "hours10";
  return "";
};

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

function FleetDetail() {
  useLenis();
  const { t } = useTranslation();
  const v = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />

      <main style={{ background: "var(--seif-black)", color: "#fff", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
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
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", color: "var(--seif-white-60)", fontSize: 13, marginBottom: 40 }}>
            <span style={{ color: "var(--seif-gold)" }}>{t("fleet.tripsCount")}</span>
            <span>|</span>
            <span>{t(`vehiclesData.${v.slug}.category`, { defaultValue: v.category })}</span>
            <span>|</span>
            <span>{t(`vehiclesData.${v.slug}.passengers`, { defaultValue: v.passengers })}</span>
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
                <div className="seif-gallery-counter" style={{
                  position: "absolute", top: 14, right: 14,
                  background: "rgba(0,0,0,0.6)", color: "#fff",
                  padding: "4px 10px", fontSize: 11, letterSpacing: "0.12em",
                }}>{activeImg + 1} / {v.images.length}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${v.images.length}, 1fr)`, gap: 12, marginTop: 12 }}>
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
            </div>

            {/* Booking card */}
            <aside style={{
              background: "var(--seif-surface)", border: "1px solid var(--seif-gold-border)",
              borderRadius: 8, padding: 28, alignSelf: "start",
            }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--seif-white-60)" }}>{t("fleet.startingFrom")}</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6, marginBottom: 18 }}>
                <div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 600 }}>{PRICING[0][1]}</span>
                  <span style={{ marginInlineStart: 8, color: "var(--seif-white-60)", fontSize: 13 }}>{t("fleet.egpOneWay")}</span>
                </div>
                <span style={{ color: "var(--seif-gold)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 700 }}>{t("fleet.bestRate")}</span>
              </div>
              <div style={{ height: 1, background: "var(--seif-gold-border)", marginBottom: 20 }} />

              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 6 }}>{t("fleet.requestQuote")}</h3>
              <p style={{ fontSize: 13, color: "var(--seif-white-60)", marginBottom: 20 }}>
                {t("fleet.tellUsDetails")}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <CtaButton
                  primary
                  href={`https://wa.me/201034743315?text=${encodeURIComponent(t("whatsapp.prefilledText", { vehicle: t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name }) }))}`}
                  icon={<WhatsAppIcon size={16} />}
                  label={t("fleet.btnWhatsappBook")}
                />
                <CtaButton href="tel:+201034743315" icon={<PhoneIcon size={16} />} label={t("hero.btnCall")} />
              </div>

              <div style={{ fontSize: 11, color: "var(--seif-white-60)", textAlign: "center", marginTop: 18, letterSpacing: "0.08em" }}>
                {t("fleet.bookingNotes")}
              </div>
            </aside>
          </div>

          {/* About */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 12 }}>{t("fleet.aboutVehicle")}</h2>
            <p style={{ color: "var(--seif-white-60)", fontSize: 16, lineHeight: 1.7, maxWidth: 780 }}>{t(`vehiclesData.${v.slug}.description`, { defaultValue: v.description })}</p>
          </section>

          {/* At a Glance */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 18 }}>{t("fleet.atGlance")}</h2>
            <div style={{
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
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

          {/* Chauffeur Packages */}
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32 }}>{t("fleet.chauffeurPackages")}</h2>
              <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--seif-gold)" }}>{t("fleet.pricesEgp")}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {PRICING.map(([label, price, sub], i) => {
                const popular = i === 2;
                const pKey = getPricingKey(label);
                return (
                  <div key={label} style={{
                    position: "relative",
                    border: popular ? "1px solid var(--seif-gold)" : "1px solid var(--seif-gold-border)",
                    borderRadius: 8, padding: "22px 18px",
                    background: popular ? "rgba(201,168,76,0.06)" : "var(--seif-surface)",
                  }}>
                    {popular && (
                      <div className="seif-package-popular-badge" style={{
                        position: "absolute", top: -10, left: 18,
                        background: "var(--seif-gold)", color: "var(--seif-black)",
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                        padding: "3px 8px", borderRadius: 2,
                      }}>{t("fleet.popular")}</div>
                    )}
                    <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--seif-white-60)" }}>
                      {pKey ? t(`vehiclesData.pricing.${pKey}.label`) : label}
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, marginTop: 6 }}>{price}</div>
                    <div style={{ fontSize: 12, color: "var(--seif-white-60)", marginTop: 4 }}>
                      {pKey ? t(`vehiclesData.pricing.${pKey}.desc`) : sub}
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: 12, color: "var(--seif-white-60)", marginTop: 14 }}>
              {t("fleet.packagesNote")}
            </p>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
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
