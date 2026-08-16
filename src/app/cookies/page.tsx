import type { Metadata } from "next";
import { BackToSiteHeader } from "@/components/BackToSiteHeader";
import { LegalDocBody } from "@/components/LegalDocBody";
import { Footer } from "@/components/Footer";
import { getLegalDoc } from "@/data/legal-docs";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegalDoc("cookies")!;

  return {
    title: `${doc.title} | CiudadLab`,
    description: doc.description,
  };
}

export default function CookiesPage() {
  const doc = getLegalDoc("cookies")!;

  return (
    <div className="min-h-screen bg-surface">
      <BackToSiteHeader />
      <LegalDocBody doc={doc} />
      <Footer />
    </div>
  );
}
