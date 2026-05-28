import { Hero } from "../components/hero/Hero";
import { Services } from "../components/services/Services";
import { Work } from "../components/work/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Services />
    </main>
  );
}