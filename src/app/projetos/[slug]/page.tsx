import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { DocImage } from "@/components/DocImage";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getProjeto, hasCase, projetos } from "@/data/projetos";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { BlogArticleCta } from "@/components/BlogArticleCta";
import { RadarTelaCase } from "@/components/ProdutoKelly";
import { RadarIncluso, RadarMes } from "@/components/projetos/RadarCaseContent";
import { RadarProducao } from "@/components/projetos/RadarProducao";
import { formatPostDate, getAllPosts, getPostsByCase } from "@/lib/blog";

type ProjetoCasePageProps = {
  params: Promise<{ slug: string }>;
};

const categoriaLabel = {
  fullstack: "Projeto fullstack",
  "ferramenta-interna": "Ferramenta interna",
  "landing-page": "Landing page",
  produto: "Produto próprio",
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
  const description = projeto.caseDescription ?? projeto.subtitulo ?? projeto.solucao;
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
      ...(projeto.heroImage
        ? { images: [{ url: projeto.heroImage, alt: `Case do projeto ${projeto.nome}` }] }
        : {}),
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

  const bastidores = getPostsByCase(projeto.slug);
  const leiaTambem = getAllPosts()
    .filter(
      (post) =>
        post.tags.includes(projeto.slug) &&
        !bastidores.some((bastidor) => bastidor.slug === post.slug),
    )
    .sort((a, b) => {
      if (!a.serie) return b.serie ? 1 : 0;
      if (!b.serie) return -1;
      return a.serie.localeCompare(b.serie);
    })
    .slice(0, 2);
  const isRadar = projeto.slug === "radar";
  const isKelly = projeto.slug === "kelly-academy";
  const secoes = isRadar
    ? [
        ["#visao-geral", "Visão geral"],
        ["#o-produto", "Como funciona"],
        ["#um-mes-no-radar", "Um mês no Radar"],
        ["#numeros", "Em números"],
        ["#producao", "Do código à produção"],
        ["#decisoes-tecnicas", "Decisões técnicas"],
        ["#resultado", "Resultado"],
        ["#o-que-esta-incluso", "O que está incluso"],
        ...(bastidores.length > 0 ? [["#bastidores", "Bastidores"]] : []),
      ]
    : [
        ["#visao-geral", "Visão geral"],
        ...(projeto.ciclo ? [["#o-produto", "O produto"]] : []),
        ["#decisoes-tecnicas", "Decisões técnicas"],
        ...(projeto.numeros ? [["#numeros", "Em números"]] : []),
        ["#resultado", "Resultado"],
        ...(bastidores.length > 0 ? [["#bastidores", "Bastidores"]] : []),
      ];
  const abertura = (
    <>
      <Link
        href="/projetos"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Todos os projetos
      </Link>
      <ScrollReveal className="mb-10">
        <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {projeto.caseLabel ?? categoriaLabel[projeto.categoria]}
        </span>
        <h1 className="mb-4 font-heading text-4xl font-bold tracking-[-0.5px] text-primary md:text-5xl">
          {projeto.nome}
        </h1>
        <p className="max-w-[720px] text-lg leading-relaxed text-muted">
          {projeto.subtitulo ?? "Case do projeto"}
        </p>
        {projeto.stack && (
          <div className="mt-5 flex flex-wrap gap-2">
            {projeto.stack.map((tecnologia) => (
              <span key={tecnologia} className="rounded-full border border-card-border bg-card px-3 py-1 text-xs text-primary/80">
                {tecnologia}
              </span>
            ))}
            {projeto.status && (
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isRadar ? "bg-[#E7F2EA] text-[#1F6B3A]" : "bg-kelly-warning-bg text-kelly-warning"}`}>
                {projeto.status}
              </span>
            )}
          </div>
        )}
      </ScrollReveal>
      <div className={isRadar ? "" : "mb-14"}>
        {projeto.heroIlustracao === "radar" ? <RadarTelaCase /> : <DocImage src={projeto.heroImage} alt={`Visão geral do projeto ${projeto.nome}`} fallbackLabel={`Imagem principal do case ${projeto.nome} em breve`} />}
      </div>
    </>
  );
  const numerosSection = projeto.numeros && (
    <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
      <section id="numeros">
        <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
          Em números
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {projeto.numeros.map((numero) => (
            <div
              key={numero.rotulo}
              className={
                isRadar
                  ? "rounded-xl border border-card-border bg-card p-5"
                  : "rounded-xl bg-kelly-bg p-5"
              }
            >
              <p
                className={
                  isRadar
                    ? "font-heading text-4xl font-semibold leading-none tabular-nums text-primary"
                    : "font-kelly-display text-4xl font-light tracking-tight text-white"
                }
              >
                {numero.valor}
              </p>
              <p
                className={
                  isRadar
                    ? "mt-2 text-[13px] leading-snug text-muted"
                    : "mt-2 font-kelly-body text-[13px] leading-snug text-kelly-text-2"
                }
              >
                {numero.rotulo}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {isRadar && (
        <section className="border-b border-card-border bg-card pb-16 pt-[120px] max-sm:pb-12 max-sm:pt-24">
          <div className="mx-auto max-w-6xl px-6">{abertura}</div>
        </section>
      )}

      <main className={`mx-auto max-w-6xl px-6 pb-20 md:pb-28 lg:grid lg:grid-cols-[200px_1fr] lg:gap-16 ${isRadar ? "pt-16" : "pt-28 md:pt-32"}`}>
        <aside className="hidden lg:block">
          <nav className="sticky top-24 flex flex-col gap-1 text-sm" aria-label="Seções do case">
            {secoes.map(([href, label]) => <a key={href} href={href} className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-card hover:text-primary">{label}</a>)}
          </nav>
        </aside>

        <article className="max-w-[720px]">
          {!isRadar && abertura}

          <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id="visao-geral" className="grid gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                  {isRadar ? "O problema" : "O desafio"}
                </h2>
                <p className="text-[15px] leading-[1.8] text-primary/80">{projeto.problema}</p>
              </div>
              <div>
                <h2 className="mb-4 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                  {isRadar ? "A solução" : "O que construímos"}
                </h2>
                <p className="text-[15px] leading-[1.8] text-primary/80">{projeto.solucao}</p>
              </div>
            </section>
          </ScrollReveal>

          {projeto.ciclo && (
            <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
              <section id="o-produto">
                <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                  {projeto.cicloTitulo ?? "O produto"}
                </h2>
                <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {projeto.ciclo.map((etapa, index) => (
                    <li key={etapa.titulo} className="rounded-xl border border-card-border bg-card p-5">
                      <span className="font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 font-heading text-2xl font-semibold">{etapa.titulo}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{etapa.descricao}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </ScrollReveal>
          )}

          {projeto.blocoProprio === "radar-mes" && <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20"><RadarMes /></ScrollReveal>}

          {isRadar && numerosSection}

          {isRadar && projeto.producao && (
            <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
              <RadarProducao producao={projeto.producao} />
            </ScrollReveal>
          )}

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

              {projeto.featureImage && <figure>
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
              </figure>}
            </section>
          </ScrollReveal>

          {!isRadar && numerosSection}

          {projeto.resultado && <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
            <section id="resultado" className="rounded-xl bg-[var(--color-cover)] p-6 md:p-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                Resultado
              </span>
              <p className="mt-3 font-heading text-2xl font-semibold leading-snug text-primary md:text-[28px]">
                {projeto.resultado}
              </p>
            </section>
          </ScrollReveal>}

          {projeto.blocoProprio === "radar-mes" && <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20"><RadarIncluso /></ScrollReveal>}

          {bastidores.length > 0 && (
            <ScrollReveal className="mb-16 scroll-mt-24 md:mb-20">
              <section id="bastidores">
                <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
                  Bastidores deste projeto
                </h2>
                <p className="mb-6 text-[15px] leading-[1.8] text-primary/80">
                  Decisões e problemas reais do desenvolvimento, contados em detalhe no blog.
                </p>
                <div className="space-y-4">
                  {bastidores.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block rounded-xl border border-divider bg-card p-5 transition-colors hover:border-accent-border md:p-6"
                    >
                      <div className="text-xs text-muted">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span aria-hidden="true"> · </span>
                        <span>{post.readingTime} min de leitura</span>
                      </div>
                      <h3 className="mt-2 font-heading text-xl font-semibold text-primary transition-colors group-hover:text-accent md:text-2xl">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                        Ler o bastidor <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
                {leiaTambem.length > 0 && (
                  <>
                    <p className="mb-4 mt-10 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Leia também
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {leiaTambem.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="group rounded-xl border border-divider bg-card p-5 transition-colors hover:border-accent-border"
                        >
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                            <span className="rounded-full bg-accent-light px-2.5 py-1 text-[11px] font-semibold text-accent">
                              Guia
                            </span>
                            <span>
                              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                              <span aria-hidden="true"> · </span>
                              <span>{post.readingTime} min</span>
                            </span>
                          </div>
                          <h3 className="mt-3 font-heading text-lg font-semibold text-primary transition-colors group-hover:text-accent md:text-xl">
                            {post.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
                          <span className="mt-4 inline-flex text-sm font-medium text-accent">
                            Ler o guia <span aria-hidden="true">→</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </section>
            </ScrollReveal>
          )}

          {isRadar ? (
            <BlogArticleCta
              title="Quer saber se o seu site está trazendo cliente?"
              text="Conte sobre o seu site. A gente mostra o que o Radar leria nele."
              whatsappMessage="Olá! Quero saber o que o Radar leria no meu site."
              primaryLabel="Conversar sobre meu site"
              location="projeto"
            />
          ) : <section className="border-t border-divider pt-14 text-center">
            {isKelly ? (
              <div className="kelly-glow flex flex-wrap items-center gap-6 rounded-[22px] p-8 text-left md:p-10">
                <div className="min-w-0 flex-1">
                  <h2 className="font-kelly-display text-3xl font-light tracking-tight text-white">
                    Quer ver a Kelly funcionando?
                  </h2>
                  <p className="mt-2 font-kelly-body text-[15px] text-kelly-text-2">
                    Ou quer um produto assim para o seu negócio?
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {projeto.ctaPrincipal && (
                    <a
                      href={projeto.ctaPrincipal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#0b1b3a] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Conhecer a Kelly ↗
                    </a>
                  )}
                  <WhatsAppLink
                    href={WHATSAPP_CONTACT_URL}
                    location="projeto"
                    className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Falar no WhatsApp
                  </WhatsAppLink>
                </div>
              </div>
            ) : (
              <>
                <h2 className="mb-3 font-heading text-2xl font-semibold md:text-3xl">
                  Quer construir algo parecido?
                </h2>
                <p className="mx-auto mb-7 max-w-sm text-sm text-muted">
                  Conta o que você precisa. Respondo em até 24h com escopo, prazo e valor definidos.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <WhatsAppLink
                    href={WHATSAPP_CONTACT_URL}
                    location="projeto"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Falar no WhatsApp
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </WhatsAppLink>

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
              </>
            )}
            <Link href="/projetos" className="mt-7 inline-block text-sm font-medium text-muted transition-colors hover:text-accent">
              Ver todos os projetos
            </Link>
          </section>}
        </article>
      </main>

      <Footer />
    </div>
  );
}
