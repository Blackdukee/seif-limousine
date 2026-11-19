import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";

const TESTIMONIAL_KEYS = ["item3", "item4", "item5"] as const;

function Stars() {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 300, damping: 14 }}
          style={{ color: "var(--seif-gold)", fontSize: 16 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language.startsWith("ar");
  return (
    <section id="testimonials" style={{ padding: "120px 24px", background: "var(--seif-surface)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          heading={t("testimonials.heading")}
          goldWord={t("testimonials.goldWord")}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {TESTIMONIAL_KEYS.map((key, i) => {
            const quote = t(`testimonials.items.${key}.quote`);
            const author = t(`testimonials.items.${key}.author`);
            const context = t(`testimonials.items.${key}.context`, { defaultValue: "" });
            return (
              <motion.div
                key={key}
                initial={{ opacity: 1, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  background: "var(--seif-black)",
                  border: "1px solid var(--seif-gold-border)",
                  borderRadius: 8,
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Opening quote mark */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 48,
                    color: "var(--seif-gold)",
                    lineHeight: 0.6,
                    marginBottom: 12,
                  }}
                >
                  "
                </div>

                <Stars />

                {/* Quote text — plain element, no clip animation */}
                <p
                  style={{
                    color: "var(--seif-white-80)",
                    fontSize: 15,
                    lineHeight: 1.8,
                    marginBottom: 24,
                    flex: 1,
                    direction: isRTL ? "rtl" : "ltr",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {quote}
                </p>

                {/* Author */}
                <div
                  style={{
                    borderTop: "1px solid var(--seif-gold-border)",
                    paddingTop: 16,
                    direction: isRTL ? "rtl" : "ltr",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>— {author}</div>
                  {context && (
                    <div
                      style={{
                        color: "var(--seif-gold)",
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        marginTop: 4,
                      }}
                    >
                      {context}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
