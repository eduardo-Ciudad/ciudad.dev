import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { IntroLoader } from "@/components/IntroLoader";
import { organizationSchema } from "@/data/organization-schema";
import "./globals.css";

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
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
