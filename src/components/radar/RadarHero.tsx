import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { RadarTelaCase } from "@/components/ProdutoKelly";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WHATSAPP_RADAR_URL } from "@/data/whatsapp";

const EYEBROW = "Radar · acompanhamento pós-entrega";
const TITLE = "Seu site está trazendo cliente? O Radar te conta.";
const DESCRIPTION =
  "Uma leitura em português do que funcionou, do que caiu e do que mudar no site. Sem você precisar abrir o Google Analytics.";
const BADGES = ["No ar desde nov/2026", "90 dias inclusos em todo site novo"] as const;
const PRIMARY_ACTION = "Quero o Radar no meu site";
const SECONDARY_ACTION = "Ver o case completo →";

export function RadarHero() {
  return (
    <section className="w-full" aria-labelledby="radar-hero-title">
      <ScrollReveal>
        <div>
          <div className="max-w-[760px]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{EYEBROW}</p>
            <h1
              id="radar-hero-title"
              className="mt-4 font-heading text-[clamp(44px,5.6vw,72px)] font-semibold leading-[1.02] tracking-[-1.2px] text-primary"
            >
              {TITLE}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{DESCRIPTION}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#E7F2EA] px-2.5 py-1 text-xs font-semibold text-[#1F6B3A]">
                {BADGES[0]}
              </span>
              <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
                {BADGES[1]}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WhatsAppLink
                href={WHATSAPP_RADAR_URL}
                location="radar"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white hover:brightness-110"
              >
                {PRIMARY_ACTION}
                <ArrowUpRight size={16} aria-hidden="true" />
              </WhatsAppLink>
              <Link href="/projetos/radar" className="text-sm font-semibold text-primary hover:text-accent">
                {SECONDARY_ACTION}
              </Link>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <RadarTelaCase />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
