import { ChartLine, FileText, MessageSquare, Route, Smartphone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const EYEBROW = "O que o Radar acompanha";
const TITLE = "Os números que respondem se o site está funcionando";
const ITEMS: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  { icon: Users, title: "Visitas e novos visitantes", description: "Quanta gente chegou e quantos vieram pela primeira vez." },
  { icon: Route, title: "De onde vêm", description: "Google, Instagram, direto ou indicação." },
  { icon: MessageSquare, title: "Contatos", description: "Cliques no WhatsApp e formulários enviados." },
  { icon: FileText, title: "Páginas que funcionam", description: "As mais vistas e as que mais trazem contato." },
  { icon: Smartphone, title: "Celular ou computador", description: "Em qual aparelho o seu cliente está." },
  { icon: ChartLine, title: "Comparação", description: "Sempre lado a lado com o período anterior." },
];

export function RadarAcompanha() {
  return (
    <section className="w-full" aria-labelledby="radar-acompanha-title">
      <ScrollReveal>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{EYEBROW}</p>
          <h2
            id="radar-acompanha-title"
            className="mt-4 max-w-3xl font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
          >
            {TITLE}
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-card-border bg-card p-[22px]">
                <span className="flex size-10 items-center justify-center rounded-md border border-accent-border bg-accent-light text-accent">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
