import type { Projeto } from "@/data/projetos";
import { CapaProjeto } from "./CapaProjeto";

export function EntregaCard({ projeto }: { projeto: Projeto }) {
  const nome = projeto.nomeCurto ?? projeto.nome;
  return (
    <article className="group flex h-full flex-wrap overflow-hidden rounded-[18px] border border-card-border bg-card">
      <div className="min-w-0 basis-full sm:flex-[1_1_220px]">
        {projeto.imagem && <CapaProjeto src={projeto.imagem} nome={nome} tamanho="md" aspecto="4/3" />}
      </div>
      <div className="flex min-w-0 flex-[1_1_240px] flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{projeto.segmento}</p>
        <h3 className="mt-2 font-heading text-[28px] font-semibold leading-none">{nome}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{projeto.resumo}</p>
        {projeto.ctaPrincipal && (
          <a href={projeto.ctaPrincipal.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-end pt-4 text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            {projeto.ctaPrincipal.label} <span aria-hidden="true" className="ml-1">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
