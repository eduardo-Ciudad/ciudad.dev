"use client";

import { CoverflowCarousel, type CoverflowSlide } from "./ui/coverflow-carousel";
import { ScrollReveal } from "./ScrollReveal";

const slides: CoverflowSlide[] = [
  {
    src: "/img/depoimentos/depoimento-gabikids.png",
    alt: "Depoimento de GabiKids",
    title: "GabiKids",
    subtitle: "E-commerce",
    href: "/projetos#gabikids",
  },
  {
    src: "/img/depoimentos/leticia-depoimentos.png",
    alt: "Depoimento de Letícia",
    title: "Letícia",
    subtitle: "Landing page",
    href: "/projetos#leticia-souza",
  },
  {
    src: "/img/depoimentos/bruno-clientes.png",
    alt: "Depoimento de Bruno",
    title: "Bruno",
    subtitle: "Sistema financeiro",
    href: "/projetos#sistema-financeiro-multi-tenant",
  },
  {
    src: "/img/depoimentos/vinicius-personal.png",
    alt: "Depoimento de Vinícius",
    title: "Vinícius",
    subtitle: "Landing page",
    href: "/projetos#vinicius-mascagni",
  },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Prova social
          </span>
          <h2 className="mt-4 font-heading text-[28px] font-semibold tracking-[-1px] md:text-[36px] lg:text-[42px]">
            O que dizem os clientes
          </h2>
          <p className="mt-3 text-[14px] text-muted md:text-[15px]">
            Prints reais de conversa — sem enfeite, sem texto reescrito.
          </p>
        </ScrollReveal>

        <CoverflowCarousel
          slides={slides}
          showCaption
          showPagination
          showNavigation
          ctaLabel="Ver case"
          imageFit="contain"
          enableLightbox
          className="mt-8 md:mt-12"
          cardWidth="clamp(148px, 34vw, 280px)"
          cardHeight="calc(clamp(148px, 34vw, 280px) * 3 / 4)"
          cardClassName="aspect-[4/3] bg-[#0b0b0b]"
        />
      </div>
    </section>
  );
}
