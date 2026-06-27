import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CharRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  triggerKey?: number;
}

export function CharReveal({ text, delay = 0, stagger = 0.035, className, triggerKey = 0 }: CharRevealProps) {
  const { i18n } = useTranslation();
  // Treat any Arabic-family locale as RTL — avoids direct DOM read so SSR and
  // client hydration stay in sync.
  const isRTL = i18n.language === "ar";

  if (isRTL) {
    // In Arabic, render the full phrase as ONE text node so the browser can
    // join letters cursively.  A single fade+blur entrance replaces the stagger.
    return (
      <span className={className} aria-label={text} style={{ display: "inline-block" }}>
        <motion.span
          key={triggerKey}
          style={{ display: "inline-block", willChange: "transform" }}
          initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay,
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {text}
        </motion.span>
      </span>
    );
  }

  // LTR — original character-by-character stagger reveal
  const chars = Array.from(text);
  return (
    <span className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={`${triggerKey}-${i}`}
          aria-hidden="true"
          style={{ display: "inline-block", willChange: "transform" }}
          initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.45,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

interface HoverCharRevealProps {
  text: string;
  className?: string;
  baseDelay?: number;
  baseStagger?: number;
  hovered?: boolean;
}

export function HoverCharReveal({ text, className, baseDelay = 0, baseStagger = 0.035, hovered = false }: HoverCharRevealProps) {
  const [key, setKey] = useState(0);
  // bump key when hovered toggles true
  useState(() => 0);
  if (hovered && key === 0) {
    // noop — handled via parent
  }
  return (
    <CharReveal
      text={text}
      delay={hovered ? 0 : baseDelay}
      stagger={hovered ? 0.018 : baseStagger}
      className={className}
      triggerKey={hovered ? key + 1 : key}
    />
  );
}
