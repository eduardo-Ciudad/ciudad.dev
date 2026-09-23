export type CalculadoraValores = {
  pessoasDia: number;
  minutos: number;
  ticket: number;
  somem: number;
  compram: number;
};

export type CampoCalculadora = {
  id: keyof CalculadoraValores;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
};

export const calculadora = {
  page: {
    eyebrow: "Calculadora",
    title: "Quanto custa responder cliente um por um?",
    subtitle:
      "5 perguntas, 1 minuto. Nada é enviado para ninguém: a conta acontece no seu navegador.",
  },
  groups: [
    {
      title: "Seu atendimento hoje",
      fields: [
        {
          id: "pessoasDia",
          label:
            "Quantas pessoas chamam por dia perguntando de produto ou serviço?",
          min: 1,
          max: 100,
          step: 1,
          defaultValue: 15,
          suffix: "pessoas",
        },
        {
          id: "minutos",
          label:
            "Quantos minutos você gasta com cada uma, em média? (mandar foto, preço, tamanho, tirar dúvida)",
          min: 1,
          max: 60,
          step: 1,
          defaultValue: 10,
          suffix: "min",
        },
      ],
    },
    {
      title: "Suas vendas",
      fields: [
        {
          id: "ticket",
          label: "Qual o valor médio de uma venda?",
          min: 10,
          max: 2000,
          step: 10,
          defaultValue: 100,
          prefix: "R$",
        },
        {
          id: "somem",
          label:
            "De cada 10 pessoas que chamam, quantas somem antes de você responder ou fechar?",
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 3,
          suffix: "de 10",
        },
        {
          id: "compram",
          label: "De cada 10 que você atende a tempo, quantas compram?",
          min: 0,
          max: 10,
          step: 1,
          defaultValue: 3,
          suffix: "de 10",
        },
      ],
    },
  ] as Array<{ title: string; fields: CampoCalculadora[] }>,
  result: {
    label: "Por mês, com os seus números",
    hoursSuffix: "horas",
    hoursDescription: "respondendo mensagens, uma por uma.",
    weekPrefix: "Isso é mais de",
    weekSingular: "semana",
    weekPlural: "semanas",
    weekSuffix: "de trabalho de 40h.",
    salesDescription: "em vendas que começam e não terminam.",
    salesPrefix: "Cerca de",
    salesSuffix: "vendas por mês.",
    cta: "Quero resolver isso",
    ctaNote: "Você pode editar a mensagem antes de enviar.",
    whatsappGreeting: "Olá! Fiz a calculadora do site: gasto cerca de",
    whatsappHours: "h por mês respondendo clientes e estimo perder",
    whatsappEnding: "em vendas. Quero entender como resolver.",
  },
  methodology: {
    summary: "Como calculamos",
    formulas: [
      "Horas por mês = pessoas por dia × minutos por atendimento × 30 ÷ 60",
      "Vendas perdidas = pessoas por dia × 30 × (quantas somem ÷ 10) × (quantas compram ÷ 10)",
      "Valor perdido = vendas perdidas × valor médio da venda",
    ],
    note:
      "Todos os números vêm das suas respostas. Não usamos estatística de mercado nem média de outros negócios: é uma estimativa para você enxergar o tamanho do problema, não uma promessa de resultado.",
  },
  nextSteps: {
    title: "O que ajuda o cliente a comprar sem esperar você",
    items: [
      "Catálogo com foto, preço, tamanho e estoque visíveis: a pergunta é respondida antes de ser feita.",
      "Compra do início ao fim pelo site, com Pix, cartão e frete calculado na hora.",
      "Dúvidas frequentes respondidas na própria página, não no direct.",
    ],
  },
  caseStudy: {
    label: "Case real",
    text:
      "Na GabiKids, a lojista vendia só pelo Instagram e pelo WhatsApp, mandando foto, preço e tamanho de cada peça para cada cliente. Com o catálogo no site, a cliente vê tudo e compra sozinha, e o atendimento manual deixou de ser o gargalo.",
    linkLabel: "Ver o case completo →",
    href: "/projetos/gabikids",
  },
};

export const valoresIniciais: CalculadoraValores = Object.fromEntries(
  calculadora.groups.flatMap((group) =>
    group.fields.map((field) => [field.id, field.defaultValue]),
  ),
) as CalculadoraValores;

export function calcular({
  pessoasDia,
  minutos,
  ticket,
  somem,
  compram,
}: CalculadoraValores) {
  const horasMes = (pessoasDia * minutos * 30) / 60;
  const vendasPerdidas = pessoasDia * 30 * (somem / 10) * (compram / 10);
  const valorPerdido = vendasPerdidas * ticket;

  return { horasMes, vendasPerdidas, valorPerdido };
}
