import Link from "next/link";
import type { Projeto } from "@/data/projetos";
import { CapaProjeto } from "./CapaProjeto";

export function ProdutoRadarFaixa({ projeto }: { projeto: Projeto }) {
  return (
    <article className="group flex flex-wrap items-center overflow-hidden rounded-[18px] bg-card">
      <div className="w-full shrink-0 sm:w-[260px]">
        {projeto.imagem && <CapaProjeto src={projeto.imagem} nome={projeto.nome} tamanho="sm" posicao="left top" />}
      </div>
      <div className="min-w-[240px] flex-1 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{projeto.segmento}</p>
        <h3 className="mt-1 font-heading text-[32px] font-semibold leading-none">Radar CiudadLab</h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{projeto.resumo}</p>
      </div>
      <div className="w-full px-6 pb-6 sm:w-auto sm:py-6 sm:pr-7">
        <Link href="/radar" className="inline-flex min-h-11 items-center rounded-full border border-black/15 px-5 text-sm font-semibold text-primary transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Conhecer o Radar <span aria-hidden="true" className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
}
