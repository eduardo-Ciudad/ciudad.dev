import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { BackToSiteHeader } from "@/components/BackToSiteHeader";
import { DocImage } from "@/components/DocImage";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getProjeto, hasCase, projetos } from "@/data/projetos";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";

type ProjetoCasePageProps = {
  params: Promise<{ slug: string }>;
};

const categoriaLabel = {
  fullstack: "Projeto fullstack",
  "ferramenta-interna": "Ferramenta interna",
  "landing-page": "Landing page",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return projetos.filter(hasCase).map((projeto) => ({ slug: projeto.slug }));
}

export async function generateMetadata({
  params,
}: ProjetoCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const projeto = getProjeto(slug);

  if (!projeto || !hasCase(projeto)) return {};

  const title = `${projeto.nome} — Case | CiudadLab`;
  const description = projeto.solucao;
  const url = `/projetos/${projeto.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: projeto.heroImage, alt: `Case do projeto ${projeto.nome}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjetoCasePage({ params }: ProjetoCasePageProps) {
  const { slug } = await params;
  const projeto = getProjeto(slug);

  if (!projeto || !hasCase(projeto)) notFound();

  return (
    <div className="min-h-screen bg-surface">
      <BackToSiteHeader href="/projetos" label="Voltar para Projetos" />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28 lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 flex flex-col gap-1 text-sm" aria-label="Seções do case">
            <a href="#visao-geral" className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-card hover:text-primary">
              Visão geral
            </a>
            <a href="#decisoes-tecnicas" className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-card hover:text-primary">
              Decisões técnicas
            </a>
            <a href="#resultado" className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-card hover:text-primary">
              Resultado
            </a>
          </nav>
        </aside>

        <article className="max-w-[720px]">
          <ScrollReveal className="mb-10">
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {categoriaLabel[projeto.categoria]}
            </span>
            <h1 className="mb-4 font-heading text-4xl font-bold tracking-[-0.5px] text-primary md:text-5xl">
              {projeto.nome}
            </h1>
            <p className="text-lg leading-relaxed text-muted">Case do projeto</p>
          </ScrollReveal>

          <div className="mb-14">
            <DocImage
              src={projeto.heroImage}
              alt={`Visão geral do projeto ${projeto.nome}`}
              fallbackLabel={`Imagem principal do case ${projeto.nome} em breve`}
            />
          </div>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id="visao-geral" className="grid gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                  O desafio
                </h2>
                <p className="text-[15px] leading-[1.8] text-primary/80">{projeto.problema}</p>
              </div>
              <div>
                <h2 className="mb-4 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                  O que construímos
                </h2>
                <p className="text-[15px] leading-[1.8] text-primary/80">{projeto.solucao}</p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id="decisoes-tecnicas">
              <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                Decisões técnicas
              </h2>
              <ul className="mb-10 space-y-3">
                {projeto.decisoesTecnicas.map((decisao) => (
                  <li key={decisao} className="flex gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="leading-relaxed text-primary/80">{decisao}</span>
                  </li>
                ))}
              </ul>

              <figure>
                <DocImage
                  src={projeto.featureImage}
                  alt={`Funcionalidade em destaque do projeto ${projeto.nome}`}
                  fallbackLabel={`Imagem da funcionalidade de ${projeto.nome} em breve`}
                />
                {projeto.featureImageCaption && (
                  <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                    {projeto.featureImageCaption}
                  </figcaption>
                )}
              </figure>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id="resultado" className="rounded-xl border border-accent-border bg-accent-light p-6 md:p-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                Resultado
              </span>
              <p className="mt-3 font-heading text-2xl font-semibold leading-snug text-primary md:text-[28px]">
                {projeto.resultado}
              </p>
            </section>
          </ScrollReveal>

          <section className="border-t border-divider pt-14 text-center">
            <h2 className="mb-3 font-heading text-2xl font-semibold md:text-3xl">
              Quer construir algo parecido?
            </h2>
            <p className="mx-auto mb-7 max-w-sm text-sm text-muted">
              Conta o que você precisa. Respondo em até 24h com escopo, prazo e valor definidos.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={WHATSAPP_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Falar no WhatsApp
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

              {[projeto.ctaPrincipal, projeto.ctaSecundario].filter(Boolean).map((cta) => (
                <a
                  key={cta!.url}
                  href={cta!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-border px-7 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {cta!.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
            <Link href="/projetos" className="mt-7 inline-block text-sm font-medium text-muted transition-colors hover:text-accent">
              Ver todos os projetos
            </Link>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
