"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useState, useEffect } from "react";

const metrics = [
  { label: "projetos entregues", value: 6, decimals: 0 },
  { label: "em produção agora", value: 3, decimals: 0 },
  { label: "testes escritos", value: 170, decimals: 0, suffix: "+" },
  { label: "uptime médio", value: 99.9, decimals: 1, suffix: "%" },
];

function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState("0");
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    const unsubscribe = motionValue.on("change", (v) => {
      setDisplay(
        decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
      );
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, value, decimals]);

  return (
    <span className="text-green-400 font-mono font-semibold text-sm">
      {display}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-5xl leading-[1.15] tracking-[-0.03em]"
          >
            <span className="text-neutral-900">
              Seu negócio não é igual aos outros.
            </span>
            <br />
            <span className="text-neutral-900">Seu software também </span>
            <span className="text-accent">não deveria ser.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg font-medium text-neutral-800 max-w-md mx-auto lg:mx-0"
          >
            Software sob medida para transformar suas ideias em soluções que
            realmente funcionam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7"
          >
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full text-base font-semibold hover:brightness-110 transition-all duration-300"
            >
              Começar meu projeto
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-[320px] md:w-[340px]"
        >
          <div className="rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-card-border rotate-1 hover:rotate-0 hover:shadow-xl transition-all duration-500">
            <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs text-[#8b949e]">status</span>
            </div>

            <div className="bg-[#0d1117] p-7 md:p-8 font-mono">
              <p className="text-neutral-500 text-xs tracking-wide mb-6">
                ciudad.dev — status
              </p>

              <div className="space-y-3">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-neutral-400 text-sm">{m.label}</span>
                    <AnimatedNumber
                      value={m.value}
                      decimals={m.decimals}
                      suffix={m.suffix}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-neutral-700/50 my-5" />

              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  className="text-neutral-400 text-sm"
                >
                  último deploy: há 2 dias
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 }}
                  className="text-neutral-400 text-sm"
                >
                  próxima entrega: 12 dias
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="mt-5 text-green-400 text-sm"
              >
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block"
                >
                  █
                </motion.span>{" "}
                todos os sistemas operacionais
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
