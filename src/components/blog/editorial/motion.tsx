"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

const MOTION_TAGS = {
  aside: motion.aside,
  article: motion.article,
  div: motion.div,
  figure: motion.figure,
  h1: motion.h1,
  li: motion.li,
  nav: motion.nav,
  ol: motion.ol,
  p: motion.p,
  section: motion.section,
  span: motion.span,
  ul: motion.ul,
} as const;
type MotionTag = keyof typeof MOTION_TAGS;

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  style?: CSSProperties;
};

export function Revelar({ children, delay = 0, y = 24, className, as = "div" }: MotionWrapperProps & { delay?: number; y?: number }) {
  const reducedMotion = useReducedMotion();
  const Component = MOTION_TAGS[as];
  return <Component initial={reducedMotion ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE, delay }} className={className}>{children}</Component>;
}

export function RevelarGrupo({ children, className, intervalo = 0.08, as = "div", style }: MotionWrapperProps & { intervalo?: number }) {
  const reducedMotion = useReducedMotion();
  const Component = MOTION_TAGS[as];
  const variants: Variants = reducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : { hidden: {}, visible: { transition: { staggerChildren: intervalo } } };
  return <Component initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={variants} className={className} style={style}>{children}</Component>;
}

export function RevelarItem({ children, className, as = "div", delay = 0, finalOpacity = 1, style, "aria-label": ariaLabel }: MotionWrapperProps & { delay?: number; finalOpacity?: number; "aria-label"?: string }) {
  const reducedMotion = useReducedMotion();
  const Component = MOTION_TAGS[as];
  const variants: Variants = reducedMotion ? { hidden: { opacity: finalOpacity, y: 0 }, visible: { opacity: finalOpacity, y: 0 } } : { hidden: { opacity: 0, y: 16 }, visible: { opacity: finalOpacity, y: 0, transition: { duration: 0.55, ease: EASE, delay } } };
  return <Component variants={variants} className={className} style={style} aria-label={ariaLabel}>{children}</Component>;
}

export function EntradaEditorial({ children, delay = 0, className, as = "div" }: MotionWrapperProps & { delay?: number }) {
  const reducedMotion = useReducedMotion();
  const Component = MOTION_TAGS[as];
  return <Component initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE, delay }} className={className}>{children}</Component>;
}

export function RevelarCapa({ children, className }: MotionWrapperProps) {
  const reducedMotion = useReducedMotion();
  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE, delay: 0.3 }} className={className}>{children}</motion.div>;
}

export function DestaqueAnimado({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return <div className={className}><motion.span aria-hidden="true" className="block h-0.5 origin-left bg-primary" initial={reducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.2 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }} /><motion.blockquote initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: EASE, delay: 0.15 }} className="pt-[22px] font-heading text-[30px] font-semibold leading-[1.18] md:text-[36px]">{children}</motion.blockquote></div>;
}

export function Contador({ valor, inicio = 0, formato = "pt-BR", duracao = 1.2, prefixo = "", sufixo = "", className }: { valor: number; inicio?: number; formato?: "pt-BR"; duracao?: number; prefixo?: string; sufixo?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const formatter = useMemo(() => new Intl.NumberFormat(formato), [formato]);
  const final = `${prefixo}${formatter.format(valor)}${sufixo}`;
  const [display, setDisplay] = useState(final);
  const current = useMotionValue(valor);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const unsubscribe = current.on("change", (latest) => setDisplay(`${prefixo}${formatter.format(Math.round(latest))}${sufixo}`));
    current.set(inicio);
    const controls = animate(current, valor, { duration: duracao, ease: EASE });
    return () => { controls.stop(); unsubscribe(); };
  }, [current, duracao, formatter, inView, inicio, prefixo, reducedMotion, sufixo, valor]);

  return <span ref={ref} className={className} aria-label={final}><span aria-hidden="true">{reducedMotion ? final : display}</span></span>;
}

export function BarraProgressoLeitura() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.35 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-accent" style={{ scaleX: reducedMotion ? scrollYProgress : progress }} />;
}
