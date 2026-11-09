import { JanelaMac, Resumo } from "@/components/blog/editorial";
import { RevelarGrupo, RevelarItem } from "@/components/blog/editorial/motion";
import type { PostExtras } from "../types";
import { Cursor, DiagramaHexagonalAnimado, DiffStat, NumeroSeis, PercursoRedacaoAnimado } from "./motion";

const tree = [
  [0, "▾ studymindredacao", "f"],
  [1, "▾ adapter", "f"],
  [2, "▸ in/web", "f"],
  [2, "▸ out/ia", "f"],
  [2, "▸ out/pagamento", "f"],
  [2, "▸ out/email", "f"],
  [2, "▸ out/persistence", "f"],
  [1, "▸ application/usecase", "f"],
  [1, "▾ domain", "f"],
  [2, "▸ model", "f"],
  [2, "▾ port", "f"],
  [3, "AvaliacaoIAPort.java", "s"],
  [3, "PagamentoGatewayPort.java", ""],
  [3, "EnvioEmailPort.java", ""],
  [3, "RedacaoRepositoryPort.java", ""],
  [2, "▸ service", "f"],
  [2, "▸ julia", "f"],
] as const;
function CapaExplorador() {
  const lines = [
    <>
      <b className="text-[#c678dd]">package</b>{" "}
      eduar.studymindredacao.domain.port;
    </>,
    <>&nbsp;</>,
    <>
      <b className="text-[#c678dd]">import</b>{" "}
      eduar.studymindredacao.domain.model.
      <b className="text-[#e5c07b]">ResultadoAvaliacaoIA</b>;
    </>,
    <>
      <b className="text-[#c678dd]">import</b>{" "}
      eduar.studymindredacao.domain.model.
      <b className="text-[#e5c07b]">SolicitacaoAvaliacao</b>;
    </>,
    <>&nbsp;</>,
    <>
      <b className="text-[#c678dd]">public interface</b>{" "}
      <b className="text-[#e5c07b]">AvaliacaoIAPort</b> &#123;
    </>,
    <>&nbsp;</>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <b className="text-[#e5c07b]">ResultadoAvaliacaoIA</b>{" "}
      <b className="text-[#61afef]">avaliar</b>(
      <b className="text-[#e5c07b]">SolicitacaoAvaliacao</b> solicitacao);
    </>,
    <>&#125;</>,
  ];
  return (
    <figure>
      <JanelaMac tom="escuro" endereco="KellyAcademy">
        <div className="flex min-h-[430px] bg-[#282c34]">
          <aside className="hidden w-[300px] shrink-0 bg-[#21252b] py-4 md:block">
            <p className="px-4 text-[11px] tracking-[.12em] text-[#7f848e]">
              EXPLORER
            </p>
            <RevelarGrupo className="mt-3 font-[family-name:var(--font-code)] text-[13px]" intervalo={.03}>
              {tree.map(([l, t, k]) => (
                <RevelarItem
                  key={t}
                  style={{ paddingLeft: 12 + l * 16 }}
                  className={`${k === "s" ? "bg-[#2c313a] text-[#e6e8ef]" : k === "f" ? "text-[#abb2bf]" : "text-[#8b93a3]"} whitespace-nowrap py-0.5`}
                >
                  {t}
                </RevelarItem>
              ))}
            </RevelarGrupo>
          </aside>
          <div className="min-w-0 flex-1">
            <div className="scroll-escuro flex overflow-x-auto bg-[#21252b] text-xs text-[#abb2bf]">
              <span className="shrink-0 border-t-2 border-[#61afef] bg-[#282c34] px-4 py-3 text-[#e6e8ef]">
                AvaliacaoIAPort.java
              </span>
              <span className="shrink-0 px-4 py-3">
                GeminiAvaliacaoAdapter.java
              </span>
            </div>
            <div className="scroll-escuro overflow-x-auto p-6">
              <RevelarGrupo className="min-w-[620px] font-[family-name:var(--font-code)] text-[13px] leading-7 text-[#abb2bf]" intervalo={.06}>
                {lines.map((line, i) => (
                  <RevelarItem key={i} className="grid grid-cols-[28px_1fr]">
                    <span className="text-right text-[#4b5263]">{i + 1}</span>
                    <code className="pl-5">{line}{i === lines.length - 1 && <Cursor />}</code>
                  </RevelarItem>
                ))}
              </RevelarGrupo>
            </div>
          </div>
        </div>
      </JanelaMac>
      <figcaption className="mt-3 text-center text-[13px] text-muted">
        A estrutura real do projeto e a porta que separa a correção do Gemini.
      </figcaption>
    </figure>
  );
}

