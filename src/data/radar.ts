export const radar = {
  eyebrow: "Produto",
  title: "Radar",
  subtitle:
    "Depois que o seu site vai ao ar, alguém continua olhando os números por você — e te conta, sem jargão, o que está funcionando e o que dá pra melhorar.",
  heroImage: {
    src: "/img/radar/radar-sites.png",
    alt: "Painel do Radar com os sites monitorados",
    width: 1913,
    height: 857,
  },
  tracked: {
    title: "O que o Radar acompanha",
    items: [
      "Visitas e novos visitantes",
      "De onde as pessoas chegam (Google, Instagram, direto)",
      "Quantas clicaram no WhatsApp ou enviaram o formulário",
      "Engajamento e páginas mais vistas",
      "Comparação com o período anterior",
    ],
  },
  deliverables: {
    title: "O que você recebe",
    items: [
      {
        icon: "chartNoAxesCombined",
        title: "Google Analytics configurado na entrega",
        description: "Seu site já sai medindo visitas e contatos. A conta do Analytics é sua.",
      },
      {
        icon: "fileChartColumn",
        title: "Relatório mensal",
        description: "Todo mês, um resumo em português de gente: o que aconteceu, o que mudou em relação ao mês anterior e uma ou duas sugestões práticas pro próximo.",
      },
    ],
  },
  example: {
    label: "Exemplo",
    title: "Exemplo de relatório mensal",
    text: "Setembro: 412 visitas, 58% vindas do Google e 27% do Instagram. A página de serviços foi a mais vista e 19 pessoas clicaram no WhatsApp — 6 a mais que em agosto. Sugestão: repetir no topo da página o botão que mais recebeu clique.",
  },
  analyticsImage: {
    src: "/img/radar/radar-analytics.png",
    alt: "Tela de Analytics do ciudadlab.com.br no Radar",
    width: 1896,
    height: 848,
    caption: "Exemplo ilustrativo. A imagem mostra o painel real do Radar.",
  },
  howItWorks: {
    title: "Como funciona",
    steps: [
      { title: "Site entregue com Analytics", description: "Configuro o Google Analytics 4 e as conversões antes de publicar." },
      { title: "90 dias de Radar inclusos", description: "Durante a garantia, você recebe as leituras sem custo." },
      { title: "Você decide se continua", description: "Depois dos 90 dias, o Radar vira um plano mensal. Se não quiser, o Analytics continua funcionando na sua conta." },
    ],
  },
  faq: {
    title: "Dúvidas frequentes",
    items: [
      { question: "Preciso entender de Analytics?", answer: "Não. Eu leio os números e te mando o que importa." },
      { question: "Os dados são meus?", answer: "Sim. O Google Analytics fica na sua conta Google. O Radar só tem acesso de leitura, e os dados são agregados — nada identifica visitantes individualmente." },
      { question: "Quanto custa depois dos 90 dias?", answer: "Sob consulta, de acordo com o tamanho do site e a frequência de relatórios." },
    ],
  },
  cta: { title: "Quer o Radar no seu site?", label: "Falar no WhatsApp" },
} as const;
