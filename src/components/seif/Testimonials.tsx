import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";

const TESTIMONIALS = [
  {
    quote: "بصراحة تجربة ممتازة، العربية كانت نظيفة جداً والسواق وصل في الميعاد بالضبط.",
    author: "أحمد م.",
  },
  {
    quote: "السيارات موديل السنة ومريحة جداً في السفر، والتعامل كان في منتهى الاحترافية.",
    author: "سارة ع.",
  },
  {
    quote: "خدمة 10 على 10، فعلاً واجهة مشرفة لأي حد بيستخدمها.",
    author: "محمد ك.",
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
  const { t } = useTranslation();
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
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
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
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                {item.quote}
              </p>

              {/* Author */}
              <div
                style={{
                  borderTop: "1px solid var(--seif-gold-border)",
                  paddingTop: 16,
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>— {item.author}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
