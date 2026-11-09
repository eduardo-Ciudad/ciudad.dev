import { JanelaMac, Resumo, RotuloComparacao } from "@/components/blog/editorial";
import { Contador, RevelarGrupo, RevelarItem } from "@/components/blog/editorial/motion";
import type { PostExtras } from "../types";
import { PipelineAnimado, Todos } from "./motion";

const etapas = [
  { titulo: "Preparar ambiente", detalhe: "Java 17 · dependências em cache", tempo: "0:38", alerta: false },
  { titulo: "Banco de teste", detalhe: "PostgreSQL temporário, só para o pipeline", tempo: "0:06", alerta: false },
  { titulo: "Testes de unidade", detalhe: "regras, validações e segurança", tempo: "0:41", alerta: false },
  { titulo: "Testes de integração", detalhe: "0 executados", tempo: "0:00", alerta: true },
  { titulo: "Imagem da aplicação", detalhe: "build do container", tempo: "1:12", alerta: false },
] as const;

function CapaPipeline() {
  return (
    <figure>
      <JanelaMac tom="escuro" endereco="Integração contínua">
        <PipelineAnimado etapas={etapas} />

      </JanelaMac>
      <figcaption className="mt-3 text-center text-[13px] text-muted">
        A primeira execução do pipeline do Radar, simplificada.
      </figcaption>
    </figure>
  );
}

const decisoes = [
  {
    categoria: "Acesso",
    titulo: "Front e API se reconhecem",
    texto: "O painel roda na Vercel, que não tem IP fixo. Liberar por IP não funcionaria, então a API só responde a quem apresenta uma credencial do próprio painel.",
    custo: "Mais uma chave para guardar e trocar.",
  },
  {
    categoria: "Acesso",
    titulo: "Sair derruba o acesso",
    texto: "Cada login carrega uma versão. Ao sair, ou ao desativar alguém, a versão muda e os acessos antigos param na hora.",
    custo: "Uma consulta ao banco por requisição.",
  },
  {
    categoria: "Acesso",
    titulo: "Limite por conta, não por IP",
    texto: "Todo login passa pelo mesmo servidor intermediário. Limitar por IP travaria todo mundo junto; por conta, trava só quem erra.",
    custo: "Em memória: reiniciar zera a contagem.",
  },
  {
    categoria: "Dados",
    titulo: "Banco sem superpoderes",
    texto: "A aplicação usa um usuário que lê e escreve dados. Criar e apagar estrutura é papel das migrações.",
    custo: "Dois usuários de banco para manter.",
  },
  {
    categoria: "Servidor",
    titulo: "Container sem root",
    texto: "A API roda com usuário próprio, arquivos só de leitura e sem permissões extras.",
    custo: "Temporários precisam de lugar certo.",
  },
  {
    categoria: "Servidor",
    titulo: "Fechado por padrão",
    texto: "Rota nova nasce exigindo administrador. Abrir é uma decisão, não um esquecimento.",
    custo: "Cada rota pública é liberada à mão.",
  },
] as const;

function DecisoesSeguranca() {
  return (
    <RevelarGrupo className="grid grid-cols-1 gap-4 md:grid-cols-3" intervalo={.06}>
      {decisoes.map((decisao, index) => (
        <RevelarItem key={decisao.titulo} className="flex flex-col rounded-xl border border-card-border bg-card px-6 pb-5 pt-6 shadow-sm transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent-border motion-reduce:hover:translate-y-0">
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="text-xs font-bold tracking-[.1em] text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="rounded-full bg-accent-light px-2.5 py-1 text-[11px] font-semibold text-accent">{decisao.categoria}</span>
          </div>
          <h3 className="font-heading text-[26px] font-semibold leading-[1.08] text-primary">{decisao.titulo}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3a3a3a]">{decisao.texto}</p>
          <div className="mt-auto pt-5">
            <div className="rounded-lg bg-surface px-3 py-2.5 text-[13px] leading-relaxed">
              <strong className="font-bold text-primary">O custo:</strong>{" "}
              <span className="text-muted">{decisao.custo}</span>
            </div>
          </div>
        </RevelarItem>
      ))}
    </RevelarGrupo>
  );
}

function TestesIntegracaoAntesDepois() {
  return (
    <RevelarGrupo className="grid overflow-hidden rounded-xl border border-card-border bg-card shadow-sm md:grid-cols-2" intervalo={.25}>
      <RevelarItem className="px-7 py-[26px]">
        <RotuloComparacao tipo="antes" />
        <div className="mt-4 font-heading text-[54px] leading-none text-primary">0</div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          testes de integração executados pelo build. Eles existiam, mas o build não os chamava.
        </p>
      </RevelarItem>
      <RevelarItem className="border-t border-divider px-7 py-[26px] md:border-l md:border-t-0">
        <RotuloComparacao tipo="depois" />
        <Todos>Todos</Todos>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          rodam a cada envio, com banco de verdade, antes de qualquer imagem ser gerada.
        </p>
      </RevelarItem>
    </RevelarGrupo>
  );
}

const numeros = [
  ["131", "testes automatizados"],
  ["16", "endpoints, fechados por padrão"],
  ["5", "migrações versionadas"],
  ["0", "portas do banco abertas para a internet"],
] as const;

function RadarEmNumeros() {
  return (
    <RevelarGrupo className="grid grid-cols-2 border-y border-[rgba(0,0,0,.12)] md:grid-cols-4" intervalo={.1}>
      {numeros.map(([numero, rotulo], index) => (
        <RevelarItem
          key={rotulo}
          className={`py-[30px] text-center ${index % 2 ? "border-l border-[rgba(0,0,0,.12)]" : ""} ${index >= 2 ? "border-t border-[rgba(0,0,0,.12)] md:border-t-0" : ""} ${index > 0 ? "md:border-l md:border-[rgba(0,0,0,.12)]" : ""}`}
        >
          <div className="font-heading text-[56px] leading-none text-primary">{numero === "0" ? "0" : <Contador valor={Number(numero)} />}</div>
          <div className="mx-auto mt-2 max-w-40 px-3 text-[13px] leading-snug text-muted">{rotulo}</div>
        </RevelarItem>
      ))}
    </RevelarGrupo>
  );
}

export function ResumoDoPost() {
  return <Resumo indice={[{ texto: "Por que revisar", ancora: "contexto" }, { texto: "Seis decisões", ancora: "decisoes" }, { texto: "O pipeline", ancora: "pipeline" }, { texto: "O que já estava no ar", ancora: "projetos-antigos" }, { texto: "Em números", ancora: "numeros" }]} pontos={["Segurança troca conveniência por controle. Cada decisão aqui vem com o que custou.", "O pipeline encontrou testes que nunca tinham rodado. Foi o achado mais útil do dia.", "Publicar o novo me fez fechar portas que os projetos antigos deixavam abertas."]} />;
}

export const extras: PostExtras = {
  Capa: CapaPipeline,
  componentes: { ResumoDoPost, DecisoesSeguranca, TestesIntegracaoAntesDepois, RadarEmNumeros },
};


