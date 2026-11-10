"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidAccordion } from "@/components/ui/liquid-glass-accordion";

type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

// Valores espelham src/data/precos.ts — atualizar os dois juntos.
const faqs: FaqItem[] = [
  {
    question: "Preciso entender de tecnologia para contratar?",
    answer:
      "Não. A conversa é por WhatsApp, em português simples, e você acompanha tudo por um link de prévia no celular. Sua parte é me contar como o negócio funciona; a parte técnica fica comigo.",
  },
  {
    question: "Quanto vou investir?",
    answer:
      "Landing page: de R$ 700 a R$ 1.000. Loja virtual: de R$ 2.500 a R$ 5.000. Sistema sob medida: orçado conforme o que ele precisa fazer. Em qualquer caso, o número vem fechado na proposta e não muda depois.",
  },
  {
    question: "O site fica no meu nome?",
    answer:
      "Fica. Domínio, código e acessos são seus. Se um dia quiser trocar de desenvolvedor, leva tudo junto, sem precisar pedir nada para ninguém.",
  },
  {
    question: "Em quanto tempo fica pronto?",
    answer:
      "Uma landing page leva de 1 a 2 semanas e uma loja virtual de 3 a 4. Sistemas costumam ficar entre 2 e 4 semanas, conforme o tamanho. A data de entrega já vem escrita na proposta.",
  },
  {
    question: "E se eu quiser mudar algo no meio do projeto?",
    answer:
      "Ajustes dentro do que foi combinado entram nas prévias semanais sem custo. Se a mudança acrescenta algo que não estava na proposta, eu te mostro o valor e o prazo extras antes, e você decide se vale a pena.",
  },
  {
    question: "E se der problema depois da entrega?",
    answer:
      "Por 90 dias, qualquer erro de funcionamento é corrigido sem cobrança. Pedidos de coisas novas ficam fora da garantia e são orçados à parte.",
    link: { href: "/garantia", label: "Ver termos da garantia" },
  },
  {
    question: "O que acontece depois que o site vai ao ar?",
    answer:
      "Seu site sai com Google Analytics configurado e, nos primeiros 90 dias, você tem o Radar incluso: eu acompanho os números e te mando uma leitura simples do que está funcionando.",
    link: { href: "/radar", label: "Conhecer o Radar" },
  },
  {
    question: "Você atende só em São José do Rio Preto?",
    answer:
      "Não. Todo o atendimento é feito por WhatsApp e chamada de vídeo, então funciona do mesmo jeito para qualquer cidade.",
  },
];

export function Faq() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-heading text-4xl md:text-5xl font-semibold text-neutral-900 text-center mb-14"
        >
          Perguntas frequentes
        </motion.h2>

        <LiquidAccordion
          items={faqs.map((faq, i) => ({
            id: `faq-${i + 1}`,
            question: faq.question,
            answer: (
              <>
                <p>{faq.answer}</p>
                {faq.link && (
                  <Link
                    href={faq.link.href}
                    className="mt-4 inline-flex items-center gap-1 font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    {faq.link.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </>
            ),
          }))}
          defaultOpen={null}
          collapsible
          headingLevel={3}
          tone="light"
          sound={false}
        />
      </div>
    </section>
  );
}
