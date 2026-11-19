import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Premium vector SVG icons for a high-end luxury look
const ShieldGoldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--seif-gold)" }}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const SnowflakeGoldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--seif-gold)" }}
  >
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
  </svg>
);

const ClockGoldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--seif-gold)" }}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TagGoldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: "var(--seif-gold)" }}
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const TRUST_ITEMS = [
  {
    key: "drivers",
    IconComponent: ShieldGoldIcon,
    title: "سائقون محترفون",
    subtitle: "ذو كفاءة عالية",
    titleEn: "Professional Drivers",
    subtitleEn: "Vetted & Licensed",
  },
  {
    key: "clean",
    IconComponent: SnowflakeGoldIcon,
    title: "سيارات نظيفة",
    subtitle: "مكيفة بالكامل",
    titleEn: "Clean Vehicles",
    subtitleEn: "Fully Air-Conditioned",
  },
  {
    key: "availability",
    IconComponent: ClockGoldIcon,
    title: "متاح 24/7",
    subtitle: "خدمة على مدار الساعة",
    titleEn: "Available 24/7",
    subtitleEn: "Around-the-Clock Service",
  },
  {
    key: "pricing",
    IconComponent: TagGoldIcon,
    title: "أسعار تنافسية",
    subtitle: "أفضل قيمة مقابل سعر",
    titleEn: "Competitive Pricing",
    subtitleEn: "Best Value for Money",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 1, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export function TrustBar() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section
      className="seif-trust-bar"
      style={{
        background: "var(--seif-black)", // Unified true black background
        borderTop: "1px solid var(--seif-gold-border)",
        borderBottom: "1px solid var(--seif-gold-border)",
        padding: "60px 24px 20px",
        overflow: "hidden",
      }}
    >
      {/* Section Title Header matching design */}
      <motion.div
        initial={{ opacity: 1, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          marginBottom: 44,
          maxWidth: 840,
          margin: "0 auto 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Eyebrow with underline accent */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--seif-gold)",
              fontFamily: "'Plus Jakarta Sans', 'Cairo', sans-serif",
              letterSpacing: isArabic ? 0 : "0.05em",
            }}
          >
            {isArabic ? "ليه تختارنا؟" : "Why Choose Us?"}
          </span>
          <div
            style={{
              width: 32,
              height: 1.5,
              backgroundColor: "var(--seif-gold)",
              borderRadius: 1,
              opacity: 0.8,
            }}
          />
        </div>

        {/* Main Heading with two-tone gold & white styling */}
        <h2
          style={{
            fontSize: "clamp(26px, 4.2vw, 46px)",
            fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans', 'Cairo', sans-serif",
            margin: "6px 0 0",
            lineHeight: 1.3,
            letterSpacing: isArabic ? 0 : "-0.02em",
          }}
        >
          <span style={{ color: "var(--seif-gold)" }}>
            {isArabic ? "لأننا بنحل مشاكل " : "Solving All "}
          </span>
          <span style={{ color: "#FFFFFF" }}>
            {isArabic ? "الإيجار اللي بتقابلك" : "Your Rental Problems"}
          </span>
        </h2>

        {/* Subtitle Paragraph */}
        <p
          style={{
            color: "var(--seif-white-60)",
            fontSize: "clamp(14px, 1.8vw, 16px)",
            lineHeight: 1.7,
            margin: "4px 0 0",
            maxWidth: 720,
            fontFamily: "'Plus Jakarta Sans', 'Cairo', sans-serif",
            fontWeight: 400,
          }}
        >
          {isArabic
            ? "احنا مش بس بنأجرلك عربية، احنا بنوفرلك تجربة مريحة وآمنة من اول لحظة لحد ما توصل وجهتك."
            : "We don't just rent cars; we deliver a comfortable and safe experience from the moment you book until you reach your destination."}
        </p>
      </motion.div>

      <motion.div
        className="seif-trust-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        {TRUST_ITEMS.map((item, i) => {
          const Icon = item.IconComponent;
          return (
            <motion.div
              key={item.key}
              variants={cardVariants}
              whileHover="hover"
              className="seif-trust-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "36px 20px",
                textAlign: "center",
                position: "relative",
                cursor: "default",
              }}
            >
              {/* Animated Icon Container with Glow */}
              <motion.div
                variants={{
                  hover: { scale: 1.08, y: -4 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(201, 168, 76, 0.05)",
                  border: "1px solid rgba(201, 168, 76, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                  position: "relative",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* Glow Backdrop */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <Icon />
              </motion.div>

              {/* Title */}
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: isArabic ? 0 : "0.02em",
                  lineHeight: 1.3,
                  marginTop: 2,
                }}
              >
                {isArabic ? item.title : item.titleEn}
              </span>

              {/* Subtitle */}
              <span
                style={{
                  fontSize: 12,
                  color: "var(--seif-white-60)", // Pushed to elegant white-60 to complement the gold/white theme
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: isArabic ? 0 : "0.04em",
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
              >
                {isArabic ? item.subtitle : item.subtitleEn}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
