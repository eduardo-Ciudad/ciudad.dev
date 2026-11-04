import { getProjeto, hasCase, type ProjetoComCase } from "./projetos";

const casesTradicionais = [
  "gabikids",
  "sistema-financeiro-multi-tenant",
  "leticia-souza",
  "vinicius-mascagni",
  "kelly-academy",
] as const;

for (const slug of casesTradicionais) {
  const projeto = getProjeto(slug);

  if (!projeto || !hasCase(projeto)) {
    throw new Error(`Regressão: ${slug} deixou de ser reconhecido como case.`);
  }

  const caseTipado: ProjetoComCase = projeto;
  void caseTipado;
}

const radar = getProjeto("radar");
if (!radar || !hasCase(radar)) {
  throw new Error("Regressão: radar deixou de ser reconhecido como case.");
}
