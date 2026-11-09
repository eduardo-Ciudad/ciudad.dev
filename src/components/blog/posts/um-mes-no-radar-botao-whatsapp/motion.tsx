"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/components/blog/editorial/motion";

type ChildrenProps = { children: ReactNode };
type SemanaProps = ChildrenProps & { indice: number; preenchido: boolean };

export function BarraDispositivo({ children }: { children?: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.span className="w-[72%] origin-left bg-accent" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE }}>{children}</motion.span>;
}

export function LinhaTempo({ children }: ChildrenProps) {
  const reduced = useReducedMotion();
  return <motion.span className="absolute bottom-auto left-[6px] top-[7px] h-[calc(100%-14px)] w-0.5 origin-top bg-accent/25 md:left-[7px] md:right-[7px] md:top-[6px] md:h-0.5 md:w-auto md:origin-left" aria-hidden="true" initial={reduced ? false : { scaleY: 0, scaleX: 0 }} whileInView={{ scaleY: 1, scaleX: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 1.2, ease: EASE }}>{children}</motion.span>;
}

export function BotaoDepois({ children }: ChildrenProps) {
  const reduced = useReducedMotion();
  return <motion.div className="absolute bottom-[18px] left-3.5 right-3.5 flex h-[46px] items-center justify-center rounded-full bg-[#1F6B3A] px-4 text-sm font-bold text-white" initial={reduced ? false : { y: 60 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24, delay: 0.4 }}>{children}</motion.div>;
}

export function PillAntes({ children }: ChildrenProps) {
  const reduced = useReducedMotion();
  return <motion.div className="mt-3 flex h-9 items-center justify-center rounded-full bg-[#1F6B3A] px-4 text-sm font-bold text-white" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.5 }}>{children}</motion.div>;
}

export function Variacao({ children }: ChildrenProps) {
  const reduced = useReducedMotion();
  return <motion.p className="mt-3 text-[13px]" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.35, delay: 1.2 }}>{children}</motion.p>;
}

export function LeituraMes({ children }: ChildrenProps) {
  const reduced = useReducedMotion();
  return <motion.div className="rounded-xl bg-dark px-[22px] py-6" initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: 0.35 }}>{children}</motion.div>;
}

export function PillTeste({ children }: ChildrenProps) {
  const reduced = useReducedMotion();
  return <motion.p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-primary" initial={reduced ? false : { opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.4, ease: EASE, delay: 0.65 }}>{children}</motion.p>;
}

export function SemanaAnimada({ children, indice, preenchido }: SemanaProps) {
  const reduced = useReducedMotion();
  const delay = indice * 0.3;
  return <motion.li className="relative grid grid-cols-[14px_1fr] gap-4 md:block" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.35, delay }}><motion.span className={`relative z-10 mt-0.5 block size-3.5 rounded-full border-2 border-accent ${preenchido ? "bg-accent" : "bg-surface"}`} aria-hidden="true" initial={reduced ? false : { scale: 0.7, backgroundColor: "var(--color-surface)" }} whileInView={{ scale: 1, backgroundColor: preenchido ? "#2563eb" : "var(--color-surface)" }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.25, delay }} /><motion.div className="md:mt-5" initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 0.4, ease: EASE, delay }}>{children}</motion.div></motion.li>;
}
