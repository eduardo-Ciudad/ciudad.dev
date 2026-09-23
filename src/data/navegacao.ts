import { precos } from "./precos";
import { getProjeto, hasCase } from "./projetos";

const projetosDoMenu = [
  {
    slug: "gabikids",
    title: "GabiKids",
    meta: "E-commerce",
  },
  {
    slug: "sistema-financeiro-multi-tenant",
    title: "Sistema Financeiro",
    meta: "Sistema sob medida",
  },
  {
    slug: "leticia-souza",
    title: "Letícia Souza",
    meta: "Landing page",
  },
  {
    slug: "vinicius-mascagni",
    title: "Vinícius Mascagni",
    meta: "Landing page",
  },
].map((item) => {
  const projeto = getProjeto(item.slug);

  if (!projeto || !hasCase(projeto)) {
    throw new Error(`Projeto do menu sem case publicado: ${item.slug}`);
  }

  return {
    ...item,
    href: `/projetos/${item.slug}`,
  };
});

export const navegacao = {
  servicos: {
    label: "Serviços",
    items: [
      {
        title: "Landing page",
        href: "/servicos/landing-page",
        meta: precos["landing-page"].preco,
      },
      {
        title: "E-commerce",
        href: "/servicos/ecommerce",
        meta: precos.ecommerce.preco,
      },
      {
        title: "Sistema sob medida",
        href: "/servicos/sistema-personalizado",
        meta: precos["sistema-personalizado"].preco,
      },
    ],
    footer: { label: "Todos com garantia de 90 dias", href: "/garantia" },
  },
  comoTrabalhamos: {
    label: "Como trabalhamos",
    items: [
      { title: "Como funciona", href: "/#como-funciona" },
      { title: "Garantia de 90 dias", href: "/garantia" },
      { title: "Calculadora", href: "/calculadora" },
      { title: "Quem faz", href: "/#sobre" },
    ],
  },
  projetos: {
    label: "Projetos",
    items: projetosDoMenu,
    footer: { label: "Ver todos os projetos", href: "/projetos" },
  },
  links: [{ label: "Blog", href: "/blog" }],
  cta: "Começar projeto",
};
