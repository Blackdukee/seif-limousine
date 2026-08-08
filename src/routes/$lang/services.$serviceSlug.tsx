import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useLenis } from "@/components/seif/useLenis";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";
import { WhatsAppIcon, PhoneIcon } from "@/components/seif/Icons";
import { getServiceData, ServiceInfo } from "@/data/servicesData";
import { SITE_CONFIG } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/utils";

export const Route = createFileRoute("/$lang/services/$serviceSlug")({
  loader: ({ params }) => {
    const lang = params.lang as "en" | "ar";
    if (lang !== "en" && lang !== "ar") throw notFound();
    i18n.changeLanguage(lang);
    const service = getServiceData(params.serviceSlug);
    if (!service) throw notFound();
    return { service, lang };
  },
  head: ({ params }) => {
    const lang = (params.lang as "en" | "ar") || "en";
    i18n.changeLanguage(lang);
    const service = getServiceData(params.serviceSlug);
    const title = service ? `${service[lang].title} — SEIF Limousine` : "Service — SEIF Limousine";
    const description = service ? service[lang].description : "Luxury chauffeur service in Egypt.";
    const canonicalUrl = SITE_CONFIG.getCanonicalUrl(`/services/${params.serviceSlug}`, lang);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(service ? [{ property: "og:image", content: service.heroImage }] : []),
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        ...SITE_CONFIG.getHreflangLinks(`/services/${params.serviceSlug}`),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  useLenis();
  const { t } = useTranslation();
  const { service, lang } = Route.useLoaderData() as { service: ServiceInfo; lang: "en" | "ar" };
  const data = service[lang];
  const canonicalUrl = SITE_CONFIG.getCanonicalUrl(`/services/${service.slug}`, lang);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    provider: {
      "@id": "https://seif-limousine.online/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("fleet.breadcrumbHome"),
        item: `https://seif-limousine.online/${lang}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />

      <main
        style={{
          background: "var(--seif-black)",
          color: "#fff",
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <nav
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--seif-white-60)",
              marginBottom: 24,
            }}
          >
            <Link
              to="/$lang"
              params={{ lang }}
              style={{ color: "var(--seif-white-60)", textDecoration: "none" }}
            >
              {t("fleet.breadcrumbHome")}
            </Link>
            <span style={{ margin: "0 10px", color: "var(--seif-gold)" }}>/</span>
            <span style={{ color: "#fff" }}>{data.title}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {data.title}
          </motion.h1>
          <p
            style={{
              color: "var(--seif-white-60)",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 800,
              marginBottom: 40,
            }}
          >
            {data.description}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
            <a
              href={getWhatsAppUrl(`Booking inquiry: ${data.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                height: 50,
                padding: "0 28px",
                borderRadius: 4,
                background: "var(--seif-gold)",
                color: "var(--seif-black)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <WhatsAppIcon size={18} />
              Book Service via WhatsApp
            </a>
            <a
              href="tel:+201029582241"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                height: 50,
                padding: "0 28px",
                borderRadius: 4,
                background: "transparent",
                border: "1px solid var(--seif-gold-border)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              <PhoneIcon size={18} />
              Call +20 102 958 2241
            </a>
          </div>

          <section style={{ marginBottom: 60 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 32,
                marginBottom: 20,
                color: "var(--seif-gold)",
              }}
            >
              Service Benefits & Features
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {data.benefits.map((b) => (
                <div
                  key={b}
                  style={{
                    padding: 20,
                    border: "1px solid var(--seif-gold-border)",
                    borderRadius: 6,
                    background: "var(--seif-surface)",
                  }}
                >
                  <span style={{ color: "var(--seif-gold)", marginInlineEnd: 10, fontWeight: 800 }}>
                    ✓
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </section>

          {data.faqs && data.faqs.length > 0 && (
            <section style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32,
                  marginBottom: 20,
                  color: "var(--seif-gold)",
                }}
              >
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {data.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    style={{
                      padding: 24,
                      border: "1px solid var(--seif-gold-border)",
                      borderRadius: 6,
                      background: "var(--seif-surface)",
                    }}
                  >
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                      {faq.question}
                    </h3>
                    <p style={{ color: "var(--seif-white-60)", fontSize: 15, lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </>
  );
}
