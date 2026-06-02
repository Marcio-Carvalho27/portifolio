import { FloatingNav } from "@/src/components/ui/FloatingNav";
import { About } from "@/src/components/sections/About";
import { Contact } from "@/src/components/sections/Contact";
import { Experience } from "@/src/components/sections/Experience";
import { Hero } from "@/src/components/sections/Hero";
import { Services } from "@/src/components/sections/Services";
import { Work } from "@/src/components/sections/Work";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Services />
        <Contact />
      </main>
    </>
  );
}
