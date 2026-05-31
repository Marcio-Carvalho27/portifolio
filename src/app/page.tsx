import { Hero } from "../components/hero/Hero";
import { Services } from "../components/services/Services";
import { Work } from "../components/work/Work";
import { Experience } from "../components/experience/Experience";
import { Contact } from "../components/contact/Contact";
import { FloatingNav } from "../components/common/FloatingNav";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Services />
        <Contact />
      </main>
    </>
  );
}