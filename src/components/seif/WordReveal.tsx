import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface WordRevealProps {
  text: string;
  delay?: number;
  goldWord?: string;
  className?: string;
}

export function WordReveal({ text, delay = 0, goldWord, className }: WordRevealProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (isRTL) {
    // In Arabic, render the whole heading as a single text node so that words
    // flow in natural RTL order and letters join cursively.  The gold word is
    // highlighted via a <span> inside the text rather than a separate wrapper.
    const goldWordClean = goldWord?.replace(/[.,?!]/g, "") ?? "";
    const parts = goldWord
      ? text.split(new RegExp(`(${goldWordClean})`, "u"))
      : [text];

    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "inline" }}
      >
        {parts.map((part, i) => {
          const isGoldPart = part.replace(/[.,?!]/g, "") === goldWordClean && goldWordClean !== "";
          return isGoldPart ? (
            <span
              key={i}
              style={{
                color: "var(--seif-gold)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "1.1em",
              }}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </motion.span>
    );
  }

  // LTR — original word-by-word stagger reveal
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => {
        const isGold = goldWord && w.replace(/[.,?!]/g, "") === goldWord.replace(/[.,?!]/g, "");
        return (
          <span
            key={i}
            style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom", paddingBottom: "0.1em", paddingInlineEnd: "0.25em" }}
          >
            <motion.span
              style={{
                display: "inline-block",
                ...(isGold
                  ? {
                      color: "var(--seif-gold)",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: "1.1em",
                    }
                  : {}),
              }}
              initial={{ y: "115%" }}
              animate={isGold ? {
                y: "0%",
                textShadow: [
                  "0 0 0px rgba(201,168,76,0)",
                  "0 0 40px rgba(201,168,76,0.65)",
                  "0 0 0px rgba(201,168,76,0)",
                ],
              } : { y: "0%" }}
              transition={isGold ? {
                y: { delay: delay + i * 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                textShadow: { delay: delay + i * 0.1 + 1.15, duration: 1.4, times: [0, 0.5, 1] },
              } : {
                delay: delay + i * 0.1,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
