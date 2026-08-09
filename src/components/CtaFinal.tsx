"use client";

import { ScrollReveal } from "./ScrollReveal";

export function CtaFinal() {
  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
            Vamos construir?
          </h2>
          <p className="mt-4 text-muted text-[15px] max-w-lg mx-auto">
            Conta o que você precisa. Respondo em até 24h com escopo, prazo e
            valor definidos.
          </p>
          <div className="mt-8">
            <a
              href="mailto:contato@ciudad.dev"
              className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3 rounded-full text-sm font-medium hover:brightness-110 transition-all duration-300"
            >
              Entrar em contato
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