const services = [
  ["IA", "Gemini", "Modelo, preço e limites mudam sem aviso."],
  ["Pagamento", "Stripe", "Precisou existir antes de estar pronto."],
  ["E-mail", "SMTP", "Provedor pode mudar; o fluxo de senha não."],
] as const;
function ServicosExternos() {
  return (
    <div className="not-prose grid overflow-hidden rounded-[14px] border border-card-border bg-card md:grid-cols-3">
      {services.map(([c, n, t], i) => (
        <article
          key={n}
          className={`p-[22px] ${i ? "border-t border-divider md:border-l md:border-t-0" : ""}`}
        >
          <p className="text-xs font-bold uppercase text-muted">{c}</p>
          <h3 className="mt-2 font-heading text-[30px] font-semibold">{n}</h3>
          <p className="mt-2 text-sm text-muted">{t}</p>
        </article>
      ))}
    </div>
  );
}

// TODO: exemplo real de troca do modelo Gemini
const gains = [
  ["01", "Trocar o modelo de IA", "A correção conversa com uma porta, não com o Gemini. Trocar de modelo mexe no adaptador e no prompt; a regra da nota fica onde está.", "GeminiAvaliacaoAdapter"],
  ["02", "Pagamento desligado sem if", "Antes do Stripe estar pronto, um adaptador que só responde “ainda não disponível” ocupou o lugar. O e-mail ganhou um igual.", "PagamentoDesligadoAdapter"],
  ["03", "Quase 1.300 testes", "Regras de correção, planos e limites de uso são testadas com portas falsas: sem chamar a IA e sem cobrar ninguém.", "1.288 @Test no repositório"],
] as const;
function GanhosArquitetura() {
  return (
    <RevelarGrupo className="grid gap-4 md:grid-cols-3">
      {gains.map(([n, h, t, f]) => (
        <RevelarItem
          key={n}
          className="flex flex-col rounded-[14px] border border-card-border bg-card p-[26px] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
        >
          <b className="text-xs text-accent">{n}</b>
          <h3 className="mt-3 font-heading text-[28px] font-semibold leading-tight">
            {h}
          </h3>
          <p className="mt-4 text-[15px] text-[#3a3a3a]">{t}</p>
          <p className="mt-auto border-t border-divider pt-5 font-[family-name:var(--font-code)] text-xs text-muted">
            {f}
          </p>
        </RevelarItem>
      ))}
    </RevelarGrupo>
  );
}

function DiffTrocaModelo() {
  const xs = [
    ["·", "domain/", "0 arquivos", 1],
    ["·", "application/usecase/", "0 arquivos", 1],
    ["·", "domain/port/AvaliacaoIAPort.java", "sem mudança", 1],
    ["M", "adapter/out/ia/GeminiConfig.java", "+3 −3", 0],
    ["M", "adapter/out/ia/PromptAvaliacaoBuilder.java", "+12 −8", 0],
  ] as const;
  return (
    <figure>
      <JanelaMac tom="escuro" endereco="git diff --stat">
        <div className="bg-[#282c34] p-[22px]">
          <p className="text-sm font-semibold text-[#e6e8ef]">
            Trocar o modelo de IA: o que entra no diff
          </p>
          <RevelarGrupo>{xs.map(([m, p, s, o]) => (
            <RevelarItem
              key={p}
              finalOpacity={o ? .55 : 1}
              className="grid grid-cols-[24px_1fr_auto] gap-2 border-t border-[#2c313a] py-3 font-[family-name:var(--font-code)] text-[13px] text-[#abb2bf]"
            >
              <b className={m === "M" ? "text-[#e5c07b]" : ""}>{m}</b>
              <span className="break-all">{p}</span>
              {s.startsWith("+") ? (
                <DiffStat>
                  <span className="text-[#98c379]">{s.split(" ")[0]}</span>{" "}
                  <span className="text-[#e06c75]">{s.split(" ")[1]}</span>
                </DiffStat>
              ) : (
                <span className="text-[#7f848e]">{s}</span>
              )}
            </RevelarItem>
          ))}</RevelarGrupo>
        </div>
      </JanelaMac>
      <figcaption className="mt-3 text-center text-[13px] text-muted">
        Exemplo ilustrativo do tamanho de uma troca de modelo.
      </figcaption>
    </figure>
  );
}

