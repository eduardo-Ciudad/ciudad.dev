import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { NotFound } from "@/components/not-found";

export const metadata: Metadata = {
  title: "Página não encontrada | CiudadLab",
  description: "A página que você procura não existe ou foi movida.",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <NotFound />
    </>
  );
}
