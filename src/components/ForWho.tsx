"use client";

import { ShoppingBag, Rocket, User } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const personas = [
  {
    icon: ShoppingBag,
    title: "Lojistas",
    description:
      "Quer vender online sem depender só de marketplace. Precisa de uma loja própria, com pagamento real e controle total.",
  },
  {
    icon: Rocket,
    title: "Founders & Startups",
    description:
      "Tem uma ideia validada e precisa de um MVP funcional pra testar no mercado. Rápido, enxuto e pronto pra escalar.",
  },
  {
    icon: User,
    title: "Autônomos",
    description:
      "Precisa de uma presença online que gere confiança e clientes. Uma landing page profissional que trabalha por você.",
  },
];

export function ForWho() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
            Para quem é o nosso projeto?
          </h2>
          <p className="mt-3 text-muted text-[15px] max-w-xl mx-auto">
            Se você precisa existir online de forma séria, a gente constrói.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <ScrollReveal key={persona.title} delay={i * 0.1}>
              <div className="bg-surface border border-card-border rounded-lg p-7 md:p-8 h-full hover:scale-[1.02] hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-md bg-accent-light border border-accent-border flex items-center justify-center mb-5">
                  <persona.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-[17px] tracking-[-0.5px] mb-2">
                  {persona.title}
                </h3>
                <p className="text-muted text-[14px] leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
