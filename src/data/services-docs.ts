export type DocStep = {
  number: number;
  title: string;
  description: string;
};

export type DocGroup = {
  subtitle: string;
  items: string[];
};

export type DocImage = {
  src: string;
  alt: string;
};

export type DocProject = {
  title: string;
  description?: string;
  url?: string;
  bullets: string[];
  hasLink: boolean;
  highlight?: boolean;
  image?: DocImage;
};

export type DocSection =
  | { id: "visao-geral"; title: string; content: string }
  | { id: "processo"; title: string; steps: DocStep[] }
  | {
      id: "decisoes-tecnicas";
      title: string;
      groups: DocGroup[];
      note?: { label: string; text: string };
      diagramImage?: DocImage;
    }
  | { id: "garantia"; title: string; content: string }
  | {
      id: "projeto-real";
      title: string;
      projects: DocProject[];
      note?: string;
    };

export type ServiceDoc = {
  slug: string;
  title: string;
  tagline: string;
  heroImage?: DocImage;
  sections: DocSection[];
};

export const servicesDocs: ServiceDoc[] = [
  {
    slug: "landing-page",
    title: "Landing Page",
    tagline:
      "Página de conversão sob medida, pensada pra transformar visitante em contato — sem CMS pesado, sem template genérico.",
    heroImage: {
      src: "/img/services/landing-page-overview.png",
      alt: "Hero da landing page — visão geral do serviço",
    },
    sections: [
      {
        id: "visao-geral",
        title: "Visão geral",
        content:
          "Página de conversão sob medida, pensada pra transformar visitante em contato — sem CMS pesado, sem template genérico.",
      },
      {
        id: "processo",
        title: "Como funciona o processo",
        steps: [
          {
            number: 1,
            title: "Call inicial (15–20 min)",
            description:
              "Entendo o que você vende, quem é seu cliente e qual é o único caminho de conversão que a página precisa abrir (WhatsApp, formulário, ou ambos). Saio da call com escopo e prazo fechados.",
          },
          {
            number: 2,
            title: "Escolha de design",
            description:
              "Não parto de template. Defino paleta, tipografia e estrutura de seções com base na sua marca e no seu público — se você já tem identidade visual (logo, cores), uso como base; se não tem, proponho uma direção e valido com você antes de programar qualquer linha.",
          },
          {
            number: 3,
            title: "Entrega",
            description:
              "Deploy feito, domínio configurado (se você já tiver um), SEO básico (meta tags, Open Graph pra compartilhamento em redes sociais).",
          },
        ],
      },
      {
        id: "decisoes-tecnicas",
        title: "Decisões técnicas",
        diagramImage: {
          src: "/img/services/landing-page-arquitetura.png",
          alt: "Diagrama de decisões técnicas da landing page",
        },
        groups: [
          {
            subtitle: "Abordagem técnica",
            items: [
              "HTML semântico + CSS puro ou Next.js, dependendo da complexidade (página estática simples não precisa de framework pesado)",
              "Mobile-first: 70%+ do tráfego de landing page vem de Instagram/redes sociais no celular",
              "Animações leves via IntersectionObserver nativo — sem bibliotecas pesadas que atrasam o carregamento",
              "Deploy em Vercel/Netlify com SSL automático incluso",
            ],
          },
        ],
      },
      {
        id: "garantia",
        title: "Garantia de 90 dias",
        content:
          "Se algo quebrar (bug visual, formulário parando de funcionar, problema de responsividade em algum aparelho), eu arrumo sem custo adicional. Não cobre pedidos de novo conteúdo/seção — isso é escopo novo.",
      },
      {
        id: "projeto-real",
        title: "Projeto real",
        projects: [
          {
            title: "Vinicius Mascagni",
            description:
              "Landing page para consultoria de treino e dieta online.",
            bullets: [
              "Hero com contador animado de resultados",
              "Prova social (depoimentos reais de alunos)",
              "Um único CTA: WhatsApp",
            ],
            url: "https://vinicius-masc.vercel.app/",
            hasLink: true,
            image: {
              src: "/img/services/landing-page-vinicius-mascagni.png",
              alt: "Screenshot do projeto real — landing page Vinicius Mascagni",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    tagline:
      "Loja completa com backend próprio — não é montada em cima de Shopify/Nuvemshop. Você é dono do código e do servidor.",
    heroImage: {
      src: "/img/services/ecommerce-overview.png",
      alt: "Visão geral do e-commerce GabiKids",
    },
    sections: [
      {
        id: "visao-geral",
        title: "Visão geral",
        content:
          "Loja completa com backend próprio — não é montada em cima de Shopify/Nuvemshop. Você é dono do código e do servidor.",
      },
      {
        id: "processo",
        title: "Como funciona o processo",
        steps: [
          {
            number: 1,
            title: "Call inicial",
            description:
              "Levanto: quantos produtos, se tem variação (tamanho/cor), qual meio de pagamento você precisa (Pix, cartão, boleto), se já usa algum ERP pra estoque, e se tem CNPJ pra emitir nota fiscal (isso muda a integração de pagamento).",
          },
          {
            number: 2,
            title: "Escolha de design",
            description:
              "Catálogo, carrinho e checkout seguem um padrão de UX testado (não reinvento o fluxo de compra), mas a identidade visual — cores, cards de produto, tipografia — é feita sob medida pra sua marca.",
          },
          {
            number: 3,
            title: "Entrega e infraestrutura",
            description:
              "Deploy em VPS própria (não em plataforma de terceiros que cobra mensalidade pra você acessar seu próprio site), com Docker, Nginx e SSL configurados. Você recebe acesso ao servidor e ao repositório — se quiser trocar de desenvolvedor no futuro, leva tudo.",
          },
        ],
      },
      {
        id: "decisoes-tecnicas",
        title: "Decisões técnicas",
        diagramImage: {
          src: "/img/services/ecommerce-arquitetura.jpg",
          alt: "Diagrama de decisões técnicas do e-commerce, incluindo integração com Bling em desenvolvimento",
        },
        groups: [
          {
            subtitle: "Backend e dados",
            items: [
              "Java + Spring Boot, PostgreSQL com migrations versionadas (Flyway) — todo histórico do banco é rastreável, nada de alteração manual sem controle",
              "Catálogo com variação por tamanho: preço e estoque são controlados por variante, não pelo produto pai, pra granularidade real de inventário",
            ],
          },
          {
            subtitle: "Pagamento",
            items: [
              "Integração com Mercado Pago (Checkout Transparente): Pix com QR Code e cartão com parcelamento, direto na sua página — cliente não é redirecionado pra outro site",
              'Webhook de confirmação de pagamento validado por assinatura HMAC-SHA256: isso impede que alguém forje uma notificação de "pagamento aprovado" sem ter pago de verdade',
              "Checagem de valor: o sistema confere se o valor pago bate exatamente com o valor do pedido antes de confirmar — proteção contra manipulação de preço",
            ],
          },
          {
            subtitle: "Frete",
            items: [
              "Cálculo em tempo real via API dos Correios (PAC e SEDEX), com cache de token e nova tentativa automática em caso de falha temporária da API dos Correios",
            ],
          },
          {
            subtitle: "Segurança",
            items: [
              "Autenticação JWT (token de acesso + token de renovação), senha nunca fica em texto puro (hash BCrypt)",
              "Verificação de email obrigatória antes da primeira compra",
              "SSL/HTTPS em toda a aplicação via Let's Encrypt, renovação automática",
              "Proteção contra acesso indevido a dados de outro cliente (ex: alguém não pode ver o carrinho ou endereço de outra pessoa trocando um número na URL)",
              "Testes automatizados cobrindo as regras de negócio críticas (pagamento, estoque, autenticação) — mudança futura não quebra o que já funciona sem eu perceber",
            ],
          },
        ],
        note: {
          label: "Em desenvolvimento",
          text: "Integração com ERP (Bling): sincronização automática de catálogo (produtos, variações, estoque) direto do Bling pro site, evitando cadastro duplicado. Ainda em construção — vou atualizar essa seção quando estiver disponível pra novos projetos.",
        },
      },
      {
        id: "garantia",
        title: "Garantia de 90 dias",
        content:
          "Bugs de funcionamento (pagamento não confirmando, frete calculando errado, erro de estoque) são corrigidos sem custo. Após os 90 dias, ofereço manutenção sob contrato à parte, se você quiser.",
      },
      {
        id: "projeto-real",
        title: "Projeto real",
        projects: [
          {
            title: "GabiKids",
            description: "Loja de roupas infantil em produção.",
            bullets: [
              "Catálogo com variação de tamanho",
              "Checkout Pix + cartão via Mercado Pago",
              "Frete calculado via Correios",
            ],
            url: "https://gabikids.vercel.app/",
            hasLink: true,
            image: {
              src: "/img/services/ecommerce-gabikids.png",
              alt: "Screenshot do projeto real — loja GabiKids",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "sistema-personalizado",
    title: "Sistema personalizado",
    tagline:
      "Pra quando o problema do seu negócio não tem solução pronta no mercado — automação, painel interno, MVP de produto, integração entre sistemas que hoje são feitas na mão.",
    sections: [
      {
        id: "visao-geral",
        title: "Visão geral",
        content:
          "Pra quando o problema do seu negócio não tem solução pronta no mercado — automação, painel interno, MVP de produto, integração entre sistemas que hoje são feitas na mão.",
      },
      {
        id: "processo",
        title: "Como funciona o processo",
        steps: [
          {
            number: 1,
            title: "Call inicial (a mais importante das três)",
            description:
              "Aqui o trabalho começa antes de qualquer linha de código: entender o processo atual (mesmo que seja manual, em planilha), identificar onde está a dor real, e desenhar a solução mínima que resolve — não a mais bonita, a que funciona.",
          },
          {
            number: 2,
            title: "Escolha de design",
            description:
              "Interface funcional antes de bonita. Se é um painel interno de uso da sua equipe, prioridade é clareza e velocidade de uso, não estética elaborada.",
          },
          {
            number: 3,
            title: "Entrega e infraestrutura",
            description:
              "Deploy em VPS própria com Docker, banco de dados com backup, documentação técnica entregue junto (pra você ou outro desenvolvedor entender o sistema no futuro).",
          },
        ],
      },
      {
        id: "decisoes-tecnicas",
        title: "Decisões técnicas",
        groups: [
          {
            subtitle: "Arquitetura definida por projeto",
            items: [
              "Sistemas com múltiplas integrações externas (pagamento, IA, WhatsApp) usam arquitetura em camadas isoladas — se uma integração externa cair ou mudar, o resto do sistema continua funcionando",
              "Dados sensíveis (financeiro, autenticação) seguem o mesmo padrão de segurança do e-commerce: JWT, senha hasheada, HTTPS, isolamento de dados por usuário",
              "Histórico de dados que não pode ser perdido ou alterado (ex: lançamento financeiro) usa modelo append-only — nada é editado ou apagado, correções viram novos registros, garantindo rastreabilidade total",
            ],
          },
        ],
      },
      {
        id: "garantia",
        title: "Garantia de 90 dias + acompanhamento",
        content:
          "Sistemas sob medida evoluem — por isso o acompanhamento pós-entrega aqui é mais próximo: além da correção de bugs nos primeiros 90 dias, fico disponível pra ajustes de rota se o processo do seu negócio mudar durante esse período.",
      },
      {
        id: "projeto-real",
        title: "Projetos reais",
        projects: [
          {
            title: "Sistema Financeiro Multi-Tenant",
            bullets: [
              "Isolamento de dados por usuário",
              "Lançamentos append-only (nunca editados, só estornados)",
              "Dashboard com extrato mensal",
            ],
            url: "https://controle-financeiro-lab-frontend.vercel.app/",
            hasLink: true,
          },
          {
            title: "PromoBot",
            description:
              "Bot de IA que monitora promoções, gera legendas automaticamente com IA generativa e distribui via WhatsApp — rodando 24/7 em infraestrutura própria, com arquitetura isolada por integração (se o WhatsApp cair, o monitoramento continua rodando).",
            bullets: [],
            hasLink: false,
            highlight: true,
          },
        ],
        note: "Veja também o StudyMind, plataforma de estudos com IA, entre outros projetos do portfólio.",
      },
    ],
  },
];

export function getServiceDoc(slug: string): ServiceDoc | undefined {
  return servicesDocs.find((doc) => doc.slug === slug);
}
