import Link from "next/link";
import type { Projeto } from "@/data/projetos";
import { CapaProjeto } from "./CapaProjeto";
import { PROJECT_CARD_HOVER_CLASS } from "./cardHover";

type ProdutoCardProps = {
  projeto: Projeto;
  provas: string[];
  linkProduto: {
    label: string;
    href: string;
    externo?: boolean;
  };
};

export function ProdutoCard({ projeto, provas, linkProduto }: ProdutoCardProps) {
  const seloRadar = projeto.slug === "radar";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[18px] border border-card-border bg-card ${PROJECT_CARD_HOVER_CLASS}`}
    >
      {projeto.imagem && (
        <CapaProjeto src={projeto.imagem} nome={projeto.nome} tamanho="lg" />
      )}

      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            {projeto.segmento}
          </p>
          {projeto.status && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                seloRadar
                  ? "bg-[#E7F2EA] text-[#1F6B3A]"
                  : "bg-[#FBF1DC] text-[#7A4E00]"
              }`}
            >
              {projeto.status}
            </span>
          )}
        </div>

        <h3 className="font-heading text-[34px] font-semibold leading-none text-primary">
          {projeto.nome}
        </h3>
        <p className="text-[15px] leading-relaxed text-muted">
          {projeto.resumo ?? projeto.subtitulo}
        </p>

        <ul className="space-y-3 border-t border-divider pt-[18px] text-[15px] leading-relaxed text-primary/80">
          {provas.map((prova) => (
            <li key={prova} className="flex gap-3">
              <span aria-hidden="true" className="font-semibold text-accent">
                ✓
              </span>
              <span>{prova}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={`/projetos/${projeto.slug}`}
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-card transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Ver o case completo <span aria-hidden="true" className="ml-1">→</span>
          </Link>

          {linkProduto.href &&
            (linkProduto.externo ? (
              <a
                href={linkProduto.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {linkProduto.label}
                <span aria-hidden="true" className="ml-1">↗</span>
              </a>
            ) : (
              <Link
                href={linkProduto.href}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {linkProduto.label}
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}
