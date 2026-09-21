"use client";

import Image from "next/image";
import { LinkedinIcon, GithubIcon } from "./icons";
import { ScrollReveal } from "./ScrollReveal";

export function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-y-8 md:grid-cols-[auto_1fr] md:gap-x-12 md:gap-y-0">
          <ScrollReveal
            delay={0.15}
            className="text-center md:col-start-2 md:row-start-1 md:self-end md:text-left"
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-accent mb-3">
              Conheça o founder
            </span>
            <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
              Eduardo Ciudad
            </h2>
            <p className="text-accent font-semibold text-[15px] mt-2">
              Desenvolvedor Backend &amp; Criador de Conteúdo
            </p>
          </ScrollReveal>

          <ScrollReveal className="shrink-0 justify-self-center md:col-start-1 md:row-span-2 md:row-start-1 md:justify-self-start">
            <div className="relative w-[240px] h-[300px] md:w-[280px] md:h-[340px] rounded-lg bg-surface border border-card-border overflow-hidden">
              <Image
                src="/img/foto-founderV1.png"
                alt="Eduardo Ciudad, founder da CiudadLab"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={0.15}
            className="text-center md:col-start-2 md:row-start-2 md:self-start md:text-left"
          >
            <div className="space-y-4 text-[14px] leading-relaxed text-muted md:mt-6 md:text-[15px]">
              <p>
                Sou Eduardo Ciudad, desenvolvedor de software e founder da
                CiudadLab.
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
              <p>
                No{" "}
                <a
                  href="https://www.linkedin.com/in/eduardociudadf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
                , +3.500 seguidores acompanham o conteúdo que compartilho sobre
                backend Java.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/eduardociudadf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={22} />
              </a>
              <a
                href="https://github.com/eduardo-Ciudad"
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
