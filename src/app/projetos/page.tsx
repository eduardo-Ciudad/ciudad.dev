import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ProjetosGrid } from "@/components/ProjetosGrid";
import { ProdutoDestaqueCard } from "@/components/ProdutoDestaqueCard";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { projetos } from "@/data/projetos";

export const metadata: Metadata = {
  title: "Projetos | CiudadLab",
  description: "Projetos fullstack e landing pages desenvolvidos pela CiudadLab.",
};

const categoriaCarousel = {
  fullstack: "Projeto fullstack",
  "ferramenta-interna": "Ferramenta interna",
  "landing-page": "Landing page",
  produto: "Produto próprio",
} as const;

const slides: CoverflowSlide[] = projetos
  .filter((projeto) => projeto.categoria !== "produto" && projeto.destaque && projeto.imagem)
  .map((projeto) => ({
    src: projeto.imagem!,
    alt: `Preview do projeto ${projeto.nome}`,
    title: projeto.nome,
    subtitle: categoriaCarousel[projeto.categoria],
    targetId: projeto.slug,
  }));

const produtos = projetos.filter((projeto) => projeto.categoria === "produto");

export default function ProjetosPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36">
        <section className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Portfólio</span>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-[-1px] md:text-6xl">Projetos que já saíram do papel</h1>
          </div>
          {produtos.map((projeto) => (
            <ProdutoDestaqueCard key={projeto.slug} projeto={projeto} />
          ))}
          <CoverflowCarousel
            slides={slides}
            showCaption
            showPagination
            showNavigation
            className="mt-8 md:mt-12"
            cardWidth="clamp(148px, 34vw, 280px)"
          />
        </section>

        <div className="mx-auto mt-24 max-w-6xl px-6 md:mt-32">
          <ProjetosGrid projetos={projetos} />
        </div>
      </main>
    </>
  );
}
