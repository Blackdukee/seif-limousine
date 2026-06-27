import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

export function MobileBottomBar() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 68 }} animate={{ y: 0 }} exit={{ y: 68 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden"
          style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
            height: 68, background: "var(--seif-black)",
            borderTop: "1px solid var(--seif-gold-border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", gap: 10,
          }}
        >
          <div style={{
            color: "var(--seif-gold)", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            {t("mobileBottomBar.available")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="https://wa.me/20000000000" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--seif-gold)", color: "var(--seif-black)",
              height: 38, padding: "0 14px", borderRadius: 4,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
              textDecoration: "none",
            }}>
              <WhatsAppIcon size={14} /> {t("mobileBottomBar.whatsapp")}
            </a>
            <a href="tel:+201034743315" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              border: "1px solid var(--seif-gold-border)", color: "#fff",
              height: 38, padding: "0 14px", borderRadius: 4,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
              textDecoration: "none",
            }}>
              <PhoneIcon size={14} /> {t("mobileBottomBar.call")}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
