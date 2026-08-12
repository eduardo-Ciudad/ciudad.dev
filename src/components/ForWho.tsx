"use client";

import { ShoppingBag, Rocket, User } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const personas = [
  {
    icon: ShoppingBag,
    title: "Lojistas",
    description:
      "Você já vende pelo Instagram ou marketplace e sabe que precisa de algo próprio. Uma loja com seu domínio, pagamento real integrado (Pix, cartão, boleto), catálogo organizado e checkout que não espanta cliente. Sem mensalidade de plataforma, sem ficar refém de algoritmo.",
    cta: "Ver plano E-commerce",
  },
  {
    icon: Rocket,
    title: "Founders & Startups",
    description:
      "Você tem a ideia validada e precisa colocar no ar antes que a janela feche. Um MVP funcional — não um protótipo bonito que não faz nada. Backend real, autenticação, banco de dados, deploy. Testável por usuários reais em 2–4 semanas.",
    cta: "Ver plano sob medida",
  },
  {
    icon: User,
    title: "Autônomos",
    description:
      "Personal trainer, advogado, nutricionista, fotógrafo — você é bom no que faz mas seu cliente te encontra só por indicação. Uma landing page profissional que aparece no Google, passa credibilidade e gera contato direto. Seu cartão de visitas que trabalha 24h.",
    cta: "Ver plano Landing Page",
  },
];

export function ForWho() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">
            Para quem
          </span>
          <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-0.5px] text-primary">
            Para quem é o nosso projeto?
          </h2>
          <p className="mt-3 text-muted text-[15px] max-w-xl mx-auto">
            Se você precisa existir online de forma séria, a gente constrói.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <ScrollReveal key={persona.title} delay={i * 0.15}>
              <div className="group relative overflow-hidden bg-surface border border-card-border rounded-xl px-8 py-10 h-full flex flex-col cursor-default transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(37,99,235,0.25)]">
                <div className="absolute left-0 top-0 h-0 w-[3px] bg-accent rounded-l-xl group-hover:h-full transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mb-6 transition-all duration-300 ease-out group-hover:bg-accent-border">
                  <persona.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-body font-semibold text-xl mb-3">
                  {persona.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                  {persona.description}
                </p>
                <a
                  href="#servicos"
                  className="group/link inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:underline"
                >
                  {persona.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
