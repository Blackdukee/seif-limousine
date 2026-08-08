import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  onClick,
  href,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
}: MagneticButtonProps) {
  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      style={{ position: "relative", overflow: "hidden", ...style }}
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </Comp>
  );
}
