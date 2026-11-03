import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function BlogArticleCta() {
  return (
    <div className="-mt-8 pt-[72px] only:-mt-16 md:only:-mt-24">
      <aside className="border-t border-black/10 pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-accent">
          Próximo passo
        </p>
        <h2 className="mt-4 max-w-[600px] font-heading text-[34px] font-semibold leading-[1.1] tracking-[-1px] text-primary md:text-[44px]">
          Vamos transformar essa ideia em um projeto?
        </h2>
        <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-muted">
          Conte o que o seu negócio precisa. Você recebe uma orientação clara sobre escopo, prazo e investimento.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <WhatsAppLink
            href={WHATSAPP_CONTACT_URL}
            location="blog"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3 text-sm font-medium text-white no-underline transition-all duration-300 hover:brightness-110"
          >
            Conversar sobre meu projeto
            <ArrowUpRight size={16} aria-hidden="true" />
          </WhatsAppLink>
          <Link
            href="/projetos"
            className="text-[15px] font-medium text-primary no-underline transition-opacity hover:opacity-65"
          >
            Ver projetos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
