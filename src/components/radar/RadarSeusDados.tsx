import Link from "next/link";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RADAR_TESTES } from "@/data/radar";

const EYEBROW = "Seus dados";
const TITLE = "Seus números continuam seus";
const DESCRIPTION =
  "O Radar lê o que o Google Analytics já mede. Não instala nada novo no seu site e não guarda dado pessoal de visitante.";
const ITEMS = [
  {
    title: "A conta é sua",
    text: "O Google Analytics fica na sua conta Google, não na minha.",
  },
  {
    title: "Só leitura, e revogável",
    text: "O Radar não altera nada e o acesso pode ser retirado a qualquer momento.",
  },
  {
    title: "Nada identifica ninguém",
    text: "Os dados são agregados: nenhum visitante é identificado individualmente.",
  },
  {
    title: "Infraestrutura cuidada",
    text: `Servidor próprio, conexão protegida e ${RADAR_TESTES} testes automáticos a cada mudança.`,
  },
] as const;

export function RadarSeusDados() {
  return (
    <section
      aria-labelledby="radar-seus-dados-title"
      className="rounded-[20px] bg-dark px-8 py-12 md:px-14 md:py-[52px]"
    >
      <ScrollReveal>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#93B4FF]">
              {EYEBROW}
            </p>
            <h2
              id="radar-seus-dados-title"
              className="mt-3 font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-white"
            >
              {TITLE}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#C9C4BA]">
              {DESCRIPTION}
            </p>
            <Link
              href="/projetos/radar#producao"
              className="mt-6 inline-flex text-sm font-semibold text-[#93B4FF] transition-colors hover:text-white"
            >
              Ver como o Radar foi construído →
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">
            {ITEMS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check
                  size={18}
                  className="mt-0.5 shrink-0 text-[#93B4FF]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.65] text-[#C9C4BA]">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
