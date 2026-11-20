import Link from "next/link";
import { categoryLabel, relatedProjects, type Project } from "@/data/projects";
import { Icon } from "./Icon";
import { ProjectArt } from "./ProjectArt";
import { ProjectCard } from "./Projects";

export function ArchitectureDiagram({ steps }: { steps: Project["architecture"] }) {
  return (
    <ol className="arch" aria-label="Arquitetura simplificada">
      {steps.map((s, i) => (
        <li key={s.label} className="arch__step">
          <span className="arch__idx">{String(i + 1).padStart(2, "0")}</span>
          <strong>{s.label}</strong>
          <span>{s.detail}</span>
        </li>
      ))}
    </ol>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const related = relatedProjects(project);
  const sections = [
    { id: "contexto", label: "Contexto" },
    { id: "solucao", label: "Solução" },
    { id: "arquitetura", label: "Arquitetura" },
    { id: "resultados", label: "Resultados" },
  ];

  return (
    <article className="case">
      <header className="case__hero">
        <div className="container">
          <Link href="/#projetos" className="case__back"><Icon name="arrowLeft" size={16} /> Todos os projetos</Link>
          <p className="eyebrow">{categoryLabel(project.category)}</p>
          <h1 className="case__title">{project.title}</h1>
          <p className="case__summary">{project.summary}</p>
          <div className="case__meta">
            <span className="badge">{project.status}</span>
            {project.privateCode && <span className="badge badge--lock"><Icon name="lock" size={13} /> Projeto corporativo — código privado</span>}
            {project.categories.map((c) => <span key={c} className="badge badge--soft">{categoryLabel(c)}</span>)}
          </div>
        </div>
      </header>

      <div className="container case__layout">
        <aside className="case__aside">
          <nav aria-label="Seções do case">
            <ul>
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>)}
            </ul>
          </nav>
          <div className="case__tech">
            <p className="case__label">Tecnologias</p>
            <ul className="tags tags--sm">{project.technologies.map((t) => <li key={t} className="tag">{t}</li>)}</ul>
          </div>
        </aside>

        <div className="case__content">
          <figure className="case__cover">
            <ProjectArt visual={project.visual} />
            <figcaption>{project.images[0]?.caption ?? "Ilustração conceitual."}</figcaption>
          </figure>

          <section id="contexto" className="case__block">
            <h2>Contexto e problema</h2>
            <p>{project.context}</p>
            <h3>Objetivo</h3>
            <p>{project.objective}</p>
          </section>

          <section id="solucao" className="case__block">
            <h2>Solução desenvolvida</h2>
            {project.description.map((d) => <p key={d.slice(0, 30)}>{d}</p>)}
            <ul className="checklist">
              {project.solution.map((s) => <li key={s}><Icon name="check" size={16} /> {s}</li>)}
            </ul>
            <h3>Minha participação</h3>
            <p>{project.participation}</p>
          </section>

          <section id="arquitetura" className="case__block">
            <h2>Arquitetura simplificada</h2>
            <p className="case__muted">Visão geral do fluxo, sem detalhes confidenciais.</p>
            <ArchitectureDiagram steps={project.architecture} />
            <h3>Desafios técnicos</h3>
            <ul className="checklist checklist--dot">
              {project.challenges.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </section>

          <section id="resultados" className="case__block">
            <h2>Resultados comprovados</h2>
            <ul className="results">
              {project.results.map((r) => (
                <li key={r.label} className={r.value ? "" : "results__plain"}>
                  {r.value && <strong>{r.value}</strong>}
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="case__block">
            <h2>Galeria</h2>
            <div className="gallery">
              {project.images.map((img) => (
                <figure key={img.alt}>
                  {img.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  ) : (
                    <div role="img" aria-label={img.alt}><ProjectArt visual={project.visual} /></div>
                  )}
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="section section--alt" aria-labelledby="rel-title">
        <div className="container">
          <h2 id="rel-title" className="section__title section__title--sm">Projetos relacionados</h2>
          <div className="bento bento--3">
            {related.map((p) => <ProjectCard key={p.slug} project={p} compact />)}
          </div>
        </div>
      </section>
    </article>
  );
}
