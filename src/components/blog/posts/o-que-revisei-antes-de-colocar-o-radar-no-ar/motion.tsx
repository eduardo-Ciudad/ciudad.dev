"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "@/components/blog/editorial/motion";

type TodosProps = { children: ReactNode };
export function Todos({ children }: TodosProps) {
  const reduced = useReducedMotion();
  return <motion.div className="mt-4 font-heading text-[54px] leading-none text-primary" initial={reduced ? false : { scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.45, ease: EASE, delay: 0.25 }}>{children}</motion.div>;
}

export type Etapa = { titulo: string; detalhe: string; tempo: string; alerta: boolean };
type PipelineProps = { etapas: readonly Etapa[] };
export function PipelineAnimado({ etapas }: PipelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const [concluidas, setConcluidas] = useState(0);
  const concluidasEfetivas = reduced ? etapas.length : concluidas;

  useEffect(() => {
    if (!visible || reduced) return;
    let atual = 0;
    const timer = window.setInterval(() => { atual += 1; setConcluidas(atual); if (atual >= etapas.length) window.clearInterval(timer); }, 350);
    return () => window.clearInterval(timer);
  }, [etapas.length, reduced, visible]);

  return <div ref={ref} className="flex flex-col">
    <div className="flex flex-col gap-4 px-[18px] py-[22px] sm:flex-row sm:items-center sm:justify-between sm:px-[22px]"><div><div className="font-[family-name:var(--font-code)] text-[13px] text-[#7f848e]">radar-api · main</div><div className="mt-1 text-xl font-semibold text-[#e6e8ef]">Primeira execução do pipeline</div></div><motion.span className="w-fit rounded-full border border-[rgba(229,192,123,.4)] px-3 py-1 text-xs font-bold text-[#e5c07b]" initial={reduced ? false : { opacity: 0, scale: 0.95 }} animate={concluidasEfetivas === etapas.length ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }} transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE }}>Concluído com 1 alerta</motion.span></div>
    {etapas.map((etapa, index) => { const pronta = index < concluidasEfetivas; return <motion.div key={etapa.titulo} className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 gap-y-1 border-t border-[#2c313a] px-[18px] py-3.5 sm:grid-cols-[28px_minmax(0,1fr)_auto] sm:px-[22px]" animate={{ backgroundColor: pronta && etapa.alerta ? "rgba(229,192,123,.08)" : "rgba(229,192,123,0)" }} transition={{ duration: 0.3 }}><span className={`relative flex size-[22px] items-center justify-center rounded-full border text-xs font-bold ${pronta ? (etapa.alerta ? "border-[#e5c07b] text-[#e5c07b]" : "border-[#98c379] text-[#98c379]") : "border-[#4b5263]"}`} aria-hidden="true"><AnimatePresence mode="wait">{pronta ? <motion.b key="done" initial={reduced ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>{etapa.alerta ? "!" : "✓"}</motion.b> : reduced ? null : <motion.i key="spin" className="absolute inset-[3px] rounded-full border-2 border-transparent border-t-[#abb2bf]" animate={{ rotate: 360 }} transition={{ duration: 0.7, ease: "linear", repeat: Infinity }} />}</AnimatePresence></span><div className="min-w-0"><div className="text-[15px] font-semibold text-[#e6e8ef]">{etapa.titulo}</div><motion.div className={`font-[family-name:var(--font-code)] text-[13px] ${etapa.alerta ? "text-[#e5c07b]" : "text-[#7f848e]"}`} animate={{ opacity: pronta ? 1 : 0 }}>{etapa.detalhe}</motion.div></div><motion.span className="col-start-2 font-[family-name:var(--font-code)] text-[13px] text-[#7f848e] sm:col-start-3 sm:row-start-1 sm:self-center" animate={{ opacity: pronta ? 1 : 0 }}>{etapa.tempo}</motion.span></motion.div>; })}
  </div>;
}
