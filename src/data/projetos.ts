import { KELLY_URL } from "./kelly";
import { RADAR_TESTES } from "./radar";
import type { DocGroup } from "./services-docs";

export type Projeto = {
  slug: string;
  nome: string;
  nomeCurto?: string;
  categoria: "fullstack" | "ferramenta-interna" | "landing-page" | "produto";
  grupo: "cliente" | "produto" | "entrega" | "laboratorio";
  segmento?: string;
  antes?: string;
  depois?: string;
  resumo?: string;
  etiqueta?: string;
  autoral?: boolean;
  imagem?: string;
  status?: string;
  subtitulo?: string;
  stack?: string[];
  caseLabel?: string;
  caseDescription?: string;
  cicloTitulo?: string;
  ciclo?: { titulo: string; descricao: string }[];
  numeros?: { valor: string; rotulo: string }[];
  producao?: {
    titulo: string;
    blocos: { titulo: string; descricao: string }[];
    detalhes: DocGroup[];
  };
  descricao: string[];
  problema?: string;
  solucao?: string;
  decisoesTecnicas?: string[];
  resultado?: string;
  heroImage?: string;
  heroIlustracao?: "radar";
  featureImage?: string;
  featureImageCaption?: string;
  ctaPrincipal?: { label: string; url: string };
  ctaSecundario?: { label: string; url: string };
  blocoProprio?: "radar-mes";
};

export type ProjetoComCase = Projeto & {
  problema: string;
  solucao: string;
  decisoesTecnicas: string[];
} & (
  | {
      heroImage: string;
      featureImage: string;
      resultado: string;
      heroIlustracao?: never;
      blocoProprio?: never;
    }
  | {
      heroIlustracao: "radar";
      blocoProprio: "radar-mes";
      heroImage?: never;
      featureImage?: never;
      resultado?: string;
    }
);

export function hasCase(projeto: Projeto): projeto is ProjetoComCase {
  const temConteudoBase = Boolean(
    projeto.problema && projeto.solucao && projeto.decisoesTecnicas?.length,
  );
  const temCaseTradicional = Boolean(
    projeto.heroImage && projeto.featureImage && projeto.resultado,
  );
  const temCaseComBlocoProprio = Boolean(
    projeto.heroIlustracao === "radar" && projeto.blocoProprio === "radar-mes",
  );

  return temConteudoBase && (temCaseTradicional || temCaseComBlocoProprio);
}

export function getProjeto(slug: string) {
  return projetos.find((projeto) => projeto.slug === slug);
}

