import { ScrollReveal } from "@/components/ScrollReveal";

const EYEBROW = "Dúvidas";
const TITLE = "Perguntas frequentes";
const QUESTIONS = [
  {
    question: "Preciso entender de Analytics?",
    answer:
      "Não. Eu leio os números e te mando a conclusão, em português.",
  },
  {
    question: "Os dados são meus?",
    answer:
      "Sim. O Google Analytics fica na sua conta Google. O Radar só tem acesso de leitura, e os dados são agregados: nada identifica visitantes individualmente.",
  },
  {
    question: "Quanto custa depois dos 90 dias?",
    answer:
      "Sob consulta, de acordo com o tamanho do site e a frequência das leituras.",
  },
  {
    question: "Posso parar quando quiser?",
    answer:
      "Pode. Se decidir não continuar, o Google Analytics segue funcionando na sua conta, com todo o histórico dele.",
  },
  {
    question: "O Radar mexe no meu site?",
    answer:
      "Não. Ele só lê os números que o Analytics já mede. Nada é instalado ou alterado no site por causa dele.",
  },
] as const;

export function RadarFaq() {
  return (
    <section aria-labelledby="radar-faq-title">
      <ScrollReveal>
        <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {EYEBROW}
            </p>
            <h2
              id="radar-faq-title"
              className="mt-3 font-heading text-[clamp(32px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.6px] text-primary"
            >
              {TITLE}
            </h2>
          </header>

          <div className="divide-y divide-divider border-y border-divider">
            {QUESTIONS.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-primary marker:content-none">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="relative size-5 shrink-0 text-xl font-normal leading-5 text-accent"
                  >
                    <span className="absolute inset-0 transition-opacity group-open:opacity-0">
                      +
                    </span>
                    <span className="absolute inset-0 opacity-0 transition-opacity group-open:opacity-100">
                      −
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-[680px] text-[15px] leading-[1.8] text-primary/80">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
