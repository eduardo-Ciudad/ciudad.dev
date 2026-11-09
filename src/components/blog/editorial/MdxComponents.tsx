import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { WindowFrame } from "@/components/WindowFrame";
import { DestaqueAnimado, Revelar, RevelarGrupo, RevelarItem } from "./motion";

type Children = { children: ReactNode };
const grid = "grid gap-8 md:grid-cols-[200px_1fr] md:gap-14";
const prose = "blog-prose blog-prose-editorial max-w-[720px]";

export function Secao({ numero, rotulo, titulo, id, children }: Children & { numero: string; rotulo: string; titulo: string; id: string }) {
  const formatted = /^\d+$/.test(numero) ? numero.padStart(2, "0") : numero;
  return <Revelar as="section" className={grid}><div><p className="text-xs font-bold tracking-[.14em] text-accent">{formatted}</p><p className="mt-2 text-[13px] text-muted">{rotulo}</p></div><div className="max-w-[720px]"><h2 id={id} className="mb-5 font-heading text-[34px] font-semibold leading-[1.08] md:text-[40px]">{titulo}</h2><div className={prose}>{children}</div></div></Revelar>;
}

export function Largo({ children, legenda, rolavel = false, larguraMinima }: Children & { legenda?: string; rolavel?: boolean; larguraMinima?: string | number }) {
  const minWidth = larguraMinima === undefined ? undefined : Number(larguraMinima);
  const content = rolavel ? <div className="overflow-x-auto"><div style={{ minWidth }}>{children}</div></div> : children;
  return <Revelar as="figure" y={32} className="w-full">{content}{legenda && <figcaption className="mt-3.5 text-center text-[13px] text-muted">{legenda}</figcaption>}</Revelar>;
}

export function Margem({ children }: Children) { return <Revelar className={grid}><div aria-hidden="true" /><div className={prose}>{children}</div></Revelar>; }
export function Destaque({ children }: Children) { return <div className={grid}><div aria-hidden="true" /><DestaqueAnimado className="max-w-[680px]">{children}</DestaqueAnimado></div>; }
export function Aviso({ children }: Children) { return <aside className="flex gap-3 rounded-xl bg-[#FBF1DC] px-[18px] py-3.5 text-[15px] leading-relaxed text-[#6b4400]"><Info className="mt-0.5 size-[18px] shrink-0 text-[#7A4E00]" aria-hidden="true" />{children}</aside>; }

export function Resumo({ indice = [], pontos = [] }: { indice?: { texto: string; ancora: string }[]; pontos?: string[] }) {
  if (!indice.length && !pontos.length) return null;
  return <RevelarGrupo className={grid}>{indice.length > 0 && <RevelarItem as="nav" aria-label="Neste post"><p className="text-xs font-bold tracking-[.14em] text-muted">NESTE POST</p><ol className="mt-4 border-l border-divider pl-3.5">{indice.map((item, i) => <li key={item.ancora} className={i ? "mt-3 text-[13px] text-muted" : "text-[13px] font-semibold text-primary"}><a href={`#${item.ancora}`}><span className="mr-2 text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>{item.texto}</a></li>)}</ol></RevelarItem>}{pontos.length > 0 && <RevelarItem className={`${indice.length ? "" : "md:col-start-2"} rounded-[14px] border border-card-border bg-card px-[30px] py-[26px]`}><p className="text-xs font-bold tracking-[.14em] text-accent">EM 30 SEGUNDOS</p><RevelarGrupo as="ol" className="mt-3">{pontos.map((ponto, i) => <RevelarItem as="li" key={i} className="flex gap-3 border-b border-divider py-4 text-[17px] leading-[1.55] last:border-0 last:pb-0"><span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-accent-light text-xs font-bold text-accent">{i + 1}</span>{ponto}</RevelarItem>)}</RevelarGrupo></RevelarItem>}</RevelarGrupo>;
}

export function Conclusao({ children }: Children) { return <Revelar as="section"><div className={grid}><div><p className="text-xs font-bold tracking-[.14em] text-accent">FIM</p><p className="mt-2 text-[13px] text-muted">O que levar daqui</p></div><div className={prose}>{children}<div className="mt-10 flex items-center gap-4 border-y border-divider py-[26px]"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-dark font-bold text-white">EC</span><div><p className="!text-base !font-bold !leading-normal !text-primary">Eduardo Ciudad</p><p className="!mt-1 !text-[15px] !leading-relaxed !text-muted">Desenvolvedor backend e fundador da CiudadLab. Escreve sobre o que constrói e coloca no ar.</p></div></div></div></div></Revelar>; }
export function JanelaMac({ endereco, tom = "escuro", fundo, className, children }: Children & { endereco: string; tom?: "escuro" | "claro"; fundo?: string; className?: string }) { return <WindowFrame address={endereco} tone={tom === "claro" ? "light" : "dark"} className={className} style={{ background: fundo ?? (tom === "claro" ? "#fbf8f3" : "#282c34") }}>{children}</WindowFrame>; }
export function Marcador({ n }: { n: number | string }) { return <span className="absolute -left-[11px] -top-[11px] flex size-6 items-center justify-center rounded-full border-2 border-[#fbf8f3] bg-accent text-xs font-bold text-white">{n}</span>; }
export function RotuloComparacao({ tipo }: { tipo: "antes" | "depois" }) { return <span className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-white ${tipo === "antes" ? "bg-primary" : "bg-accent"}`}>{tipo}</span>; }

export const editorialComponents = { Secao, Largo, Margem, Destaque, Aviso, Resumo, Conclusao, JanelaMac, Marcador, RotuloComparacao };
