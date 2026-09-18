"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, Plus } from "lucide-react";
import type { Projeto } from "@/data/projetos";

type ProjetosGridProps = {
  projetos: Projeto[];
};

const categoriaLabel = {
  fullstack: "Fullstack",
  "landing-page": "Landing page",
} satisfies Record<Projeto["categoria"], string>;

type ProjetoCardProps = {
  projeto: Projeto;
  index: number;
  revealOnMount?: boolean;
  alreadyRevealed?: boolean;
  onRevealComplete?: () => void;
};

function ProjetoCard({
  projeto,
  index,
  revealOnMount = false,
  alreadyRevealed = false,
  onRevealComplete,
}: ProjetoCardProps) {
  const revealTarget = { opacity: 1, y: 0 };

  return (
    <motion.article
      id={projeto.slug}
      initial={alreadyRevealed ? false : { opacity: 0, y: 20 }}
      animate={revealOnMount || alreadyRevealed ? revealTarget : undefined}
      whileInView={
        revealOnMount || alreadyRevealed ? undefined : revealTarget
      }
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: alreadyRevealed ? 0 : index * 0.07,
        ease: "easeOut",
      }}
      onAnimationComplete={onRevealComplete}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-[box-shadow,border-color] duration-300 ease-out hover:border-accent-border hover:shadow-[0_8px_20px_-12px_rgba(37,99,235,0.15)]"
    >
      {projeto.imagem ? (
        <div className="relative aspect-video overflow-hidden border-b border-divider bg-accent-light">
          <Image
            src={projeto.imagem}
            alt={`Preview do projeto ${projeto.nome}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center border-b border-divider bg-accent-light">
          <div className="flex flex-col items-center gap-3 text-accent">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-accent-border bg-card">
              <Code2 size={26} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.12em]">
              {projeto.status}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-accent-border bg-accent-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            {categoriaLabel[projeto.categoria]}
          </span>
          {projeto.autoral && (
            <span className="rounded-full border border-card-border bg-surface px-3 py-1 text-[11px] font-semibold text-muted">
              Projeto autoral
            </span>
          )}
          {projeto.status && projeto.imagem && (
            <span className="rounded-full border border-card-border bg-surface px-3 py-1 text-[11px] font-semibold text-muted">
              {projeto.status}
            </span>
          )}
        </div>

        <h3 className="font-heading text-2xl font-semibold md:text-3xl">
          {projeto.nome}
        </h3>

        <div className="my-6 space-y-2.5">
          {projeto.descricao.map((item) => (
            <div key={item} className="flex gap-2.5 text-sm">
              <span className="shrink-0 text-muted/50">→</span>
              <span className="leading-relaxed text-primary/80">{item}</span>
            </div>
          ))}
        </div>

        {(projeto.ctaPrincipal || projeto.ctaSecundario) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {projeto.ctaPrincipal && (
              <a
                href={projeto.ctaPrincipal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-card transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {projeto.ctaPrincipal.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {projeto.ctaSecundario && (
              <a
                href={projeto.ctaSecundario.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-accent-border px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {projeto.ctaSecundario.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function ProjetosGrid({ projetos }: ProjetosGridProps) {
  const [showMore, setShowMore] = useState(false);
  const [extraCardsRevealed, setExtraCardsRevealed] = useState(false);
  const extraProjectsId = useId();
  const fullstack = projetos.filter((projeto) => projeto.categoria === "fullstack");
  const landingPages = projetos.filter((projeto) => projeto.categoria === "landing-page");
  const landingPagesVisiveis = landingPages.filter((projeto) => projeto.destaque);
  const landingPagesExtras = landingPages.filter((projeto) => !projeto.destaque);

  return (
    <div className="space-y-20 md:space-y-28">
      <section aria-labelledby="fullstack-title">
        <div className="mb-9 md:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Aplicações completas</span>
          <h2 id="fullstack-title" className="mt-3 font-heading text-3xl font-semibold md:text-5xl">Projetos fullstack</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {fullstack.map((projeto, index) => (
            <ProjetoCard
              key={projeto.slug}
              projeto={projeto}
              index={index}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="landing-pages-title">
        <div className="mb-9 md:mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Presença digital</span>
          <h2 id="landing-pages-title" className="mt-3 font-heading text-3xl font-semibold md:text-5xl">Landing pages</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {landingPagesVisiveis.map((projeto, index) => (
            <ProjetoCard
              key={projeto.slug}
              projeto={projeto}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-card-border bg-card">
          <button
            type="button"
            aria-expanded={showMore}
            aria-controls={extraProjectsId}
            onClick={() => setShowMore((current) => !current)}
            className="group flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left focus-visible:outline-2 focus-visible:outline-accent md:p-6"
          >
            <span className="font-medium text-accent">
              {showMore ? "Ver menos projetos" : "Ver mais projetos"}
            </span>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-light text-accent">
              <Plus size={18} className={`transition-transform duration-300 ${showMore ? "rotate-45" : ""}`} aria-hidden="true" />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {showMore && (
              <motion.div
                id={extraProjectsId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-6 border-t border-divider p-5 md:p-6 lg:grid-cols-2">
                  {landingPagesExtras.map((projeto, index) => (
                    <ProjetoCard
                      key={projeto.slug}
                      projeto={projeto}
                      index={index}
                      revealOnMount={!extraCardsRevealed}
                      alreadyRevealed={extraCardsRevealed}
                      onRevealComplete={
                        !extraCardsRevealed &&
                        index === landingPagesExtras.length - 1
                          ? () => setExtraCardsRevealed(true)
                          : undefined
                      }
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
