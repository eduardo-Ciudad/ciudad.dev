"use client";

import { motion } from "framer-motion";

const codeLines = [
  { text: "// construindo produto.ts", type: "comment" as const },
  { text: "", type: "blank" as const },
  { text: 'const produto = await build({', type: "keyword" as const },
  { text: '  escopo:    "definido",', type: "prop" as const },
  { text: '  prazo:     "travado",', type: "prop" as const },
  { text: '  preco:     "fechado",', type: "prop" as const },
  { text: '  garantia:  "90 dias"', type: "prop" as const },
  { text: "});", type: "keyword" as const },
];

const deployLines = [
  { text: "> deploying...", hasCheck: false },
  { text: "escopo travado", hasCheck: true },
  { text: "em produção", hasCheck: true },
  { text: "garantia ativa", hasCheck: true },
];

function CodeLine({ line }: { line: (typeof codeLines)[number] }) {
  if (line.type === "blank") return <br />;

  if (line.type === "comment") {
    return <span className="text-[#8b949e]">{line.text}</span>;
  }

  if (line.type === "prop") {
    const parts = line.text.split(/"([^"]*)"/);
    return (
      <span className="text-[#e6edf3]">
        {parts.map((part, j) =>
          j % 2 === 1 ? (
            <span key={j} className="text-[#7ee787]">
              &quot;{part}&quot;
            </span>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </span>
    );
  }

  const keywords = ["const", "await", "build"];
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`);
  const parts = line.text.split(regex);

  return (
    <span className="text-[#e6edf3]">
      {parts.map((part, j) =>
        keywords.includes(part) ? (
          <span key={j} className="text-[#ff7b72]">
            {part}
          </span>
        ) : (
          <span key={j}>{part}</span>
        )
      )}
    </span>
  );
}

export function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-semibold text-[42px] md:text-[56px] lg:text-[76px] leading-[0.92] tracking-[-1px]"
          >
            Da ideia <span className="text-accent">ao ar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-[17px] md:text-[19px] font-medium text-[#2a2a2a] max-w-lg mx-auto lg:mx-0"
          >
            Sites, lojas e sistemas sob medida — prontos pra rodar. Sem template
            genérico, sem intermediário.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <a
              href="#contato"
              className="inline-flex items-center gap-2 border border-accent text-accent px-6 py-3 rounded-md text-sm font-medium hover:bg-accent hover:text-white transition-colors"
            >
              Começar meu projeto
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 w-full max-w-md lg:max-w-lg"
        >
          <div className="rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-card-border">
            <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-xs text-[#8b949e]">produto.ts</span>
            </div>

            <div className="bg-[#0d1117] px-5 py-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                >
                  <CodeLine line={line} />
                </motion.div>
              ))}

              <div className="mt-4 border-t border-[#21262d] pt-4">
                {deployLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.5 + i * 0.4 }}
                    className="text-[#e6edf3]"
                  >
                    {line.hasCheck ? (
                      <>
                        <span className="text-[#7ee787]">✓</span> {line.text}
                      </>
                    ) : (
                      <span className="text-[#8b949e]">{line.text}</span>
                    )}
                  </motion.div>
                ))}

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2 }}
                  className="inline-block w-2 h-4 bg-[#e6edf3] mt-1"
                  style={{ animation: "blink 1s infinite" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
