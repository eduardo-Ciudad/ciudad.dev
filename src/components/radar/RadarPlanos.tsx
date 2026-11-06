import { ScrollReveal } from "@/components/ScrollReveal";

const EYEBROW = "Quanto custa";
const TITLE = "Começa incluso. Continua se fizer sentido.";
const PLANS = [
  {
    badge: "Todo site novo",
    badgeClassName:
      "rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]",
    title: "Primeiros 90 dias",
    price: "Incluso no projeto",
    items: [
      "Google Analytics 4 e conversões configurados antes de publicar",
      "Leitura mensal dos números",
      "Junto com a garantia de 90 dias",
    ],
    note: "Vale para sites, lojas e sistemas entregues pela CiudadLab.",
  },
  {
    badge: "Depois",
    badgeClassName:
      "rounded-full bg-[#FBF1DC] px-2.5 py-1 text-xs font-semibold text-[#7A4E00]",
    title: "Acompanhamento mensal",
    price: "Sob consulta",
    items: [
      "Leitura semanal curta",
      "Relatório mensal com uma sugestão prática",
      "Histórico guardado desde o primeiro dia",
    ],
    note: "Se não quiser continuar, o Analytics segue funcionando na sua conta.",
  },
] as const;

export function RadarPlanos() {
  return (
    <section aria-labelledby="radar-planos-title">
      <ScrollReveal>
        <header className="max-w-[720px]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {EYEBROW}
          </p>
          <h2
            id="radar-planos-title"
            className="mt-3 font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
          >
            {TITLE}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.title}
              className="rounded-xl border border-card-border bg-card p-8"
            >
              <span className={plan.badgeClassName}>{plan.badge}</span>
              <h3 className="mt-6 font-heading text-[32px] font-semibold leading-tight text-primary">
                {plan.title}
              </h3>
              <p className="mt-2 text-[15px] font-semibold text-primary">
                {plan.price}
              </p>
              <ul className="mt-6 space-y-3 border-t border-divider pt-5">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[14.5px] leading-[1.6] text-primary">
                    <span className="shrink-0 text-accent" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] leading-relaxed text-muted">
                {plan.note}
              </p>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
