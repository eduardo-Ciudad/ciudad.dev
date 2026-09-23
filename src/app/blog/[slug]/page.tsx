import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogArticleCta } from "@/components/BlogArticleCta";
import { blogMdxComponents } from "@/components/BlogMdxComponents";
import { getProjeto, hasCase } from "@/data/projetos";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/blog";

const baseUrl = "https://www.ciudadlab.com.br";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = `/blog/${post.slug}`;
  return {
    title: `${post.title} | CiudadLab`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: "CiudadLab",
      title: post.title,
      description: post.description,
      url: canonical,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const projetoRelacionado = post.caseSlug ? getProjeto(post.caseSlug) : undefined;
  const projeto = projetoRelacionado && hasCase(projetoRelacionado) ? projetoRelacionado : undefined;

  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: "CiudadLab", url: baseUrl },
    publisher: { "@type": "Organization", name: "CiudadLab", url: baseUrl },
  };

  return (
    <>
      <Navbar />
      <main className="pb-24 pt-28 md:pb-32 md:pt-36">
        <article>
          <header className="mx-auto max-w-4xl px-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent">
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar ao blog
            </Link>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags do artigo">
              {post.tags.map((tag) => <li key={tag} className="rounded-full border border-accent-border bg-accent-light px-3 py-1 text-[11px] font-medium text-accent">{tag}</li>)}
            </ul>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl lg:text-7xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted md:text-lg">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-divider pb-10 text-xs text-muted md:pb-14">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min de leitura</span>
              {projeto && (
                <>
                  <span aria-hidden="true">·</span>
                  <Link href={`/projetos/${projeto.slug}`} className="font-medium text-accent transition-opacity hover:opacity-80">
                    Bastidor do case {projeto.nome}
                  </Link>
                </>
              )}
            </div>
          </header>

          <div className="blog-prose mx-auto mt-12 max-w-3xl px-6 md:mt-16">
            <MDXRemote
              source={post.content}
              components={blogMdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
          <div className="mx-auto mt-16 max-w-3xl px-6 md:mt-24">
            {projeto && (
              <aside className="mb-8 rounded-2xl border border-accent-border bg-accent-light p-6 md:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Case relacionado</span>
                <p className="mt-3 font-heading text-2xl font-semibold text-primary md:text-[28px]">{projeto.nome}</p>
                <p className="mt-2 text-[15px] leading-[1.7] text-primary/80">{projeto.resultado}</p>
                <Link href={`/projetos/${projeto.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-80">
                  Ver o case completo <span aria-hidden="true">→</span>
                </Link>
              </aside>
            )}
            <BlogArticleCta />
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <Footer />
    </>
  );
}
