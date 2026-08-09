"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Quanto custa um projeto?",
    answer:
      "Depende do escopo. Uma landing page começa em R $ 500, um e-commerce a partir de R $ 2.500 e sistemas sob medida variam conforme a complexidade. Você recebe o valor fechado antes de começar — sem hora extra e sem surpresa na fatura.",
  },
  {
    question: "Qual o prazo mínimo de um projeto?",
    answer:
      "Landing pages ficam prontas em 1–2 semanas. E-commerces em 3–4 semanas. Sistemas sob medida dependem do escopo, mas a maioria fica entre 2–4 semanas. O prazo é definido junto com o preço antes da primeira linha de código.",
  },
  {
    question: "O que é a garantia de 90 dias?",
    answer:
      "Depois da entrega, qualquer bug ou problema técnico que aparecer é corrigido sem custo adicional durante 90 dias. Isso inclui erros de funcionamento, não mudanças de escopo. Se quebrar, eu arrumo.",
  },
  {
    question: "Como funciona o escopo travado?",
    answer:
      "Antes de escrever uma linha de código, documentamos exatamente o que será entregue. Você aprova. A partir daí, prazo e preço não mudam. Se o escopo precisar mudar no meio do caminho, é tratado como um aditivo com nova precificação.",
  },
  {
    question: "Preciso entender de programação pra acompanhar?",
    answer:
      "Não. Você recebe previews semanais do projeto rodando e a comunicação é direta comigo — sem jargão técnico desnecessário. Você foca no seu negócio, eu foco no código.",
  },
  {
    question: "O código é meu no final?",
    answer:
      "100%. O código é entregue no seu repositório, o deploy é feito em infraestrutura que você controla. Se quiser trocar de desenvolvedor amanhã, leva tudo com você. Sem lock-in.",
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
                    className="overflow-hidden"
                  >
                    <p className="text-sm leading-relaxed text-neutral-500 pb-5">
                      {faq.answer}
                    </p>
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
