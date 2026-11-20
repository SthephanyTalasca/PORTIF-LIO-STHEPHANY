"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, categoryLabel, projects, type Category, type Project } from "@/data/projects";
import { FILTER_EVENT } from "@/lib/events";
import { Icon } from "./Icon";
import { ProjectArt } from "./ProjectArt";

type Filter = Category | "todos";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`pcard ${project.size === "lg" && !compact ? "pcard--lg" : ""}`}>
      <div className="pcard__media">
        <ProjectArt visual={project.visual} />
        <span className="pcard__badge">Ilustração</span>
      </div>
      <div className="pcard__body">
        <p className="pcard__cat">{categoryLabel(project.category)}</p>
        <h3 className="pcard__title">
          <Link href={`/projetos/${project.slug}`} className="pcard__link">
            {project.title}
          </Link>
        </h3>
        <p className="pcard__summary">{project.summary}</p>
        <ul className="tags tags--sm" aria-label="Tecnologias">
          {project.technologies.slice(0, compact ? 3 : 5).map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
        <div className="pcard__foot">
          {project.highlight ? (
            <span className="pcard__result"><Icon name="chart" size={15} /> {project.highlight}</span>
          ) : (
            <span className="pcard__result pcard__result--muted">{project.status}</span>
          )}
          <span className="pcard__cta" aria-hidden="true">
            Explorar projeto <Icon name="arrowUpRight" size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("todos");

  useEffect(() => {
    const onFilter = (e: Event) => {
      const value = (e as CustomEvent<string>).detail as Filter;
      if (categories.some((c) => c.id === value)) setFilter(value);
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const visible = useMemo(
    () => (filter === "todos" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Projetos em destaque</p>
          <h2 id="projetos-title" className="section__title">Sistemas que estão em operação, não só em slides.</h2>
          <p className="section__lead">
            Projetos desenvolvidos em ambiente corporativo. O código é privado e as imagens são ilustrações
            conceituais — cada case mostra o problema, a solução e o que foi comprovado.
          </p>
        </header>

        <div className="filters" role="group" aria-label="Filtrar projetos por categoria">
          {categories.map((c) => {
            const count = c.id === "todos" ? projects.length : projects.filter((p) => p.categories.includes(c.id as Category)).length;
            return (
              <button
                key={c.id}
                className={`filter ${filter === c.id ? "is-active" : ""}`}
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label} <span className="filter__count">{count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">{visible.length} projetos exibidos</p>

        <div className="bento">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} compact={filter !== "todos"} />
          ))}
        </div>
      </div>
    </section>
  );
}
