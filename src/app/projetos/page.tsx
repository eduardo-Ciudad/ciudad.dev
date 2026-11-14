import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { RadarTelaConteudo } from "@/components/ProdutoKelly";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CaseClienteCard } from "@/components/projetos/CaseClienteCard";
import { EntregaCard } from "@/components/projetos/EntregaCard";
import { LaboratorioCard } from "@/components/projetos/LaboratorioCard";
import { ProdutoCard } from "@/components/projetos/ProdutoCard";
import { SecaoCabecalho } from "@/components/projetos/SecaoCabecalho";
import { projetos } from "@/data/projetos";
import { PRODUTO_PROVAS } from "@/data/produtos-provas";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";

export const metadata: Metadata = {
  title: "Projetos | CiudadLab",
  description: "Cases de clientes, produtos próprios e projetos autorais desenvolvidos pela CiudadLab.",
};

const clientes = projetos.filter((projeto) => projeto.grupo === "cliente");
const produtos = projetos.filter((projeto) => projeto.grupo === "produto");
const entregas = projetos.filter((projeto) => projeto.grupo === "entrega");
const laboratorio = projetos.filter((projeto) => projeto.grupo === "laboratorio");
const kelly = produtos.find((projeto) => projeto.slug === "kelly-academy")!;
const radar = produtos.find((projeto) => projeto.slug === "radar")!;

const atalhos = [
  { label: "Cases de clientes", href: "#cases", count: clientes.length, principal: true },
  { label: "Produtos próprios", href: "#produtos", count: produtos.length },
  { label: "Mais entregas", href: "#entregas", count: entregas.length },
  { label: "Laboratório", href: "#laboratorio", count: laboratorio.length },
];

export default function ProjetosPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-surface">
      <Navbar />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-24 md:pt-36">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Portfólio</p>
            <h1 className="mt-4 max-w-[820px] text-balance font-heading text-[44px] font-semibold leading-[1.02] tracking-[-1px] md:text-[76px]">Projetos que já saíram do papel</h1>
            <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-muted">Primeiro o trabalho feito para clientes, com o problema, o que foi construído e o resultado. Depois os produtos que a CiudadLab mantém e os projetos de laboratório.</p>
            <nav aria-label="Seções da página" className="mt-8 flex flex-wrap gap-3">
              {atalhos.map((atalho) => (
                <a key={atalho.href} href={atalho.href} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${atalho.principal ? "bg-primary text-card hover:bg-primary/85" : "border border-black/15 text-primary hover:bg-card"}`}>
                  {atalho.label}<span className={atalho.principal ? "text-card/65" : "text-muted"}>{atalho.count}</span>
                </a>
              ))}
            </nav>
          </ScrollReveal>
        </section>

        <section id="cases" className="mx-auto max-w-6xl scroll-mt-24 px-6">
          <SecaoCabecalho eyebrow="Trabalho para clientes" titulo="Cases de clientes" apoio="Projetos pagos, em produção, com o case completo contado do problema ao resultado." />
          <div className="mt-9 grid grid-cols-1 gap-7 md:grid-cols-2">
            {clientes.map((projeto, index) => <ScrollReveal key={projeto.slug} delay={Math.min(index * 0.05, 0.2)} className="h-full"><CaseClienteCard projeto={projeto} /></ScrollReveal>)}
          </div>
        </section>

        <section id="produtos" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-6 md:mt-32">
          <SecaoCabecalho eyebrow="Produtos próprios" titulo="Não é só portfólio. São produtos rodando." apoio="Idealizados, construídos e mantidos pela CiudadLab, com o mesmo cuidado de um projeto de cliente." />
          <div className="mt-9 grid grid-cols-1 gap-7 md:grid-cols-2">
            <ScrollReveal className="h-full">
              <ProdutoCard
                projeto={kelly}
                provas={PRODUTO_PROVAS["kelly-academy"]}
                linkProduto={{
                  label: "kellyacademy.com.br",
                  href: kelly.ctaPrincipal?.url ?? "",
                  externo: true,
                }}
              />
            </ScrollReveal>
            <ScrollReveal className="h-full" delay={0.08}>
              <ProdutoCard
                projeto={radar}
                capa={
                  <div role="img" aria-label="Tela ilustrativa do Radar com o resumo do mês, indicadores e o gráfico de sessões" className="h-full">
                    <RadarTelaConteudo className="h-full" />
                  </div>
                }
                provas={PRODUTO_PROVAS.radar}
                linkProduto={{ label: "Conhecer o Radar", href: "/radar" }}
              />
            </ScrollReveal>
          </div>
          <p className="mt-4 text-[12.5px] text-muted">Telas ilustrativas, com dados de exemplo.</p>
        </section>

        <section id="entregas" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-6 md:mt-32">
          <SecaoCabecalho tamanho="medio" eyebrow="Em uso" titulo="Mais entregas" apoio="Projetos menores, no ar e em uso por quem pediu." />
          <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
            {entregas.map((projeto, index) => <ScrollReveal key={projeto.slug} delay={index * 0.08} className="h-full"><EntregaCard projeto={projeto} /></ScrollReveal>)}
          </div>
        </section>

        <section id="laboratorio" className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-6 md:mt-32">
          <SecaoCabecalho tamanho="medio" eyebrow="Laboratório" titulo="Projetos autorais" apoio="Onde testamos stack, arquitetura e ideias antes de levar para um cliente. Código aberto no GitHub." />
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {laboratorio.map((projeto, index) => <ScrollReveal key={projeto.slug} delay={Math.min(index * 0.04, 0.2)} className="h-full"><LaboratorioCard projeto={projeto} /></ScrollReveal>)}
          </div>
        </section>

        <section className="mx-auto mb-28 mt-28 max-w-6xl px-6">
          <ScrollReveal>
            <div className="rounded-[22px] bg-card px-6 py-12 text-center md:px-10 md:py-16">
              <h2 className="font-heading text-[36px] font-semibold leading-none md:text-[48px]">Quer construir algo parecido?</h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted">Conta o que você precisa. Respondo em até 24h com escopo, prazo e valor definidos.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <WhatsAppLink href={WHATSAPP_CONTACT_URL} location="projeto" className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Falar no WhatsApp <span aria-hidden="true" className="ml-1">↗</span></WhatsAppLink>
                <Link href="/#servicos" className="inline-flex min-h-11 items-center rounded-full border border-black/15 px-6 text-sm font-semibold text-primary transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Ver serviços e preços</Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
