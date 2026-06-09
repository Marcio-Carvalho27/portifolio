import { About } from "@/src/components/sections/About";
import { FloatingNav } from "@/src/components/ui/FloatingNav";
import { Contact } from "@/src/components/sections/Contact";
import { Experience } from "@/src/components/sections/Experience";
import { Hero } from "@/src/components/sections/Hero";
import { Services } from "@/src/components/sections/Services";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { Work } from "@/src/components/sections/Work";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Testimonials />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
