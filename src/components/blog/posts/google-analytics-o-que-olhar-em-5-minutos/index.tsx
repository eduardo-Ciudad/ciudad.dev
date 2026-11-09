import type { ReactNode } from "react";
import { JanelaMac, Marcador, Resumo } from "../../editorial";
import { Contador, RevelarGrupo, RevelarItem } from "@/components/blog/editorial/motion";
import type { PostExtras } from "../types";
import { BarraOrigem, CirculoNumero, GraficoGa4, MarcadorSpring, RoteiroAnimado, SetaAnimada } from "./motion";

const metricas = [
  { rotulo: "Usuários", valor: "1.284", variacao: "+18%", destaque: true },
  { rotulo: "Novos usuários", valor: "962", variacao: "+12%" },
  { rotulo: "Sessões", valor: "1.540", variacao: "+15%" },
  { rotulo: "Tempo médio", valor: "1m 12s", variacao: "+4%" },
];

const pontos = [40, 52, 46, 58, 55, 66, 61, 70, 64, 76, 72, 84];
const largura = 420;
const altura = 124;
function CardPainel({ titulo, marcador, className = "", children }: { titulo: string; marcador?: number; className?: string; children: ReactNode }) {
  return (
    <section className={`relative rounded-[10px] border bg-card p-4 ${marcador ? "border-accent" : "border-divider"} ${className}`}>
      {marcador && <MarcadorSpring indice={marcador - 1}><Marcador n={marcador} /></MarcadorSpring>}
      <h3 className="text-[13px] font-semibold text-primary">{titulo}</h3>
      {children}
    </section>
  );
}

export function CapaGa4() {
  const menu = ["Início", "Relatórios", "Aquisição", "Engajamento", "Monetização", "Explorar"];
  const origens = [["google / organic", 46], ["instagram / social", 31], ["(direct) / (none)", 18]] as const;

  return (
    <figure>
      <JanelaMac tom="claro" endereco="analytics.google.com">
        <div className="flex min-h-[420px] bg-cover">
          <aside className="hidden w-[170px] shrink-0 border-r border-divider bg-card px-3 py-[22px] md:block">
            <nav aria-label="Navegação ilustrativa do Google Analytics">
              <ul className="space-y-1 text-[13px] text-muted">
                {menu.map((item) => <li key={item} className={item === "Aquisição" ? "rounded-lg bg-accent-light px-3 py-2 font-semibold text-accent" : "px-3 py-2"}>{item}</li>)}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 flex-1 space-y-4 px-3 py-[18px] md:px-6 md:py-[22px]">
            <header className="hidden items-center justify-between gap-4 md:flex">
              <h2 className="text-[18px] font-semibold text-primary">Visão geral de aquisição</h2>
              <span className="hidden rounded-full bg-card px-3 py-2 text-[12px] text-muted sm:inline-flex">Últimos 28 dias · comparar com período anterior</span>
            </header>
            <RevelarGrupo className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3" intervalo={.07}>
              {metricas.map((metrica) => (
                <RevelarItem key={metrica.rotulo} className={`relative rounded-[10px] border bg-card px-3 py-3.5 md:px-4 ${metrica.destaque ? "border-accent" : "border-divider"}`}>
                  {metrica.destaque && <MarcadorSpring indice={0}><Marcador n={1} /></MarcadorSpring>}
                  <p className="text-[12px] text-muted">{metrica.rotulo}</p>
                  <p className="mt-1 text-[22px] font-semibold leading-none text-primary md:text-[26px]">{metrica.valor.includes("m") ? metrica.valor : <Contador valor={Number(metrica.valor.replace(".", ""))} />}</p>
                  <p className="mt-2 text-[12px] font-semibold text-[#1F6B3A]">{metrica.variacao}</p>
                </RevelarItem>
              ))}
            </RevelarGrupo>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
              <CardPainel titulo="Usuários ao longo do tempo" className="hidden lg:block"><GraficoGa4 pontos={pontos} largura={largura} altura={altura} /></CardPainel>
              <CardPainel titulo="Origem / mídia da sessão" marcador={2}>
                <div className="mt-4 space-y-4">
                  {origens.map(([origem, percentual]) => (
                    <div key={origem}>
                      <div className="flex justify-between gap-2 text-[11px] text-muted"><span>{origem}</span><span>{percentual}%</span></div>
                      <div className="mt-1.5 h-[5px] rounded-full bg-accent-light"><BarraOrigem largura={percentual * 2} indice={origens.findIndex(([nome]) => nome === origem)} /></div>
                    </div>
                  ))}
                </div>
              </CardPainel>
              <CardPainel titulo="Eventos" marcador={3}>
                <dl className="mt-3 space-y-3 font-[family-name:var(--font-code)] text-[11px]">
                  <div className="flex justify-between gap-3 text-muted"><dt>page_view</dt><dd>3.912</dd></div>
                  <div className="flex justify-between gap-3 font-semibold text-primary"><dt>click_whatsapp</dt><dd>41</dd></div>
                  <div className="flex justify-between gap-3 text-muted"><dt>form_submit</dt><dd>7</dd></div>
                </dl>
              </CardPainel>
            </div>
          </div>
        </div>
      </JanelaMac>
      <figcaption className="mt-3.5 text-center text-[13px] text-muted">Tela simplificada do GA4 com dados de exemplo. Os marcadores são os três números do post.</figcaption>
    </figure>
  );
}

