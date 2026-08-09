"use client";

import { Layout, ShoppingCart, Building2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const services = [
  {
    icon: Layout,
    title: "Landing Page",
    description:
      "Página de conversão personalizada, responsiva e otimizada. Ideal pra captar leads ou lançar um produto.",
    price: "R$ 500",
    popular: false,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Loja completa com catálogo, carrinho, checkout e integração de pagamento real.",
    price: "R$ 2.500",
    popular: true,
  },
  {
    icon: Building2,
    title: "Site Institucional",
    description:
      "Presença profissional com páginas de serviço, sobre e contato.",
    price: "R$ 800",
    popular: false,
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="text-center mb-10 md:mb-12">
          <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
            O que construímos
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div
                className={`bg-card rounded-lg p-7 md:p-8 h-full flex flex-col hover:scale-[1.02] hover:shadow-md transition-all duration-300 ${
                  service.popular
                    ? "border-2 border-accent relative"
                    : "border border-card-border"
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="w-10 h-10 rounded-md bg-accent-light border border-accent-border flex items-center justify-center mb-5">
                  <service.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-[17px] tracking-[-0.5px] mb-2">
                  {service.title}
                </h3>
                <p className="text-muted text-[14px] leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="border-t border-divider mt-6 pt-4">
                  <p className="text-muted text-xs">A partir de</p>
                  <p className="text-primary font-heading font-semibold text-2xl mt-1">
                    {service.price}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
