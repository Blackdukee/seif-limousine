import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";
import { ArrowIcon } from "./Icons";

const SERVICES = [
  { icon: "✈", key: "airport", title: "Airport Transfers", desc: "Cairo, Hurghada & Sharm airports — meet & greet, flight tracking, complimentary wait time." },
  { icon: "🏢", key: "corporate", title: "Corporate Travel", desc: "Executive transfers, VIP meetings, and weekly chauffeur contracts for business teams." },
  { icon: "💒", key: "weddings", title: "Weddings & Events", desc: "Luxury arrivals, photogenic fleet, ribbons and flowers prepared on request." },
  { icon: "🌊", key: "summer", title: "Summer Escapes", desc: "North Coast, Ain Sokhna, Sahel — point-to-point or multi-day with overnight driver." },
  { icon: "🗺", key: "tours", title: "City Tours", desc: "Cairo, Giza, Alexandria day tours with English-speaking drivers who know the city." },
  { icon: "⏱", key: "hourly", title: "Hourly Hire", desc: "Flexible chauffeur by the hour — keep the car and driver for as long as you need." },
];

export function ServicesSection() {
  const { t } = useTranslation();
  return (
    <section id="services" style={{ padding: "120px 24px", background: "var(--seif-surface)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={t("services.eyebrow")}
          heading={t("services.heading")}
          goldWord={t("services.goldWord")}
        />
        <div
          className="seif-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map((s, i) => {
            const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
                whileHover="hover"
                style={{
                  position: "relative",
                  background: "var(--seif-surface)",
                  border: "1px solid var(--seif-gold-border)",
                  padding: 30,
                  borderRadius: 6,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                className="seif-service-card"
              >
                {/* top border slide */}
                <motion.div
                  variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
                  initial="initial"
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: 2, background: "var(--seif-gold)",
                    transformOrigin: isRTL ? "right" : "left",
                  }}
                />
                <motion.div
                  variants={{ hover: { rotate: 6 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ fontSize: 36, marginBottom: 18, display: "inline-block" }}
                >
                  {s.icon}
                </motion.div>
                <h3 style={{
                  fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{t(`services.items.${s.key}.title`, { defaultValue: s.title })}</h3>
                <p style={{ color: "var(--seif-white-60)", fontSize: 14, lineHeight: 1.6 }}>{t(`services.items.${s.key}.desc`, { defaultValue: s.desc })}</p>
                <motion.div
                  variants={{ hover: { x: 0, opacity: 1 }, initial: { x: isRTL ? 8 : -8, opacity: 0 } }}
                  initial="initial"
                  transition={{ duration: 0.2 }}
                  style={{ color: "var(--seif-gold)", marginTop: 18 }}
                >
                  <ArrowIcon className="rtl-flip" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
