import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1800;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{val === target ? suffix : ""}</span>;
}

const STATS = [
  { value: 8, suffix: "+", label: "Years" },
  { value: 200, suffix: "+", label: "Vehicles" },
  { value: 49, suffix: "", label: "Rating", display: "4.9/5.0" },
  { value: 10, suffix: "K+", label: "Trips" },
];

import { useTranslation } from "react-i18next";

export function StatsStrip() {
  const { t } = useTranslation();
  return (
    <section className="seif-stats-section" style={{ background: "var(--seif-black)", padding: "80px 24px", borderTop: "1px solid var(--seif-gold-border)", borderBottom: "1px solid var(--seif-gold-border)" }}>
      <ScrollReveal>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
          alignItems: "center",
        }} className="seif-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="seif-stat-item" style={{ textAlign: "center", position: "relative" }}>
              <div className="seif-stat-number" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 600,
                fontSize: 56, color: "var(--seif-gold)",
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {s.display ?? <CountUp target={s.value} suffix={s.suffix} />}
              </div>
              <div style={{
                fontSize: 11, letterSpacing: "0.24em",
                textTransform: "uppercase", color: "var(--seif-white-60)", fontWeight: 600,
              }}>
                {t(`stats.${s.label.toLowerCase()}`)}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
