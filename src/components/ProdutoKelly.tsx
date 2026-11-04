import type { ReactNode } from "react";
import Link from "next/link";
import { KELLY_STATS, KELLY_STATUS, KELLY_URL } from "@/data/kelly";
import { PROJECT_CARD_HOVER_CLASS } from "./projetos/cardHover";
import { ScrollReveal } from "./ScrollReveal";

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
      <div className="min-w-0 overflow-hidden bg-[var(--color-cover)] px-4 pt-5 sm:px-7 sm:pt-7">
        <div className="transition-[scale] duration-400 ease-[ease] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
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

function BrowserFrame({ variant, address, label, children }: { variant: "dark" | "light"; address: string; label: string; children: ReactNode }) {
  const dark = variant === "dark";
  return (
    <div role="img" aria-label={label} className="min-w-0 overflow-hidden rounded-t-[10px] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.05)]">
      <div aria-hidden="true" className={`relative flex h-7 items-center px-3 ${dark ? "bg-[#1A1D27]" : "bg-[#FBFAF7]"}`}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((dot) => <span key={dot} className={`size-2 rounded-full ${dark ? "bg-[#3A3E50]" : "bg-[#D6CFC2]"}`} />)}
        </div>
        <span className={`absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate rounded-full px-3 py-0.5 text-[10.5px] ${dark ? "bg-[#232736] text-[#7C8196]" : "bg-[#F1ECE3] text-[#8A8A8A]"}`}>{address}</span>
      </div>
      <div aria-hidden="true" className="h-[340px] min-w-0 overflow-hidden">{children}</div>
    </div>
  );
}

const competencias = [
  { rotulo: "C1", nota: 160, largura: "80%", cor: "#7EA6FF" },
  { rotulo: "C2", nota: 140, largura: "70%", cor: "#B8A4F2" },
  { rotulo: "C3", nota: 120, largura: "60%", cor: "#5FD3B4" },
  { rotulo: "C4", nota: 180, largura: "90%", cor: "#F2C14E" },
  { rotulo: "C5", nota: 160, largura: "80%", cor: "#F28AA6" },
] as const;

