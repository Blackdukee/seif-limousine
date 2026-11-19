import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    key: "step1",
    title: "Choose Your Vehicle",
    desc: "Browse the fleet and pick the car that fits your moment.",
  },
  {
    n: "02",
    key: "step2",
    title: "Send Your Request",
    desc: "WhatsApp or call us with your date, time, and route. Under 60 seconds.",
  },
  {
    n: "03",
    key: "step3",
    title: "We Handle the Rest",
    desc: "Your chauffeur arrives early. You arrive in style.",
  },
];

export function HowItWorks() {
  const { t, i18n } = useTranslation();
  return (
    <section
      className="seif-how-section"
      style={{ padding: "120px 24px", background: "var(--seif-black)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={t("howItWorks.eyebrow")}
          heading={t("howItWorks.heading")}
          goldWord={t("howItWorks.goldWord")}
        />

        <div style={{ position: "relative" }}>
          {/* connecting dashed line, desktop only */}
          {(() => {
            const isRTL = i18n.language.startsWith("ar");
            return (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="hidden md:block seif-dashed-line"
                style={{
                  position: "absolute",
                  top: 44,
                  left: "10%",
                  right: "10%",
                  height: 1,
                  backgroundImage:
                    "linear-gradient(to right, var(--seif-gold) 50%, transparent 50%)",
                  backgroundSize: "12px 1px",
                  transformOrigin: isRTL ? "right" : "left",
                  opacity: 0.55,
                }}
              />
            );
          })()}

          <div
            className="seif-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 40,
              position: "relative",
              zIndex: 1,
            }}
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.key}
                className="seif-step-card"
                initial={{ opacity: 1, y: 16, filter: "blur(0px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.28, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                style={{ textAlign: "center", willChange: "transform, opacity" }}
              >
                <div
                  className="seif-step-number"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 52,
                    color: "var(--seif-gold)",
                    lineHeight: 1,
                    marginBottom: 18,
                  }}
                >
                  {t(`howItWorks.steps.${s.key}.n`, { defaultValue: s.n })}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 12,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {t(`howItWorks.steps.${s.key}.title`, { defaultValue: s.title })}
                </h3>
                <p
                  style={{
                    color: "var(--seif-white-60)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    maxWidth: 280,
                    margin: "0 auto",
                  }}
                >
                  {t(`howItWorks.steps.${s.key}.desc`, { defaultValue: s.desc })}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: 60,
            color: "var(--seif-white-60)",
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {t("howItWorks.note")}
        </motion.p>
      </div>
    </section>
  );
}
