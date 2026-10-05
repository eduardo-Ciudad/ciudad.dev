"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: i * 0.08,
              }}
              className="border-b border-neutral-200"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center py-5 text-left cursor-pointer group"
              >
                <span className="text-base font-semibold text-neutral-900">
                  {faq.question}
                </span>
                <span className="text-neutral-400 text-xl transition-transform duration-300 group-hover:text-accent shrink-0 ml-4">
                  {openIndex === i ? "×" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`overflow-hidden ${faq.link ? "pb-5" : ""}`}
                  >
                    <p className={`text-sm leading-relaxed text-neutral-500 ${faq.link ? "" : "pb-5"}`}>
                      {faq.answer}
                    </p>
                    {faq.link && (
                      <Link
                        href={faq.link.href}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                      >
                        {faq.link.label} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
