import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import { IntroLoader } from "@/components/IntroLoader";
import { CookieBanner } from "@/components/CookieBanner";
import { organizationSchema } from "@/data/organization-schema";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const TITLE = "CiudadLab — Sites, lojas e sistemas sob medida";
const DESCRIPTION =
  "Da ideia ao ar. Sites, lojas e sistemas sob medida — prontos pra rodar. Sem template genérico, sem intermediário.";

// Bump this every time public/favicon.png is replaced. Favicons are cached
// far more aggressively than regular assets (browser-level, not just HTTP),
// so relying on the same URL to pick up new bytes doesn't work reliably —
// changing this query string forces a fresh URL, which forces a fresh fetch.
const FAVICON_VERSION = 1;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ciudadlab.com.br"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "desenvolvimento web",
    "landing page",
    "e-commerce",
    "site institucional",
    "CiudadLab",
  ],
  icons: {
    icon: `/favicon.png?v=${FAVICON_VERSION}`,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CiudadLab",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const shouldLoadAnalytics =
    process.env.NODE_ENV === "production" && Boolean(gaMeasurementId);

  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <IntroLoader />
        {children}
        {shouldLoadAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  wait_for_update: 500
                });
                try {
                  var savedConsent = localStorage.getItem('ciudadlab-consent');
                  if (savedConsent === 'granted' || savedConsent === 'denied') {
                    gtag('consent', 'update', {
                      analytics_storage: savedConsent,
                      ad_storage: 'denied',
                      ad_user_data: 'denied',
                      ad_personalization: 'denied'
                    });
                  }
                } catch (error) {}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
            <CookieBanner />
          </>
        )}
      </body>
    </html>
  );
}
