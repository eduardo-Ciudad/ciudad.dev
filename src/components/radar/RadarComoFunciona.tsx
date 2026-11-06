import { ScrollReveal } from "@/components/ScrollReveal";

const EYEBROW = "Como funciona";
const TITLE = "Do Analytics à leitura, sem você fazer nada";
const STEPS = [
  {
    number: "01",
    title: "Conecta",
    description:
      "O site dá ao Radar acesso só de leitura ao Analytics, por uma conta de serviço do Google.",
  },
  {
    number: "02",
    title: "Sincroniza",
    description:
      "Todo dia às 6h, o Radar busca os números do dia anterior e guarda o histórico.",
  },
  {
    number: "03",
    title: "Compara",
    description:
      "Últimos 7, 28 ou 90 dias, sempre lado a lado com o período anterior.",
  },
  {
    number: "04",
    title: "Traduz",
    description:
      "Uma leitura em linguagem simples, com o alerta do que merece atenção.",
  },
] as const;

export function RadarComoFunciona() {
  return (
    <section aria-labelledby="radar-como-funciona-title">
      <ScrollReveal>
        <header className="max-w-[720px]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {EYEBROW}
          </p>
          <h2
            id="radar-como-funciona-title"
            className="mt-3 font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
          >
            {TITLE}
          </h2>
        </header>

        <ol className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className={`border-t-2 pt-6 ${index === 0 ? "border-accent" : "border-divider"}`}
            >
              <span className="text-[13px] font-bold text-accent">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-[28px] font-semibold leading-tight text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </section>
  );
}
