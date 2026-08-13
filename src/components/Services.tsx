"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { ServiceDetailModal, type ServiceDetail } from "./ServiceDetailModal";

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
    price: "R$ 500–800",
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
        url: "https://gabikids.vercel.app/",
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
      "Integrações com APIs externas (pagamento, IA, WhatsApp)",
      "Autenticação e controle de acesso",
      "Documentação técnica entregue",
    ],
    timeline: "2–4 semanas",
    price: "Sob consulta",
    cta: "Quero um orçamento",
    details: {
      benefits: [
        "Arquitetura definida sob medida pro seu caso de uso",
        "Integrações com APIs externas (pagamento, IA, WhatsApp)",
        "Documentação técnica e testes cobrindo as regras de negócio",
      ],
      example: {
        title: "Sistema Financeiro Multi-Tenant",
        description:
          "Isolamento de dados por usuário, lançamentos append-only, dashboard com extrato mensal.",
        url: "https://controle-financeiro-lab-frontend.vercel.app/",
      },
      highlight: {
        title: "PromoBot",
        description:
          "Bot de IA em arquitetura hexagonal que monitora promoções, gera legendas automaticamente e distribui via WhatsApp — rodando 24/7 em infraestrutura própria.",
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
            <ScrollReveal key={service.title} delay={i * 0.15}>
              <div className="bg-card border border-card-border rounded-2xl p-8 md:p-10 h-full flex flex-col hover:shadow-lg hover:border-accent-border transition-all duration-300">
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-accent mb-4">
                  {service.kicker}
                </span>
                <h3 className="font-heading font-semibold text-2xl md:text-3xl mb-4">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted mb-6">
                  {service.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {service.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-2.5 text-sm">
                      <span className="text-muted/50 shrink-0">→</span>
                      <span className="text-primary/80">{bullet}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setOpenModal(service.title)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline self-start mb-6"
                >
                  Saiba mais
                  <span aria-hidden="true">+</span>
                </button>

                <div className="mt-auto">
                  <div className="border-t border-divider pt-6 flex justify-between items-center">
                    <span className="text-sm text-muted">
                      {service.timeline}
                    </span>
                    <span className="text-lg font-heading font-semibold text-accent">
                      {service.price}
                    </span>
                  </div>

                  <a
                    href="#contato"
                    className="block w-full mt-6 py-3.5 bg-primary text-card text-sm font-medium rounded-full hover:bg-primary/85 transition-colors text-center"
                  >
                    {service.cta}
                  </a>

                  <Link
                    href={`/servicos/${service.slug}`}
                    className="group/doc w-full mt-4 py-2.5 px-5 border border-card-border rounded-full text-sm font-medium text-accent hover:bg-accent-light hover:border-accent-border transition-colors flex items-center justify-center gap-1.5"
                  >
                    Ver documentação
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover/doc:translate-x-1"
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
