import { About, Timeline } from "./About";
import { Contact } from "./Contact";
import { HeroCarousel } from "./HeroCarousel";
import { Innovation } from "./Innovation";
import { Metrics } from "./Metrics";
import { Playground } from "./Playground";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Metrics />
      <Projects />
      <Skills />
      <About />
      <Timeline />
      <Playground />
      <Innovation />
      <Contact />
    </>
  );
}
