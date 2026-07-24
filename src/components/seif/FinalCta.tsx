import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./Hero";
import { CharReveal } from "./CharReveal";
import { WhatsAppIcon, PhoneIcon, FacebookIcon } from "./Icons";

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
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40, flexDirection: "row" }}
        >
          <CtaButton primary href="https://wa.me/201029582241" icon={<WhatsAppIcon />} label={t("contact.btnWhatsapp")} />
          <CtaButton href="tel:+201029582241" icon={<PhoneIcon />} label={t("contact.btnCall")} />
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
      padding: "40px 24px calc(96px + env(safe-area-inset-bottom, 0px))", textAlign: "center",
      color: "var(--seif-white-60)", fontSize: 12, letterSpacing: "0.12em",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    }}>
      <div>
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </div>
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
          transition: "background 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease",
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
    </footer>
  );
}
