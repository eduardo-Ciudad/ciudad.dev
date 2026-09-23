import type { Metadata } from "next";
import { CalculadoraAtendimento } from "@/components/CalculadoraAtendimento";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { calculadora } from "@/data/calculadora";

const title = "Calculadora: quanto custa atender pelo WhatsApp | CiudadLab";
const description =
  "Descubra em 1 minuto quantas horas por mês você gasta respondendo clientes e quanto deixa de vender por demora no atendimento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculadora" },
  openGraph: { title, description, type: "website", url: "/calculadora" },
  twitter: { card: "summary_large_image", title, description },
};

export default function CalculadoraPage() {
  return (
    <>
      <Navbar />
      <main className="pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {calculadora.page.eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              {calculadora.page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
              {calculadora.page.subtitle}
            </p>
          </header>

          <CalculadoraAtendimento />
        </div>
      </main>
      <Footer />
    </>
  );
}
