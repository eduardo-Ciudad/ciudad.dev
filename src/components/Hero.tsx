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
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-bold text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-[-0.03em]"
          >
            <span className="text-neutral-900">Seu negócio não é igual aos outros.</span>
            <br />
            <span className="text-neutral-900">Seu software também </span>
            <span className="text-accent">não deveria ser.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg font-medium text-neutral-800 max-w-md mx-auto lg:mx-0"
          >
            Software sob medida para transformar suas ideias em soluções que
            realmente funcionam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7"
          >
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full text-base font-semibold hover:brightness-110 transition-all duration-300"
            >
              Começar meu projeto
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-1 w-full max-w-md lg:max-w-lg"
        >
          <div className="rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-card-border rotate-1 hover:rotate-0 hover:shadow-xl transition-all duration-500">
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