const numeros = [
  { numero: 1, metrica: "Usuários", titulo: "Quem chegou", caminho: "Aquisição › Visão geral", texto: "Sozinho não diz nada. O que importa é a comparação com o mês anterior." },
  { numero: 2, metrica: "Origem / mídia", titulo: "De onde veio", caminho: "Aquisição › Aquisição de tráfego", texto: "Mostra qual canal está trazendo gente de verdade, e qual só dá trabalho." },
  { numero: 3, metrica: "Eventos", titulo: "O que fez", caminho: "Engajamento › Eventos", texto: "O clique no WhatsApp ou o formulário. É o número que paga as contas." },
];

export function TresNumeros() {
  return <RevelarGrupo className="grid gap-4 md:grid-cols-3">{numeros.map((item) => (
    <RevelarItem key={item.numero} className="flex min-h-full flex-col rounded-[14px] border border-divider bg-card p-[26px]">
      <div className="flex items-center gap-3"><CirculoNumero>{item.numero}</CirculoNumero><span className="font-[family-name:var(--font-code)] text-[12px] text-muted">{item.metrica}</span></div>
      <h3 className="mt-6 font-heading text-[30px] font-semibold leading-tight text-primary">{item.titulo}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#3a3a3a]">{item.texto}</p>
      <p className="mt-6 border-t border-divider pt-4 text-[12px] leading-relaxed text-muted"><strong className="text-primary">Onde fica:</strong> Relatórios › {item.caminho}</p>
    </RevelarItem>
  ))}</RevelarGrupo>;
}

const roteiro = [
  ["Abra os últimos 28 dias", "e ligue a comparação com o período anterior."],
  ["Anote os usuários", "Subiu, caiu ou ficou igual?"],
  ["Veja as três maiores origens", "Alguma mudou de lugar?"],
  ["Abra Eventos", "e procure o clique que importa para você."],
  ["Escreva uma pergunta", "Só uma. É ela que vira ação."],
] as const;

export function RoteiroCincoMinutos() {
  return <RoteiroAnimado>{roteiro.map(([titulo, texto], indice) => (
    <RevelarItem key={titulo} className="border-t border-divider px-5 py-[22px] first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0">
      <p className="text-[12px] font-bold text-accent">MINUTO {indice + 1}</p><h3 className="mt-3 text-[16px] font-bold leading-snug text-primary">{titulo}</h3><p className="mt-2 text-[14px] leading-relaxed text-muted">{texto}</p>
    </RevelarItem>
  ))}</RoteiroAnimado>;
}

const leituras = [
  ["Chegou mais gente e ninguém chamou", "O problema está na página, não na divulgação."],
  ["Uma origem cresceu do nada", "Descubra o que aconteceu ali e repita."],
  ["O número 3 não existe", "O site não está medindo o que importa. Resolve em uma tarde."],
] as const;

export function LeituraTabela() {
  return <div className="not-prose mt-8">
    <div className="hidden grid-cols-2 gap-8 px-4 pb-3 text-[12px] font-bold text-muted sm:grid"><span>SE VOCÊ VIU</span><span>PROVAVELMENTE É</span></div>
    <RevelarGrupo>{leituras.map(([sinal, leitura]) => <RevelarItem key={sinal} className="grid gap-2 border-t border-divider px-4 py-4 text-[16px] sm:grid-cols-2 sm:gap-8"><p className="font-bold text-primary">{sinal}</p><SetaAnimada><span aria-hidden="true">→ </span>{leitura}</SetaAnimada></RevelarItem>)}</RevelarGrupo>
  </div>;
}

export function ResumoDoPost() {
  return <Resumo indice={[{ texto: "Por que ninguém abre o GA4", ancora: "por-que-ninguem-abre" }, { texto: "Os três números", ancora: "tres-numeros" }, { texto: "O roteiro de 5 minutos", ancora: "roteiro" }, { texto: "O que fazer com o que viu", ancora: "leitura" }, { texto: "Por que quase ninguém mantém", ancora: "manter" }]} pontos={["Esqueça as dezenas de relatórios: três números dizem se o site está trabalhando.", "Compare sempre com o mês anterior. Número solto não diz nada.", "Termine com uma pergunta. É ela que vira a próxima mudança no site."]} />;
}

export const extras: PostExtras = { Capa: CapaGa4, componentes: { ResumoDoPost, TresNumeros, RoteiroCincoMinutos, LeituraTabela } };
