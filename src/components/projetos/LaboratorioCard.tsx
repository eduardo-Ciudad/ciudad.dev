import type { Projeto } from "@/data/projetos";
import { CapaProjeto } from "./CapaProjeto";

export function LaboratorioCard({ projeto }: { projeto: Projeto }) {
  const nome = projeto.nomeCurto ?? projeto.nome;
  const cta = projeto.ctaPrincipal ?? projeto.ctaSecundario;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-card-border bg-card">
      {projeto.imagem && <CapaProjeto src={projeto.imagem} nome={nome} tamanho="sm" />}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-2xl font-semibold leading-none">{nome}</h3>
          {projeto.etiqueta && <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">{projeto.etiqueta}</span>}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{projeto.resumo}</p>
        {cta && (
          <a href={cta.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-10 items-end pt-4 text-[13px] font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            {cta.label} <span aria-hidden="true" className="ml-1">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
