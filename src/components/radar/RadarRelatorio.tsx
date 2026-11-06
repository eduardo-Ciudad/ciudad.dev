import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const EYEBROW = "O que chega para você";
const TITLE = "Todo mês, a conclusão. Não o painel.";
const DESCRIPTION =
  "Você não precisa abrir nada: a leitura chega pronta, em linguagem de quem toca o negócio.";
const REPORT_TITLE = "Leitura de outubro";
const REPORT_DOMAIN = "atelieexemplo.com.br";
const METRICS = [
  ["Visitas", "1.284", "+18% vs. setembro", "text-[#1F6B3A]"],
  ["Cliques no WhatsApp", "41", "−6% vs. setembro", "text-[#9A3412]"],
  ["Pedidos de orçamento", "19", "−3 vs. setembro", "text-[#9A3412]"],
] as const;
const FINDINGS = [
  ["O que funcionou", "As visitas do Instagram cresceram 31%, puxadas pelos posts de conjuntos.", "text-[#1F6B3A]"],
  ["O que caiu", "A página de vestidos é a mais vista, mas quase ninguém chama no WhatsApp a partir dela.", "text-[#9A3412]"],
  ["O que mudar", "Levar o botão do WhatsApp para perto das fotos, em vez do fim da página.", "text-accent"],
] as const;
const BENEFITS = [
  ["Três números, sempre comparados", "Visitas, contatos e pedidos, lado a lado com o período anterior."],
  ["O porquê, não só o quanto", "De onde veio o movimento e qual página puxou o resultado."],
  ["Uma mudança por vez", "Uma sugestão prática para o site no próximo mês."],
] as const;
const DISCLAIMER = "Exemplo com uma loja fictícia e números inventados.";

export function RadarRelatorio() {
  return (
    <section className="w-full" aria-labelledby="radar-relatorio-title">
      <ScrollReveal>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{EYEBROW}</p>
          <h2
            id="radar-relatorio-title"
            className="mt-4 font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
          >
            {TITLE}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{DESCRIPTION}</p>

          <div className="mt-10 grid items-start gap-11 lg:grid-cols-[1.25fr_1fr]">
            <article className="rounded-[18px] border border-card-border bg-card p-6 md:p-8">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-heading text-[30px] font-semibold leading-tight text-primary">{REPORT_TITLE}</h3>
                <p className="text-[13px] text-muted">{REPORT_DOMAIN}</p>
              </header>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {METRICS.map(([label, value, change, color]) => (
                  <div key={label} className="rounded-[10px] bg-surface p-4">
                    <p className="text-xs text-muted">{label}</p>
                    <p className="mt-2 font-heading text-[34px] font-semibold leading-none text-primary">{value}</p>
                    <p className={`mt-2 text-xs font-semibold ${color}`}>{change}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-6 border-t border-divider pt-7">
                {FINDINGS.map(([label, text, color]) => (
                  <div key={label}>
                    <p className={`text-xs font-bold uppercase tracking-[0.1em] ${color}`}>{label}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-primary">{text}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="lg:pt-4">
              <ul className="space-y-7">
                {BENEFITS.map(([title, text]) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent-light text-accent">
                      <Check size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-primary">{title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12.5px] text-muted">{DISCLAIMER}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
