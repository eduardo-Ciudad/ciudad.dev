import { ScrollReveal } from "@/components/ScrollReveal";

const EYEBROW = "O problema";
const TITLE = "Quase todo site tem Analytics. Quase ninguém abre.";
const PAINS = [
  ["01", "Dezenas de relatórios e termos em inglês, feitos para analista."],
  ["02", "Números soltos, sem comparar com o mês anterior."],
  ["03", "Nenhuma resposta para a pergunta que importa: o site traz cliente?"],
] as const;

export function RadarProblema() {
  return (
    <section className="w-full" aria-labelledby="radar-problema-title">
      <ScrollReveal>
        <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{EYEBROW}</p>
            <h2
              id="radar-problema-title"
              className="mt-4 font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
            >
              {TITLE}
            </h2>
          </div>

          <ol className="grid md:grid-cols-3">
            {PAINS.map(([number, text], index) => (
              <li
                key={number}
                className={`border-divider py-6 md:px-6 md:py-0 ${index === 0 ? "" : "border-t md:border-l md:border-t-0"}`}
              >
                <span className="font-heading text-[40px] font-semibold leading-none text-accent">{number}</span>
                <p className="mt-4 text-[15.5px] leading-relaxed text-primary">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>
    </section>
  );
}
