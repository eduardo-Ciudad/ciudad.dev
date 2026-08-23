import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { IntroLoader } from "@/components/IntroLoader";
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
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
