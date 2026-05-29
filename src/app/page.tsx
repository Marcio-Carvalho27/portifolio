import { Hero } from "../components/hero/Hero";
import { Services } from "../components/services/Services";
import { Work } from "../components/work/Work";
import { Experience } from "../components/experience/Experience";

export default function Home() {
  return (
    <main>
      <Hero />

      <Services />

      <Work />

      <Experience />
    </main>
  );
}