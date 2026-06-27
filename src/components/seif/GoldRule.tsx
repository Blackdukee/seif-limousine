import { motion } from "framer-motion";

export function GoldRule({ delay = 0, width = 40 }: { delay?: number; width?: number }) {
  const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        width,
        height: 1,
        backgroundColor: "var(--seif-gold)",
        marginBottom: 16,
        transformOrigin: isRTL ? "right center" : "left center",
      }}
    />
  );
}

export function GoldRuleInView({ delay = 0, width = 40 }: { delay?: number; width?: number }) {
  const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        width,
        height: 1,
        backgroundColor: "var(--seif-gold)",
        marginBottom: 16,
        transformOrigin: isRTL ? "right center" : "left center",
      }}
    />
  );
}
