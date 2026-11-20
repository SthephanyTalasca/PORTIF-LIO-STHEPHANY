import Link from "next/link";
import { about, timeline } from "@/data/content";
import { site } from "@/data/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className="container about">
        <Reveal className="about__photo">
          {/* Substitua pela sua foto: coloque /public/foto.jpg e troque este bloco por <Image src="/foto.jpg" ... /> */}
          <div className="photo-slot" role="img" aria-label="Espaço reservado para fotografia profissional">
            <Icon name="image" size={28} />
            <span>Espaço para foto profissional</span>
          </div>
          <ul className="about__facts">
            <li><Icon name="mapPin" size={16} /> {site.location}</li>
            <li><Icon name="graduation" size={16} /> Pós em Desenvolvimento Full Stack (em andamento)</li>
            <li><Icon name="briefcase" size={16} /> Nibo · desde 2022</li>
          </ul>
        </Reveal>
        <Reveal className="about__copy" delay={80}>
          <p className="eyebrow">Sobre mim</p>
          <h2 id="sobre-title" className="section__title">{about.title}</h2>
          {about.paragraphs.map((p) => <p key={p.slice(0, 24)} className="about__p">{p}</p>)}
          <Link href="/#experiencia" className="btn btn--ghost">
            Conhecer minha experiência <Icon name="arrowRight" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section id="experiencia" className="section section--alt" aria-labelledby="exp-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Experiência</p>
          <h2 id="exp-title" className="section__title">Uma trajetória construída entre negócio e tecnologia.</h2>
          <p className="section__lead">
            De Pré-Vendas e operações comerciais ao desenvolvimento de sistemas com IA — sempre perto de quem usa as soluções.
          </p>
        </header>
        <ol className="timeline">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} className={`timeline__item ${t.current ? "is-current" : ""}`} delay={i * 70}>
              <span className="timeline__dot" aria-hidden="true" />
              <p className="timeline__period">{t.period}</p>
              <h3 className="timeline__title">{t.title}</h3>
              <p className="timeline__desc">{t.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
