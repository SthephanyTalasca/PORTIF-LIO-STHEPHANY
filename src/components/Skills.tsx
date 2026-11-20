import { skills } from "@/data/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="especialidades" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Especialidades</p>
          <h2 id="skills-title" className="section__title">Do modelo à operação.</h2>
          <p className="section__lead">Seis áreas que se combinam em cada solução: IA, automação, código, dados e pessoas.</p>
        </header>
        <div className="skills">
          {skills.map((s, i) => (
            <Reveal key={s.title} as="article" className={`skill ${s.size === "lg" ? "skill--lg" : ""}`} delay={i * 60}>
              <span className="skill__icon"><Icon name={s.icon} size={22} /></span>
              <h3 className="skill__title">{s.title}</h3>
              <p className="skill__desc">{s.description}</p>
              <ul className="tags tags--sm">
                {s.items.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
