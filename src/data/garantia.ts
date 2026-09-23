export type GarantiaItem = {
  title?: string;
  description: string;
};

export type GarantiaProject = {
  title: string;
  description: string;
  href: string;
};

export const garantia = {
  eyebrow: "Garantia",
  title: "Garantia de 90 dias",
  subtitle:
    "O que acontece depois que o seu projeto vai ao ar — por escrito, igual para todo cliente.",
  summary: [
    {
      icon: "shieldCheck",
      title: "90 dias de correção sem custo",
      description:
        "Bug que aparecer depois da entrega é corrigido sem cobrança adicional.",
    },
    {
      icon: "clock",
      title: "Resposta em até 24h",
      description:
        "Você fala direto com quem programou o projeto, sem intermediário.",
    },
    {
      icon: "code2",
      title: "Código e acessos são seus",
      description:
        "Com ou sem garantia ativa, o projeto continua sendo seu.",
    },
  ],
  covered: {
    id: "coberto",
    title: "O que está coberto",
    items: [
      "Bugs de funcionamento: formulário que para de enviar, pagamento que não confirma, frete calculando errado, erro de estoque, login que falha.",
      "Regressões: algo que funcionava na entrega e parou de funcionar.",
      "Problemas de exibição e responsividade em navegadores e celulares atuais.",
      "Qualquer item do escopo aprovado que não funcione como foi descrito.",
    ],
  },
  notCovered: {
    id: "nao-coberto",
    title: "O que não está coberto",
    items: [
      "Novas páginas, seções ou funcionalidades — isso é escopo novo, orçado à parte.",
      "Alterações feitas no código por terceiros depois da entrega.",
      "Instabilidade de serviços externos (gateway de pagamento, ERP, hospedagem, domínio). Nesses casos, eu ajudo a diagnosticar e a falar com o suporte do serviço.",
    ],
  },
  howTo: {
    id: "como-acionar",
    title: "Como acionar",
    steps: [
      {
        title: "Me avise",
        description:
          "Mande uma mensagem no WhatsApp ou um e-mail para eduardo.ciudad.dev@gmail.com contando o que aconteceu. Um print ou vídeo curto ajuda muito.",
      },
      {
        title: "Diagnóstico em até 24h",
        description:
          "Você recebe a resposta com o que está causando o problema e o que vai ser feito.",
      },
      {
        title: "Correção no ar",
        description:
          "Eu corrijo, publico e te aviso quando estiver resolvido.",
      },
    ],
    email: "eduardo.ciudad.dev@gmail.com",
  },
  byProject: {
    id: "por-projeto",
    title: "Por tipo de projeto",
    items: [
      {
        title: "Landing page",
        href: "/servicos/landing-page",
        description:
          "Bugs visuais, formulário que para de funcionar e problemas de responsividade em algum aparelho.",
      },
      {
        title: "E-commerce",
        href: "/servicos/ecommerce",
        description:
          "Pagamento não confirmando, frete calculando errado e erro de estoque.",
      },
      {
        title: "Sistema sob medida",
        href: "/servicos/sistema-personalizado",
        description:
          "Correção de bugs e, durante os 90 dias, ajustes de rota se o processo do seu negócio mudar.",
      },
    ] satisfies GarantiaProject[],
  },
  after: {
    id: "depois",
    label: "Depois dos 90 dias",
    text: "Se quiser, seguimos juntos com manutenção sob contrato à parte. Se não quiser, tudo bem: o código, o repositório e os acessos continuam sendo seus, e qualquer desenvolvedor consegue dar continuidade.",
  },
  legal: {
    beforeLink:
      "As condições desta página valem como regra geral. O contrato de cada projeto pode detalhar ou ajustar esses pontos e, em caso de divergência, prevalece o contrato — conforme os ",
    linkLabel: "Termos de Uso",
    href: "/termos",
    afterLink: ".",
  },
  cta: {
    title: "Ficou alguma dúvida?",
    description:
      "Me chama e eu explico como a garantia funciona para o seu projeto.",
    label: "Falar no WhatsApp",
  },
} as const;
