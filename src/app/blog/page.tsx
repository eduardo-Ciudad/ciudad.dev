import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProjeto } from "@/data/projetos";
import { formatPostDate, getAllPosts } from "@/lib/blog";

const title = "Blog | CiudadLab";
const description =
  "Conteúdo prático sobre sites, e-commerce, sistemas sob medida e decisões digitais para negócios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24 pt-28 md:pb-32 md:pt-36">
        <section className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Ideias para negócios digitais
            </span>
            <h1 className="mt-4 font-heading text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Decisões melhores começam com contexto.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
              Guias diretos sobre tecnologia, custos e estratégia para tirar projetos do papel com mais clareza.
            </p>
          </div>

          <ol className="mt-16 border-t border-divider md:mt-24">
            {posts.map((post, index) => {
              const projeto = post.caseSlug ? getProjeto(post.caseSlug) : undefined;

              return (
                <li key={post.slug} className="border-b border-divider">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative -mx-6 grid gap-5 px-6 py-10 transition-colors duration-300 hover:bg-card/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid-cols-12 md:gap-8 md:px-6 md:py-14"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:col-span-3 md:flex-col md:items-start md:gap-2">
                      <span className="font-heading text-3xl font-semibold leading-none text-accent tabular-nums md:text-5xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent md:mt-3">
                        {post.caseSlug && projeto ? `Bastidor · ${projeto.nome}` : "Guia"}
                      </span>
                      <span className="text-xs text-muted">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span aria-hidden="true"> · </span>
                        {post.readingTime} min de leitura
                      </span>
                    </div>
                    <div className="md:col-span-8">
                      <h2 className="font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.02em] transition-colors group-hover:text-accent md:text-[42px]">
                        {post.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
                        {post.description}
                      </p>
                      <p className="mt-5 text-xs text-muted">{post.tags.join(" / ")}</p>
                    </div>
                    <div className="hidden md:col-span-1 md:flex md:items-start md:justify-end">
                      <ArrowUpRight
                        className="-translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        size={24}
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
