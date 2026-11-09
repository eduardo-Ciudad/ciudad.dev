import type { PostExtras } from "../types";
import { JanelaMac, Resumo, RotuloComparacao } from "../../editorial";
import { Contador, RevelarGrupo, RevelarItem } from "@/components/blog/editorial/motion";
import { BarraDispositivo, BotaoDepois, LeituraMes, LinhaTempo, PillAntes, PillTeste, SemanaAnimada, Variacao } from "./motion";

const metricas = [
  { rotulo: "Sessões", valor: "1.284", variacao: "+18%", cor: "text-[#1F6B3A]" },
  { rotulo: "Novos visitantes", valor: "962", variacao: "+12%", cor: "text-[#1F6B3A]" },
  { rotulo: "Cliques no WhatsApp", valor: "41", variacao: "−6%", cor: "text-[#9a3412]" },
] as const;

const semanas = [
  { titulo: "O relatório chega", texto: "Três números e uma leitura em duas frases." },
  { titulo: "A conversa", texto: "Entender o que a leitura quer dizer no negócio." },
  { titulo: "O ajuste", texto: "Uma mudança pequena, feita no site." },
  { titulo: "O próximo relatório", texto: "Mostra se a mudança mexeu no número certo." },
] as const;

export function CapaRelatorioRadar() {
  return (
    <figure>
      <JanelaMac endereco="radar.ciudadlab.com.br" tom="claro" fundo="#f5f0e8">
        <div className="grid gap-4 p-6 md:p-7">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p className="font-heading text-[22px] font-bold leading-none text-primary">
              CiudadLab <span className="text-accent">RADAR</span>
            </p>
            <p className="text-[13px] text-muted">atelieexemplo.com.br · relatório de outubro</p>
          </div>

          <RevelarGrupo className="grid gap-3 md:grid-cols-3">
            {metricas.map((metrica) => (
              <RevelarItem key={metrica.rotulo} className="rounded-xl bg-card px-[18px] py-5">
                <p className="text-[13px] text-muted">{metrica.rotulo}</p>
                <p className="mt-2 font-heading text-[44px] font-semibold leading-none text-primary"><Contador valor={Number(metrica.valor.replace(".", ""))} /></p>
                <Variacao>
                  <strong className={`font-bold ${metrica.cor}`}>{metrica.variacao}</strong>{" "}
                  <span className="text-muted">vs. setembro</span>
                </Variacao>
              </RevelarItem>
            ))}
          </RevelarGrupo>

          <div className="grid gap-3 md:grid-cols-[1fr_1.6fr]">
            <div className="rounded-xl bg-card px-[18px] py-5">
              <p className="text-[13px] text-muted">Dispositivo</p>
              <div className="mt-5 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
                <BarraDispositivo />
                <span className="w-[28%] bg-[#b9c9f5]" />
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-2 text-[13px]">
                <p><strong className="font-bold text-primary">72%</strong> <span className="text-muted">celular</span></p>
                <p className="text-muted">28% computador</p>
              </div>
            </div>

            <LeituraMes>
              <p className="text-[11px] font-bold tracking-[.14em] text-[#93b4ff]">LEITURA DO MÊS</p>
              <p className="mt-3 max-w-[560px] font-heading text-[28px] font-semibold leading-[1.08] text-white">
                Mais gente chegando, menos gente chamando.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#cfcfcf]">
                No celular, o botão do WhatsApp só aparece no fim da página.
              </p>
              <PillTeste>
                Teste sugerido: botão fixo na tela
              </PillTeste>
            </LeituraMes>
          </div>
        </div>
      </JanelaMac>
      <figcaption className="mt-3.5 text-center text-[13px] text-muted">
        Relatório ilustrativo do Ateliê Exemplo, negócio fictício.
      </figcaption>
    </figure>
  );
}

export function LinhaDoTempoSemanas() {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-5">
      <LinhaTempo><span /></LinhaTempo>
      {semanas.map((semana, indice) => (
        <SemanaAnimada key={semana.titulo} indice={indice} preenchido={indice < 3}>
            <p className="text-xs font-bold uppercase text-accent">Semana {indice + 1}</p>
            <p className="mt-2 text-[17px] font-bold leading-snug text-primary">{semana.titulo}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{semana.texto}</p>
        </SemanaAnimada>
      ))}
    </ol>
  );
}

function Celular({ depois = false }: { depois?: boolean }) {
  return (
    <div className="relative h-[470px] w-[236px] overflow-hidden rounded-[36px] border-[9px] border-primary bg-white px-3.5 py-5" aria-hidden="true">
      <p className="font-heading text-[17px] font-bold text-primary">Ateliê Exemplo</p>
      <div className="mt-4 h-[120px] rounded-lg bg-cover" />
      <div className="mt-3 h-[54px] rounded-lg bg-cover" />
      <div className="mt-3 h-[54px] rounded-lg bg-cover" />
      <div className="mt-3 h-[54px] rounded-lg bg-cover" />
      <div className="mt-3 h-[54px] rounded-lg bg-cover" />
      {depois ? (
        <BotaoDepois>Chamar no WhatsApp</BotaoDepois>
      ) : (
        <PillAntes>WhatsApp</PillAntes>
      )}
    </div>
  );
}

export function AntesDepoisCelular() {
  return (
    <RevelarGrupo className="grid overflow-hidden rounded-xl bg-card md:grid-cols-2" intervalo={.25}>
      <RevelarItem className="flex flex-col items-center gap-[18px] px-6 py-8">
        <RotuloComparacao tipo="antes" />
        <Celular />
        <p className="max-w-[260px] text-center text-[15px] leading-relaxed text-muted">
          O botão só aparece depois de rolar quatro telas.
        </p>
      </RevelarItem>
      <RevelarItem className="flex flex-col items-center gap-[18px] border-t border-divider px-6 py-8 md:border-l md:border-t-0">
        <RotuloComparacao tipo="depois" />
        <Celular depois />
        <p className="max-w-[260px] text-center text-[15px] leading-relaxed text-muted">
          O botão fica na tela o tempo todo. O resto da página não mudou.
        </p>
      </RevelarItem>
    </RevelarGrupo>
  );
}

export function ResumoDoPost() {
  return <Resumo indice={[{ texto: "O ateliê", ancora: "atelie" }, { texto: "O relatório", ancora: "relatorio" }, { texto: "A leitura", ancora: "leitura" }, { texto: "A mudança", ancora: "mudanca" }, { texto: "O mês seguinte", ancora: "mes-seguinte" }]} pontos={["Dois números subiram e um caiu: mais visitas, menos cliques no WhatsApp.", "A causa estava no celular: o botão só aparecia no rodapé.", "A mudança foi pequena. O que importa é ter um número para confirmar."]} />;
}

export const extras: PostExtras = {
  Capa: CapaRelatorioRadar,
  componentes: { ResumoDoPost, LinhaDoTempoSemanas, AntesDepoisCelular },
};
