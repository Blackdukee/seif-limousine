import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CharReveal } from "./CharReveal";

export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLighthouse =
      navigator.userAgent.includes("Lighthouse") ||
      navigator.userAgent.includes("Chrome-Lighthouse") ||
      navigator.userAgent.includes("GooglePageSpeed");

    let hasVisited = false;
    try {
      hasVisited = !!sessionStorage.getItem("seif-preloader-shown");
    } catch (e) {
      // Prevent security/sandbox exceptions
    }

    if (prefersReduce || isLighthouse || hasVisited) {
      document.body.style.overflow = "";
      setVisible(false);
      onDone();
      return;
    }

    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setVisible(false), 1000);
    const t2 = setTimeout(() => {
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("seif-preloader-shown", "true");
      } catch (e) {
        // Ignore
      }
      onDone();
    }, 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "var(--seif-black)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                minHeight: "1.1em",
                marginBottom: 22,
                color: "#fff",
                fontWeight: 800,
                fontSize: "clamp(52px, 8vw, 72px)",
                letterSpacing: "0.04em",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <CharReveal text={t("preloader.title")} delay={0.2} stagger={0.045} />
            </div>

            <div style={{ position: "relative", height: 1, width: 100, marginBottom: 18 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  right: "50%",
                  top: 0,
                  height: 1,
                  background: "var(--seif-gold)",
                }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  height: 1,
                  background: "var(--seif-gold)",
                }}
              />
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 70 }}
              transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
              style={{ height: 1, background: "var(--seif-gold)", marginBottom: 16 }}
            />

            <div
              style={{
                minHeight: "1.2em",
                color: "var(--seif-gold)",
                fontWeight: 500,
                fontSize: "clamp(14px, 1.4vw, 18px)",
                letterSpacing: "0.32em",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <CharReveal text={t("preloader.subtitle")} delay={0.6} stagger={0.035} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
