import { ScrollReveal } from "@/components/ScrollReveal";

type SecaoCabecalhoProps = {
  eyebrow: string;
  titulo: string;
  apoio: string;
  tamanho?: "grande" | "medio";
};

export function SecaoCabecalho({ eyebrow, titulo, apoio, tamanho = "grande" }: SecaoCabecalhoProps) {
  return (
    <ScrollReveal>
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-divider pb-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
          <h2 className={`mt-2 max-w-3xl text-balance font-heading font-semibold leading-[1.02] tracking-[-0.5px] ${tamanho === "grande" ? "text-[34px] md:text-[52px]" : "text-[30px] md:text-[42px]"}`}>{titulo}</h2>
        </div>
        <p className="max-w-[360px] text-[15px] leading-relaxed text-muted">{apoio}</p>
      </header>
    </ScrollReveal>
  );
}
