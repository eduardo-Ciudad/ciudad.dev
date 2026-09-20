import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { ForWho } from "@/components/ForWho";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { About } from "@/components/About";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <ForWho />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <About />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
