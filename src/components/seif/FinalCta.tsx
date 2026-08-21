import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./Hero";
import { CharReveal } from "./CharReveal";
import { WhatsAppIcon, PhoneIcon, FacebookIcon } from "./Icons";
import { VEHICLES } from "./fleetData";
import { SERVICES_DATA } from "@/data/servicesData";

export function FinalCta() {
  const { t } = useTranslation();
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "140px 24px",
        background: "var(--seif-black)",
        overflow: "hidden",
      }}
    >
      {/* diagonal gold lines pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(201,168,76,0.06) 0 1px, transparent 1px 22px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="seif-final-cta"
        style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}
      >
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          heading={t("contact.heading")}
          goldWord={t("contact.goldWord")}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 40,
            flexDirection: "row",
          }}
        >
          <CtaButton
            primary
            href="https://wa.me/201029582241"
            icon={<WhatsAppIcon />}
            label={t("contact.btnWhatsapp")}
          />
          <CtaButton href="tel:+201029582241" icon={<PhoneIcon />} label={t("contact.btnCall")} />
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").startsWith("ar") ? "ar" : "en";
  const isAr = lang === "ar";
  const servicesList = Object.values(SERVICES_DATA);

  return (
    <footer
      style={{
        background: "var(--seif-black)",
        borderTop: "1px solid var(--seif-gold-border)",
        paddingTop: 60,
        paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
        color: "var(--seif-white-60)",
        fontSize: 13,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <Link
              to="/$lang"
              params={{ lang }}
              style={{
                display: "inline-block",
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
                marginBottom: 16,
              }}
            >
              {t("nav.logo")}
            </Link>
            <p style={{ lineHeight: 1.6, color: "var(--seif-white-60)", marginBottom: 20 }}>
              {isAr
                ? "خدمات ليموزين فاخرة وسائق خاص للتنقلات في كافة أنحاء جمهورية مصر العربية على مدار 24 ساعة."
                : "Premium chauffeur-driven luxury vehicle rentals, airport transfers, and private intercity drivers across Egypt 24/7."}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href="https://www.facebook.com/profile.php?id=100063865160358"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(201, 168, 76, 0.08)",
                  border: "1px solid var(--seif-gold-border)",
                  color: "var(--seif-gold)",
                  transition: "background 200ms ease, color 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--seif-gold)";
                  e.currentTarget.style.color = "var(--seif-black)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(201, 168, 76, 0.08)";
                  e.currentTarget.style.color = "var(--seif-gold)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Fleet Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "var(--seif-gold)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {isAr ? "أسطول السيارات" : "Our Fleet"}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {VEHICLES.map((v) => (
                <li key={v.slug}>
                  <Link
                    to="/$lang/fleet/$slug"
                    params={{ lang, slug: v.slug }}
                    style={{
                      color: "var(--seif-white-60)",
                      textDecoration: "none",
                      transition: "color 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--seif-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--seif-white-60)";
                    }}
                  >
                    {t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name })}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "var(--seif-gold)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {isAr ? "خدمات الليموزين" : "Chauffeur Services"}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {servicesList.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/$lang/services/$serviceSlug"
                    params={{ lang, serviceSlug: s.slug }}
                    style={{
                      color: "var(--seif-white-60)",
                      textDecoration: "none",
                      transition: "color 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--seif-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--seif-white-60)";
                    }}
                  >
                    {s[lang]?.title || s.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Direct Booking */}
          <div>
            <h4
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "var(--seif-gold)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {isAr ? "الحجز والتواصل" : "Booking & Support"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="https://wa.me/201029582241"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--seif-gold)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp: +20 102 958 2241</span>
              </a>
              <a
                href="tel:+201029582241"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                <PhoneIcon size={16} />
                <span dir="ltr">+20 102 958 2241</span>
              </a>
              <div style={{ fontSize: 12, color: "var(--seif-white-60)", marginTop: 6 }}>
                {isAr ? "خدمة عملاء وحجوزات فورية 24/7" : "24/7 Customer Service & Instant Booking"}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--seif-gold-border)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            fontSize: 12,
            letterSpacing: "0.08em",
          }}
        >
          <div>© {new Date().getFullYear()} SEIF LIMOUSINE · CAIRO, EGYPT</div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link
              to="/$lang"
              params={{ lang: "en" }}
              style={{
                color: lang === "en" ? "var(--seif-gold)" : "var(--seif-white-60)",
                textDecoration: "none",
                fontWeight: lang === "en" ? 700 : 400,
              }}
            >
              English
            </Link>
            <span style={{ color: "var(--seif-gold-border)" }}>|</span>
            <Link
              to="/$lang"
              params={{ lang: "ar" }}
              style={{
                color: lang === "ar" ? "var(--seif-gold)" : "var(--seif-white-60)",
                textDecoration: "none",
                fontWeight: lang === "ar" ? 700 : 400,
              }}
            >
              العربية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
