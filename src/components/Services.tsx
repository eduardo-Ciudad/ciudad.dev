"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { ServiceDetailModal, type ServiceDetail } from "./ServiceDetailModal";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";

const services: {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  timeline: string;
  price: string;
  cta: string;
  details: ServiceDetail;
}[] = [
  {
    slug: "landing-page",
    kicker: "PÁGINA",
    title: "Landing Page",
    description:
      "Página de conversão sob medida, responsiva e otimizada pra captar leads ou lançar um produto. Design personalizado, não template com logo trocada.",
    bullets: [
      "Design responsivo (mobile, tablet, desktop)",
      "Formulário de contato ou captura de lead",
      "SEO básico configurado",
      "Deploy incluso",
    ],
    timeline: "1–2 semanas",
    price: "R$ 800–1.000",
    cta: "Quero uma Landing Page",
    details: {
      benefits: [
        "Site rápido, sem CMS pesado — carregamento instantâneo",
        "Mobile-first com scroll reveal e animações leves, sem dependências",
        "Foco total em conversão: um único caminho de saída (ex: WhatsApp)",
        "SEO básico configurado e acessibilidade cuidada",
      ],
      example: {
        title: "Landing Page — Vinicius Mascagni",
        description:
          "Página para consultoria de treino e dieta, com hero, prova social, depoimentos e CTA único pro WhatsApp.",
        url: "https://vinicius-masc.vercel.app/",
        hasImagePreview: true,
      },
    },
  },
  {
    slug: "ecommerce",
    kicker: "LOJA",
    title: "E-commerce",
    description:
      "Loja completa com catálogo, carrinho e checkout integrado a pagamento real. Você vende sem depender de marketplace e sem mensalidade de plataforma.",
    bullets: [
      "Catálogo com categorias e filtros",
      "Checkout com Pix, cartão e boleto (Mercado Pago)",
      "Painel administrativo pra gerenciar produtos",
      "Infraestrutura própria com deploy incluso",
    ],
    timeline: "3–4 semanas",
    price: "R$ 2.500–4.000",
    cta: "Quero meu E-commerce",
    details: {
      benefits: [
        "Catálogo com variações por tamanho, estoque e preço individuais",
        "Checkout real com Mercado Pago (Pix + cartão), webhook validado por HMAC-SHA256",
        "Frete calculado em tempo real via API dos Correios (PAC/SEDEX)",
        "Autenticação JWT com verificação de email e controle de acesso por papel",
        "100+ testes automatizados e auditoria de segurança antes de ir ao ar",
      ],
      inProgress:
        "Integração com ERP (Bling) para sincronizar catálogo automaticamente — em desenvolvimento.",
      example: {
        title: "E-commerce — GabiKids",
        description: "Loja de roupas infantil em produção.",
        url: "/projetos#gabikids",
      },
    },
  },
  {
    slug: "sistema-personalizado",
    kicker: "SOB MEDIDA",
    title: "Sistema personalizado",
    description:
      "MVP, automação, painel interno, integração com API externa — qualquer software que o seu negócio precise e que não existe pronto no mercado.",
    bullets: [
      "Arquitetura definida pro seu caso de uso",
      "Integrações com APIs externas (pagamento, IA, WhatsApp, Analytics)",
      "Autenticação e controle de acesso",
      "Documentação técnica entregue",
    ],
    timeline: "2–4 semanas",
    price: "Sob consulta",
    cta: "Quero um orçamento",
    details: {
      benefits: [
        "Arquitetura definida sob medida pro seu caso de uso",
        "Integrações com APIs externas (pagamento, IA, WhatsApp, Analytics)",
        "Documentação técnica e testes cobrindo as regras de negócio",
      ],
      example: {
        title: "Sistema Financeiro Multi-Tenant",
        description:
          "Isolamento de dados por usuário, lançamentos append-only, dashboard com extrato mensal.",
        url: "/projetos#sistema-financeiro-multi-tenant",
      },
      highlight: {
        title: "PromoBot",
        description:
          "Bot de IA em arquitetura hexagonal que monitora promoções, gera legendas automaticamente e distribui em grupos do Telegram — rodando 24/7 em infraestrutura própria.",
        url: "/projetos#promobot",
      },
      otherProjects:
        "Veja também o StudyMind, plataforma de estudos com IA, entre outros projetos do portfólio.",
    },
  },
];

export function Services() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const activeService = services.find((s) => s.title === openModal);

  return (
    <section id="servicos" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
            O que construímos
          </h2>
          <p className="mt-3 text-muted text-[15px] max-w-xl mx-auto">
            Escopo e preço definidos antes de começar.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.15} className="h-full">
              <div className="group relative bg-card border border-card-border rounded-2xl p-8 md:p-10 h-full flex flex-col transform-gpu transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:border-accent-border hover:z-10 focus-within:shadow-xl focus-within:border-accent-border focus-within:z-10 has-[:focus-visible]:scale-[1.02] has-[:focus-visible]:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:has-[:focus-visible]:scale-100 motion-reduce:has-[:focus-visible]:translate-y-0">
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-muted mb-4 transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent">
                  {service.kicker}
                </span>
                <h3 className="font-heading font-semibold text-2xl md:text-3xl mb-4">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted mb-6">
                  {service.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <div
                      key={bullet}
                      className="flex gap-2.5 text-sm"
                      style={{ transitionDelay: `${bulletIndex * 40}ms` }}
                    >
                      <span
                        className="text-muted/50 shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent group-focus-within:translate-x-1 group-focus-within:text-accent motion-reduce:transform-none"
                        style={{ transitionDelay: `${bulletIndex * 40}ms` }}
                      >
                        →
                      </span>
                      <span className="text-primary/80">{bullet}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setOpenModal(service.title)}
                  className="group/more inline-flex items-center gap-1.5 text-sm font-medium text-accent self-start mb-6 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Saiba mais
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover/more:rotate-90 group-focus-visible/more:rotate-90 motion-reduce:transform-none"
                  >
                    +
                  </span>
                </button>

                <div className="mt-auto">
                  <div className="border-t border-divider pt-6 flex justify-between items-center">
                    <span className="text-sm text-muted">
                      {service.timeline}
                    </span>
                    <span className="text-lg font-heading font-semibold text-primary transition-colors duration-300 group-hover:text-accent group-focus-within:text-accent">
                      {service.price}
                    </span>
                  </div>

                  <a
                    href={WHATSAPP_CONTACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta relative isolate flex w-full items-center justify-center gap-2 mt-6 py-3.5 overflow-hidden bg-primary text-card text-sm font-medium rounded-full hover:bg-primary/90 transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1 group-focus-visible/cta:translate-x-1 motion-reduce:transform-none" />
                  </a>

                  <Link
                    href={`/servicos/${service.slug}`}
                    className="group/doc w-full mt-4 py-2.5 px-5 border border-card-border rounded-full text-sm font-medium text-accent hover:bg-accent-light hover:border-accent-border transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover/doc:after:scale-x-100 group-focus-visible/doc:after:scale-x-100 motion-reduce:after:transform-none">Ver detalhes</span>
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover/doc:translate-x-1 group-focus-visible/doc:translate-x-1 motion-reduce:transform-none"
                    />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeService && (
        <ServiceDetailModal
          title={activeService.title}
          details={activeService.details}
          onClose={() => setOpenModal(null)}
        />
      )}
    </section>
  );
}
