import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useLenis } from "@/components/seif/useLenis";
import { Preloader } from "@/components/seif/Preloader";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Hero } from "@/components/seif/Hero";
import { FleetSection } from "@/components/seif/FleetSection";
import { HowItWorks } from "@/components/seif/HowItWorks";
import { FinalCta, Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";
import { TrustBar } from "@/components/seif/TrustBar";
import { FeaturedDestinations } from "@/components/seif/FeaturedDestinations";
import { Testimonials } from "@/components/seif/Testimonials";

import heroImg from "@/assets/seif-hero.webp";
import i18n from "@/i18n";
import { SITE_CONFIG } from "@/config/site";

export const Route = createFileRoute("/$lang/")({
  loader: ({ params }) => {
    const lang = params.lang as "en" | "ar";
    if (lang !== "en" && lang !== "ar") {
      throw notFound();
    }
    return { lang };
  },
  head: ({ params }) => {
    const lang: "en" | "ar" = params.lang === "ar" ? "ar" : "en";
    const t = i18n.getFixedT(lang);
    const title = `${t("nav.logo")} — ${t("hero.eyebrow")}`;
    const description = t("hero.description");
    const ogDescription = `${t("hero.title1")} ${t("hero.title2")}. ${t("nav.bookDriver")} 24/7.`;
    const canonicalUrl = SITE_CONFIG.getCanonicalUrl("", lang);
    const ogImageUrl = `${SITE_CONFIG.baseUrl}/og-image.webp`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: ogDescription },
        { name: "twitter:image", content: ogImageUrl },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        ...SITE_CONFIG.getHreflangLinks(""),
        { rel: "preload", as: "image", href: heroImg } as Record<string, string>,
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
        <TrustBar />
        <FeaturedDestinations />
        <FleetSection />
        <HowItWorks />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
      <span style={{ display: "none" }}>{ready ? "1" : "0"}</span>
    </>
  );
}
