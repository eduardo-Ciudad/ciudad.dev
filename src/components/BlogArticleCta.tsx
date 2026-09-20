import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";

export function BlogArticleCta() {
  return (
    <aside className="overflow-hidden rounded-2xl bg-dark px-6 py-9 text-center md:px-10 md:py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
        Próximo passo
      </p>
      <h2 className="mx-auto mt-3 max-w-xl font-heading text-[28px] font-semibold tracking-[-1px] text-white md:text-[36px] lg:text-[42px]">
        Vamos transformar essa ideia em um projeto?
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-[15px] leading-6 text-white/70">
        Conte o que o seu negócio precisa. Você recebe uma orientação clara sobre escopo, prazo e investimento.
      </p>
      <a
        href={WHATSAPP_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3 text-sm font-medium text-white no-underline transition-all duration-300 hover:brightness-110"
      >
        Conversar sobre meu projeto
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </aside>
  );
}
