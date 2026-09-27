import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Check,
  FileChartColumn,
  MessageSquareText,
} from "lucide-react";
import { DocImage } from "@/components/DocImage";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { organizationSchema } from "@/data/organization-schema";
import { radar } from "@/data/radar";
import { WHATSAPP_RADAR_URL } from "@/data/whatsapp";

const description =
  "Radar é o acompanhamento pós-entrega da CiudadLab: Analytics configurado, leitura semanal e relatório mensal em linguagem simples.";

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

const deliverableIcons = {
  chartNoAxesCombined: ChartNoAxesCombined,
  messageSquareText: MessageSquareText,
  fileChartColumn: FileChartColumn,
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
        <article className="mx-auto max-w-[820px]">
          <ScrollReveal className="mb-10">
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {radar.eyebrow}
            </span>
            <h1 className="mb-4 font-heading text-5xl font-bold tracking-[-1px] text-primary md:text-7xl">
              {radar.title}
            </h1>
            <p className="max-w-[720px] text-lg leading-relaxed text-muted md:text-xl">
              {radar.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <DocImage {...radar.heroImage} />
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <section>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {radar.tracked.title}
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {radar.tracked.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px]">
                    <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span className="leading-[1.8] text-primary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <section>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {radar.deliverables.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {radar.deliverables.items.map((item) => {
                  const Icon = deliverableIcons[item.icon];
                  return (
                    <div key={item.title} className="rounded-xl border border-card-border bg-card p-5">
                      <Icon className="mb-4 text-accent" size={22} aria-hidden="true" />
                      <h3 className="mb-2 font-semibold text-primary">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-primary/80">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <section className="rounded-xl border border-accent-border bg-accent-light p-6 md:p-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                {radar.example.label}
              </span>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-primary">{radar.example.title}</h2>
              <blockquote className="mt-4 text-[15px] leading-[1.8] text-primary/80 md:text-base">
                “{radar.example.text}”
              </blockquote>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <figure>
              <DocImage
                src={radar.analyticsImage.src}
                alt={radar.analyticsImage.alt}
                width={radar.analyticsImage.width}
                height={radar.analyticsImage.height}
              />
              <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                {radar.analyticsImage.caption}
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <section>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {radar.howItWorks.title}
              </h2>
              <ol className="space-y-6">
                {radar.howItWorks.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mb-1 font-semibold text-primary">{step.title}</h3>
                      <p className="text-[15px] leading-[1.8] text-primary/80">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <section>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {radar.faq.title}
              </h2>
              <div className="divide-y divide-divider border-y border-divider">
                {radar.faq.items.map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="cursor-pointer list-none pr-6 font-semibold text-primary marker:content-none">
                      {item.question}
                    </summary>
                    <p className="mt-3 max-w-[680px] text-[15px] leading-[1.8] text-primary/80">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <section className="border-t border-divider pt-14 text-center">
            <h2 className="mb-7 font-heading text-2xl font-semibold md:text-3xl">{radar.cta.title}</h2>
            <WhatsAppLink
              href={WHATSAPP_RADAR_URL}
              location="radar"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {radar.cta.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </WhatsAppLink>
            <p className="mt-5 text-sm text-muted">
              Já tem um site? <Link href="/garantia" className="text-accent hover:opacity-80">Veja como funciona o pós-entrega.</Link>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
