import Link from "next/link";
import type { Projeto } from "@/data/projetos";
import { CapaProjeto } from "./CapaProjeto";

export function ProdutoDestaqueCard({ projeto }: { projeto: Projeto }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-kelly-bg text-kelly-text lg:flex-row">
      <div className="bg-kelly-surface p-1 pb-0 lg:basis-2/3 lg:border-r lg:border-kelly-border">
        {projeto.imagem && <CapaProjeto src={projeto.imagem} nome={projeto.nome} tema="escuro" />}
      </div>
      <div className="flex flex-col gap-4 p-7 font-kelly-body lg:basis-1/3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-kelly-tint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-kelly-accent-text">Produto próprio</span>
          {projeto.status && <span className="rounded-full bg-kelly-warning-bg px-2.5 py-1 text-[11px] font-semibold text-kelly-warning">{projeto.status}</span>}
        </div>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/kelly/kelly-simbolo.svg" width="38" height="23" alt="" aria-hidden="true" />
          <h3 className="font-kelly-display text-[28px] font-light tracking-tight text-white">{projeto.nome}</h3>
        </div>
        <p className="text-[14px] leading-relaxed text-kelly-text-2">Treino adaptativo para a redação do ENEM: corrige nas 5 competências, aponta o trecho que segurou a nota e diz o que treinar a seguir.</p>
        <ul className="flex flex-col gap-2 text-[13.5px] leading-[1.45] text-[#cfd2dd]">
          {projeto.descricao.map((item) => <li key={item} className="flex gap-2"><span className="shrink-0 text-[#7f9bff]" aria-hidden="true">—</span><span>{item}</span></li>)}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
          <Link href={`/projetos/${projeto.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-[13.5px] font-semibold text-[#0b1b3a] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Ver o case <span aria-hidden="true" className="ml-1">→</span></Link>
          {projeto.ctaPrincipal && <a href={projeto.ctaPrincipal.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-4 text-[13.5px] font-semibold text-white transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Conhecer a Kelly <span aria-hidden="true" className="ml-1">↗</span></a>}
        </div>
      </div>
    </article>
  );
}
