"use client";

import { LinkedinIcon, GithubIcon } from "./icons";
import { ScrollReveal } from "./ScrollReveal";

export function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
          <ScrollReveal className="shrink-0">
            <div className="w-[240px] h-[300px] md:w-[280px] md:h-[340px] rounded-lg bg-surface border border-card-border flex items-center justify-center overflow-hidden">
              <span className="text-muted text-sm">foto</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="flex-1 text-center md:text-left">
            <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
              Eduardo Ciudad
            </h2>
            <p className="text-accent font-semibold text-[15px] mt-2">
              Desenvolvedor Backend &amp; Criador de Conteúdo
            </p>
            <div className="mt-6 space-y-4 text-[14px] md:text-[15px] leading-relaxed text-muted">
              <p>
                Criador do GabiKids — e-commerce em produção com pagamento real
                via Mercado Pago — e de projetos com IA integrada como o PromoBot
                (monitoramento e automação com Gemini) e o StudyMind (plataforma
                de estudos com IA da Anthropic).
              </p>
              <p>
                Desenvolvedor backend autodidata que documenta o processo de
                construção publicamente no LinkedIn. Cada projeto da ciudad.dev
                nasce da mesma mentalidade: resolver o problema real, não vender
                feature.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={22} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity"
                aria-label="GitHub"
              >
                <GithubIcon size={22} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
