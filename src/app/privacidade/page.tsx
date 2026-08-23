import type { Metadata } from "next";
import { BackToSiteHeader } from "@/components/BackToSiteHeader";
import { LegalDocBody } from "@/components/LegalDocBody";
import { Footer } from "@/components/Footer";
import { getLegalDoc } from "@/data/legal-docs";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegalDoc("privacidade")!;
  const title = `${doc.title} | CiudadLab`;

  return {
    title,
    description: doc.description,
    alternates: {
      canonical: "/privacidade",
    },
    openGraph: {
      title,
      description: doc.description,
      type: "website",
      url: "/privacidade",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: doc.description,
    },
  };
}

export default function PrivacidadePage() {
  const doc = getLegalDoc("privacidade")!;

  return (
    <div className="min-h-screen bg-surface">
      <BackToSiteHeader />
      <LegalDocBody doc={doc} />
      <Footer />
    </div>
  );
}
