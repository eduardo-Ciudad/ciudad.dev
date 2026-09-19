"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Projeto } from "@/data/projetos";

type ProjetosGridProps = {
  projetos: Projeto[];
};

const categoriaLabel = {
  fullstack: "Fullstack",
  "ferramenta-interna": "Ferramenta interna",
  "landing-page": "Landing page",
} satisfies Record<Projeto["categoria"], string>;

type FadeStyle = CSSProperties & { "--fade-l": string; "--fade-r": string };

function ProjetoCard({ projeto, delay }: { projeto: Projeto; delay: number }) {
  return (
    <ScrollReveal
      delay={delay}
      className="projeto-card w-[250px] shrink-0 snap-start sm:w-[288px]"
    >
      <article
        id={projeto.slug}
        className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-xl border border-card-border bg-card shadow-sm transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent-border hover:shadow-[0_14px_30px_-18px_rgba(37,99,235,0.25)] motion-reduce:hover:translate-y-0"
      >
        {projeto.imagem ? (
          <div className="relative aspect-[4/3] overflow-hidden border-b border-divider bg-accent-light">
            <Image
              src={projeto.imagem}
              alt={`Preview do projeto ${projeto.nome}`}
              fill
              sizes="(min-width: 640px) 288px, 250px"
              className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center border-b border-divider bg-accent-light">
            <div className="flex flex-col items-center gap-2 text-accent">
              <span className="flex size-11 items-center justify-center rounded-xl border border-accent-border bg-card">
                <Code2 size={20} aria-hidden="true" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                {projeto.status}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-accent-border bg-accent-light px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-accent">
              {categoriaLabel[projeto.categoria]}
            </span>
            {projeto.autoral && (
              <span className="rounded-full border border-card-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                Autoral
              </span>
            )}
            {projeto.status && projeto.imagem && (
              <span className="rounded-full border border-card-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                {projeto.status}
              </span>
            )}
          </div>

          <h3 className="font-heading text-lg font-semibold leading-snug">
            {projeto.nome}
          </h3>

          <ul className="my-3 space-y-1.5">
            {projeto.descricao.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-primary/75">
                <span className="mt-px shrink-0 text-muted/50">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {(projeto.ctaPrincipal || projeto.ctaSecundario) && (
            <div className="mt-auto flex flex-wrap gap-2 pt-1">
              {projeto.ctaPrincipal && (
                <a
                  href={projeto.ctaPrincipal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-card transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {projeto.ctaPrincipal.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
              {projeto.ctaSecundario && (
                <a
                  href={projeto.ctaSecundario.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-accent-border px-3.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {projeto.ctaSecundario.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </ScrollReveal>
  );
}

const initialScrollState = { canScrollLeft: false, canScrollRight: true, activeIndex: 0 };

function ProjetosCarousel({
  projetos,
  eyebrow,
  title,
}: {
  projetos: Projeto[];
  eyebrow: string;
  title: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(initialScrollState);
  const [scrollState, setScrollState] = useState(initialScrollState);
  const reducedMotion = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progress = useSpring(scrollXProgress, { stiffness: 180, damping: 28, mass: 0.35 });
  const { isDragging, dragHandlers } = useDragScroll({
    containerRef: trackRef,
    itemSelector: ".projeto-card",
    reducedMotion: Boolean(reducedMotion),
  });
  const headingId = useId();
  const multipleCards = projetos.length > 1;

  const getItems = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>(".projeto-card") ?? []),
    [],
  );

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const canScrollLeft = track.scrollLeft > 4;
    const canScrollRight = track.scrollLeft + track.clientWidth < track.scrollWidth - 4;
    const items = getItems();
    const activeIndex = items.length
      ? items.reduce(
          (nearestIndex, item, index) =>
            Math.abs(item.offsetLeft - track.scrollLeft) <
            Math.abs(items[nearestIndex].offsetLeft - track.scrollLeft)
              ? index
              : nearestIndex,
          0,
        )
      : 0;
    const previous = stateRef.current;
    if (
      previous.canScrollLeft === canScrollLeft &&
      previous.canScrollRight === canScrollRight &&
      previous.activeIndex === activeIndex
    ) {
      return;
    }
    const next = { canScrollLeft, canScrollRight, activeIndex };
    stateRef.current = next;
    setScrollState(next);
  }, [getItems]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, [updateScrollState]);

  const scrollToIndex = useCallback(
    (index: number) => {
      getItems()[index]?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [getItems, reducedMotion],
  );

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const items = getItems();
    if (!track || items.length < 2) return;
    track.scrollBy({
      left: (items[1].offsetLeft - items[0].offsetLeft) * direction,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const fadeStyle: FadeStyle = {
    "--fade-l": scrollState.canScrollLeft ? "var(--fade-size)" : "0px",
    "--fade-r": scrollState.canScrollRight ? "var(--fade-size)" : "0px",
  };

  return (
    <section aria-labelledby={headingId}>
      <ScrollReveal className="mb-8 md:mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          {eyebrow}
        </span>
        <h2 id={headingId} className="mt-3 font-heading text-3xl font-semibold md:text-5xl">
          {title}
        </h2>
      </ScrollReveal>

      <div className="relative -my-6 py-6">
        {multipleCards && (
          <>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!scrollState.canScrollLeft}
              aria-label="Projeto anterior"
              className="absolute -left-4 top-[calc(50%-1.25rem)] z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-card-border bg-card text-primary shadow-md transition-[opacity,color,border-color] duration-300 hover:border-accent-border hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-25 md:flex"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!scrollState.canScrollRight}
              aria-label="Próximo projeto"
              className="absolute -right-4 top-[calc(50%-1.25rem)] z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-card-border bg-card text-primary shadow-md transition-[opacity,color,border-color] duration-300 hover:border-accent-border hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-25 md:flex"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <div
          ref={trackRef}
          {...dragHandlers}
          tabIndex={0}
          role="region"
          aria-label={title}
          onScroll={updateScrollState}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollByCard(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollByCard(1);
            }
          }}
          style={fadeStyle}
          className={`scroll-fade-track no-scrollbar flex gap-5 overflow-x-auto overflow-y-hidden py-2 pr-6 scroll-pr-6 snap-x snap-mandatory outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isDragging ? "cursor-grabbing" : multipleCards ? "cursor-grab" : ""
          }`}
        >
          {projetos.map((projeto, index) => (
            <ProjetoCard key={projeto.slug} projeto={projeto} delay={Math.min(index, 4) * 0.07} />
          ))}
        </div>
      </div>

      {multipleCards && (
        <div className="mt-2 flex items-center justify-center gap-4">
          <div className="relative h-px w-16 overflow-hidden bg-primary/15" aria-hidden="true">
            <motion.div
              className="absolute inset-0 origin-left bg-accent"
              style={{ scaleX: reducedMotion ? scrollXProgress : progress }}
            />
          </div>
          <div className="flex items-center gap-2">
            {projetos.map((projeto, index) => (
              <button
                key={projeto.slug}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir para ${projeto.nome}`}
                aria-current={index === scrollState.activeIndex ? "true" : undefined}
                className={`size-2 rounded-full transition-[background-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  index === scrollState.activeIndex
                    ? "scale-125 bg-accent"
                    : "bg-primary/15 hover:bg-primary/30"
                }`}
              />
            ))}
          </div>
          <span className="min-w-8 text-xs tabular-nums text-muted" aria-live="polite">
            {scrollState.activeIndex + 1}/{projetos.length}
          </span>
        </div>
      )}
    </section>
  );
}

export function ProjetosGrid({ projetos }: ProjetosGridProps) {
  const fullstack = projetos.filter((projeto) => projeto.categoria === "fullstack");
  const ferramentas = projetos.filter((projeto) => projeto.categoria === "ferramenta-interna");
  const landingPages = projetos.filter((projeto) => projeto.categoria === "landing-page");

  return (
    <div className="space-y-16 md:space-y-24">
      <ProjetosCarousel
        projetos={fullstack}
        eyebrow="Aplicações completas"
        title="Projetos fullstack"
      />

      {ferramentas.length > 0 && (
        <ProjetosCarousel
          projetos={ferramentas}
          eyebrow="Automação de processos"
          title="Ferramentas internas"
        />
      )}

      <ProjetosCarousel
        projetos={landingPages}
        eyebrow="Presença digital"
        title="Landing pages"
      />
    </div>
  );
}
