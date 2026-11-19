import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useLenis } from "@/components/seif/useLenis";
import { AnnouncementBar, Navbar } from "@/components/seif/Navbar";
import { Footer } from "@/components/seif/FinalCta";
import { ScrollProgress } from "@/components/seif/ScrollProgress";
import { FloatingWhatsApp } from "@/components/seif/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/seif/MobileBottomBar";
import { WhatsAppIcon, PhoneIcon } from "@/components/seif/Icons";
import { SERVICES_DATA, getServiceData, ServiceInfo } from "@/data/servicesData";
import { VEHICLES } from "@/components/seif/fleetData";
import { SITE_CONFIG } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/utils";
import { AirportBookingShowcase } from "@/components/seif/AirportBookingShowcase";

/** Services that use the vehicle showcase + booking-panel layout. */
const BOOKING_SHOWCASE_SLUGS = new Set(["cairo-airport-limousine"]);

export const Route = createFileRoute("/$lang/services/$serviceSlug")({
  loader: ({ params }) => {
    const lang = params.lang as "en" | "ar";
    if (lang !== "en" && lang !== "ar") throw notFound();
    const service = getServiceData(params.serviceSlug);
    if (!service) throw notFound();
    return { service, lang };
  },
  head: ({ params }) => {
    const lang: "en" | "ar" = params.lang === "ar" ? "ar" : "en";
    const t = i18n.getFixedT(lang);
    const service = getServiceData(params.serviceSlug);
    const brandSuffix = t("servicePage.brandSuffix");
    const title = service ? `${service[lang].title} — ${brandSuffix}` : brandSuffix;
    const description = service ? service[lang].description : SITE_CONFIG.defaultDescription;
    const canonicalUrl = SITE_CONFIG.getCanonicalUrl(`/services/${params.serviceSlug}`, lang);
    const ogImage = service ? service.heroImage : `${SITE_CONFIG.baseUrl}/og-image.webp`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "Seif Limousine" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
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
  const hasShowcase = BOOKING_SHOWCASE_SLUGS.has(service.slug);

  const recommendedVehicles = service.recommendedVehicleSlugs
    .map((slug) => VEHICLES.find((v) => v.slug === slug))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));
  const otherServices = Object.values(SERVICES_DATA).filter((s) => s.slug !== service.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    url: canonicalUrl,
    inLanguage: lang,
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
        item: `https://seif-limousine.online/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.title,
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd =
    data.faqs && data.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.2,
              marginBottom: 16,
              ...(hasShowcase && { textAlign: "center", maxWidth: 900, marginInline: "auto" }),
            }}
          >
            {data.title}
          </h1>
          <p
            style={{
              color: "var(--seif-white-60)",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 800,
              marginBottom: 40,
              ...(hasShowcase && { textAlign: "center", marginInline: "auto", maxWidth: 680 }),
            }}
          >
            {data.description}
          </p>

          {hasShowcase && <AirportBookingShowcase lang={lang} />}

          {!hasShowcase && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
              <a
                href={getWhatsAppUrl(`${t("servicePage.whatsappInquiryPrefix")}: ${data.title}`)}
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
                {t("servicePage.btnWhatsapp")}
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
                <span>{t("servicePage.btnCall")}</span>
                <span dir="ltr">+20 102 958 2241</span>
              </a>
            </div>
          )}

          {data.overview.length > 0 && (
            <section style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32,
                  marginBottom: 20,
                  color: "var(--seif-gold)",
                }}
              >
                {t("servicePage.overviewHeading")}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
                {data.overview.map((paragraph, idx) => (
                  <p
                    key={idx}
                    style={{ color: "var(--seif-white-80)", fontSize: 16, lineHeight: 1.75 }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          <section style={{ marginBottom: 60 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 32,
                marginBottom: 20,
                color: "var(--seif-gold)",
              }}
            >
              {t("servicePage.benefitsHeading")}
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

          {data.popularRoutes.length > 0 && (
            <section style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32,
                  marginBottom: 20,
                  color: "var(--seif-gold)",
                }}
              >
                {t("servicePage.routesHeading")}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 16,
                }}
              >
                {data.popularRoutes.map((item) => (
                  <div
                    key={item.route}
                    style={{
                      padding: 22,
                      border: "1px solid var(--seif-gold-border)",
                      borderRadius: 6,
                      background: "var(--seif-surface)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", margin: 0 }}>
                      {item.route}
                    </h3>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--seif-gold)",
                      }}
                    >
                      {item.duration}
                    </div>
                    <p
                      style={{
                        color: "var(--seif-white-60)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {recommendedVehicles.length > 0 && (
            <section style={{ marginBottom: 60 }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32,
                  marginBottom: 20,
                  color: "var(--seif-gold)",
                }}
              >
                {t("servicePage.vehiclesHeading")}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                {recommendedVehicles.map((v) => {
                  const name = t(`vehiclesData.${v.slug}.name`, { defaultValue: v.name });
                  const tagline = t(`vehiclesData.${v.slug}.tagline`, { defaultValue: v.tagline });
                  const passengers = t(`vehiclesData.${v.slug}.passengers`, {
                    defaultValue: v.passengers ?? "",
                  });
                  return (
                    <Link
                      key={v.slug}
                      to="/$lang/fleet/$slug"
                      params={{ lang, slug: v.slug }}
                      style={{
                        background: "var(--seif-surface)",
                        border: "1px solid var(--seif-gold-border)",
                        borderRadius: 8,
                        overflow: "hidden",
                        textDecoration: "none",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                        <img
                          src={v.images[0]}
                          alt={name}
                          loading="lazy"
                          decoding="async"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div
                        style={{
                          padding: 16,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          flex: 1,
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                        <div style={{ fontSize: 13, color: "var(--seif-white-60)" }}>{tagline}</div>
                        {passengers && (
                          <div style={{ fontSize: 12, color: "var(--seif-white-80)" }}>
                            {passengers}
                          </div>
                        )}
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--seif-gold)",
                          }}
                        >
                          {t("servicePage.viewVehicle")}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

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
                {t("servicePage.faqHeading")}
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

          {otherServices.length > 0 && (
            <section>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 32,
                  marginBottom: 20,
                  color: "var(--seif-gold)",
                }}
              >
                {t("servicePage.otherServicesHeading")}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 16,
                }}
              >
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    to="/$lang/services/$serviceSlug"
                    params={{ lang, serviceSlug: s.slug }}
                    style={{
                      padding: 20,
                      border: "1px solid var(--seif-gold-border)",
                      borderRadius: 6,
                      background: "var(--seif-surface)",
                      textDecoration: "none",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--seif-gold)" }}>
                      {s[lang].title}
                    </div>
                    <p
                      style={{
                        color: "var(--seif-white-60)",
                        fontSize: 13,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {s[lang].description}
                    </p>
                  </Link>
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
