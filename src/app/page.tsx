import { Hero } from "../components/hero/Hero";
import { Services } from "../components/services/Services";
import { Work } from "../components/work/Work";
import { Experience } from "../components/experience/Experience";
import { Comments } from "../components/comments/Comment";

export default function Home() {
  return (
    <main>
      <Hero />

      <Work />

      <Experience />
      
      <Comments />

      <Services />
    </main>
  );
}