const projetosBase: Projeto[] = [
  {
    slug: "kelly-academy",
    nome: "Kelly Academy",
    categoria: "produto",
    grupo: "produto",
    segmento: "Produto próprio · Educação",
    resumo: "Treino adaptativo para a redação do ENEM: corrige nas 5 competências, aponta o trecho que segurou a nota e diz o que treinar a seguir.",
    autoral: true,
    status: "Beta aberto",
    imagem: "/img/projetos/kelly-caso-hero.png",
    subtitulo: "Plataforma de treino para a redação do ENEM, com correção por IA, repertório verificado e uma assistente que explica a nota. Idealizada, desenhada e construída pela CiudadLab.",
    stack: ["Java 17 · Spring Boot 4.1", "Arquitetura hexagonal", "PostgreSQL 16 · Flyway", "Gemini", "Stripe", "React · Vite · TypeScript"],
    descricao: [
      "Correção nas 5 competências, com o trecho que pesou e ajuste automático quando a nota não se sustenta",
      "Júlia, a assistente que explica a correção daquela redação",
      "113 repertórios verificados, foto da redação manuscrita e tema próprio",
    ],
    problema: "O estudante de ENEM que já sabe escrever recebe uma nota e não entende por que ela não sobe. A correção humana é cara e demora, e a nota sozinha não diz o que treinar. Uma correção por IA sem controle tem o problema oposto: pode dar 1000 para quem não merece.",
    solucao: "Uma plataforma que corrige pela matriz do INEP, competência por competência, aponta o trecho que segurou a nota e explica o porquê. O aluno escreve sobre um tema do banco, sobre um tema próprio ou manda a foto da folha. Depois, a Júlia tira dúvidas sobre aquela correção, o Repertório entrega o que usar no próximo texto e a Evolução mostra se a nota está subindo.",
    cicloTitulo: "O ciclo do treino",
    ciclo: [
      { titulo: "Escreve", descricao: "Digitando ou pela foto da folha, sobre um tema do banco ou próprio." },
      { titulo: "Diagnóstico", descricao: "Nota por competência, o trecho que pesou e o motivo de cada ajuste." },
      { titulo: "Entende e estuda", descricao: "A Júlia explica a correção e o Repertório mostra o que usar." },
      { titulo: "Nova tentativa", descricao: "A tela Evolução mostra se a nota subiu." },
    ],
    decisoesTecnicas: [
      "A IA corrige, o backend decide: o Gemini lista problemas e evidências antes da nota, num JSON estruturado, e uma regra de domínio confere a nota contra a matriz do INEP. Quando a evidência não sustenta a nota, o backend limita a nota e mostra o motivo ao aluno",
      "Régua fixa para a nota: prompt reescrito com as regras da cartilha do participante e um conjunto de calibração com redações de nota conhecida, usado para medir cada mudança antes de ela ir para produção",
      "Arquitetura hexagonal: o domínio não conhece Spring, JPA, Gemini nem Stripe. Cada integração entra como adapter, então trocar de modelo ou de meio de pagamento não mexe nas regras do produto",
      "Repertório verificado, não gerado: a IA pesquisa em lotes, mas cada item é conferido contra a fonte original antes de entrar no banco por migrations escritas à mão. A base foi de 63 para 113 repertórios, com busca sem acento (unaccent) e filtros em JSONB",
      "Júlia com escopo fechado: ela só explica a correção de uma redação específica e recebe o texto, as notas e o diagnóstico como contexto. Tem limite de 10 perguntas por conversa, 20 por dia e um teto global",
      "Custo de IA sob controle: correção, transcrição e Júlia rodam em projetos do Gemini separados, cada recurso tem limite por aluno definido pelo plano e há um teto global diário reservado de forma atômica no banco",
      "Planos consultados num lugar só: uma regra de domínio decide o que cada aluno pode fazer, considerando a assinatura do Stripe (Checkout e webhook com assinatura validada) e a concessão manual de Pro pelo painel admin",
      "Contas e segurança: verificação de e-mail, recuperação e troca de senha, JWT com versão de sessão que derruba os tokens antigos e auditorias de segurança documentadas. Backend em Docker Compose numa VPS com Nginx e HTTPS, frontend na Vercel e CI no GitHub Actions",
    ],
    numeros: [
      { valor: "113", rotulo: "repertórios verificados ativos" },
      { valor: "56", rotulo: "problemas sociais em 13 eixos" },
      { valor: "1.300+", rotulo: "testes automatizados no backend" },
      { valor: "26", rotulo: "migrations Flyway escritas à mão" },
    ],
    resultado: "No piloto fechado, a mesma redação recebeu 600 na Kelly e 720 de um corretor humano. Depois veio o problema oposto: um 1000 sem merecer. As duas coisas viraram regra: a nota segue a matriz do INEP e o backend corrige o que a evidência não sustenta. Os pedidos dos testadores entraram no produto, como o repertório e a correção por foto, e a Kelly saiu do piloto para um beta aberto, já com a estrutura de planos Grátis e Pro pronta.",
    heroImage: "/img/projetos/kelly-caso-hero.png",
    featureImage: "/img/projetos/kelly-funcionalidade.png",
    featureImageCaption: "Tela de resultado: nota por competência e o que treinar a seguir.",
    ctaPrincipal: { label: "Conhecer a Kelly", url: KELLY_URL },
  },
  {
    slug: "gabikids",
    nome: "GabiKids",
    categoria: "fullstack",
    grupo: "cliente",
    segmento: "Loja virtual · Moda infantil",
    antes: "Vendia só pelo Instagram e WhatsApp, confirmando tamanho e cor na mão em cada conversa.",
    depois: "A cliente compra sozinha, do início ao fim, com estoque e preço sincronizados com o Bling.",
    imagem: "/img/projetos/hero-ecommerce-v3.png",
    descricao: [
      "Catálogo com variação de tamanho",
      "Checkout Pix + cartão via Mercado Pago",
      "Frete calculado via Correios",
    ],
    problema: "Vendia só pelo Instagram e WhatsApp. Toda venda dependia de mandar foto de roupa, confirmar tamanho e cor manualmente — processo lento que fazia a cliente perder venda pra quem respondia mais rápido ou desistia no meio da conversa.",
    solucao: "E-commerce completo, com catálogo integrado ao ERP Bling (sincroniza produto, estoque e preço automaticamente), checkout com Pix e cartão via Mercado Pago, e painel administrativo próprio.",
    decisoesTecnicas: [
      "Sincronização automática com o Bling ERP (OAuth2, API v3) — produto, estoque e categoria atualizam sozinhos, sem retrabalho manual",
      "Checkout com webhook protegido contra duplicidade de pagamento e expiração automática de pedido não pago (libera estoque sozinho em 30 min)",
      "Carrinho persistente para visitante não logado, sincronizado com a conta no login",
      "Auditoria de segurança de 21 pontos antes de ir ao ar",
      "Migração de imagens para Cloudflare R2 — as imagens vindas do Bling usavam link temporário que expirava; agora ficam hospedadas em infraestrutura própria, sem quebrar",
    ],
    resultado: "Cliente compra sozinha, do início ao fim, sem depender de resposta manual pra decidir tamanho, cor ou disponibilidade. Menos venda perdida por demora, mais tempo livre pra lojista cuidar do resto do negócio.",
    heroImage: "/img/projetos/gabikids-caso-hero.png",
    featureImage: "/img/projetos/gabikids-caso-feature.png",
    ctaPrincipal: { label: "Ver ao vivo", url: "https://gabikidstore.com" },
  },
  {
    slug: "sistema-financeiro-multi-tenant",
    nome: "Sistema Financeiro Multi-Tenant",
    nomeCurto: "Sistema Financeiro",
    categoria: "fullstack",
    grupo: "cliente",
    segmento: "Sistema sob medida · Revenda",
    antes: "Sem saber ao certo quanto entrava e saía; compras, vendas e estoque desencontrados.",
    depois: "Estoque, vendas e financeiro num lugar só, com histórico que nunca é apagado.",
    imagem: "/img/projetos/sistema-personalizado-controle-financeiro.png",
    descricao: [
      "Isolamento de dados por usuário",
      "Lançamentos append-only (nunca editados, só estornados)",
      "Dashboard com extrato mensal",
    ],
    problema: "Cliente revendedor sem controle real do financeiro — não sabia dizer com precisão quanto entrava e quanto saía. Compra de fornecedor, venda e estoque tudo desencontrado, sem visão consolidada do negócio.",
    solucao: "Sistema completo sob medida — controle de estoque, vendas, compras de fornecedores e financeiro integrados num só lugar, com arquitetura multi-tenant.",
    decisoesTecnicas: [
      "Arquitetura de ledger append-only — nenhum lançamento financeiro é apagado ou sobrescrito, só adicionado, garantindo histórico auditável",
      "Módulos integrados: clientes/fornecedores, estoque rastreável por fornecedor, vendas com baixa automática de estoque, contas pessoais separadas do negócio",
      "Migrations versionadas com Flyway — toda alteração de banco documentada e reversível",
      "46+ testes automatizados cobrindo os fluxos financeiros",
      "Deploy em infraestrutura própria (VPS, Docker, Nginx, SSL) sem depender de plataforma terceira",
    ],
    resultado: "Visão clara e em tempo real de entrada e saída. Decisão de compra e preço agora baseada em número real, não em achismo.",
    heroImage: "/img/projetos/controle-financeiro-caso-hero.png",
    featureImage: "/img/projetos/controle-financeiro-caso-feature.png",
    ctaPrincipal: {
      label: "Ver ao vivo",
      url: "https://controle-financeiro-lab.vercel.app",
    },
  },
  {
    slug: "promobot",
    nome: "PromoBot",
    categoria: "fullstack",
    grupo: "laboratorio",
    etiqueta: "Pausado",
    resumo: "Monitora ofertas, enriquece com IA numa fila RabbitMQ e publica no Telegram sozinho.",
    imagem: "/img/projetos/promo-bot.png",
    descricao: [
      "Scraper próprio monitora ofertas automaticamente todos os dias",
      "Pipeline assíncrono via fila de mensagens (RabbitMQ) para enriquecer cada oferta com IA generativa",
      "Entrega automática nos grupos de Telegram, sem intervenção manual",
    ],
    ctaSecundario: {
      label: "Código-fonte",
      url: "https://github.com/eduardo-Ciudad/promo-bot-mercadolivre",
    },
  },
  {
    slug: "dev-journal",
    nome: "Dev Journal",
    categoria: "fullstack",
    grupo: "laboratorio",
    resumo: "Diário de estudos com API REST própria e painel de horas, commits e sequência de dias.",
    imagem: "/img/projetos/dev-jornal.png",
    descricao: [
      "Dashboard com estatísticas de estudo: dias registrados, horas, commits, streak, tecnologias mais usadas",
      "API REST própria com CRUD completo, busca e filtros persistidos",
      "Ferramenta de uso pessoal — construída pra resolver a própria rotina de estudos",
    ],
    ctaSecundario: {
      label: "Código-fonte",
      url: "https://github.com/eduardo-Ciudad/dev-journal",
    },
  },
  {
    slug: "conversor-pdf-centrofarma-eldorado",
    nome: "Conversor de PDF (Centrofarma Eldorado)",
    nomeCurto: "Centrofarma Eldorado",
    categoria: "ferramenta-interna",
    grupo: "entrega",
    segmento: "Ferramenta interna · Farmácia",
    resumo: "O farmacêutico preenche uma vez e a declaração de serviço sai em PDF, pronta para assinar.",
    imagem: "/img/projetos/centrofarma-eldorado.png",
    descricao: [
      "Elimina preenchimento manual — farmacêutico digita uma vez, PDF sai pronto pra assinar",
      "Preview do documento atualiza em tempo real conforme o formulário é preenchido",
      "Campos específicos por tipo de atendimento (injetável, pressão arterial, perfuração de brinco), sob medida pro fluxo real da farmácia",
    ],
    ctaPrincipal: {
      label: "Ver demonstração",
      url: "https://eduardo-ciudad.github.io/conversor-pdf/",
    },
  },
  {
    slug: "jarvis",
    nome: "Jarvis — Assistente Pessoal",
    nomeCurto: "Jarvis",
    categoria: "ferramenta-interna",
    grupo: "laboratorio",
    resumo: "Assistente de voz local: ouve com Whisper, pensa com Claude e responde com ElevenLabs.",
    autoral: true,
    imagem: "/img/projetos/jarvis-site.png",
    descricao: [
      "Assistente de voz 100% local — ouve o microfone e transcreve com Whisper, sem custo e sem API key de STT",
      "Processa o pedido com Claude mantendo o histórico da conversa e responde em voz alta via ElevenLabs",
      "Interface HUD futurista em tempo real (status do sistema, CPU, memória), com estética inspirada no J.A.R.V.I.S. do Homem de Ferro",
    ],
    ctaSecundario: {
      label: "Código-fonte",
      url: "https://github.com/eduardo-Ciudad/jarvis-python",
    },
  },
  {
    slug: "radar",
    nome: "Radar CiudadLab",
    categoria: "ferramenta-interna",
    grupo: "produto",
    segmento: "Produto próprio · Incluso no pós-entrega",
    resumo: "Painel que lê o Google Analytics do seu site e mostra o que importa. Vem configurado em todo projeto, com 90 dias de leitura mensal dos números.",
    autoral: true,
    imagem: "/img/radar/radar-sites.png",
    status: "No ar desde nov/2026",
    subtitulo: "O Google Analytics do seu site, traduzido para o que importa no seu negócio: de onde vem o cliente, que página funciona e onde ele desiste.",
    caseLabel: "Produto próprio · Analytics",
    caseDescription: "Radar CiudadLab: o Google Analytics do seu site traduzido em uma leitura simples do que trouxe cliente e do que precisa mudar.",
    stack: ["Java 17 · Spring Boot", "Arquitetura hexagonal", "Google Analytics Data API", "PostgreSQL · Flyway", "Next.js", "Docker · Nginx", "Vercel", "GitHub Actions"],
    descricao: [
      "Painel próprio que puxa os dados do Google Analytics 4 dos sites da CiudadLab e dos clientes via API, com sincronização diária automática",
      "Backend em Java 17 + Spring Boot com arquitetura hexagonal, PostgreSQL/Flyway e autenticação JWT com papéis",
      "Frontend em Next.js e funil interno de prospecção com importação de CSV e score de leads",
    ],
    problema: "Quase todo site tem o Google Analytics instalado, e quase nenhum dono de negócio abre. O painel é feito para analista: dezenas de relatórios, termos em inglês e nenhuma resposta direta para a pergunta que importa, que é se o site está trazendo cliente.",
    solucao: "O Radar lê o Analytics todo dia, compara com o período anterior e entrega uma leitura curta em português: o que cresceu, o que caiu e qual página merece atenção. O dono do negócio recebe a conclusão, não o painel.",
    cicloTitulo: "Como funciona",
    ciclo: [
      { titulo: "Conecta", descricao: "O site dá ao Radar acesso só de leitura ao Analytics, por uma conta de serviço do Google." },
      { titulo: "Sincroniza", descricao: "Todo dia às 6h, o Radar busca os números do dia anterior e guarda o histórico." },
      { titulo: "Compara", descricao: "Últimos 7, 28 ou 90 dias, sempre lado a lado com o período anterior." },
      { titulo: "Traduz", descricao: "Uma leitura em linguagem simples, com o alerta do que merece atenção." },
    ],
    numeros: [
      { valor: String(RADAR_TESTES), rotulo: "testes automatizados" },
      { valor: "16", rotulo: "endpoints na API" },
      { valor: "5", rotulo: "migrations versionadas" },
      { valor: "06h", rotulo: "sincronização diária com o Google" },
    ],
    resultado: "No ar desde novembro de 2026, acompanhando todos os dias o próprio site da CiudadLab. O próximo passo é conectar os sites dos clientes que entram no acompanhamento.",
    producao: {
      titulo: "O mesmo cuidado de produção que vai para o seu projeto",
      blocos: [
        { titulo: "Onde roda", descricao: "A API e o banco ficam num servidor próprio, e o painel fica na Vercel, perto de São Paulo. O banco não fica acessível pela internet." },
        { titulo: "Como protege", descricao: "Só o painel conversa com a API, o login tem limite de tentativas e uma sessão pode ser encerrada na hora, de qualquer lugar." },
        { titulo: "Como é testado", descricao: `Cada mudança passa por ${RADAR_TESTES} testes automáticos antes de ir ao ar, inclusive os de segurança.` },
        { titulo: "Como chega ao ar", descricao: "Tudo empacotado em containers, com HTTPS e certificado renovado sozinho. Atualizar o sistema é um comando." },
      ],
      detalhes: [
        {
          subtitle: "Infraestrutura e segurança",
          items: [
            "API Java/Spring Boot em container Docker, atrás de Nginx com HTTPS (Let's Encrypt, renovação automática)",
            "PostgreSQL numa rede interna do Docker, sem porta exposta, com um usuário próprio sem privilégios de administrador",
            "Frontend Next.js na Vercel (região São Paulo); o login passa pelo servidor do Next.js e o token fica num cookie httpOnly",
            "A API só aceita chamadas do servidor do frontend e nega por padrão: toda rota nova nasce restrita ao administrador",
            "Containers rodando sem root e com sistema de arquivos somente leitura",
            "CI no GitHub Actions: testes unitários e de integração com PostgreSQL real e build da imagem a cada push",
          ],
        },
      ],
    },
    decisoesTecnicas: [
      "Acesso só de leitura: O Radar entra no Analytics por uma conta de serviço com papel de leitor. Ele não altera nada na conta do cliente e o acesso pode ser revogado a qualquer momento.",
      "Histórico próprio: Os números são sincronizados uma vez por dia e guardados em PostgreSQL. As telas leem do banco do Radar, sem chamar a API do Google a cada clique.",
      "Arquitetura hexagonal: O Google Analytics entra como adapter. A regra de comparar períodos e montar a leitura fica no domínio, sem depender da API.",
      "SQL onde faz sentido: As tabelas de métricas usam JDBC com consultas escritas à mão, que é mais simples para agregação por período. JPA fica para o módulo de leads.",
      "Segurança: Spring Security com JWT e acesso ao painel restrito ao administrador: o cliente recebe a leitura dos números, não um login. O login tem limite de tentativas, o token pode ser revogado na hora e, no frontend, fica num cookie httpOnly.",
      "Sessão revogável: cada token carrega uma versão conferida no banco a cada requisição. Logout ou desativação encerram na hora todas as sessões do usuário.",
      "Nega por padrão: toda rota nova nasce restrita ao administrador. O papel de leitor existe, mas só será liberado quando cada cliente estiver vinculado ao próprio site.",
      "Só o frontend fala com a API: as chamadas passam pelo servidor do Next.js, que se identifica com uma chave própria. Requisições de fora são recusadas antes de chegar no login.",
    ],
    heroIlustracao: "radar",
    blocoProprio: "radar-mes",
    ctaPrincipal: { label: "Conhecer o Radar", url: "/radar" },
  },
  {
    slug: "leticia-souza",
    nome: "Letícia Souza",
    categoria: "landing-page",
    grupo: "cliente",
    segmento: "Site · Música para eventos",
    antes: "Instagram forte, mas perdia contrato por não conseguir responder todo mundo a tempo.",
    depois: "O visitante avança sozinho até o contato, sem depender da velocidade da resposta no direct.",
    imagem: "/img/projetos/leticia-souza-landingpage.png",
    descricao: [
      "+200 eventos realizados, resposta em até 1h pelo WhatsApp",
      "Depoimentos reais de clientes (casamentos, aniversários, eventos corporativos) direto na página",
      "Repertório e diferenciais organizados por tipo de evento, CTA de WhatsApp em cada seção",
    ],
    problema: "Instagram forte, com bastante gente interessada — mas vendia menos do que deveria porque não conseguia responder todo mundo a tempo pra negociar.",
    solucao: "Presença digital estruturada, que assume parte da conversão que antes dependia só de resposta manual no direct.",
    decisoesTecnicas: [
      "Portfólio integrado ao Instagram por categoria (ex: repertório sertanejo, casamento ao vivo) — cliente vai direto ao conteúdo relevante em vez de rolar o feed inteiro",
      "Segmentação por tipo de evento (casamentos, aniversários, etc.), cada um com descrição própria",
      "Prova social direto no hero (+200 eventos, resposta em até 1h) reduzindo insegurança de quem nunca contratou música ao vivo",
      "Dois CTAs distintos (verificar disponibilidade / falar agora) atendendo diferentes estágios de decisão do visitante",
    ],
    resultado: "Melhora na conversão — o cliente avança sozinho no processo, sem depender só da velocidade de resposta.",
    heroImage: "/img/projetos/leticia-caso-hero.png",
    featureImage: "/img/projetos/leticia-caso-feature.png",
    ctaPrincipal: {
      label: "Ver ao vivo",
      url: "https://leticia-souza.vercel.app",
    },
  },
  {
    slug: "vinicius-mascagni",
    nome: "Vinícius Mascagni",
    categoria: "landing-page",
    grupo: "cliente",
    segmento: "Site · Personal trainer",
    antes: "Só Instagram; cada contato começava do zero, sem plano nem preço para mostrar.",
    depois: "Planos e preços visíveis antes da conversa, e menos tempo explicando tudo para cada lead.",
    imagem: "/img/projetos/landing-page-vinicius-mascagni.png",
    descricao: [
      "Hero com contador animado de resultados",
      "Prova social (depoimentos reais de alunos)",
      "Um único CTA: WhatsApp",
    ],
    problema: "Presença digital só no Instagram, sem nada que desse consistência ou credibilidade pra fechar aluno novo — cada contato começava do zero, sem material pra mostrar plano ou preço.",
    solucao: "Landing page profissional com seção de planos e preços, prova social e otimizada pra celular.",
    decisoesTecnicas: [
      "Seção de preços e planos adicionada — visitante já vê valor antes de chamar no WhatsApp, filtrando lead sem fit de orçamento antes da conversa",
      "Remoção de referências a dieta/nutrição — posicionamento mantido só em treino, evitando prometer algo fora da atuação dele",
      "Correção de overflow em mobile, garantindo experiência consistente no principal dispositivo de acesso",
    ],
    resultado: "Presença digital mais sólida, com página que reforça credibilidade antes mesmo da primeira conversa — e menos tempo gasto explicando planos manualmente pra cada lead.",
    heroImage: "/img/projetos/vinicius-caso-hero.png",
    featureImage: "/img/projetos/vinicius-caso-feature.png",
    ctaPrincipal: {
      label: "Ver ao vivo",
      url: "https://vinicius-masc.vercel.app/",
    },
  },
  {
    slug: "sao-francisco-hortifruti",
    nome: "São Francisco Hortifruti",
    categoria: "landing-page",
    grupo: "laboratorio",
    resumo: "Demonstração para comércio local: avaliações do Google, catálogo e pedido pelo WhatsApp.",
    autoral: true,
    imagem: "/img/projetos/sao-francisco-hortifruit.png",
    descricao: [
      "4.9 de avaliação no Google com 117 avaliações, exibidas na própria página",
      "Depoimentos de clientes reais, catálogo de produtos e botão de pedido via WhatsApp",
      "Projeto autoral usado como vitrine de portfólio (não é cliente contratado)",
    ],
    ctaPrincipal: {
      label: "Ver demonstração",
      url: "https://eduardo-ciudad.github.io/sao-francisco-Hortifruti/",
    },
  },
  {
    slug: "ueitila-mendes-cantora",
    nome: "Ueitila Mendes (Cantora)",
    nomeCurto: "Ueitila Mendes",
    categoria: "landing-page",
    grupo: "entrega",
    segmento: "Site · Cantora",
    resumo: "Repertório por gênero, agenda, depoimentos e contato reunidos numa página só.",
    imagem: "/img/projetos/landing-page-overview.png",
    descricao: [
      "Mais de 100 shows realizados, avaliação média 5 estrelas, atuação em SP, MG e MT",
      "Depoimentos de clientes corporativos e particulares com prova social real",
      "Repertório por gênero musical, agenda e contato centralizados numa página só",
    ],
    ctaPrincipal: {
      label: "Ver ao vivo",
      url: "https://eduardo-ciudad.github.io/ueitila-mendes-cantora/",
    },
  },
  {
    slug: "trilhax",
    nome: "TrilhaX",
    categoria: "landing-page",
    grupo: "laboratorio",
    resumo: "Front-end de plataforma de trilhas de carreira, com área do aluno e painel admin.",
    autoral: true,
    imagem: "/img/projetos/trilhax-site.png",
    descricao: [
      "4 trilhas de carreira (Backend Java, Frontend React, Fullstack, DevOps) com planos a partir de R$ 29,90",
      "Fluxo completo: landing, cadastro/login, dashboard do aluno e painel admin",
      "Front-end standalone (HTML/CSS/JS), pronto pra integrar com uma API própria",
    ],
    ctaSecundario: {
      label: "Código-fonte",
      url: "https://github.com/eduardo-Ciudad/TrilhaX-frontend",
    },
  },
  {
    slug: "fluxo-digital",
    nome: "Fluxo Digital",
    categoria: "landing-page",
    grupo: "laboratorio",
    resumo: "Vitrine de vendas estática, com portfólio embutido e foco em velocidade e conversão.",
    autoral: true,
    imagem: "/img/projetos/vitrine-digital.png",
    descricao: [
      "Vitrine de vendas com portfólio embutido (6 projetos reais) e CTA de WhatsApp em cada seção",
      "Seções de benefícios, processo do briefing ao lançamento e FAQ",
      "100% estático (HTML/CSS/JS), otimizado pra performance e conversão",
    ],
    ctaSecundario: {
      label: "Código-fonte",
      url: "https://github.com/eduardo-Ciudad/fluxo-digital",
    },
  },
];

const ordemLaboratorio = [
  "promobot",
  "jarvis",
  "dev-journal",
  "trilhax",
  "fluxo-digital",
  "sao-francisco-hortifruti",
];

export const projetos = [
  ...projetosBase.filter((projeto) => projeto.grupo !== "laboratorio"),
  ...projetosBase
    .filter((projeto) => projeto.grupo === "laboratorio")
    .sort(
      (a, b) =>
        ordemLaboratorio.indexOf(a.slug) - ordemLaboratorio.indexOf(b.slug),
    ),
];
