import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DocImagePlaceholder } from "@/components/DocImagePlaceholder";
import { getServiceDoc, servicesDocs } from "@/data/services-docs";

export async function generateStaticParams() {
  return servicesDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata(
  props: PageProps<"/servicos/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = getServiceDoc(slug);

  if (!doc) return {};

  return {
    title: `${doc.title} — Documentação | ciudad.dev`,
    description: doc.tagline,
  };
}

export default async function ServiceDocPage(
  props: PageProps<"/servicos/[slug]">
) {
  const { slug } = await props.params;
  const doc = getServiceDoc(slug);

  if (!doc) notFound();

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 border-b border-divider bg-card/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pb-28 lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 flex flex-col gap-1 text-sm">
            {doc.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-2 rounded-lg text-muted hover:text-primary hover:bg-card transition-colors"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="max-w-[720px]">
          <ScrollReveal className="mb-10">
            <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-[-0.5px] text-primary mb-4">
              {doc.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              {doc.tagline}
            </p>
          </ScrollReveal>

          <div className="mb-14">
            <DocImagePlaceholder label={`Screenshot geral — ${doc.title}`} />
          </div>

          {doc.sections.map((section) => (
            <ScrollReveal
              key={section.id}
              className="mb-16 md:mb-20 scroll-mt-24"
            >
              <div id={section.id}>
                <h2 className="font-heading font-semibold text-2xl md:text-[28px] mb-6 tracking-[-0.5px]">
                  {section.title}
                </h2>

                {section.id === "visao-geral" && (
                  <p className="text-primary/80 text-[15px] leading-[1.8]">
                    {section.content}
                  </p>
                )}

                {section.id === "processo" && (
                  <div className="relative pl-10">
                    <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-divider z-0" />
                    <div className="flex flex-col gap-9">
                      {section.steps.map((step) => (
                        <div key={step.number} className="relative">
                          <div className="absolute -left-10 top-0 z-10 w-8 h-8 rounded-full bg-[#e8f0fe] border-2 border-accent flex items-center justify-center text-accent text-sm font-semibold">
                            {step.number}
                          </div>
                          <h3 className="font-body font-semibold text-lg mb-2">
                            {step.title}
                          </h3>
                          <p className="text-primary/80 text-[15px] leading-[1.8]">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.id === "decisoes-tecnicas" && (
                  <div>
                    <DocImagePlaceholder
                      label="Diagrama de arquitetura e decisões técnicas"
                      className="mb-8"
                    />
                    <div className="space-y-7">
                      {section.groups.map((group) => (
                        <div key={group.subtitle}>
                          <h3 className="font-body font-semibold text-base mb-3">
                            {group.subtitle}
                          </h3>
                          <div className="space-y-2.5">
                            {group.items.map((item) => (
                              <div key={item} className="flex gap-2.5 text-sm">
                                <Check
                                  size={16}
                                  className="text-accent shrink-0 mt-0.5"
                                />
                                <span className="text-primary/80 leading-relaxed">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {section.note && (
                      <div className="mt-7 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded-full px-2 py-1">
                          {section.note.label}
                        </span>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          {section.note.text}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {section.id === "garantia" && (
                  <p className="text-primary/80 text-[15px] leading-[1.8]">
                    {section.content}
                  </p>
                )}

                {section.id === "projeto-real" && (
                  <div>
                    <div className="space-y-12">
                      {section.projects.map((project) => (
                        <div key={project.title}>
                          <DocImagePlaceholder
                            label={`Screenshot — ${project.title}`}
                            className="mb-5"
                          />

                          {project.highlight && (
                            <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-muted bg-card border border-card-border rounded-full px-2 py-1 mb-2">
                              Projeto em destaque
                            </span>
                          )}

                          <h3 className="font-body font-semibold text-lg mb-1.5">
                            {project.title}
                          </h3>

                          {project.description && (
                            <p className="text-primary/80 text-[15px] leading-[1.8] mb-3">
                              {project.description}
                            </p>
                          )}

                          {project.bullets.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {project.bullets.map((bullet) => (
                                <div
                                  key={bullet}
                                  className="flex gap-2.5 text-sm"
                                >
                                  <span className="text-muted/50 shrink-0">
                                    →
                                  </span>
                                  <span className="text-primary/80">
                                    {bullet}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {project.hasLink && project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent border border-accent-border rounded-full px-4 py-2 hover:bg-accent-light transition-colors"
                            >
                              Ver projeto
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>

                    {section.note && (
                      <p className="text-xs text-muted leading-relaxed mt-8 pt-6 border-t border-divider">
                        {section.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}

          <div className="border-t border-divider pt-14 text-center">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-3">
              Pronto pra começar?
            </h2>
            <p className="text-muted text-sm mb-7 max-w-sm mx-auto">
              Conta o que você precisa. Respondo em até 24h com escopo, prazo
              e valor definidos.
            </p>
            <a
              href="/#contato"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full text-base font-semibold hover:brightness-110 transition-all duration-300"
            >
              Quero um orçamento
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
