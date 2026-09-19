"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface NotFoundProps {
  title?: string;
  description?: string;
}

const quickLinks = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/#contato" },
];

export function Illustration(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 362 145"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
      />
    </svg>
  );
}

export function NotFound({
  title = "Página não encontrada",
  description = "Esse endereço não existe ou foi movido. Volte para o início ou veja o que a CiudadLab pode construir para o seu negócio.",
}: NotFoundProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="relative flex min-h-svh w-full items-center overflow-hidden bg-surface px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-light blur-3xl md:h-96 md:w-96"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Illustration className="pointer-events-none absolute inset-x-0 top-1/2 h-auto w-full -translate-y-1/2 text-primary opacity-[0.035]" />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-[1] py-20 text-center sm:py-28"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Erro 404
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance font-heading text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-primary sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base font-medium leading-relaxed text-muted sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/"
              className="-order-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:order-none"
            >
              Ir para o início
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-divider px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowLeft
                className="text-muted transition-transform duration-200 group-hover:-translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Voltar
            </button>
          </div>

          <nav
            aria-label="Atalhos"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </main>
  );
}
