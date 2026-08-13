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
            <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">
              Conheça o founder
            </span>
            <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
              Eduardo Ciudad
            </h2>
            <p className="text-accent font-semibold text-[15px] mt-2">
              Desenvolvedor Backend &amp; Criador de Conteúdo
            </p>
            <div className="mt-6 space-y-4 text-[14px] md:text-[15px] leading-relaxed text-muted">
              <p>
                Sou Eduardo Ciudad, desenvolvedor de software e founder da
                Ciudad.dev.
              </p>
              <p>
                Meu trabalho é transformar necessidades de negócio em produtos
                digitais que realmente funcionam, de sites e e-commerces a
                sistemas personalizados. Já desenvolvi aplicações em produção
                com pagamentos online, APIs, autenticação, bancos de dados,
                infraestrutura própria, Docker, Nginx e integrações com IA.
              </p>
              <p>
                No desenvolvimento, trabalho principalmente com{" "}
                <span className="text-primary font-medium">Java</span>,{" "}
                <span className="text-primary font-medium">Spring Boot</span>{" "}
                e <span className="text-primary font-medium">PostgreSQL</span>
                , aplicando conceitos de{" "}
                <span className="text-primary font-medium">DDD</span>, APIs
                REST, arquitetura em camadas e segurança com{" "}
                <span className="text-primary font-medium">
                  Spring Security/JWT
                </span>
                . Acompanho o projeto desde o código até a infraestrutura,
                utilizando <span className="text-primary font-medium">Docker</span>,{" "}
                <span className="text-primary font-medium">Linux</span>,
                Docker Compose,{" "}
                <span className="text-primary font-medium">CI/CD</span> e{" "}
                <span className="text-primary font-medium">GitHub Actions</span>
                , com mais de 200 testes automatizados entre{" "}
                <span className="text-primary font-medium">JUnit</span> e{" "}
                <span className="text-primary font-medium">Mockito</span>.
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
