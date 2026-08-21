import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import caiAirport from "@/assets/CAI_airport.jpg";
import hrgAirport from "@/assets/HRG-Airport.png";
import sshAirport from "@/assets/SSH-Airport.png";

gsap.registerPlugin(ScrollTrigger);

const AIRPORTS = [
  {
    key: "cai",
    code: "CAI",
    serviceSlug: "cairo-airport-limousine",
    titleAr: "مطار القاهرة الدولي",
    descAr: "المطار الرئيسي والأكثر حركة في مصر.",
    titleEn: "Cairo International Airport",
    descEn: "Egypt's main and busiest airport.",
    image: caiAirport,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Cairo+International+Airport",
  },
  {
    key: "hrg",
    code: "HRG",
    serviceSlug: "hurghada-limousine",
    titleAr: "مطار الغردقة الدولي",
    descAr: "البوابة الجوية الأساسية لمنطقة البحر الأحمر السياحية.",
    titleEn: "Hurghada International Airport",
    descEn: "The main gateway to the Red Sea tourism region.",
    image: hrgAirport,
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Hurghada+International+Airport",
  },
  {
    key: "ssh",
    code: "SSH",
    serviceSlug: "sharm-el-sheikh-limousine",
    titleAr: "مطار شرم الشيخ الدولي",
    descAr: "المطار الحيوي لخدمة قطاع المنتجعات العالمية في سيناء.",
    titleEn: "Sharm El-Sheikh International Airport",
    descEn: "The vital airport serving Sinai's world-class resort sector.",
    image: sshAirport,
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Sharm+El-Sheikh+International+Airport",
  },
];

const DESTINATIONS = [
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

function DestinationImageCard({
  dest,
  isArabic,
  index,
}: {
  dest: (typeof DESTINATIONS)[0];
  isArabic: boolean;
  index: number;
}) {
  const lang = isArabic ? "ar" : "en";
  return (
    <motion.div
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
        position: "relative",
        height: 220,
        borderRadius: 12,
        overflow: "hidden",
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
      <Link
        to="/$lang/services/$serviceSlug"
        params={{ lang, serviceSlug: "intercity-limousine-egypt" }}
        className="dest-card"
        style={{
          display: "block",
          position: "absolute",
          inset: 0,
          textDecoration: "none",
          cursor: "pointer",
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
            left: 16,
            right: 16,
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
            <span style={{ marginInlineStart: 6 }}>{isArabic ? dest.titleAr : dest.titleEn}</span>
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
      </Link>
    </motion.div>
  );
}

function AirportCard({
  airport,
  isArabic,
  index,
}: {
  airport: (typeof AIRPORTS)[0];
  isArabic: boolean;
  index: number;
}) {
  const lang = isArabic ? "ar" : "en";
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ scale: 1.02 }}
      style={{
        position: "relative",
        height: 220,
        borderRadius: 12,
        overflow: "hidden",
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
      <Link
        to="/$lang/services/$serviceSlug"
        params={{ lang, serviceSlug: airport.serviceSlug }}
        className="dest-card"
        style={{
          display: "block",
          position: "absolute",
          inset: 0,
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {/* Background image */}
        <motion.img
          src={airport.image}
          alt={isArabic ? airport.titleAr : airport.titleEn}
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

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* IATA code — top corner */}
        <div
          style={{
            position: "absolute",
            top: 14,
            ...(isArabic ? { right: 14 } : { left: 14 }),
            background: "rgba(0,0,0,0.55)",
            border: "1px solid var(--seif-gold)",
            borderRadius: 4,
            padding: "3px 10px",
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "var(--seif-gold)",
            }}
          >
            {airport.code}
          </span>
        </div>

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
              marginBottom: 5,
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {isArabic ? airport.titleAr : airport.titleEn}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.4,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {isArabic ? airport.descAr : airport.descEn}
          </div>
        </div>
      </Link>
    </motion.div>
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

        {/* Row 1 — Airport cards */}
        <div
          className="seif-dest-image-row"
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 16,
            alignItems: "stretch",
            direction: isArabic ? "rtl" : "ltr",
          }}
        >
          {AIRPORTS.map((airport, i) => (
            <AirportCard key={airport.key} airport={airport} isArabic={isArabic} index={i} />
          ))}
        </div>

        {/* Row 2 — Destination image cards */}
        <div
          className="seif-dest-image-row"
          style={{
            display: "flex",
            gap: 16,
            alignItems: "stretch",
            direction: isArabic ? "rtl" : "ltr",
          }}
        >
          {DESTINATIONS.map((dest, i) => (
            <DestinationImageCard key={dest.key} dest={dest} isArabic={isArabic} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
