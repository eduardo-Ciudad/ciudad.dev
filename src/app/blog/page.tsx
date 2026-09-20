import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-divider bg-divider md:mt-24 md:grid-cols-2">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className={`min-h-[330px] bg-card ${
                  index === 0 ? "md:col-span-2 md:min-h-[390px]" : ""
                }`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:p-10"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} min de leitura</span>
                  </div>
                  <h2 className={`mt-7 max-w-3xl font-heading font-semibold leading-[1.03] tracking-[-0.025em] transition-colors group-hover:text-accent ${index === 0 ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                    {post.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-6 text-muted md:text-base">{post.description}</p>
                  <div className="mt-auto flex items-end justify-between gap-6 pt-10">
                    <ul className="flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-divider px-3 py-1 text-[11px] text-muted">{tag}</li>
                      ))}
                    </ul>
                    <ArrowUpRight className="shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={22} aria-hidden="true" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
