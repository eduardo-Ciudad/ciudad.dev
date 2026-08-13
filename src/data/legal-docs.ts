const CONTACT_EMAIL = "eduardo.ciudad.dev@gmail.com";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "link";
      before?: string;
      linkText: string;
      href: string;
      after?: string;
      external?: boolean;
    };

export type LegalSubsection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalSection = {
  id: string;
  title: string;
  blocks?: LegalBlock[];
  subsections?: LegalSubsection[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  intro: LegalBlock[];
  sections: LegalSection[];
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacidade",
    title: "Política de Privacidade",
    description:
      "Como a ciudad.dev coleta, utiliza e protege dados pessoais, em conformidade com a LGPD.",
    updatedAt: "13/08/2026",
    intro: [
      {
        type: "p",
        text: "A ciudad.dev, operada por Eduardo Ciudad, respeita a privacidade dos visitantes do site e das pessoas que entram em contato ou contratam nossos serviços.",
      },
      {
        type: "p",
        text: "Esta Política de Privacidade explica quais dados pessoais podem ser coletados, para quais finalidades são utilizados, com quem podem ser compartilhados e quais direitos você possui, em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018).",
      },
    ],
    sections: [
      {
        id: "quem-somos",
        title: "1. Quem somos",
        blocks: [
          {
            type: "p",
            text: "A ciudad.dev é uma atividade de desenvolvimento de software operada, atualmente, por Eduardo Ciudad, pessoa física, enquanto o processo de formalização da atividade empresarial estiver em andamento.",
          },
          {
            type: "link",
            before:
              "Para assuntos relacionados à privacidade e proteção de dados, entre em contato pelo e-mail: ",
            linkText: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            external: true,
          },
        ],
      },
      {
        id: "quais-dados",
        title: "2. Quais dados podemos coletar",
        blocks: [
          {
            type: "p",
            text: "Podemos coletar os seguintes dados, dependendo da forma como você interage com a ciudad.dev:",
          },
        ],
        subsections: [
          {
            title: "Dados fornecidos por você",
            blocks: [
              {
                type: "p",
                text: "Quando você entra em contato conosco ou solicita um orçamento, podemos receber:",
              },
              {
                type: "list",
                items: [
                  "nome;",
                  "endereço de e-mail;",
                  "telefone ou WhatsApp;",
                  "informações fornecidas voluntariamente na mensagem;",
                  "informações relacionadas ao projeto ou serviço que você deseja contratar.",
                ],
              },
              {
                type: "p",
                text: "Não solicitamos dados pessoais que não sejam necessários para atender à sua solicitação.",
              },
            ],
          },
          {
            title: "Dados de navegação",
            blocks: [
              {
                type: "p",
                text: "Durante a utilização do site, determinados dados técnicos podem ser registrados automaticamente, como informações relacionadas ao dispositivo, navegador, páginas acessadas e informações técnicas necessárias à segurança e funcionamento do site.",
              },
              {
                type: "p",
                text: "Quando forem utilizadas ferramentas de análise de tráfego ou outras tecnologias semelhantes, essas informações serão tratadas de acordo com a configuração e finalidade da ferramenta utilizada.",
              },
            ],
          },
        ],
      },
      {
        id: "finalidades",
        title: "3. Para que utilizamos seus dados",
        blocks: [
          { type: "p", text: "Os dados pessoais podem ser utilizados para:" },
          {
            type: "list",
            items: [
              "responder mensagens e solicitações de contato;",
              "responder pedidos de orçamento;",
              "compreender as necessidades relacionadas a um possível projeto;",
              "elaborar propostas comerciais;",
              "realizar comunicações relacionadas à contratação ou execução dos serviços;",
              "cumprir obrigações legais ou regulatórias;",
              "proteger a segurança e o funcionamento do site;",
              "exercer ou defender direitos em processos judiciais, administrativos ou arbitrais, quando necessário.",
            ],
          },
        ],
      },
      {
        id: "bases-legais",
        title: "4. Bases legais",
        blocks: [
          {
            type: "p",
            text: "O tratamento dos dados pessoais poderá ocorrer com fundamento nas hipóteses previstas na LGPD, conforme a finalidade do tratamento.",
          },
          { type: "p", text: "Entre elas, podem estar:" },
          {
            type: "list",
            items: [
              "procedimentos preliminares relacionados à contratação, quando você solicita um orçamento ou apresenta uma demanda;",
              "execução de contrato, quando há contratação dos serviços;",
              "cumprimento de obrigação legal ou regulatória;",
              "exercício regular de direitos;",
              "legítimo interesse, quando aplicável e observados os direitos e liberdades do titular;",
              "consentimento, quando essa for a base legal adequada para determinado tratamento.",
            ],
          },
          {
            type: "p",
            text: "O consentimento não será utilizado como base legal quando outra hipótese prevista na LGPD for mais adequada ao tratamento realizado.",
          },
        ],
      },
      {
        id: "compartilhamento",
        title: "5. Compartilhamento de dados",
        blocks: [
          { type: "p", text: "A ciudad.dev não vende seus dados pessoais." },
          {
            type: "p",
            text: "Se necessário para a operação do negócio, alguns dados poderão ser tratados por prestadores de serviços que atuem em nosso nome, como fornecedores de hospedagem, serviços de e-mail, ferramentas de comunicação ou ferramentas de análise.",
          },
          {
            type: "p",
            text: "O compartilhamento será limitado ao necessário para a finalidade correspondente.",
          },
          {
            type: "p",
            text: "Quando aplicável, determinados prestadores poderão realizar o tratamento de dados fora do Brasil, observadas as regras previstas na legislação aplicável.",
          },
        ],
      },
      {
        id: "seus-direitos",
        title: "6. Seus direitos",
        blocks: [
          {
            type: "p",
            text: "Nos termos da LGPD, você pode exercer, conforme aplicável ao tratamento realizado, direitos como:",
          },
          {
            type: "list",
            items: [
              "confirmação da existência de tratamento;",
              "acesso aos seus dados pessoais;",
              "correção de dados incompletos, inexatos ou desatualizados;",
              "solicitação de anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a legislação;",
              "portabilidade dos dados, observadas as regulamentações aplicáveis;",
              "informação sobre entidades públicas e privadas com as quais seus dados tenham sido compartilhados;",
              "revogação do consentimento, quando o tratamento estiver baseado em consentimento;",
              "eliminação dos dados tratados com base no consentimento, ressalvadas as hipóteses legais de conservação;",
              "demais direitos previstos na legislação aplicável.",
            ],
          },
          {
            type: "link",
            before: "Para exercer seus direitos, entre em contato pelo e-mail ",
            linkText: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            after: ".",
            external: true,
          },
          {
            type: "p",
            text: "Alguns pedidos poderão não ser atendidos imediatamente ou integralmente quando houver fundamento legal para manutenção dos dados, como cumprimento de obrigação legal ou exercício regular de direitos.",
          },
        ],
      },
      {
        id: "retencao",
        title: "7. Retenção dos dados",
        blocks: [
          {
            type: "p",
            text: "Os dados pessoais serão mantidos pelo período necessário para cumprir as finalidades descritas nesta Política.",
          },
          {
            type: "p",
            text: "Após o encerramento da finalidade, os dados poderão ser eliminados ou anonimizados, salvo quando sua conservação for necessária para:",
          },
          {
            type: "list",
            items: [
              "cumprimento de obrigação legal ou regulatória;",
              "exercício regular de direitos;",
              "prevenção de fraudes e segurança;",
              "outras hipóteses permitidas pela legislação.",
            ],
          },
        ],
      },
      {
        id: "seguranca",
        title: "8. Segurança",
        blocks: [
          {
            type: "p",
            text: "Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, alteração, divulgação ou destruição indevida.",
          },
          {
            type: "p",
            text: "Entre as medidas adotadas podem estar o uso de conexão segura (HTTPS), controle de acesso e boas práticas de desenvolvimento e infraestrutura.",
          },
          {
            type: "p",
            text: "Apesar dos esforços empregados, nenhum sistema conectado à internet pode ser considerado completamente livre de riscos.",
          },
        ],
      },
      {
        id: "cookies",
        title: "9. Cookies e tecnologias semelhantes",
        blocks: [
          {
            type: "p",
            text: "O site poderá utilizar cookies e tecnologias semelhantes para seu funcionamento e, quando aplicável, para análise de utilização.",
          },
          {
            type: "p",
            text: "Os cookies não essenciais somente serão utilizados de acordo com as configurações e escolhas disponibilizadas ao visitante, quando aplicável.",
          },
          {
            type: "link",
            before: "Mais informações estão disponíveis na nossa ",
            linkText: "Política de Cookies",
            href: "/cookies",
            after: ".",
          },
        ],
      },
      {
        id: "alteracoes",
        title: "10. Alterações nesta Política",
        blocks: [
          {
            type: "p",
            text: "Esta Política de Privacidade poderá ser atualizada periodicamente para refletir alterações no site, nos serviços oferecidos, nas ferramentas utilizadas ou na legislação aplicável.",
          },
          {
            type: "p",
            text: "A versão mais recente estará sempre disponível nesta página, acompanhada da respectiva data de atualização.",
          },
        ],
      },
      {
        id: "contato",
        title: "11. Contato",
        blocks: [
          {
            type: "p",
            text: "Para dúvidas, solicitações ou assuntos relacionados à privacidade e proteção de dados:",
          },
          {
            type: "link",
            before: "E-mail: ",
            linkText: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            external: true,
          },
          { type: "p", text: "Responsável pelo tratamento: Eduardo Ciudad" },
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Política de Cookies",
    description:
      "Como a ciudad.dev utiliza cookies e tecnologias semelhantes no site.",
    updatedAt: "13/08/2026",
    intro: [
      {
        type: "p",
        text: "A ciudad.dev utiliza cookies e tecnologias semelhantes para garantir o funcionamento do site e, quando aplicável, compreender como os visitantes utilizam nossas páginas.",
      },
    ],
    sections: [
      {
        id: "o-que-sao",
        title: "1. O que são cookies?",
        blocks: [
          {
            type: "p",
            text: "Cookies são pequenos arquivos ou identificadores armazenados no navegador do visitante que permitem ao site reconhecer determinadas informações relacionadas à navegação.",
          },
          {
            type: "p",
            text: "Eles podem ser utilizados para diferentes finalidades, como funcionamento técnico, segurança, preferências e análise de utilização.",
          },
        ],
      },
      {
        id: "tipos",
        title: "2. Tipos de cookies utilizados",
        subsections: [
          {
            title: "Cookies necessários",
            blocks: [
              {
                type: "p",
                text: "São utilizados para permitir o funcionamento básico do site, segurança e disponibilização de determinadas funcionalidades.",
              },
              {
                type: "p",
                text: "Por serem necessários para o funcionamento do site, não dependem de consentimento quando utilizados exclusivamente para essas finalidades.",
              },
            ],
          },
          {
            title: "Cookies de análise",
            blocks: [
              {
                type: "p",
                text: "Caso sejam utilizadas ferramentas de análise de tráfego, poderão existir tecnologias destinadas a compreender como os visitantes utilizam o site, como páginas acessadas e informações relacionadas à navegação.",
              },
              {
                type: "p",
                text: "Quando o tratamento depender de consentimento, esses recursos somente serão ativados após a manifestação correspondente do visitante.",
              },
            ],
          },
          {
            title: "Cookies de terceiros",
            blocks: [
              {
                type: "p",
                text: "Determinados serviços incorporados ao site podem utilizar tecnologias próprias, conforme suas respectivas políticas de privacidade.",
              },
              {
                type: "p",
                text: "A ciudad.dev não utiliza cookies de terceiros destinados à publicidade comportamental ou rastreamento publicitário, salvo se esta política for atualizada para refletir uma alteração nessa prática.",
              },
            ],
          },
        ],
      },
      {
        id: "gerenciamento",
        title: "3. Gerenciamento de cookies",
        blocks: [
          {
            type: "p",
            text: "Você pode controlar ou bloquear cookies por meio das configurações do seu navegador.",
          },
          {
            type: "p",
            text: "O bloqueio de determinados cookies necessários poderá afetar o funcionamento de algumas funcionalidades do site.",
          },
          {
            type: "p",
            text: "Quando houver cookies não essenciais que dependam de consentimento, suas preferências poderão ser alteradas por meio das ferramentas disponibilizadas no site.",
          },
        ],
      },
      {
        id: "alteracoes",
        title: "4. Alterações nesta Política",
        blocks: [
          {
            type: "p",
            text: "Esta Política de Cookies poderá ser atualizada quando houver alterações nas tecnologias utilizadas pelo site ou nas finalidades de tratamento.",
          },
          {
            type: "p",
            text: "A versão mais recente estará sempre disponível nesta página.",
          },
        ],
      },
      {
        id: "contato",
        title: "5. Contato",
        blocks: [
          {
            type: "link",
            before: "Em caso de dúvidas sobre o uso de cookies: ",
            linkText: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            external: true,
          },
        ],
      },
    ],
  },
  {
    slug: "termos",
    title: "Termos de Uso",
    description:
      "Condições gerais para utilização do site e contratação dos serviços da ciudad.dev.",
    updatedAt: "13/08/2026",
    intro: [
      {
        type: "p",
        text: "Estes Termos de Uso estabelecem as condições gerais para utilização do site ciudad.dev.",
      },
      {
        type: "p",
        text: "Ao acessar e utilizar este site, você declara estar de acordo com estas condições.",
      },
    ],
    sections: [
      {
        id: "sobre",
        title: "1. Sobre a ciudad.dev",
        blocks: [
          {
            type: "p",
            text: "A ciudad.dev é uma atividade de desenvolvimento de software operada atualmente por Eduardo Ciudad.",
          },
          {
            type: "p",
            text: "O site tem finalidade institucional e apresenta informações sobre serviços de desenvolvimento de software, incluindo, entre outros:",
          },
          {
            type: "list",
            items: [
              "landing pages;",
              "sites institucionais;",
              "e-commerce;",
              "sistemas personalizados;",
              "outras soluções de software sob medida.",
            ],
          },
        ],
      },
      {
        id: "informacoes-servicos",
        title: "2. Informações sobre os serviços",
        blocks: [
          {
            type: "p",
            text: "As informações apresentadas no site têm caráter informativo e comercial.",
          },
          {
            type: "p",
            text: "Descrições de serviços, funcionalidades, valores, prazos ou exemplos apresentados no site não representam necessariamente as condições definitivas de uma contratação.",
          },
          {
            type: "p",
            text: "Cada projeto será analisado individualmente de acordo com as necessidades do cliente.",
          },
        ],
      },
      {
        id: "contratacao",
        title: "3. Contratação",
        blocks: [
          {
            type: "p",
            text: "A contratação dos serviços será formalizada separadamente, por meio de proposta comercial, contrato ou outro instrumento acordado entre as partes.",
          },
          {
            type: "p",
            text: "O documento de contratação específico definirá, conforme aplicável:",
          },
          {
            type: "list",
            items: [
              "escopo do projeto;",
              "funcionalidades;",
              "prazo;",
              "preço e condições de pagamento;",
              "responsabilidades das partes;",
              "propriedade intelectual;",
              "suporte e manutenção;",
              "garantias;",
              "demais condições específicas do projeto.",
            ],
          },
          {
            type: "p",
            text: "Em caso de divergência entre as informações deste site e o contrato celebrado entre as partes, prevalecerão as condições estabelecidas no contrato, respeitada a legislação aplicável.",
          },
        ],
      },
      {
        id: "propriedade-intelectual",
        title: "4. Propriedade intelectual",
        blocks: [
          {
            type: "p",
            text: "Salvo indicação em contrário, os textos, elementos visuais, identidade, código e demais conteúdos desenvolvidos especificamente para o site ciudad.dev pertencem a seus respectivos titulares.",
          },
          {
            type: "p",
            text: "A propriedade intelectual relacionada aos projetos desenvolvidos para clientes será definida de acordo com a proposta ou contrato específico de cada projeto.",
          },
          {
            type: "p",
            text: "O uso de bibliotecas, frameworks, componentes de terceiros e outros recursos de código aberto continuará sujeito às respectivas licenças.",
          },
        ],
      },
      {
        id: "uso-do-site",
        title: "5. Uso do site",
        blocks: [
          {
            type: "p",
            text: "O usuário compromete-se a utilizar o site de maneira adequada e de acordo com a legislação brasileira.",
          },
          { type: "p", text: "Não é permitido utilizar o site para:" },
          {
            type: "list",
            items: [
              "praticar atividades ilícitas;",
              "tentar obter acesso não autorizado a sistemas ou informações;",
              "comprometer a segurança ou disponibilidade do site;",
              "utilizar o conteúdo do site de forma que viole direitos de terceiros.",
            ],
          },
        ],
      },
      {
        id: "disponibilidade",
        title: "6. Disponibilidade e limitações",
        blocks: [
          {
            type: "p",
            text: "A ciudad.dev busca manter o site disponível e funcionando corretamente, mas não garante disponibilidade ininterrupta ou ausência absoluta de erros.",
          },
          {
            type: "p",
            text: "O site poderá ficar temporariamente indisponível em razão de manutenção, atualizações, falhas de infraestrutura, problemas de terceiros ou outros eventos fora do controle razoável da ciudad.dev.",
          },
        ],
      },
      {
        id: "links-externos",
        title: "7. Links externos",
        blocks: [
          {
            type: "p",
            text: "O site poderá eventualmente disponibilizar links para sites ou serviços de terceiros.",
          },
          {
            type: "p",
            text: "A ciudad.dev não controla esses sites e não se responsabiliza pelo conteúdo, funcionamento ou políticas de privacidade de terceiros.",
          },
          {
            type: "p",
            text: "Recomenda-se consultar os respectivos termos e políticas antes de utilizar esses serviços.",
          },
        ],
      },
      {
        id: "formalizacao",
        title: "8. Formalização da atividade",
        blocks: [
          {
            type: "p",
            text: "A atividade atualmente é realizada por Eduardo Ciudad como pessoa física, enquanto o processo de formalização empresarial estiver em andamento.",
          },
          {
            type: "p",
            text: "A eventual formalização como pessoa jurídica não altera, por si só, as obrigações assumidas em contratos já celebrados, salvo quando expressamente acordado entre as partes ou exigido pela legislação aplicável.",
          },
        ],
      },
      {
        id: "direitos-consumidor",
        title: "9. Direitos do consumidor",
        blocks: [
          {
            type: "p",
            text: "Quando houver relação de consumo, serão observadas as normas de proteção ao consumidor aplicáveis, incluindo o Código de Defesa do Consumidor.",
          },
          {
            type: "p",
            text: "Nenhuma disposição destes Termos tem a finalidade de limitar direitos que não possam ser afastados pela legislação aplicável.",
          },
        ],
      },
      {
        id: "alteracoes",
        title: "10. Alterações destes Termos",
        blocks: [
          {
            type: "p",
            text: "Estes Termos poderão ser atualizados para refletir alterações nos serviços, no funcionamento do site ou na legislação aplicável.",
          },
          {
            type: "p",
            text: "A versão mais recente estará sempre disponível nesta página, acompanhada da data de atualização.",
          },
        ],
      },
      {
        id: "contato",
        title: "11. Contato",
        blocks: [
          { type: "p", text: "Para dúvidas sobre estes Termos de Uso:" },
          {
            type: "link",
            before: "E-mail: ",
            linkText: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            external: true,
          },
          { type: "p", text: "Responsável: Eduardo Ciudad" },
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug);
}
