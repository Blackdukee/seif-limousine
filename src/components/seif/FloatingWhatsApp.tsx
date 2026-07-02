import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WhatsAppIcon } from "./Icons";
import { useState, useEffect } from "react";

export function FloatingWhatsApp() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.a
      href="https://wa.me/201029582241"
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsapp.ariaLabel")}
      className="seif-floating-wa"
      initial={{ x: isArabic ? -80 : 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.12 }}
      drag={isMobile}
      dragConstraints={{ left: -300, right: 300, top: -600, bottom: 100 }}
      dragElastic={0.15}
      dragMomentum={true}
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
        touchAction: isMobile ? "none" : "auto",
      }}
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  );
}
