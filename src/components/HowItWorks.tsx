"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Você manda a ideia",
    text: "Me conta o que precisa — por WhatsApp, e-mail ou formulário. Não precisa ter documento técnico. Uma descrição simples do que você quer resolver já basta pra gente começar.",
  },
  {
    number: 2,
    title: "Escopo, prazo e preço fechados",
    text: "Em até 48h você recebe uma proposta clara: o que vai ser feito, em quanto tempo e por quanto. Tudo definido antes da primeira linha de código. Sem surpresa, sem hora extra.",
  },
  {
    number: 3,
    title: "Construímos com acompanhamento",
    text: "Você acompanha o progresso semanalmente com preview do projeto rodando. Ajustes no caminho, sem burocracia. Quem programa é quem te responde.",
  },
  {
    number: 4,
    title: "Entregamos rodando",
    text: "Código no seu repositório, deploy no ar, documentação entregue. Mais 90 dias de garantia: se quebrar, eu arrumo sem custo.",
    badge: "90 dias de garantia inclusos",
  },
];

function DesktopTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="hidden md:block">
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-5 md:top-6 left-0 right-0 h-[2px] bg-accent-light z-0">
          <motion.div
            className="h-full bg-accent-border"
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-4 gap-8 relative z-10">
          {steps.map((step, i) => (
            <div key={step.number}>
              {/* Circle */}
              <motion.div
                className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-accent flex items-center justify-center mx-auto md:mx-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  inView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.4,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              >
                <span className="text-accent font-semibold text-sm">
                  {step.number}
                </span>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              >
                <h3 className="font-body font-semibold text-base md:text-lg text-primary mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
                {step.badge && (
                  <motion.span
                    className="inline-flex items-center px-3 py-1 text-xs font-medium bg-accent-light text-accent rounded-full border border-accent-border mt-3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={
                      inView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.8, opacity: 0 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.8,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {step.badge}
                  </motion.span>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="md:hidden">
      <div className="relative pl-12">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-accent-light">
          <motion.div
            className="w-full bg-accent-border"
            initial={{ height: "0%" }}
            animate={inView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Circle */}
              <motion.div
                className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-white border-2 border-accent flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  inView
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.4,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              >
                <span className="text-accent font-semibold text-sm">
                  {step.number}
                </span>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              >
                <h3 className="font-body font-semibold text-base text-primary mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
                {step.badge && (
                  <motion.span
                    className="inline-flex items-center px-3 py-1 text-xs font-medium bg-accent-light text-accent rounded-full border border-accent-border mt-3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={
                      inView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.8, opacity: 0 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.8,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {step.badge}
                  </motion.span>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] tracking-[-1px]">
            Como funciona
          </h2>
          <p className="text-muted text-[15px] mt-3">
            Do primeiro contato à entrega em produção.
          </p>
        </motion.div>

        <DesktopTimeline />
        <MobileTimeline />
      </div>
    </section>
  );
}
