import { DetalhesTecnicos } from "@/components/DetalhesTecnicos";
import type { Projeto } from "@/data/projetos";

type RadarProducaoProps = {
  producao: NonNullable<Projeto["producao"]>;
};

export function RadarProducao({ producao }: RadarProducaoProps) {
  return (
    <section id="producao">
      <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
        Do código à produção
      </h2>
      <p className="mb-6 text-[15px] leading-[1.8] text-primary/80">
        {producao.titulo}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {producao.blocos.map((bloco) => (
          <div
            key={bloco.titulo}
            className="rounded-xl border border-card-border bg-card p-5"
          >
            <h3 className="font-semibold text-primary">{bloco.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {bloco.descricao}
            </p>
          </div>
        ))}
      </div>
      <DetalhesTecnicos groups={producao.detalhes} />
    </section>
  );
}
