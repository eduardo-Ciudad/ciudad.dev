import Image from "next/image";
import Link from "next/link";
import { KELLY_STATS, KELLY_STATUS, KELLY_URL } from "@/data/kelly";
import { ScrollReveal } from "./ScrollReveal";

const competencias = [
  { rotulo: "C1", nota: 160, text: "text-kelly-c1", track: "bg-kelly-c1-bg", fill: "bg-kelly-c1" },
  { rotulo: "C2", nota: 140, text: "text-kelly-c2", track: "bg-kelly-c2-bg", fill: "bg-kelly-c2" },
  { rotulo: "C3", nota: 120, text: "text-kelly-c3", track: "bg-kelly-c3-bg", fill: "bg-kelly-c3" },
  { rotulo: "C4", nota: 180, text: "text-kelly-c4", track: "bg-kelly-c4-bg", fill: "bg-kelly-c4" },
  { rotulo: "C5", nota: 160, text: "text-kelly-c5", track: "bg-kelly-c5-bg", fill: "bg-kelly-c5" },
] as const;

export function ProdutoKelly() {
  return (
    <section id="kelly-academy" aria-labelledby="kelly-titulo" className="px-6 pb-24 pt-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <ScrollReveal>
          <div className="kelly-glow flex flex-col items-center gap-12 rounded-[28px] px-6 py-10 text-kelly-text md:px-14 md:py-16 lg:flex-row lg:gap-14">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <p className="font-kelly-mono text-[11.5px] tracking-[0.16em] text-white/60">
                PRODUTO PRÓPRIO · CIUDADLAB
              </p>

              <div className="flex items-center gap-3.5">
                <Image src="/img/kelly/kelly-simbolo.svg" width={62} height={38} alt="" aria-hidden="true" />
                <p className="font-kelly-body text-[22px] font-semibold text-white">Kelly Academy</p>
              </div>

              <h2
                id="kelly-titulo"
                className="max-w-[560px] font-kelly-display text-[clamp(2.4rem,1.6rem+2.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.035em] text-white"
              >
                Descubra onde sua redação perde pontos.
              </h2>

              <p className="max-w-[520px] font-kelly-body text-lg leading-relaxed text-kelly-text/80">
                Plataforma de treino para a redação do ENEM. Corrige competência por competência,
                aponta o trecho que segurou a nota e mostra o que treinar a seguir. Pensada,
                construída e mantida aqui.
              </p>

              <div className="grid grid-cols-3 border-y border-white/12 py-4">
                {KELLY_STATS.map((stat, index) => (
                  <div key={stat.rotulo} className={index === 0 ? "pr-2" : "border-l border-white/12 px-2 sm:px-4"}>
                    <p className="font-kelly-display text-[26px] font-light leading-none text-white sm:text-[34px]">
                      {stat.valor}
                    </p>
                    <p className="mt-2 font-kelly-body text-xs leading-tight text-kelly-text-2 sm:text-[13.5px]">
                      {stat.rotulo}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projetos/kelly-academy"
                  className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-white px-6 font-kelly-body font-semibold text-[#0b1b3a] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                >
                  Ver o case completo →
                </Link>
                <a
                  href={KELLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/30 px-6 font-kelly-body font-semibold text-white transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                >
                  Conhecer a Kelly ↗
                </a>
                <span className="rounded-full bg-kelly-warning/15 px-3 py-1.5 font-kelly-body text-[12.5px] font-semibold text-kelly-warning">
                  {KELLY_STATUS}
                </span>
              </div>
            </div>

            <figure className="flex min-w-0 flex-1 flex-col gap-3.5 font-kelly-body">
              <div className="flex flex-col gap-5 rounded-[18px] border border-kelly-border bg-kelly-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-kelly-mono text-[11px] tracking-[0.12em] text-kelly-text-3">
                      RESULTADO DA CORREÇÃO
                    </p>
                    <p className="mt-1.5 text-sm text-kelly-text-2">Tema: exemplo ilustrativo</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-kelly-display text-[52px] font-light leading-none text-white">760</span>
                    <span className="ml-1 text-sm text-kelly-text-3">/1000</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {competencias.map((competencia) => (
                    <div key={competencia.rotulo} className="grid grid-cols-[36px_1fr_36px] items-center gap-3 text-[13px]">
                      <span className={`font-kelly-mono ${competencia.text}`}>{competencia.rotulo}</span>
                      <div className={`h-1.5 overflow-hidden rounded-full ${competencia.track}`}>
                        <div
                          className={`h-full rounded-full ${competencia.fill}`}
                          style={{ width: `${competencia.nota / 2}%` }}
                        />
                      </div>
                      <span className="text-right tabular-nums text-kelly-text-2">{competencia.nota}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-kelly-tint px-4 py-3.5">
                  <p className="text-[12.5px] font-semibold text-kelly-accent-text">
                    Treine a seguir: Competência 3
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#cfd2dd]">
                    O argumento do 2º parágrafo afirma sem comprovar. Use um repertório do eixo do
                    tema para sustentar a tese.
                  </p>
                </div>
              </div>
              <figcaption className="text-xs text-kelly-text/55">
                Exemplo ilustrativo da tela de resultado.
              </figcaption>
            </figure>
          </div>
        </ScrollReveal>

        <Link
          href="/radar"
          className="flex flex-wrap items-center gap-4 rounded-2xl border border-card-border bg-card px-6 py-[18px] transition-colors hover:border-accent-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Também da CiudadLab</span>
          <span className="font-heading text-2xl font-semibold">Radar</span>
          <span className="text-[14.5px] text-muted">
            Painel que lê o Google Analytics do seu site e te conta o que importa.
          </span>
          <span className="ml-auto text-sm font-semibold text-accent">Conhecer o Radar →</span>
        </Link>
      </div>
    </section>
  );
}
