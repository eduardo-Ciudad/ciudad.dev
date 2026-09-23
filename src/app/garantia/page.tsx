import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  Code2,
  ShieldCheck,
  X,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { garantia } from "@/data/garantia";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";

const description =
  "O que acontece depois que o seu projeto vai ao ar: o que a garantia de 90 dias cobre, o que não cobre e como acionar.";

export const metadata: Metadata = {
  title: "Garantia de 90 dias | CiudadLab",
  description,
  alternates: { canonical: "/garantia" },
  openGraph: {
    title: "Garantia de 90 dias | CiudadLab",
    description,
    type: "website",
    url: "/garantia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garantia de 90 dias | CiudadLab",
    description,
  },
};

const summaryIcons = {
  shieldCheck: ShieldCheck,
  clock: Clock,
  code2: Code2,
};

export default function GarantiaPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-32">
        <article className="mx-auto max-w-[720px]">
          <ScrollReveal className="mb-10">
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {garantia.eyebrow}
            </span>
            <h1 className="mb-4 font-heading text-4xl font-bold tracking-[-0.5px] text-primary md:text-5xl">
              {garantia.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted">
              {garantia.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-16 md:mb-20">
            <div className="grid gap-4 md:grid-cols-3">
              {garantia.summary.map((item) => {
                const Icon = summaryIcons[item.icon];
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-divider bg-card p-5"
                  >
                    <Icon className="mb-4 text-accent" size={22} aria-hidden="true" />
                    <h2 className="mb-2 font-semibold text-primary">{item.title}</h2>
                    <p className="text-sm leading-relaxed text-primary/80">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id={garantia.covered.id}>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {garantia.covered.title}
              </h2>
              <ul className="space-y-3">
                {garantia.covered.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px]">
                    <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span className="leading-[1.8] text-primary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id={garantia.notCovered.id}>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {garantia.notCovered.title}
              </h2>
              <ul className="space-y-3">
                {garantia.notCovered.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px]">
                    <X size={16} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
                    <span className="leading-[1.8] text-primary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id={garantia.howTo.id}>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {garantia.howTo.title}
              </h2>
              <ol className="space-y-6">
                {garantia.howTo.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mb-1 font-semibold text-primary">{step.title}</h3>
                      <p className="text-[15px] leading-[1.8] text-primary/80">
                        {index === 0 ? (
                          <>
                            {step.description.split(garantia.howTo.email)[0]}
                            <a
                              href={`mailto:${garantia.howTo.email}`}
                              className="text-accent"
                            >
                              {garantia.howTo.email}
                            </a>
                            {step.description.split(garantia.howTo.email)[1]}
                          </>
                        ) : (
                          step.description
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id={garantia.byProject.id}>
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                {garantia.byProject.title}
              </h2>
              <div className="space-y-6">
                {garantia.byProject.items.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-accent"
                    >
                      {item.title}
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                    <p className="mt-1 text-[15px] leading-[1.8] text-primary/80">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section
              id={garantia.after.id}
              className="rounded-xl border border-accent-border bg-accent-light p-6 md:p-8"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                {garantia.after.label}
              </span>
              <p className="mt-3 text-base leading-[1.8] text-primary md:text-[17px]">
                {garantia.after.text}
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-10">
            <p className="text-xs leading-relaxed text-muted">
              {garantia.legal.beforeLink}
              <Link href={garantia.legal.href} className="text-accent">
                {garantia.legal.linkLabel}
              </Link>
              {garantia.legal.afterLink}
            </p>
          </ScrollReveal>

          <section className="border-t border-divider pt-14 text-center">
            <h2 className="mb-3 font-heading text-2xl font-semibold md:text-3xl">
              {garantia.cta.title}
            </h2>
            <p className="mx-auto mb-7 max-w-sm text-sm text-muted">
              {garantia.cta.description}
            </p>
            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {garantia.cta.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
