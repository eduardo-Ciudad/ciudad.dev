import { KELLY_URL } from "./kelly";

export type Projeto = {
  slug: string;
  nome: string;
  categoria: "fullstack" | "ferramenta-interna" | "landing-page" | "produto";
  destaque: boolean;
  pago?: boolean;
  autoral?: boolean;
  imagem?: string;
  status?: string;
  subtitulo?: string;
  stack?: string[];
  ciclo?: { titulo: string; descricao: string }[];
  numeros?: { valor: string; rotulo: string }[];
  descricao: string[];
  problema?: string;
  solucao?: string;
  decisoesTecnicas?: string[];
  resultado?: string;
  heroImage?: string;
  featureImage?: string;
  featureImageCaption?: string;
  ctaPrincipal?: { label: string; url: string };
  ctaSecundario?: { label: string; url: string };
};

export type ProjetoComCase = Projeto & {
  problema: string;
  solucao: string;
  decisoesTecnicas: string[];
  resultado: string;
  heroImage: string;
  featureImage: string;
};

export function hasCase(projeto: Projeto): projeto is ProjetoComCase {
  return Boolean(
    projeto.problema &&
      projeto.solucao &&
      projeto.decisoesTecnicas?.length &&
      projeto.resultado &&
      projeto.heroImage &&
      projeto.featureImage,
  );
}

export function getProjeto(slug: string) {
  return projetos.find((projeto) => projeto.slug === slug);
}

export const projetos: Projeto[] = [
  {
    slug: "kelly-academy",
    nome: "Kelly Academy",
    categoria: "produto",
    destaque: true,
    autoral: true,
    status: "Em piloto",
    imagem: "/img/projetos/kelly-caso-hero.png",
    subtitulo: "Uma plataforma de treino para a redação do ENEM, do domínio ao deploy. Idealizada, desenhada e construída pela CiudadLab.",
    stack: ["Java 17 · Spring Boot", "Arquitetura hexagonal", "PostgreSQL · Flyway", "Gemini", "React · Vite · TypeScript"],
    descricao: [
      "Correção da redação nas 5 competências do ENEM, com o trecho que segurou a nota",
      "Repertório curado: 63 fichas em 13 eixos, com busca sem acento",
      "Foto da redação manuscrita vira texto e vai direto para a correção",
    ],
    problema: "O estudante de ENEM que já sabe escrever uma redação recebe uma nota e não entende por que ela não sobe. Correção humana é cara e demora, e a nota sozinha não diz o que treinar.",
    solucao: "Uma plataforma que corrige nas 5 competências, aponta o trecho exato que segurou a nota e entrega o próximo passo: repertório para usar, tema para praticar e evolução ao longo do tempo.",
    ciclo: [
      { titulo: "Escreve", descricao: "Digitando ou por foto da folha manuscrita." },
      { titulo: "Diagnóstico", descricao: "Nota por competência e o trecho que pesou." },
      { titulo: "Estudo", descricao: "Repertório curado por eixo e problema social." },
      { titulo: "Nova tentativa", descricao: "A tela Evolução mostra se a nota subiu." },
    ],
    decisoesTecnicas: [
      "A IA corrige, o backend decide: o Gemini recebe um prompt especializado e devolve JSON estruturado; limites, regras determinísticas e persistência ficam no Java",
      "Arquitetura hexagonal — o domínio não depende de framework e a IA entra como adapter, então trocar de modelo não mexe nas regras do produto",
      "Correção e transcrição por foto compartilham o mesmo cliente do Gemini, extraído numa refatoração própria antes do novo adapter",
      "Repertório curado, não gerado: conteúdo pesquisado e revisado, carregado por migrations escritas à mão, com busca sem acento (unaccent) e consulta paginada em duas etapas",
      "Custo de IA sob controle: limite diário por usuário no plano grátis e teto global de correções, reservados de forma atômica no banco",
      "Auditoria de segurança documentada (injeção, rate limit, rotas e vazamento de dados) e cadastro fechado durante o piloto",
      "Backend e PostgreSQL em Docker Compose numa VPS com Nginx e HTTPS, frontend React na Vercel e CI no GitHub Actions",
    ],
    numeros: [
      { valor: "63", rotulo: "repertórios curados ativos" },
      { valor: "52", rotulo: "problemas sociais em 13 eixos" },
      { valor: "300+", rotulo: "testes automatizados no backend" },
      { valor: "14", rotulo: "migrations Flyway escritas à mão" },
    ],
    resultado: "No piloto fechado, a mesma redação recebeu 600 na Kelly e 720 de um corretor humano: a plataforma saiu mais rigorosa, não mais generosa. Os pedidos dos testadores viraram roadmap — repertório, correção por foto e plano de estudo.",
    heroImage: "/img/projetos/kelly-caso-hero.png",
    featureImage: "/img/projetos/kelly-funcionalidade.png",
    featureImageCaption: "Tela de resultado: nota por competência e o que treinar a seguir.",
    ctaPrincipal: { label: "Conhecer a Kelly", url: KELLY_URL },
  },
  {
    slug: "gabikids",
    nome: "GabiKids",
    categoria: "fullstack",
    destaque: true,
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
    categoria: "fullstack",
    destaque: true,
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
    destaque: true,
    imagem: "/img/projetos/promo-bot.png",
    descricao: [
      "Scraper próprio monitora ofertas automaticamente todos os dias",
      "Pipeline assíncrono via fila de mensagens (RabbitMQ) para enriquecer cada oferta com IA generativa",
      "Entrega automática nos grupos de Telegram, sem intervenção manual",
    ],
    ctaPrincipal: {
      label: "Ver no Telegram",
      url: "https://t.me/+FYCoutT-cSxiNjZh",
    },
    ctaSecundario: {
      label: "Código-fonte",
      url: "https://github.com/eduardo-Ciudad/promo-bot-mercadolivre",
    },
  },
  {
    slug: "dev-journal",
    nome: "Dev Journal",
    categoria: "fullstack",
    destaque: true,
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
    categoria: "ferramenta-interna",
    destaque: true,
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
    categoria: "ferramenta-interna",
    destaque: true,
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
    destaque: true,
    autoral: true,
    imagem: "/img/radar/radar-sites.png",
    descricao: [
      "Painel próprio que puxa os dados do Google Analytics 4 dos sites da CiudadLab e dos clientes via API, com sincronização diária automática",
      "Backend em Java 17 + Spring Boot com arquitetura hexagonal, PostgreSQL/Flyway e autenticação JWT com papéis",
      "Frontend em Next.js e funil interno de prospecção com importação de CSV e score de leads",
    ],
    ctaPrincipal: { label: "Conhecer o Radar", url: "/radar" },
  },
  {
    slug: "leticia-souza",
    nome: "Letícia Souza",
    categoria: "landing-page",
    destaque: true,
    pago: true,
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
    destaque: true,
    pago: true,
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
    destaque: false,
    pago: false,
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
    categoria: "landing-page",
    destaque: false,
    pago: false,
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
    destaque: true,
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
    destaque: true,
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
