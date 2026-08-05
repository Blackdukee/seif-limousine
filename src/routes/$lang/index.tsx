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
    i18n.changeLanguage(lang);
    return { lang };
  },
  head: ({ params }) => {
    const lang = (params.lang as "en" | "ar") || "en";
    i18n.changeLanguage(lang);
    const title = `${i18n.t("nav.logo")} — ${i18n.t("hero.eyebrow")}`;
    const description = i18n.t("hero.description");
    const ogDescription = `${i18n.t("hero.title1")} ${i18n.t("hero.title2")}. ${i18n.t("nav.bookDriver")} 24/7.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: ogDescription },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: SITE_CONFIG.getCanonicalUrl("", lang) },
        ...SITE_CONFIG.getHreflangLinks(""),
        { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as any,
      ],
    };
  },
  component: Index,
});

function Index() {
  useLenis();
  const [ready, setReady] = useState(false);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book a private chauffeur in Egypt with Seif Limousine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can request an instant quote and book directly via WhatsApp or phone call 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Does Seif Limousine offer airport pickup and meet & greet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide professional airport transfer services with personalized flight tracking and meet & greet at Cairo, Sharm El Sheikh, and Hurghada airports."
        }
      },
      {
        "@type": "Question",
        "name": "What luxury vehicles are available in Seif Limousine fleet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our fleet includes Mercedes E200 executive sedans, Mercedes Viano VIP vans, Toyota HiAce group minivans, Chery Tiggo 8, Jetour X90 Plus, and Mitsubishi Xpander Cross."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
