import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { RadarAcompanha } from "@/components/radar/RadarAcompanha";
import { RadarComoFunciona } from "@/components/radar/RadarComoFunciona";
import { RadarCtaFinal } from "@/components/radar/RadarCtaFinal";
import { RadarFaq } from "@/components/radar/RadarFaq";
import { RadarHero } from "@/components/radar/RadarHero";
import { RadarPlanos } from "@/components/radar/RadarPlanos";
import { RadarProblema } from "@/components/radar/RadarProblema";
import { RadarRelatorio } from "@/components/radar/RadarRelatorio";
import { RadarSeusDados } from "@/components/radar/RadarSeusDados";
import { organizationSchema } from "@/data/organization-schema";
import { radar } from "@/data/radar";

const description =
  "Radar: o acompanhamento pós-entrega da CiudadLab. Uma leitura mensal em português do que o seu site trouxe de cliente e do que mudar, com 90 dias inclusos em todo site novo.";

export const metadata: Metadata = {
  title: "Radar — acompanhamento do seu site | CiudadLab",
  description,
  alternates: { canonical: "/radar" },
  openGraph: {
    title: "Radar — acompanhamento do seu site | CiudadLab",
    description,
    type: "website",
    url: "/radar",
    images: [{ url: radar.heroImage.src, alt: radar.heroImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radar — acompanhamento do seu site | CiudadLab",
    description,
    images: [radar.heroImage.src],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Radar",
  description,
  provider: organizationSchema,
  areaServed: { "@type": "Country", name: "Brasil" },
};

export default function RadarPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <RadarHero />
        <div className="mt-24 md:mt-28">
          <RadarProblema />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarRelatorio />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarAcompanha />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarComoFunciona />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarSeusDados />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarPlanos />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarFaq />
        </div>
        <div className="mt-24 md:mt-28">
          <RadarCtaFinal />
        </div>
      </main>

      <Footer />
    </div>
  );
}
