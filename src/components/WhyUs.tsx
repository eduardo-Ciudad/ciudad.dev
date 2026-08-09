"use client";

import { Server, Shield, Clock, MessageSquare, Star } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const cards = [
  {
    icon: Server,
    title: "Infraestrutura própria",
    description:
      "Não depende de plataforma terceira. Você controla o servidor, os dados e a escalabilidade.",
  },
  {
    icon: Shield,
    title: "Segurança levada a sério",
    description:
      "Autenticação, validação e proteção de dados desde o dia 1. Não é gambiarra depois.",
  },
  {
    icon: Clock,
    title: "Entrega em 2–4 semanas",
    description:
      "Escopo definido antes de começar. Prazo curto porque quem programa é quem planeja.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação direta",
    description:
      "Sem intermediário, sem gerente de conta. Você fala direto com quem programa.",
  },
  {
    icon: Star,
    title: "Projeto sob medida",
    description:
      "Cada projeto é construído do zero pro seu negócio. Não é template genérico com logo trocada.",
  },
];

export function WhyUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
            Por que a ciudad.dev?
          </h2>
          <p className="mt-3 text-muted text-[15px] max-w-xl mx-auto">
            O que separa um projeto que funciona de um que vira slide.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card, i) => (
            <ScrollReveal
              key={card.title}
              delay={i * 0.1}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="bg-card border border-card-border rounded-lg p-7 md:p-8 h-full hover:scale-[1.02] hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-md bg-accent-light border border-accent-border flex items-center justify-center mb-5">
                  <card.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-[17px] tracking-[-0.5px] mb-2">
                  {card.title}
                </h3>
                <p className="text-muted text-[14px] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
