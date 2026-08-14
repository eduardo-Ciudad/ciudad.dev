"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileCheck,
  ShieldCheck,
  Clock,
  MessageCircle,
  Code2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const cards = [
  {
    icon: FileCheck,
    title: "Escopo e preço travados antes de começar",
    description:
      'Nada de "hora-trabalhada" que estoura no final. Você recebe escopo, prazo e valor fechados antes da primeira linha de código. Sem surpresa na fatura, sem reunião pra renegociar. O que foi combinado é o que é entregue.',
  },
  {
    icon: ShieldCheck,
    title: "Segurança desde o dia 1 — não depois",
    description:
      "Autenticação, validação de dados, proteção contra ataques e criptografia de webhooks já vêm no projeto. Não é camada extra cobrada à parte. O GabiKids, por exemplo, passou por uma auditoria de 21 pontos de segurança antes de ir ao ar.",
  },
  {
    icon: Clock,
    title: "Entrega em 2–4 semanas com garantia de 90 dias",
    description:
      "Prazo curto porque quem planeja é quem programa — sem telefone sem fio. Depois da entrega, 90 dias de garantia: se quebrar, eu arrumo sem custo adicional. Você não precisa entender de código pra saber se vai funcionar — essa responsabilidade é minha.",
  },
  {
    icon: MessageCircle,
    title: "Você fala direto com quem programa",
    description:
      "Sem gerente de conta, sem intermediário, sem 'vou repassar pro time'. Cada mensagem vai direto pra quem está construindo o seu projeto. Resposta em até 24h, decisões em tempo real.",
  },
  {
    icon: Code2,
    title: "Código seu, servidor seu, controle total",
    description:
      "Nada de ficar preso em plataforma que cobra mensalidade pra você acessar o próprio site. O código é entregue no seu repositório, o deploy é feito em infraestrutura que você controla. Se quiser trocar de desenvolvedor amanhã, leva tudo com você.",
  },
];

export function WhyUs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const getStep = () => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return 0;
    const card = track.firstElementChild as HTMLElement;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return card.getBoundingClientRect().width + gap;
  };

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;

    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 4;
    setAtStart(scrollLeft <= 4);
    setAtEnd(isAtEnd);

    if (isAtEnd) {
      // The last card's snap point can exceed the max scrollable distance
      // when it doesn't divide evenly into the track width, so scrollLeft
      // never quite reaches it — treat "can't scroll further" as the tell.
      setActiveIndex(cards.length - 1);
      return;
    }

    const step = getStep();
    if (step > 0) {
      setActiveIndex(Math.round(scrollLeft / step));
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollByStep = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: getStep() * direction,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    trackRef.current?.scrollTo({
      left: getStep() * index,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">
            Diferenciais
          </span>
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-0.5px] text-primary">
            Por que a ciudad.dev?
          </h2>
          <p className="mt-3 text-muted text-[15px] max-w-xl mx-auto">
            O que separa um projeto que funciona de um que vira slide.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-surface to-transparent transition-opacity duration-300"
            style={{ opacity: atStart ? 0 : 1 }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-surface to-transparent transition-opacity duration-300"
            style={{ opacity: atEnd ? 0 : 1 }}
          />

          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            disabled={atStart}
            aria-label="Card anterior"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card border border-card-border shadow-md items-center justify-center text-primary transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none hover:border-accent-border hover:text-accent"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            disabled={atEnd}
            aria-label="Próximo card"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-card border border-card-border shadow-md items-center justify-center text-primary transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none hover:border-accent-border hover:text-accent"
          >
            <ChevronRight size={18} />
          </button>

          <div
            ref={trackRef}
            onScroll={updateScrollState}
            className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          >
            {cards.map((card, i) => (
              <ScrollReveal
                key={card.title}
                delay={i * 0.1}
                className="snap-start shrink-0 w-[280px] md:w-[300px]"
              >
                <div className="group relative overflow-hidden bg-card border border-card-border rounded-lg px-8 py-10 h-full cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(37,99,235,0.25)] hover:ring-1 hover:ring-accent-border">
                  <div className="absolute left-0 top-0 h-0 w-[3px] bg-accent rounded-l-lg group-hover:h-full transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="w-10 h-10 rounded-md bg-accent-light border border-accent-border flex items-center justify-center mb-5 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent-border">
                    <card.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-body font-semibold text-lg mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir para o card ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 bg-accent"
                  : "w-2 bg-primary/15 hover:bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
