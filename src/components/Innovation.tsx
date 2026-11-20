import Link from "next/link";
import { innovation } from "@/data/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Innovation() {
  return (
    <section id="inovacao" className="section section--alt" aria-labelledby="inov-title">
      <div className="container">
        <div className="mural">
          <Reveal className="mural__intro">
            <p className="eyebrow">Iniciativas de IA</p>
            <h2 id="inov-title" className="section__title">{innovation.title}</h2>
            <p className="section__lead">{innovation.intro}</p>
            <Link href="/projetos/hackathon-e-programa-de-inovacao-em-ia" className="btn btn--ghost">
              Ver o case completo <Icon name="arrowRight" size={18} />
            </Link>
          </Reveal>

          <div className="mural__board">
            <Reveal className="mural__stats">
              <p className="mural__tag">Hackathon de IA</p>
              <ul>
                {innovation.hackathon.map((s) => (
                  <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
                ))}
              </ul>
            </Reveal>
            {innovation.roles.map((r, i) => (
              <Reveal key={r.title} className="mural__card" delay={i * 70}>
                <span className="mural__pin" aria-hidden="true" />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mural__note">{innovation.note}</p>
      </div>
    </section>
  );
}
