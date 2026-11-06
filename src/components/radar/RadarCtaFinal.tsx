import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WHATSAPP_RADAR_URL } from "@/data/whatsapp";

const TITLE = "Quer saber se o seu site está trazendo cliente?";
const DESCRIPTION =
  "Me conta qual é o seu site. Eu te mostro o que o Radar leria nele.";

export function RadarCtaFinal() {
  return (
    <section aria-labelledby="radar-cta-final-title">
      <ScrollReveal>
        <div className="rounded-[20px] border border-card-border bg-card px-8 py-16 text-center">
          <h2
            id="radar-cta-final-title"
            className="mx-auto max-w-[760px] font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
          >
            {TITLE}
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted">
            {DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <WhatsAppLink
              href={WHATSAPP_RADAR_URL}
              location="radar"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-white hover:brightness-110"
            >
              Falar no WhatsApp
              <ArrowUpRight size={16} aria-hidden="true" />
            </WhatsAppLink>
            <Link
              href="/garantia"
              className="text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              Ver como funciona a garantia
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
