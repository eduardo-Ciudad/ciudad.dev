"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import {
  calcular,
  calculadora,
  type CalculadoraValores,
  type CampoCalculadora,
  valoresIniciais,
} from "@/data/calculadora";
import { WHATSAPP_NUMBER } from "@/data/whatsapp";

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function textoAcessivel(field: CampoCalculadora, value: number) {
  if (field.prefix) return `${field.prefix} ${value}`;
  if (field.suffix) return `${value} ${field.suffix}`;
  return String(value);
}

export function CalculadoraAtendimento() {
  const [values, setValues] = useState<CalculadoraValores>(valoresIniciais);
  const [drafts, setDrafts] = useState<Record<keyof CalculadoraValores, string>>(
    Object.fromEntries(
      Object.entries(valoresIniciais).map(([key, value]) => [key, String(value)]),
    ) as Record<keyof CalculadoraValores, string>,
  );

  const setValidValue = (field: CampoCalculadora, value: number) => {
    setValues((current) => ({ ...current, [field.id]: value }));
    setDrafts((current) => ({ ...current, [field.id]: String(value) }));
  };

  const handleNumberChange = (field: CampoCalculadora, rawValue: string) => {
    setDrafts((current) => ({ ...current, [field.id]: rawValue }));
    const parsed = Number(rawValue);

    if (rawValue !== "" && Number.isFinite(parsed) && parsed >= field.min && parsed <= field.max) {
      setValues((current) => ({ ...current, [field.id]: parsed }));
    }
  };

  const handleNumberBlur = (field: CampoCalculadora) => {
    const parsed = Number(drafts[field.id]);
    const nextValue =
      drafts[field.id] === "" || !Number.isFinite(parsed)
        ? values[field.id]
        : Math.min(field.max, Math.max(field.min, parsed));

    setValidValue(field, nextValue);
  };

  const { horasMes, vendasPerdidas, valorPerdido } = calcular(values);
  const horas = Math.round(horasMes);
  const semanas = Math.floor(horas / 40);
  const horasFormatadas = horas.toLocaleString("pt-BR");
  const valorFormatado = formatarMoeda.format(valorPerdido);
  const mensagem = `${calculadora.result.whatsappGreeting} ${horasFormatadas}${calculadora.result.whatsappHours} ${valorFormatado} ${calculadora.result.whatsappEnding}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

  return (
    <>
      <div className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          {calculadora.groups.map((group) => (
            <section
              key={group.title}
              className="rounded-2xl border border-divider bg-card p-6 md:p-8"
            >
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                {group.title}
              </h2>
              <div className="mt-7 space-y-8">
                {group.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={`${field.id}-number`}
                      className="block text-[15px] font-medium leading-6 text-primary"
                    >
                      {field.label}
                    </label>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex min-w-0 flex-1 items-center py-3">
                        <input
                          id={`${field.id}-range`}
                          type="range"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={values[field.id]}
                          onChange={(event) => setValidValue(field, Number(event.target.value))}
                          aria-label={field.label}
                          aria-valuetext={textoAcessivel(field, values[field.id])}
                          className="h-2 w-full cursor-pointer accent-accent"
                        />
                      </div>
                      <div className="flex h-11 shrink-0 items-center rounded-lg border border-divider bg-surface px-3 focus-within:border-accent">
                        {field.prefix ? (
                          <span className="mr-1.5 text-sm text-muted">{field.prefix}</span>
                        ) : null}
                        <input
                          id={`${field.id}-number`}
                          type="number"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={drafts[field.id]}
                          onChange={(event) => handleNumberChange(field, event.target.value)}
                          onBlur={() => handleNumberBlur(field)}
                          className="w-14 bg-transparent text-right font-medium tabular-nums text-primary outline-none"
                        />
                        {field.suffix ? (
                          <span className="ml-1.5 whitespace-nowrap text-sm text-muted">
                            {field.suffix}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-dark p-6 text-white md:p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">
              {calculadora.result.label}
            </p>
            <div aria-live="polite">
              <p className="mt-5 font-heading text-5xl font-semibold tracking-[-0.03em] md:text-6xl">
                {horasFormatadas} {calculadora.result.hoursSuffix}
              </p>
              <p className="mt-2 text-sm text-white/70">
                {calculadora.result.hoursDescription}
              </p>
              {horas >= 40 ? (
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {calculadora.result.weekPrefix} {semanas}{" "}
                  {semanas === 1
                    ? calculadora.result.weekSingular
                    : calculadora.result.weekPlural}{" "}
                  {calculadora.result.weekSuffix}
                </p>
              ) : null}

              <div className="my-6 h-px bg-white/10" />

              <p className="font-heading text-5xl font-semibold tracking-[-0.03em] md:text-6xl">
                {valorFormatado}
              </p>
              <p className="mt-2 text-sm text-white/70">
                {calculadora.result.salesDescription}
              </p>
              <p className="mt-3 text-sm text-white/70">
                {calculadora.result.salesPrefix} {Math.round(vendasPerdidas)}{" "}
                {calculadora.result.salesSuffix}
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {calculadora.result.cta}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <p className="mt-3 text-center text-xs text-white/50">
              {calculadora.result.ctaNote}
            </p>
          </div>
        </aside>
      </div>

      <details className="mt-12 rounded-2xl border border-divider bg-card p-6 md:p-8">
        <summary className="cursor-pointer font-semibold text-primary">
          {calculadora.methodology.summary}
        </summary>
        <div className="mt-5 space-y-3 text-[15px] leading-7 text-primary/80">
          {calculadora.methodology.formulas.map((formula) => (
            <p key={formula}>{formula}</p>
          ))}
          <p className="pt-2 text-muted">{calculadora.methodology.note}</p>
        </div>
      </details>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold tracking-[-0.5px] md:text-[28px]">
          {calculadora.nextSteps.title}
        </h2>
        <ul className="mt-6 space-y-3">
          {calculadora.nextSteps.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-[15px]">
              <Check className="mt-1 shrink-0 text-accent" size={16} aria-hidden="true" />
              <span className="leading-[1.8] text-primary/80">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-xl border border-accent-border bg-accent-light p-6 md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {calculadora.caseStudy.label}
          </p>
          <p className="mt-3 text-[15px] leading-[1.8] text-primary/80">
            {calculadora.caseStudy.text}
          </p>
          <Link
            href={calculadora.caseStudy.href}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:opacity-80"
          >
            {calculadora.caseStudy.linkLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
