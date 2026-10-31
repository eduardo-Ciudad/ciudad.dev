import Link from "next/link";
import type { Projeto } from "@/data/projetos";
import { CapaProjeto } from "./CapaProjeto";

export function CaseClienteCard({ projeto }: { projeto: Projeto }) {
  const nome = projeto.nomeCurto ?? projeto.nome;
  return (
    <article
      id={projeto.slug}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[18px] border border-card-border bg-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-black/10 hover:shadow-[0_10px_24px_-16px_rgba(0,0,0,0.18)] motion-reduce:transform-none"
    >
      {projeto.imagem && <CapaProjeto src={projeto.imagem} nome={nome} />}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{projeto.segmento}</p>
          <h3 className="mt-2 font-heading text-[38px] font-semibold leading-none text-primary">{nome}</h3>
        </div>
        <dl className="grid grid-cols-[72px_1fr] gap-x-4 gap-y-3 text-[15px] leading-relaxed">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Antes</dt>
          <dd className="text-primary/75">{projeto.antes}</dd>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">Depois</dt>
          <dd className="font-medium text-primary">{projeto.depois}</dd>
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
          <Link href={`/projetos/${projeto.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-card transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Ver case completo <span aria-hidden="true" className="ml-1">→</span>
          </Link>
          {projeto.ctaPrincipal && (
            <a href={projeto.ctaPrincipal.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              {projeto.slug === "sistema-financeiro-multi-tenant" ? "Sistema ao vivo" : "Site ao vivo"} <span aria-hidden="true" className="ml-1">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
