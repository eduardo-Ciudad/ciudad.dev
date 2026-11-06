import type { ReactNode } from "react";
import Link from "next/link";
import { KELLY_STATS, KELLY_STATUS, KELLY_URL } from "@/data/kelly";
import { RADAR_STATS, RADAR_STATUS } from "@/data/radar";
import { PROJECT_CARD_HOVER_CLASS } from "./projetos/cardHover";
import { ScrollReveal } from "./ScrollReveal";
import { WindowFrame } from "./WindowFrame";

type ProdutoCardProps = {
  capa: ReactNode;
  rotulo: string;
  selo: ReactNode;
  titulo: string;
  descricao: string;
  blocoDoMeio: ReactNode;
  acoes: ReactNode;
};

export function ProdutoCard({ capa, rotulo, selo, titulo, descricao, blocoDoMeio, acoes }: ProdutoCardProps) {
  return (
    <article className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-black/8 bg-card ${PROJECT_CARD_HOVER_CLASS}`}>
      <div className="min-w-0 overflow-hidden border-b border-divider bg-card px-4 pt-5 sm:px-7 sm:pt-7">
        <div className="transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {capa}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pb-7 pt-6 sm:px-[30px] sm:pb-[30px] sm:pt-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{rotulo}</p>
          {selo}
        </div>
        <h3 className="font-heading text-[38px] font-semibold leading-none tracking-[-0.4px] text-primary">{titulo}</h3>
        <p className="text-[15.5px] leading-[1.65] text-primary/75">{descricao}</p>
        {blocoDoMeio}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">{acoes}</div>
      </div>
    </article>
  );
}

const competencias = [
  { rotulo: "C1", nota: 160, largura: "80%", cor: "#7db8ff" },
  { rotulo: "C2", nota: 160, largura: "80%", cor: "#b9a2fb" },
  { rotulo: "C3", nota: 80, largura: "40%", cor: "#4fd1b5", prioridade: true },
  { rotulo: "C4", nota: 160, largura: "80%", cor: "#f5b94a" },
  { rotulo: "C5", nota: 160, largura: "80%", cor: "#f58db0" },
] as const;

export function KellyTelaIlustrativa() {
  return (
    <WindowFrame variant="card-cover" address="kellyacademy.com.br/redacoes" role="img" aria-label="Tela ilustrativa da Kelly Academy com a nota de uma redação por competência e o trecho que segurou a nota">
      <div aria-hidden="true" className="flex h-[340px] min-w-0 overflow-hidden bg-kelly-bg font-kelly-body text-kelly-text">
        <aside className="hidden w-[124px] shrink-0 flex-col gap-2.5 border-r border-kelly-border px-2.5 py-3 sm:flex">
          <div className="flex min-w-0 items-baseline gap-1.5 whitespace-nowrap"><span className="font-kelly-display text-[15px] font-normal tracking-[-0.03em]">ke<span className="text-[#2f5bff]">ll</span>y</span><span className="font-kelly-mono text-[6.5px] tracking-[0.18em] text-kelly-text-3">ACADEMY</span></div>
          <span className="flex h-6 items-center justify-center rounded-full bg-[#2f5bff] text-[9.5px] font-semibold text-white">+ Nova redação</span>
          <nav className="flex flex-col gap-1 text-[10px]"><span className="flex h-6 items-center rounded-md bg-[#1d2240] px-2 font-medium text-kelly-text">Suas redações</span>{["Temas", "Repertório", "Evolução"].map((item) => <span key={item} className="flex h-6 items-center px-2 text-kelly-text-2">{item}</span>)}</nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-[9px] px-3.5 py-3">
          <section className="flex min-w-0 gap-3 rounded-xl bg-kelly-surface p-3">
            <div className="relative size-[62px] shrink-0"><svg viewBox="0 0 62 62" className="size-[62px] -rotate-90" aria-hidden="true"><circle cx="31" cy="31" r="26" fill="none" stroke="#2c2f42" strokeWidth="5" /><circle cx="31" cy="31" r="26" fill="none" stroke="#2f5bff" strokeWidth="5" strokeLinecap="round" pathLength="100" strokeDasharray="72 100" /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="font-kelly-display text-[18px] font-light leading-none">720</span><span className="mt-0.5 text-[7px] text-kelly-text-3">de 1000</span></div></div>
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-2"><span className="shrink-0 rounded-full bg-kelly-tint px-2 py-0.5 text-[8.5px] font-semibold text-kelly-accent-text">Prática</span><span className="truncate text-[8.5px] text-kelly-text-3">Tema de exemplo</span></div>
              <p className="mt-1 truncate font-kelly-display text-[13px] font-light">Desafios para a formação educacional de surdos no Brasil</p>
              <div className="mt-2 grid grid-cols-5 gap-[5px]">{competencias.map((competencia) => <div key={competencia.rotulo} className={`min-w-0 rounded-lg bg-kelly-border p-1.5 ${"prioridade" in competencia ? "border-[1.5px] border-kelly-warning" : "border-[1.5px] border-transparent"}`}><div className="flex min-w-0 items-center justify-between gap-0.5 text-[9px] font-bold"><span>{competencia.rotulo}</span><span className="truncate font-kelly-mono">{competencia.nota}</span></div><span className="mt-1 block h-[3px] overflow-hidden rounded-full bg-[#2c2f42]"><span className="block h-full rounded-full" style={{ width: competencia.largura, backgroundColor: competencia.cor }} /></span></div>)}</div>
            </div>
          </section>
          <section className="flex min-w-0 items-center gap-2.5 rounded-xl bg-kelly-surface px-3 py-2.5"><span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-kelly-tint text-kelly-accent-text"><svg viewBox="0 0 18 18" className="size-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"><path d="M9 1.8c.45 3.7 2.5 5.75 6.2 6.2C11.5 8.45 9.45 10.5 9 14.2 8.55 10.5 6.5 8.45 2.8 8 6.5 7.55 8.55 5.5 9 1.8Z" /><path d="M14.2 12.1c.14 1.12.76 1.74 1.88 1.88-1.12.14-1.74.76-1.88 1.88-.14-1.12-.76-1.74-1.88-1.88 1.12-.14 1.74-.76 1.88-1.88Z" /></svg></span><div className="min-w-0 leading-tight"><p className="text-[10px] font-medium">Diagnóstico da IA</p><p className="mt-1 truncate text-[9.5px] text-[#cfd2dd]">Sua maior fragilidade está na C3: os argumentos são pertinentes, mas pouco desenvolvidos.</p></div></section>
          <section className="hidden min-h-0 flex-1 rounded-xl bg-kelly-surface p-[5px] min-[400px]:block">
            <div className="rounded-[9px] bg-kelly-border px-2.5 py-2"><div className="grid min-w-0 grid-cols-[20px_minmax(0,1fr)_auto_auto] items-center gap-2"><span className="flex size-5 items-center justify-center rounded bg-kelly-c3-bg text-[8.5px] font-semibold text-kelly-c3">C3</span><span className="truncate text-[9.5px] font-medium">Seleção e organização de argumentos</span><span className="rounded-full bg-[#2a2415] px-1.5 py-0.5 text-[7.5px] font-semibold text-kelly-warning">Prioridade</span><span className="whitespace-nowrap font-kelly-mono text-[9.5px]">80<span className="text-kelly-text-3">/200</span></span><span aria-hidden="true" /><span className="truncate text-[9px] text-[#cfd2dd]">O segundo desenvolvimento repete a ideia do primeiro.</span><span className="col-span-2 whitespace-nowrap rounded-full border border-[#3d6bb3] bg-kelly-tint px-2 py-1 text-[8.5px] font-semibold text-[#cfe1ff]">Perguntar à Júlia</span></div></div>
            <div className="grid min-w-0 grid-cols-[20px_minmax(0,1fr)_auto] items-center gap-2 px-2.5 py-2"><span className="flex size-5 items-center justify-center rounded bg-kelly-c4-bg text-[8.5px] font-semibold text-kelly-c4">C4</span><span className="truncate text-[9.5px] font-medium">Mecanismos de coesão</span><span className="whitespace-nowrap font-kelly-mono text-[9.5px]">160<span className="text-kelly-text-3">/200</span></span></div>
          </section>
        </div>
      </div>
    </WindowFrame>
  );
}

const indicadores = [
  { rotulo: "SESSÕES", valor: "1.284", variacao: "+18%", cor: "text-[#15803D]" },
  { rotulo: "NOVOS", valor: "962", variacao: "+12%", cor: "text-[#15803D]" },
  { rotulo: "WHATSAPP", valor: "41", variacao: "−6%", cor: "text-[#B45309]" },
  { rotulo: "CONVERSÕES", valor: "19", variacao: "−3", cor: "text-[#B45309]" },
] as const;

export function RadarTelaIlustrativa() {
  return (
    <WindowFrame variant="card-cover" address="radar.ciudadlab.com.br" role="img" aria-label="Tela ilustrativa do Radar com o resumo do mês, indicadores e o gráfico de sessões">
      <div aria-hidden="true" className="flex h-[340px] min-w-0 overflow-hidden bg-surface text-primary">
        <aside className="hidden w-[118px] shrink-0 border-r border-black/7 px-3 py-4 sm:block">
          <p className="mb-6 font-heading text-[15px] font-bold">Ciudad<span className="text-accent">Lab</span></p>
          <nav className="flex flex-col gap-1 text-[10.5px] text-[#5A5A5A]">
            <span className="px-2.5 py-2">Sites</span><span className="rounded-md border border-black/6 bg-white px-2.5 py-2 font-semibold text-primary">Analytics</span><span className="px-2.5 py-2">Leads</span>
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4 sm:px-[18px]">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-heading text-[22px] font-semibold">seusite.com.br</p>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[rgba(21,128,61,0.09)] px-2 py-1 text-[9.5px] text-[#15803D]"><span className="size-[5px] rounded-full bg-[#15803D]" />GA conectado</span>
          </div>
          <div className="rounded-[9px] bg-white px-3 py-2.5"><p className="text-[8.5px] font-semibold tracking-[0.9px] text-accent">LEITURA DO RADAR</p><p className="mt-1 font-heading text-[14px] font-semibold leading-tight">A busca no Google puxou o mês. O ponto de atenção são os cliques no WhatsApp, que não acompanharam.</p></div>
          <div className="grid grid-cols-4 gap-1.5">
            {indicadores.map((indicador) => <div key={indicador.rotulo} className="min-w-0 rounded-[9px] bg-white px-2 py-2"><p className="truncate text-[8.5px] text-[#6B6B6B]">{indicador.rotulo}</p><p className="text-[17px] font-semibold leading-tight tabular-nums">{indicador.valor}</p><p className={`text-[9.5px] font-semibold ${indicador.cor}`}>{indicador.variacao}</p></div>)}
          </div>
          <div className="flex min-h-0 flex-1 flex-col rounded-[9px] bg-white px-3 pb-2 pt-2.5">
            <p className="text-[9.5px] font-semibold text-[#5A5A5A]">Sessões por dia</p>
            <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="mt-2 min-h-0 w-full flex-1" aria-hidden="true">
              <path d="M0 76 L28 70 L54 73 L82 61 L110 65 L138 51 L165 56 L194 39 L220 44 L249 27 L275 32 L300 17 L300 90 L0 90 Z" fill="rgba(37,99,235,0.08)" />
              <path d="M0 82 L28 77 L54 79 L82 70 L110 72 L138 61 L165 65 L194 52 L220 57 L249 44 L275 46 L300 35" fill="none" stroke="#9A9A9A" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
              <path d="M0 76 L28 70 L54 73 L82 61 L110 65 L138 51 L165 56 L194 39 L220 44 L249 27 L275 32 L300 17" fill="none" stroke="#2563EB" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export function RadarTelaCase() {
  return (
    <figure>
      <WindowFrame
        address="radar.ciudadlab.com.br"
        role="img"
        aria-label="Tela ilustrativa do Radar com a leitura do mês, indicadores e o gráfico de sessões de uma loja fictícia"
        className={`group/radar-window ${PROJECT_CARD_HOVER_CLASS}`}
      >
        <div aria-hidden="true" className="flex min-w-0 bg-surface text-primary">
          <aside className="hidden w-[168px] shrink-0 border-r border-black/7 px-5 py-7 min-[720px]:block">
            <p className="mb-9 font-heading text-[17px] font-bold">CiudadLab <span className="text-accent">RADAR</span></p>
            <nav className="flex flex-col gap-1 text-[12px] text-[#5A5A5A]">
              <span className="px-3 py-2.5">Sites</span>
              <span className="rounded-md border border-black/6 bg-white px-3 py-2.5 font-semibold text-primary">Analytics</span>
              <span className="px-3 py-2.5">Leads</span>
            </nav>
          </aside>
          <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="font-heading text-[26px] font-semibold leading-none sm:text-[30px]">atelieexemplo.com.br</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-[rgba(21,128,61,0.09)] px-2.5 py-1 text-[10px] font-medium text-[#15803D]"><span className="size-[6px] rounded-full bg-[#15803D]" />GA conectado</span>
                </div>
                <p className="mt-2 text-[11px] text-[#6B6B6B]">Sincronizado hoje às 06:00</p>
              </div>
              <div className="flex w-fit shrink-0 rounded-full border border-black/8 bg-white p-1 text-[10px] font-medium text-[#6B6B6B]">
                <span className="rounded-full px-2.5 py-1.5 transition-colors duration-150 hover:bg-black/6">7 dias</span><span className="rounded-full bg-primary px-2.5 py-1.5 text-white">28 dias</span><span className="rounded-full px-2.5 py-1.5 transition-colors duration-150 hover:bg-black/6">90 dias</span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1.55fr)_minmax(190px,0.85fr)]">
              <div className="rounded-xl bg-white p-4 sm:p-5">
                <p className="text-[9px] font-semibold tracking-[1.1px] text-accent">LEITURA DO RADAR</p>
                <p className="mt-2 font-heading text-[18px] font-semibold leading-[1.25] sm:text-[21px]">O Instagram trouxe mais gente do que o Google neste mês. Quem chega pela página de vestidos fica mais tempo, mas quase ninguém clica no WhatsApp.</p>
              </div>
              <div className="rounded-xl border border-[#F3D09B] bg-[#FFF4E5] p-4 transition-colors duration-200 ease-out hover:border-[#E7B66A] hover:bg-[#FFEFD6] sm:p-5">
                <p className="text-[9px] font-semibold tracking-[1.1px] text-[#B45309]">ATENÇÃO</p>
                <p className="mt-2 text-[13px] font-semibold leading-[1.45] text-[#7A4E00]">/vestidos teve 412 visitas e só 6 cliques no WhatsApp.</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {[
                ["SESSÕES", "1.284", "+18%", "text-[#15803D]"],
                ["NOVOS VISITANTES", "962", "+12%", "text-[#15803D]"],
                ["CLIQUES NO WHATSAPP", "41", "−6%", "text-[#B45309]"],
                ["PEDIDOS DE ORÇAMENTO", "19", "−3", "text-[#B45309]"],
              ].map(([rotulo, valor, variacao, cor]) => (
                <div key={rotulo} className="min-w-0 rounded-xl border border-transparent bg-white p-3 transition-[translate,border-color,background-color] duration-250 ease-out hover:-translate-y-1 hover:border-[rgba(37,99,235,0.45)] hover:bg-[rgba(37,99,235,0.03)] motion-reduce:hover:translate-y-0 sm:p-4">
                  <p className="truncate text-[8.5px] font-medium tracking-[0.3px] text-[#6B6B6B] sm:text-[9px]">{rotulo}</p>
                  <p className="mt-1 text-[22px] font-semibold leading-none tabular-nums sm:text-[26px]">{valor}</p>
                  <p className={`mt-2 text-[10px] font-semibold ${cor}`}>{variacao} <span className="font-normal text-[#7A7A7A]">vs. mês anterior</span></p>
                </div>
              ))}
            </div>

            <div className="group/chart mt-3 rounded-xl bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-[#5A5A5A]">Sessões por dia</p>
                <div className="flex flex-wrap gap-3 text-[9px] text-[#6B6B6B]"><span className="flex items-center gap-1.5"><i className="block h-[2px] w-5 bg-[#2563EB]" />Últimos 28 dias</span><span className="flex items-center gap-1.5"><i className="block w-5 border-t border-dashed border-[#9A9A9A]" />Período anterior</span></div>
              </div>
              <div className="relative mt-4 h-[130px] w-full">
                <svg viewBox="0 0 640 150" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                  <path className="fill-[rgba(37,99,235,0.07)] transition-[fill] duration-250 ease-out group-hover/chart:fill-[rgba(37,99,235,0.16)]" d="M0 126 L58 116 L115 122 L174 98 L232 106 L292 78 L350 88 L410 57 L468 68 L528 38 L586 47 L640 22 L640 150 L0 150 Z" />
                  <path d="M0 136 L58 128 L115 131 L174 116 L232 120 L292 100 L350 108 L410 86 L468 94 L528 71 L586 75 L640 59" fill="none" stroke="#9A9A9A" strokeWidth="1.4" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
                  <path d="M0 126 L58 116 L115 122 L174 98 L232 106 L292 78 L350 88 L410 57 L468 68 L528 38 L586 47 L640 22" fill="none" stroke="#2563EB" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <line x1="410" y1="57" x2="410" y2="150" stroke="#2563EB" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="opacity-0 transition-opacity duration-250 ease-out group-hover/chart:opacity-100" />
                </svg>
                <span className="pointer-events-none absolute left-[64.0625%] top-[38%] size-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2563EB] bg-white opacity-0 transition-opacity duration-250 ease-out group-hover/chart:opacity-100" />
                <span className="pointer-events-none absolute left-[64.0625%] top-[38%] -translate-x-1/2 -translate-y-[calc(100%+10px)]">
                  <span className="block translate-y-[6px] whitespace-nowrap rounded-lg bg-[#1A1A1A] px-2.5 py-1.5 text-[11.5px] text-white opacity-0 transition-[opacity,translate] duration-250 ease-out group-hover/chart:translate-y-0 group-hover/chart:opacity-100 motion-reduce:translate-y-0">22/10 · 61 sessões</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </WindowFrame>
      <figcaption className="mt-3 text-[13px] text-[#6B6B6B]">Tela ilustrativa com uma loja fictícia e dados de exemplo.</figcaption>
    </figure>
  );
}

export function ProdutoKelly() {
  return (
    <section id="kelly-academy" aria-labelledby="produto-titulo" className="bg-surface px-6 py-20 md:pb-28 md:pt-[104px]">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal><header className="mx-auto flex max-w-[720px] flex-col items-center text-center"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Produtos próprios</p><h2 id="produto-titulo" className="mt-3 text-balance font-heading text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.8px] text-primary">Não é só portfólio. São produtos rodando.</h2><p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted">A Kelly Academy e o Radar foram idealizados, construídos e são mantidos pela CiudadLab. O mesmo cuidado que vai para o seu projeto.</p></header></ScrollReveal>
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-7">
          <ScrollReveal className="h-full">
            <ProdutoCard capa={<KellyTelaIlustrativa />} rotulo="Correção de redação do ENEM" selo={<span className="rounded-full bg-[#FBF1DC] px-2.5 py-1 text-xs font-semibold text-[#7A4E00]">{KELLY_STATUS}</span>} titulo="Kelly Academy" descricao="Plataforma de treino para a redação do ENEM. Corrige competência por competência, aponta o trecho que segurou a nota e mostra o que treinar a seguir." blocoDoMeio={<dl className="grid grid-cols-3 border-y border-divider py-5">{KELLY_STATS.map((stat, index) => <div key={stat.rotulo} className={index === 0 ? "pr-2" : "border-l border-divider px-2 sm:px-4"}><dt className="font-heading text-[40px] font-semibold leading-none tabular-nums text-primary">{stat.valor}</dt><dd className="mt-2 text-[13px] leading-tight text-muted">{stat.rotulo}</dd></div>)}</dl>} acoes={<><Link href="/projetos/kelly-academy" className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-card transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Ver o case completo <span aria-hidden="true" className="ml-1">→</span></Link><a href={KELLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Conhecer a Kelly <span aria-hidden="true" className="ml-1">↗</span></a></>} />
          </ScrollReveal>
          <ScrollReveal className="h-full" delay={0.08}>
            <ProdutoCard capa={<RadarTelaIlustrativa />} rotulo="Analytics em português" selo={<div className="flex gap-1.5"><span className="rounded-full bg-[#E7F2EA] px-2.5 py-1 text-xs font-semibold text-[#1F6B3A]">{RADAR_STATUS}</span><span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">Incluso no pós-entrega</span></div>} titulo="Radar CiudadLab" descricao="Painel que lê o Google Analytics do seu site e te conta, em português, o que trouxe cliente e o que precisa mudar." blocoDoMeio={<dl className="grid grid-cols-3 border-y border-divider py-5">{RADAR_STATS.map((stat, index) => <div key={stat.rotulo} className={index === 0 ? "pr-2" : "border-l border-divider px-2 sm:px-4"}><dt className={`font-heading font-semibold leading-none tabular-nums text-primary ${stat.valor === "7·28·90" ? "text-[34px]" : "text-[40px]"}`}>{stat.valor}</dt><dd className="mt-2 text-[13px] leading-tight text-muted">{stat.rotulo}</dd></div>)}</dl>} acoes={<><Link href="/projetos/radar" className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-card transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Ver o case completo <span aria-hidden="true" className="ml-1">→</span></Link><Link href="/radar" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Conhecer o Radar</Link></>} />
          </ScrollReveal>
        </div>
        <p className="mt-4 text-[12.5px] text-muted">Telas ilustrativas, com dados de exemplo.</p>
      </div>
    </section>
  );
}
