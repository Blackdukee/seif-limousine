import { GoldRuleInView } from "./GoldRule";
import { CharReveal } from "./CharReveal";
import { WordReveal } from "./WordReveal";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  heading,
  goldWord,
  intro,
}: {
  eyebrow: string;
  heading: string;
  goldWord?: string;
  intro?: ReactNode;
}) {
  return (
    <div
      className="seif-section-heading"
      style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 64px" }}
    >
      <div style={{ display: "inline-block" }}>
        <GoldRuleInView />
      </div>
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.25 }}
        className="seif-eyebrow"
        style={{ marginBottom: 18, display: "block" }}
      >
        <CharReveal text={eyebrow} stagger={0.026} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          color: "#fff",
          fontSize: "clamp(32px, 4.6vw, 52px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: intro ? 20 : 0,
        }}
      >
        <WordReveal text={heading} goldWord={goldWord} delay={0.4} />
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{ color: "var(--seif-white-60)", fontSize: 16, lineHeight: 1.7 }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
