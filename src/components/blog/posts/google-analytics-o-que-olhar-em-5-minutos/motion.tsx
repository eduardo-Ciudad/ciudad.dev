"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, RevelarGrupo } from "@/components/blog/editorial/motion";

export function RoteiroAnimado({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <div className="relative overflow-hidden rounded-[14px] border border-divider bg-card"><motion.span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 origin-left bg-[#2563eb]" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={reduced ? { duration: 0 } : { duration: 1.4, ease: EASE }} /><RevelarGrupo className="md:grid md:grid-cols-5" intervalo={0.14}>{children}</RevelarGrupo></div>;
}

export function SetaAnimada({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.p variants={reduced ? undefined : { hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.45, ease: EASE } } }} className="text-primary">{children}</motion.p>;
}

export function GraficoGa4({ pontos, largura, altura }: { pontos: number[]; largura: number; altura: number }) {
  const reduced = useReducedMotion();
  const path = (valores: number[]) => valores.map((valor, indice) => `${indice ? "L" : "M"} ${(indice / (valores.length - 1)) * largura} ${altura - valor}`).join(" ");
  return <motion.svg initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} viewBox={`0 0 ${largura} ${altura}`} className="mt-5 h-[124px] w-full" role="img" aria-label="Usuários cresceram ao longo dos últimos 28 dias">
    {[20,52,84,116].map(y => <line key={y} x1="0" x2={largura} y1={y} y2={y} stroke="currentColor" className="text-divider" strokeWidth="1" />)}
    <motion.path d={path(pontos.map(v => v * .82))} fill="none" stroke="#b9b2a5" strokeDasharray="6 6" strokeWidth="2" variants={reduced ? undefined : { hidden:{opacity:0}, visible:{opacity:1,transition:{duration:.3}} }} />
    <motion.path d={path(pontos)} fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" variants={reduced ? undefined : { hidden:{pathLength:0}, visible:{pathLength:1,transition:{delay:.3,duration:1.2,ease:EASE}} }} />
    {pontos.map((v,i)=><motion.circle key={`${v}-${i}`} cx={(i/(pontos.length-1))*largura} cy={altura-v} r="2.75" fill="#2563eb" variants={reduced ? undefined : {hidden:{opacity:0},visible:{opacity:1,transition:{delay:.3+(1.2*i/(pontos.length-1)),duration:.12}}}} />)}
  </motion.svg>;
}

export function BarraOrigem({ largura, indice }: { largura:number; indice:number }) { const reduced=useReducedMotion(); return <motion.div className="h-full origin-left rounded-full bg-[#2563eb]" style={{width:`${largura}%`}} initial={reduced?false:{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={reduced?{duration:0}:{duration:.8,ease:EASE,delay:indice*.1}}/>; }
export function MarcadorSpring({children,indice}:{children:ReactNode;indice:number}){const reduced=useReducedMotion();return <motion.div className="absolute -left-[11px] -top-[11px]" initial={reduced?false:{scale:0}} whileInView={{scale:1}} viewport={{once:true}} transition={reduced?{duration:0}:{type:"spring",stiffness:400,damping:22,delay:1.55+indice*.15}}>{children}</motion.div>}
export function CirculoNumero({children}:{children:ReactNode}){const reduced=useReducedMotion();return <motion.span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white" variants={reduced?undefined:{hidden:{scale:.6},visible:{scale:1,transition:{duration:.5,ease:EASE}}}}>{children}</motion.span>}
