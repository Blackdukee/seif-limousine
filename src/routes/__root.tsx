import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import i18n from "../i18n";
import { SITE_CONFIG } from "@/config/site";
import "../rtl.css";
import "../mobile.css";


function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">{t("notFound.pageTitle")}</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("notFound.pageSubtitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("notFound.pageDescription")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("notFound.btnGoHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("notFound.errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("notFound.errorDescription")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("notFound.btnTryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("notFound.btnGoHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Seif Limousine — Luxury Chauffeur & Private Driver Services in Egypt" },
      { name: "description", content: "SEIF LIMOUSINE offers premium chauffeur-driven luxury vehicle rentals, airport transfers, and intercity private drivers across Egypt." },
      { name: "author", content: "Seif Limousine" },
      { name: "application-name", content: "Seif Limousine" },
      { property: "og:site_name", content: "Seif Limousine" },
      { property: "og:title", content: "Seif Limousine — Luxury Chauffeur & Private Driver Services in Egypt" },
      { property: "og:description", content: "SEIF LIMOUSINE offers premium chauffeur-driven luxury vehicle rentals, airport transfers, and intercity private drivers across Egypt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SeifLimousine" },
      { name: "twitter:title", content: "Seif Limousine — Luxury Chauffeur & Private Driver Services in Egypt" },
      { name: "twitter:description", content: "SEIF LIMOUSINE offers premium chauffeur-driven luxury vehicle rentals, airport transfers, and intercity private drivers across Egypt." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0a7272cd-062c-4637-b04d-ed9cdb351f0c/id-preview-94dc8b06--6ae2b654-ae7c-47b4-9184-5bb55f031311.lovable.app-1782485626137.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0a7272cd-062c-4637-b04d-ed9cdb351f0c/id-preview-94dc8b06--6ae2b654-ae7c-47b4-9184-5bb55f031311.lovable.app-1782485626137.png" },
    ],
    links: [
      { rel: "canonical", href: SITE_CONFIG.getCanonicalUrl("/") },
      { rel: "shortcut icon", href: `${SITE_CONFIG.baseUrl}/favicon.ico` },
      { rel: "icon", href: `${SITE_CONFIG.baseUrl}/favicon.ico`, sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: `${SITE_CONFIG.baseUrl}/favicon-48.png` },
      { rel: "icon", type: "image/png", sizes: "192x192", href: `${SITE_CONFIG.baseUrl}/favicon-192.png` },
      { rel: "icon", type: "image/png", sizes: "512x512", href: `${SITE_CONFIG.baseUrl}/favicon-512.png` },
      { rel: "apple-touch-icon", sizes: "180x180", href: `${SITE_CONFIG.baseUrl}/apple-touch-icon.png` },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cairo:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://seif-limousine.online/#website",
        "url": "https://seif-limousine.online/",
        "name": "Seif Limousine",
        "alternateName": ["SEIF LIMOUSINE", "Seif Limousine Egypt", "Seif Limo"],
        "publisher": {
          "@id": "https://seif-limousine.online/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://seif-limousine.online/#organization",
        "name": "Seif Limousine",
        "url": "https://seif-limousine.online/",
        "logo": "https://seif-limousine.online/favicon.png"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('i18nextLng') || 'en';
                  document.documentElement.lang = lang;
                  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                  document.documentElement.classList.add('lang-' + lang);
                } catch (e) {}
              })();
            `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
