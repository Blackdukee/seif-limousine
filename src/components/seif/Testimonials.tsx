import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";

const TESTIMONIALS = [
  {
    key: "item0",
    quote: "Booked for my father's hospital transfer in Cairo. The driver was early, professional, and kind. The car was immaculate. Will only use Seif from now on.",
    author: "Karim H.",
    context: "CAIRO AIRPORT TRANSFER",
  },
  {
    key: "item1",
    quote: "Used for our wedding in Sharm. The Escalade was stunning. The driver coordinated with our photographer and handled everything without being asked. Flawless.",
    author: "Nour & Tarek",
    context: "WEDDING — SHARM EL-SHEIKH",
  },
  {
    key: "item2",
    quote: "Our CEO needed a car for a full week in Cairo. Every single day — on time, clean, quiet. Exactly what executive travel should feel like.",
    author: "Maha S.",
    context: "CORPORATE WEEKLY CONTRACT",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 300, damping: 14 }}
          style={{ color: "var(--seif-gold)", fontSize: 16 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t } = useTranslation();
  return (
    <section id="about" style={{ padding: "120px 24px", background: "var(--seif-surface)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          heading={t("testimonials.heading")}
          goldWord={t("testimonials.goldWord")}
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {TESTIMONIALS.map((item, i) => {
            const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  background: "var(--seif-black)",
                  border: "1px solid var(--seif-gold-border)",
                  borderRadius: 8,
                  padding: 32,
                  display: "flex", flexDirection: "column",
                  willChange: "transform, opacity",
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", fontSize: 48, color: "var(--seif-gold)",
                  lineHeight: 0.6, marginBottom: 12,
                }}>"</div>
                <Stars />
                <motion.p
                  initial={{ clipPath: isRTL ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.35, duration: 1, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    color: "var(--seif-white-80)", fontSize: 15, lineHeight: 1.7,
                    marginBottom: 24, flex: 1,
                  }}
                >
                  {t(`testimonials.items.${item.key}.quote`, { defaultValue: item.quote })}
                </motion.p>
                <div style={{ borderTop: "1px solid var(--seif-gold-border)", paddingTop: 16 }}>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                    — {t(`testimonials.items.${item.key}.author`, { defaultValue: item.author })}
                  </div>
                  <div style={{
                    color: "var(--seif-gold)", fontSize: 10,
                    letterSpacing: "0.18em", fontWeight: 600,
                  }}>{t(`testimonials.items.${item.key}.context`, { defaultValue: item.context })}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
