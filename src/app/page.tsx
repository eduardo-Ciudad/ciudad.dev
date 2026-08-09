import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { ForWho } from "@/components/ForWho";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <ForWho />
        <Services />
        <About />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
