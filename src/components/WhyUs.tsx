"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { FileCheck, ShieldCheck, Clock, MessageCircle, Code2, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useDragScroll } from "@/hooks/useDragScroll";

const cards = [
  {
    icon: FileCheck,
    title: "Escopo e preço travados antes de começar",
    description: 'Nada de "hora-trabalhada" que estoura no final. Você recebe escopo, prazo e valor fechados antes da primeira linha de código. Sem surpresa na fatura, sem reunião pra renegociar. O que foi combinado é o que é entregue.',
  },
  {
    icon: ShieldCheck,
    title: "Segurança desde o dia 1 — não depois",
    description: "Autenticação, validação de dados, proteção contra ataques e criptografia de webhooks já vêm no projeto. Não é camada extra cobrada à parte. O GabiKids, por exemplo, passou por uma auditoria de 21 pontos de segurança antes de ir ao ar.",
  },
  {
    icon: Clock,
    title: "Entrega em 2–4 semanas com garantia de 90 dias",
    description: "Prazo curto porque quem planeja é quem programa — sem telefone sem fio. Depois da entrega, 90 dias de garantia: se quebrar, eu arrumo sem custo adicional. Você não precisa entender de código pra saber se vai funcionar — essa responsabilidade é minha.",
  },
  {
    icon: MessageCircle,
    title: "Você fala direto com quem programa",
    description: "Sem gerente de conta, sem intermediário, sem 'vou repassar pro time'. Cada mensagem vai direto pra quem está construindo o seu projeto. Resposta em até 24h, decisões em tempo real.",
  },
  {
    icon: Code2,
    title: "Código seu, servidor seu, controle total",
    description: "Nada de ficar preso em plataforma que cobra mensalidade pra você acessar o próprio site. O código é entregue no seu repositório, o deploy é feito em infraestrutura que você controla. Se quiser trocar de desenvolvedor amanhã, leva tudo com você.",
  },
];

const initialScrollState = { canScrollLeft: false, canScrollRight: true, activeIndex: 0 };

type FadeStyle = CSSProperties & { "--fade-l": string; "--fade-r": string };

function WhyUsCard({ card, delay, trackRef, index }: {
  card: { icon: LucideIcon; title: string; description: string };
  delay: number;
  trackRef: RefObject<HTMLDivElement | null>;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(cardRef, { root: trackRef, amount: 0.55 });

  return (
    <ScrollReveal delay={delay} className="why-us-card w-[280px] shrink-0 snap-start md:w-[300px]">
      <div
        ref={cardRef}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} de ${cards.length}`}
        className={`h-full transition-opacity duration-300 hover:opacity-100 ${isVisible ? "opacity-100" : "opacity-60"}`}
      >
        <div className="group relative h-full cursor-default overflow-hidden rounded-lg border border-card-border bg-card px-8 py-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(37,99,235,0.25)] hover:ring-1 hover:ring-accent-border motion-reduce:hover:translate-y-0">
          <div className="absolute left-0 top-0 h-0 w-[3px] rounded-l-lg bg-accent transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-full" />
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-accent-border bg-accent-light transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent-border motion-reduce:group-hover:scale-100">
            <card.icon size={20} className="text-accent" />
          </div>
          <h3 className="mb-3 font-body text-lg font-semibold">{card.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{card.description}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function WhyUs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(initialScrollState);
  const [scrollState, setScrollState] = useState(initialScrollState);
  const reducedMotion = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progress = useSpring(scrollXProgress, { stiffness: 180, damping: 28, mass: 0.35 });
  const { isDragging, dragHandlers } = useDragScroll({ containerRef: trackRef, itemSelector: ".why-us-card", reducedMotion: Boolean(reducedMotion) });

  const getItems = useCallback(() => Array.from(trackRef.current?.querySelectorAll<HTMLElement>(".why-us-card") ?? []), []);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const canScrollLeft = track.scrollLeft > 4;
    const canScrollRight = track.scrollLeft + track.clientWidth < track.scrollWidth - 4;
    const items = getItems();
    const activeIndex = canScrollRight
      ? items.reduce((nearestIndex, item, index) => Math.abs(item.offsetLeft - track.scrollLeft) < Math.abs(items[nearestIndex].offsetLeft - track.scrollLeft) ? index : nearestIndex, 0)
      : cards.length - 1;
    const previous = stateRef.current;
    if (previous.canScrollLeft === canScrollLeft && previous.canScrollRight === canScrollRight && previous.activeIndex === activeIndex) return;
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

  const scrollToIndex = useCallback((index: number) => {
    getItems()[index]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
  }, [getItems, reducedMotion]);

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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="mb-10 text-center md:mb-12">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.15em] text-accent">Diferenciais</span>
          <h2 className="font-heading text-[28px] font-bold tracking-[-0.5px] text-primary md:text-[36px] lg:text-[42px]">Por que a Ciudad<span className="text-accent">Lab</span>?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-muted">O que separa um projeto que funciona de um que vira slide.</p>
        </ScrollReveal>

        <div className="relative -my-6 py-6">
          <button type="button" onClick={() => scrollByCard(-1)} disabled={!scrollState.canScrollLeft} aria-label="Card anterior" className="absolute -left-5 top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-card-border bg-card text-primary shadow-md transition-[opacity,color,border-color] duration-300 hover:border-accent-border hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-25 md:flex"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={!scrollState.canScrollRight} aria-label="Próximo card" className="absolute -right-5 top-1/2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-card-border bg-card text-primary shadow-md transition-[opacity,color,border-color] duration-300 hover:border-accent-border hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-25 md:flex"><ChevronRight size={18} /></button>

          <div
            ref={trackRef}
            {...dragHandlers}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Diferenciais da CiudadLab"
            onScroll={updateScrollState}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") { event.preventDefault(); scrollByCard(-1); }
              else if (event.key === "ArrowRight") { event.preventDefault(); scrollByCard(1); }
            }}
            style={fadeStyle}
            className={`why-us-track no-scrollbar flex gap-5 overflow-x-auto overflow-y-hidden py-6 pr-6 scroll-pr-6 snap-x snap-mandatory outline-none focus-visible:ring-2 focus-visible:ring-accent ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            {cards.map((card, index) => <WhyUsCard key={card.title} card={card} delay={index * 0.1} trackRef={trackRef} index={index} />)}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="relative h-px w-16 overflow-hidden bg-primary/15" aria-hidden="true"><motion.div className="absolute inset-0 origin-left bg-accent" style={{ scaleX: reducedMotion ? scrollXProgress : progress }} /></div>
          <div className="flex items-center gap-2">
            {cards.map((card, index) => (
              <button key={card.title} type="button" onClick={() => scrollToIndex(index)} aria-label={`Ir para o card ${index + 1}`} aria-current={index === scrollState.activeIndex ? "true" : undefined} className={`size-2 rounded-full transition-[background-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${index === scrollState.activeIndex ? "scale-125 bg-accent" : "bg-primary/15 hover:bg-primary/30"}`} />
            ))}
          </div>
          <span className="min-w-8 text-xs tabular-nums text-muted" aria-live="polite">{scrollState.activeIndex + 1}/{cards.length}</span>
        </div>
      </div>
    </section>
  );
}
