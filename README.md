# CiudadLab · Site institucional

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

Site da [CiudadLab](https://ciudadlab.com.br), estúdio de desenvolvimento que eu fundei para criar sites, lojas virtuais e sistemas sob medida. Reúne os serviços, os projetos entregues, os produtos próprios (Radar e Kelly Academy) e um blog com bastidores técnicos dos projetos.

## O que tem

* **Home:** serviços, projetos, como funciona, diferenciais, perguntas frequentes e o founder
* **Serviços** (`/servicos/[slug]`): landing page, e-commerce e sistema personalizado, cada um com um resumo e os detalhes técnicos em uma camada separada
* **Projetos** (`/projetos` e `/projetos/[slug]`): cases de clientes e projetos autorais, como a [GabiKids](https://gabikidstore.com) e a [Kelly Academy](https://kellyacademy.com.br)
* **Radar** (`/radar`): acompanhamento mensal dos sites entregues com dados do Google Analytics
* **Blog** (`/blog`): posts em MDX sobre preço de site, loja própria ou marketplace e bastidores de problemas reais dos projetos
* **Calculadora** (`/calculadora`): o visitante estima quanto perde com atendimento manual e manda o resultado pelo WhatsApp
* **Garantia** (`/garantia`), privacidade, termos e cookies

## Decisões técnicas

**Conteúdo separado dos componentes.** Serviços, projetos, preços, FAQ, garantia e textos legais ficam em arquivos tipados em `src/data`. Mudar um preço ou acrescentar um case não exige mexer em componente.

**Blog sem CMS.** Os posts são arquivos MDX em `content/blog`, com frontmatter lido pelo `gray-matter` e renderizados com `next-mdx-remote` e `remark-gfm`.

**SEO no próprio Next.** `sitemap.ts` e `robots.ts` gerados pelo App Router, metadados e canonical por página, imagem Open Graph gerada dinamicamente e JSON-LD de `Organization`.

**Conversão medida com consentimento.** O Google Analytics 4 roda com Consent Mode e só armazena dados depois que o visitante aceita os cookies. Cada botão de WhatsApp envia um evento `generate_lead` com a seção de origem, para saber qual parte do site gera contato.

## Stack

* Next.js 16 (App Router), React 19, TypeScript
* Tailwind CSS 4 e Framer Motion
* MDX com next-mdx-remote, gray-matter e remark-gfm
* Deploy na Vercel

## Estrutura

```
├── content/blog/        # Posts em MDX
├── public/img/          # Imagens dos projetos e do site
└── src/
    ├── app/             # Rotas do App Router, sitemap, robots e imagem OG
    ├── components/      # Seções da home e componentes de interface
    ├── data/            # Conteúdo tipado: serviços, projetos, preços, legal...
    ├── hooks/
    └── lib/             # Blog, analytics e utilitários
```

## Como rodar

```bash
git clone https://github.com/eduardo-Ciudad/ciudad.dev.git
cd ciudad.dev
cp .env.example .env.local   # NEXT_PUBLIC_GA_MEASUREMENT_ID é opcional em desenvolvimento
npm install
npm run dev
```

O site abre em `http://localhost:3000`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Serve o build |
| `npm run lint` | ESLint |

## Autor

Eduardo · [CiudadLab](https://ciudadlab.com.br) · [LinkedIn](https://www.linkedin.com/in/eduardociudadf) · [GitHub](https://github.com/eduardo-Ciudad)