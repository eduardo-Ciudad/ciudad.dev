import type { Metadata } from "next";
import { BackToSiteHeader } from "@/components/BackToSiteHeader";
import { LegalDocBody } from "@/components/LegalDocBody";
import { Footer } from "@/components/Footer";
import { getLegalDoc } from "@/data/legal-docs";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegalDoc("termos")!;

  return {
    title: `${doc.title} | ciudad.dev`,
    description: doc.description,
  };
}

export default function TermosPage() {
  const doc = getLegalDoc("termos")!;

  return (
    <div className="min-h-screen bg-surface">
      <BackToSiteHeader />
      <LegalDocBody doc={doc} />
      <Footer />
    </div>
  );
}
