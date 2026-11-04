const origens = [
  { nome: "Instagram", valor: 38, cor: "#2563EB" },
  { nome: "Google", valor: 31, cor: "#2563EB" },
  { nome: "Direto", valor: 19, cor: "#7EA6F5" },
  { nome: "Outros", valor: 12, cor: "#B8CDF7" },
] as const;

const paginas = [
  ["/vestidos", "412", "6"],
  ["/", "388", "17"],
  ["/conjuntos", "201", "11"],
  ["/sobre", "96", "7"],
] as const;

const leituras = [
  ["O que o Radar apontou", "A página de vestidos é a mais visitada e a que menos converte: 412 visitas e só 6 cliques no WhatsApp. O botão fica no fim da página, depois de todas as fotos."],
  ["O que mudou no site", "O botão de WhatsApp passou a acompanhar a rolagem em cada produto, com a mensagem já dizendo qual peça a cliente viu."],
  ["O mês seguinte", "Os cliques no WhatsApp a partir de /vestidos foram de 6 para 23. A leitura do Radar do mês seguinte já começou por essa mudança."],
] as const;

export function RadarMes() {
  return (
    <section id="um-mes-no-radar">
      <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">Um mês no Radar</h2>
      <div className="rounded-xl border border-dashed border-black/20 bg-white p-5 text-[14px] leading-[1.7] text-primary/75 md:p-6">
        <strong className="font-semibold text-primary">Exemplo ilustrativo.</strong> O Ateliê Exemplo é uma loja fictícia, e todos os números desta seção foram inventados para mostrar como o Radar lê um site. Nenhum dado de cliente real aparece aqui.
      </div>
      <p className="mt-6 text-[15px] leading-[1.8] text-primary/80">Imagine uma loja de roupas que vende pelo site e fecha os pedidos no WhatsApp. A dona tem o Google Analytics instalado desde o lançamento, mas nunca abriu. É isto que o Radar mostra para ela no fim do mês.</p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5 md:p-6">
          <h3 className="text-[10px] font-semibold tracking-[1.1px] text-accent">DE ONDE VIERAM AS VISITAS</h3>
          <div className="mt-6 space-y-4">
            {origens.map((origem) => (
              <div key={origem.nome}>
                <div className="mb-1.5 flex justify-between text-[12px]"><span>{origem.nome}</span><span className="tabular-nums text-muted">{origem.valor}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-[#EFE9DE]"><div className="h-full rounded-full" style={{ width: `${origem.valor}%`, backgroundColor: origem.cor }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-xl bg-white p-5 md:p-6">
          <h3 className="text-[10px] font-semibold tracking-[1.1px] text-accent">PÁGINAS MAIS VISITADAS</h3>
          <div className="mt-4 overflow-x-auto" role="region" aria-label="Páginas mais visitadas" tabIndex={0}>
            <table className="w-full min-w-[350px] border-collapse text-left text-[12px]">
              <thead><tr className="border-b border-divider text-muted"><th className="py-2 font-medium">Página</th><th className="py-2 text-right font-medium">Visitas</th><th className="py-2 text-right font-medium">WhatsApp</th></tr></thead>
              <tbody>{paginas.map(([pagina, visitas, whatsapp]) => <tr key={pagina} className="border-b border-divider last:border-0"><td className="py-3 font-code">{pagina}</td><td className="py-3 text-right tabular-nums">{visitas}</td><td className="py-3 text-right tabular-nums">{whatsapp}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>

      <dl className="mt-8 divide-y divide-divider border-y border-divider">
        {leituras.map(([titulo, texto]) => <div key={titulo} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-7"><dt className="font-heading text-[17px] font-semibold">{titulo}</dt><dd className="text-[14px] leading-[1.7] text-primary/75">{texto}</dd></div>)}
      </dl>
    </section>
  );
}

export function RadarIncluso() {
  return (
    <section id="o-que-esta-incluso">
      <h2 className="mb-6 font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">O que está incluso</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-6"><p className="text-[10px] font-semibold tracking-[1.1px] text-accent">TODO SITE NOVO</p><h3 className="mt-3 font-heading text-2xl font-semibold">90 dias de Radar</h3><p className="mt-3 text-[14px] leading-[1.7] text-primary/75">O Radar vem configurado na entrega, dentro da garantia, com a leitura mensal dos números nos primeiros 90 dias.</p></div>
        <div className="rounded-xl bg-white p-6"><p className="text-[10px] font-semibold tracking-[1.1px] text-accent">DEPOIS DISSO</p><h3 className="mt-3 font-heading text-2xl font-semibold">Acompanhamento mensal</h3><p className="mt-3 text-[14px] leading-[1.7] text-primary/75">Leitura semanal e relatório no fim do mês, com o que mudar no site. Valor sob consulta.</p></div>
      </div>
    </section>
  );
}