export function KellyTelaIlustrativa() {
  return (
    <BrowserFrame variant="dark" address="kellyacademy.com.br/redacoes" label="Tela ilustrativa da Kelly Academy com a nota de uma redação por competência e o trecho que segurou a nota">
      <div className="flex h-full min-w-0 bg-[#0F1117] font-body text-[#E6E8EF]">
        <aside className="hidden w-[118px] shrink-0 border-r border-white/6 px-3 py-4 sm:block">
          <p className="mb-6 text-[13px] font-light tracking-[0.08em]">ke<span className="text-[#7C91FF]">ll</span>y</p>
          <nav className="flex flex-col gap-1 text-[10.5px]">
            <span className="rounded-md bg-[#1E2335] px-2.5 py-2 font-semibold">Redações</span>
            {["Temas", "Repertório", "Evolução"].map((item) => <span key={item} className="px-2.5 py-2 text-[#8B90A3]">{item}</span>)}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:px-[18px]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-code text-[9px] tracking-[1.4px] text-[#7C8196]">RESULTADO DA CORREÇÃO</p>
              <p className="mt-1 truncate text-[11.5px] text-[#C9CCD8]">Tema: exemplo ilustrativo</p>
            </div>
            <p className="shrink-0 text-[32px] leading-none text-white">760<span className="text-[10.5px] text-[#7C8196]">/1000</span></p>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col justify-center gap-3 rounded-[9px] border border-white/5 bg-[#161925] px-3 py-3">
              {competencias.map((competencia) => (
                <div key={competencia.rotulo} className="grid grid-cols-[20px_1fr_28px] items-center gap-2 text-[10.5px]">
                  <span style={{ color: competencia.cor }}>{competencia.rotulo}</span>
                  <span className="h-[5px] overflow-hidden rounded-full bg-white/7"><span className="block h-full rounded-full" style={{ width: competencia.largura, backgroundColor: competencia.cor }} /></span>
                  <span className="text-right tabular-nums text-[#B9BDCB]">{competencia.nota}</span>
                </div>
              ))}
            </div>
            <div className="hidden rounded-[9px] bg-[#F4F1EA] p-3 font-serif text-[10.5px] leading-[1.6] text-[#2B2B2B] sm:block">
              <p className="mb-2 font-body text-[9px] font-semibold text-[#8A8A8A]">2º PARÁGRAFO</p>
              <p>Além disso, é evidente que a maioria da população enfrenta esse problema no dia a dia, <span className="border-b-[1.5px] border-[#D9A21B] bg-[rgba(242,193,78,0.45)]">o que demonstra a gravidade da situação no país</span>, exigindo ações imediatas.</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-[9px] bg-[#1B2036] px-3 py-2.5 text-[11px] leading-snug">
            <p className="min-w-0 text-[#D5D8E3]"><strong className="font-semibold text-[#A9BCFF]">Treine a seguir: C3.</strong> O trecho afirma sem comprovar. Use um repertório do eixo do tema.</p>
            <span className="hidden shrink-0 rounded-full bg-[#7C91FF] px-2.5 py-1 text-[10px] font-semibold text-[#0F1117] sm:inline">Perguntar à Júlia</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
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
    <BrowserFrame variant="light" address="radar.ciudadlab.com.br" label="Tela ilustrativa do Radar com o resumo do mês, indicadores e o gráfico de sessões">
      <div className="flex h-full min-w-0 bg-surface text-primary">
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
    </BrowserFrame>
  );
}

export function ProdutoKelly() {
  return (
    <section id="kelly-academy" aria-labelledby="produto-titulo" className="bg-surface px-6 py-20 md:pb-28 md:pt-[104px]">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal><header className="mx-auto flex max-w-[720px] flex-col items-center text-center"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Produto próprio</p><h2 id="produto-titulo" className="mt-3 text-balance font-heading text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.8px] text-primary">Não é só portfólio. É produto rodando.</h2><p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-muted">A Kelly Academy foi idealizada, construída e é mantida pela CiudadLab. O mesmo cuidado que vai para o seu projeto.</p></header></ScrollReveal>
        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-7">
          <ScrollReveal className="h-full">
            <ProdutoCard capa={<KellyTelaIlustrativa />} rotulo="Correção de redação do ENEM" selo={<span className="rounded-full bg-[#FBF1DC] px-2.5 py-1 text-xs font-semibold text-[#7A4E00]">{KELLY_STATUS}</span>} titulo="Kelly Academy" descricao="Plataforma de treino para a redação do ENEM. Corrige competência por competência, aponta o trecho que segurou a nota e mostra o que treinar a seguir." blocoDoMeio={<dl className="grid grid-cols-3 border-y border-divider py-5">{KELLY_STATS.map((stat, index) => <div key={stat.rotulo} className={index === 0 ? "pr-2" : "border-l border-divider px-2 sm:px-4"}><dt className="font-heading text-[40px] font-semibold leading-none tabular-nums text-primary">{stat.valor}</dt><dd className="mt-2 text-[13px] leading-tight text-muted">{stat.rotulo}</dd></div>)}</dl>} acoes={<><Link href="/projetos/kelly-academy" className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-card transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Ver o case completo <span aria-hidden="true" className="ml-1">→</span></Link><a href={KELLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Conhecer a Kelly <span aria-hidden="true" className="ml-1">↗</span></a></>} />
          </ScrollReveal>
          <ScrollReveal className="h-full" delay={0.08}>
            <ProdutoCard capa={<RadarTelaIlustrativa />} rotulo="Analytics em português" selo={<span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">Incluso no pós-entrega</span>} titulo="Radar CiudadLab" descricao="Painel que lê o Google Analytics do seu site e te conta o que importa, sem precisar entender de métricas." blocoDoMeio={<ul className="flex flex-col gap-2.5 border-t border-divider pt-[18px] text-[14.5px] leading-relaxed text-primary/75">{["Vem configurado em todo projeto da CiudadLab", "90 dias de leitura mensal dos números depois da entrega"].map((item) => <li key={item} className="flex gap-2.5"><span aria-hidden="true" className="font-semibold text-accent">✓</span><span>{item}</span></li>)}</ul>} acoes={<Link href="/radar" className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/16 px-5 text-sm font-semibold text-primary transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Conhecer o Radar <span aria-hidden="true" className="ml-1">→</span></Link>} />
          </ScrollReveal>
        </div>
        <p className="mt-4 text-[12.5px] text-muted">Telas ilustrativas, com dados de exemplo.</p>
      </div>
    </section>
  );
}
