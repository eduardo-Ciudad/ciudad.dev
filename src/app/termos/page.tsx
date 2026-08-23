import type { Metadata } from "next";
import { BackToSiteHeader } from "@/components/BackToSiteHeader";
import { LegalDocBody } from "@/components/LegalDocBody";
import { Footer } from "@/components/Footer";
import { getLegalDoc } from "@/data/legal-docs";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegalDoc("termos")!;
  const title = `${doc.title} | CiudadLab`;

  return {
    title,
    description: doc.description,
    alternates: {
      canonical: "/termos",
    },
    openGraph: {
      title,
      description: doc.description,
      type: "website",
      url: "/termos",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: doc.description,
    },
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
