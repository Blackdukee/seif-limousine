import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_DESTINATIONS = [
  {
    key: "cairo",
    emoji: "🏛️",
    titleAr: "القاهرة",
    subtitleAr: "المدن التراثية",
    titleEn: "Cairo",
    subtitleEn: "Heritage Cities",
    image:
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80&auto=format&fit=crop",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cairo,+Egypt",
  },
  {
    key: "north-coast",
    emoji: "🏖️",
    titleAr: "الساحل الشمالي",
    subtitleAr: "الشواطئ الجميلة",
    titleEn: "North Coast",
    subtitleEn: "Beautiful Beaches",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=North+Coast,+Egypt",
  },
  {
    key: "hurghada",
    emoji: "🐠",
    titleAr: "الغردقة",
    subtitleAr: "البحر الأحمر",
    titleEn: "Hurghada",
    subtitleEn: "Red Sea",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format&fit=crop",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Hurghada,+Egypt",
  },
];

const TEXT_DESTINATIONS = [
  {
    key: "airport",
    titleAr: "المطار",
    subtitleAr: "خدمة استقبال وتوصيل",
    titleEn: "Airport",
    subtitleEn: "Meet & Greet Service",
    href: "https://www.google.com/maps/search/?api=1&query=Cairo+International+Airport",
  },
  {
    key: "sharm",
    titleAr: "شرم الشيخ",
    subtitleAr: "منتجعات عالمية",
    titleEn: "Sharm El-Sheikh",
    subtitleEn: "World-Class Resorts",
    href: "https://www.google.com/maps/search/?api=1&query=Sharm+El-Sheikh,+Egypt",
  },
  {
    key: "alex",
    titleAr: "الإسكندرية",
    subtitleAr: "عروس البحر المتوسط",
    titleEn: "Alexandria",
    subtitleEn: "Pearl of the Mediterranean",
    href: "https://www.google.com/maps/search/?api=1&query=Alexandria,+Egypt",
  },
];

function DestinationImageCard({
  dest,
  isArabic,
  index,
}: {
  dest: (typeof IMAGE_DESTINATIONS)[0];
  isArabic: boolean;
  index: number;
}) {
  return (
    <motion.a
      href={dest.mapsLink}
      target="_blank"
      rel="noopener noreferrer"
      className="dest-card"
      data-dest-index={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      }}
      whileHover={{ scale: 1.02 }}
      style={{
        display: "block",
        position: "relative",
        height: 220,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
        border: "1px solid var(--seif-gold-border)",
        transition: "border-color 0.3s ease",
        flexShrink: 0,
        flex: 1,
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--seif-gold)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--seif-gold-border)";
      }}
    >
      {/* Image */}
      <motion.img
        src={dest.image}
        alt={isArabic ? dest.titleAr : dest.titleEn}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Text — bottom pinned */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          insetInlineStart: 16,
          insetInlineEnd: 16,
          textAlign: isArabic ? "right" : "left",
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 4,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {dest.emoji}{" "}
          <span style={{ marginInlineStart: 6 }}>
            {isArabic ? dest.titleAr : dest.titleEn}
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.75)",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          {isArabic ? dest.subtitleAr : dest.subtitleEn}
        </div>
      </div>
    </motion.a>
  );
}

function DestinationTextTile({
  dest,
  isArabic,
  delay,
}: {
  dest: (typeof TEXT_DESTINATIONS)[0];
  isArabic: boolean;
  delay: number;
}) {
  return (
    <motion.a
      href={dest.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        textDecoration: "none",
        padding: "20px 16px",
        cursor: "pointer",
        direction: isArabic ? "rtl" : "ltr",
        position: "relative",
        borderBottom: "1px solid transparent",
        transition: "border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderBottomColor = "var(--seif-gold)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderBottomColor = "transparent";
      }}
    >
      <span
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: "#fff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          lineHeight: 1.3,
        }}
      >
        {isArabic ? dest.titleAr : dest.titleEn}
      </span>
      {/* Gold separator dot */}
      <span
        style={{
          display: "block",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "var(--seif-gold)",
          margin: "8px auto",
          opacity: 0.7,
        }}
      />
      <span
        style={{
          fontSize: 13,
          color: "rgba(201,168,76,0.8)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          lineHeight: 1.5,
        }}
      >
        {isArabic ? dest.subtitleAr : dest.subtitleEn}
      </span>
    </motion.a>
  );
}

export function FeaturedDestinations() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dest-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="destinations"
      style={{
        background: "var(--seif-black)",
        padding: "100px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 16,
              textAlign: "center",
              direction: isArabic ? "rtl" : "ltr",
            }}
          >
            {isArabic ? "وجهاتنا المميزة" : "Featured Destinations"}
          </h2>
          {/* Gold underline accent */}
          <div
            style={{
              width: 60,
              height: 2,
              background: "var(--seif-gold)",
              margin: "0 auto",
              borderRadius: 1,
            }}
          />
          <p
            style={{
              color: "var(--seif-white-60)",
              fontSize: 15,
              marginTop: 18,
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "18px auto 0",
            }}
          >
            {isArabic
              ? "نخدم أبرز الوجهات في مصر بأسطول فاخر وسائقين محترفين"
              : "Serving Egypt's finest destinations with a premium fleet and professional drivers"}
          </p>
        </motion.div>

        {/* Row 1 — image cards */}
        <div
          className="seif-dest-image-row"
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 40,
            alignItems: "stretch",
            direction: isArabic ? "rtl" : "ltr",
          }}
        >
          {IMAGE_DESTINATIONS.map((dest, i) => (
            <DestinationImageCard
              key={dest.key}
              dest={dest}
              isArabic={isArabic}
              index={i}
            />
          ))}
        </div>

        {/* Thin divider */}
        <div
          style={{
            height: 1,
            background: "var(--seif-gold-border)",
            marginBottom: 40,
          }}
        />

        {/* Row 2 — text tiles */}
        <div
          className="seif-dest-text-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            direction: isArabic ? "rtl" : "ltr",
          }}
        >
          {TEXT_DESTINATIONS.map((dest, i) => (
            <DestinationTextTile
              key={dest.key}
              dest={dest}
              isArabic={isArabic}
              delay={0.5 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
