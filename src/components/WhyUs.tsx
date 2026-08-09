"use client";

import { FileCheck, ShieldCheck, Clock, MessageCircle, Code2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const cards = [
  {
    icon: FileCheck,
    title: "Escopo e preço travados antes de começar",
    description:
      'Nada de "hora-trabalhada" que estoura no final. Você recebe escopo, prazo e valor fechados antes da primeira linha de código. Sem surpresa na fatura, sem reunião pra renegociar. O que foi combinado é o que é entregue.',
  },
  {
    icon: ShieldCheck,
    title: "Segurança desde o dia 1 — não depois",
    description:
      "Autenticação, validação de dados, proteção contra ataques e criptografia de webhooks já vêm no projeto. Não é camada extra cobrada à parte. O GabiKids, por exemplo, passou por uma auditoria de 21 pontos de segurança antes de ir ao ar.",
  },
  {
    icon: Clock,
    title: "Entrega em 2–4 semanas com garantia de 90 dias",
    description:
      "Prazo curto porque quem planeja é quem programa — sem telefone sem fio. Depois da entrega, 90 dias de garantia: se quebrar, eu arrumo sem custo adicional. Você não precisa entender de código pra saber se vai funcionar — essa responsabilidade é minha.",
  },
  {
    icon: MessageCircle,
    title: "Você fala direto com quem programa",
    description:
      "Sem gerente de conta, sem intermediário, sem 'vou repassar pro time'. Cada mensagem vai direto pra quem está construindo o seu projeto. Resposta em até 24h, decisões em tempo real.",
  },
  {
    icon: Code2,
    title: "Código seu, servidor seu, controle total",
    description:
      "Nada de ficar preso em plataforma que cobra mensalidade pra você acessar o próprio site. O código é entregue no seu repositório, o deploy é feito em infraestrutura que você controla. Se quiser trocar de desenvolvedor amanhã, leva tudo com você.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal
              key={card.title}
              delay={i * 0.1}
              className={
                i >= 3
                  ? "md:col-span-1 lg:col-span-1 " +
                    (i === 3 ? "lg:col-start-1" : "lg:col-start-2")
                  : ""
              }
            >
              <div className="group bg-card border border-card-border rounded-lg px-8 py-10 h-full cursor-default transition-all duration-300 hover:border-accent-border hover:shadow-md">
                <div className="w-10 h-10 rounded-md bg-accent-light border border-accent-border flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                  <card.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-body font-semibold text-lg mb-3">
                  {card.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
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
