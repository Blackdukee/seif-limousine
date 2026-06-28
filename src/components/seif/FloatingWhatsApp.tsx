import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WhatsAppIcon } from "./Icons";

export function FloatingWhatsApp() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <motion.a
      href="https://wa.me/201034743315"
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsapp.ariaLabel")}
      className="seif-floating-wa"
      initial={{ x: isArabic ? -80 : 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.12 }}
      style={{
        position: "fixed",
        right: isArabic ? "auto" : 22,
        left: isArabic ? 22 : "auto",
        bottom: 102,
        zIndex: 99,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "var(--seif-gold)",
        color: "var(--seif-black)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "seif-wa-pulse 2.8s infinite",
        textDecoration: "none",
        border: "1px solid var(--seif-gold-border)",
      }}
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  );
}
