export type Projeto = {
  slug: string;
  nome: string;
  categoria: "fullstack" | "landing-page";
  destaque: boolean;
  pago?: boolean;
  autoral?: boolean;
  imagem?: string;
  status?: string;
  descricao: string[];
  ctaPrincipal?: { label: string; url: string };
  ctaSecundario?: { label: string; url: string };
};

export const projetos: Projeto[] = [
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
    slug: "studymind",
    nome: "StudyMind",
    categoria: "fullstack",
    destaque: true,
    status: "Em manutenção",
    descricao: ["Plataforma de estudos com IA"],
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
];
