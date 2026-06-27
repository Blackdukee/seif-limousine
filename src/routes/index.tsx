import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLenis } from "@/components/seif/useLenis";
import { Preloader } from "@/components/seif/Preloader";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Hero } from "@/components/seif/Hero";
import { StatsStrip } from "@/components/seif/StatsStrip";
import { FleetSection } from "@/components/seif/FleetSection";
import { ServicesSection } from "@/components/seif/ServicesSection";
import { HowItWorks } from "@/components/seif/HowItWorks";
import { FinalCta, Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";

import i18n from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => {
    const title = `${i18n.t("nav.logo")} — ${i18n.t("hero.eyebrow")}`;
    const description = i18n.t("hero.description");
    const ogDescription = `${i18n.t("hero.title1")} ${i18n.t("hero.title2")}. ${i18n.t("nav.bookDriver")} 24/7.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: Index,
});

function Index() {
  useLenis();
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <Hero />
        <StatsStrip />
        <FleetSection />
        <ServicesSection />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
      {/* ready flag reserved for future gating */}
      <span style={{ display: "none" }}>{ready ? "1" : "0"}</span>
    </>
  );
}
