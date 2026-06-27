import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./Hero";
import { CharReveal } from "./CharReveal";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

export function FinalCta() {
  const { t } = useTranslation();
  return (
    <section id="contact" style={{
      position: "relative", padding: "140px 24px",
      background: "var(--seif-black)",
      overflow: "hidden",
    }}>
      {/* diagonal gold lines pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.06) 0 1px, transparent 1px 22px)",
        pointerEvents: "none",
      }} />
      <div className="seif-final-cta" style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
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
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}
        >
          <CtaButton primary href="https://wa.me/201034743315" icon={<WhatsAppIcon />} label={t("contact.btnWhatsapp")} />
          <CtaButton href="tel:+201034743315" icon={<PhoneIcon />} label={t("contact.btnCall")} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          style={{
            color: "var(--seif-white-60)", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
          }}
        >
          <CharReveal text={t("contact.tagline")} delay={0.8} stagger={0.012} />
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer style={{
      background: "var(--seif-black)", borderTop: "1px solid var(--seif-gold-border)",
      padding: "40px 24px", textAlign: "center",
      color: "var(--seif-white-60)", fontSize: 12, letterSpacing: "0.12em",
    }}>
      {t("footer.copyright", { year: new Date().getFullYear() })}
    </footer>
  );
}
