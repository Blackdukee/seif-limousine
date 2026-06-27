import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="seif-scroll-progress" style={{
      position: "fixed", top: 0, left: 0, width: 2, height: "100vh", zIndex: 60,
      background: "var(--seif-gold-border)",
    }}>
      <motion.div
        style={{
          width: "100%", height: "100%",
          background: "var(--seif-gold)",
          boxShadow: "0 0 6px rgba(201,168,76,0.5)",
          transformOrigin: "top center",
          scaleY,
        }}
      />
    </div>
  );
}
