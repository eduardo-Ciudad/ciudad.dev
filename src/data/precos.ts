export type ServicoSlug =
  | "landing-page"
  | "ecommerce"
  | "sistema-personalizado";

export const precos: Record<
  ServicoSlug,
  { preco: string; prazo: string }
> = {
  "landing-page": { preco: "R$ 700–1.000", prazo: "1–2 semanas" },
  ecommerce: { preco: "R$ 2.500–5.000", prazo: "3–4 semanas" },
  "sistema-personalizado": {
    preco: "Sob consulta",
    prazo: "2–4 semanas",
  },
};