const files = [
  ["Redacao.java", "domain.model"],
  ["RedacaoRepositoryPort.java", "domain.port"],
  ["RedacaoRepositoryAdapter.java", "adapter.out.persistence"],
  ["RedacaoJpaRepository.java", "persistence.repository"],
  ["RedacaoEntity.java", "persistence.entity"],
  ["RedacaoPersistenceMapper.java", "persistence.mapper"],
] as const;
function CustoSeisArquivos() {
  return (
    <div className="not-prose grid overflow-hidden rounded-[14px] border border-card-border bg-card md:grid-cols-[1fr_1.2fr]">
      <div className="bg-dark p-7">
        <b className="text-xs text-[#93b4ff]">UM CONCEITO SÓ</b>
        <p className="mt-4 font-heading text-[64px] leading-none text-white">
          <NumeroSeis />
        </p>
        <p className="mt-5 text-[15px] text-[#cfcfcf]">
          para salvar e ler uma redação no banco. Num CRUD simples, seriam dois.
        </p>
      </div>
      <RevelarGrupo as="ol" className="px-6 py-3" intervalo={.06}>
        {files.map(([n, p], i) => (
          <RevelarItem as="li"
            key={n}
            className="grid grid-cols-[24px_1fr] border-b border-divider py-3 last:border-0"
          >
            <b className="text-accent">{i + 1}</b>
            <div>
              <p
                className={`break-all font-[family-name:var(--font-code)] text-sm font-semibold ${i === 1 ? "text-[#1D4ED8]" : ""}`}
              >
                {n}
              </p>
              <p className="font-[family-name:var(--font-code)] text-xs text-muted">
                {p}
              </p>
            </div>
          </RevelarItem>
        ))}
      </RevelarGrupo>
    </div>
  );
}

const yes = [
    "O produto depende de serviços que mudam: IA, pagamento, e-mail",
    "As regras do negócio são o produto",
    "Vai durar anos e ter mais gente mexendo",
    "Você quer testar regra sem subir infraestrutura",
  ],
  no = [
    "Landing page ou site institucional",
    "CRUD simples, sem regra de verdade",
    "MVP para descobrir se alguém quer",
    "Script ou automação interna",
  ];
function QuandoVale() {
  return (
    <RevelarGrupo className="grid overflow-hidden rounded-[14px] border border-card-border md:grid-cols-2" intervalo={.15}>
      {[
        [yes, "VALE A PENA QUANDO", "✓", true],
        [no, "EU NÃO USARIA QUANDO", "—", false],
      ].map(([items, h, icon, dark]) => (
        <RevelarItem
          key={h as string}
          className={`p-7 ${dark ? "bg-dark text-white" : "bg-card"}`}
        >
          <h3
            className={`text-xs font-bold ${dark ? "text-[#93b4ff]" : "text-[#9a3412]"}`}
          >
            {h as string}
          </h3>
          <RevelarGrupo as="ul" className="mt-4" intervalo={.06}>
            {(items as string[]).map((x) => (
              <RevelarItem as="li"
                key={x}
                className="flex gap-3 border-t border-current/20 py-4 text-[15px]"
              >
                <b className={dark ? "text-[#93b4ff]" : "text-[#9a3412]"}>
                  {icon as string}
                </b>
                {x}
              </RevelarItem>
            ))}
          </RevelarGrupo>
        </RevelarItem>
      ))}
    </RevelarGrupo>
  );
}

export function ResumoDoPost() {
  return <Resumo indice={[{ texto: "O problema", ancora: "problema" }, { texto: "A ideia", ancora: "ideia" }, { texto: "Uma redação atravessando", ancora: "percurso" }, { texto: "Onde pagou a conta", ancora: "retorno" }, { texto: "O custo honesto", ancora: "custo" }, { texto: "Quando vale num SaaS", ancora: "quando" }]} pontos={["A Kelly depende de três coisas que eu não controlo: IA, pagamento e e-mail.", "O domínio diz do que precisa; adaptadores entregam e podem ser trocados.", "Custa mais arquivos. Vale quando o que está fora do sistema muda, e num SaaS sempre muda."]} />;
}

export const extras: PostExtras = {
  Capa: CapaExplorador,
  componentes: {
    ResumoDoPost,
    ServicosExternos,
    DiagramaHexagonal: DiagramaHexagonalAnimado,
    PercursoRedacao: PercursoRedacaoAnimado,
    GanhosArquitetura,
    DiffTrocaModelo,
    CustoSeisArquivos,
    QuandoVale,
  },
};
