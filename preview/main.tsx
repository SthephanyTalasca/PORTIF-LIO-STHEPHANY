import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AskAI } from "@/components/AskAI";
import { HomePage } from "@/components/HomePage";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getProject } from "@/data/projects";

function route() { return window.location.hash; }

function App() {
  const [hash, setHash] = useState(route());
  useEffect(() => {
    const on = () => setHash(route());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const slug = hash.startsWith("#/projetos/") ? hash.slice("#/projetos/".length) : null;
  const project = slug ? getProject(slug) : undefined;
  useEffect(() => {
    if (project) { window.scrollTo(0, 0); return; }
    const id = hash.replace("#", "");
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [hash, project]);
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">{project ? <ProjectDetail key={project.slug} project={project} /> : <HomePage />}</main>
      <Footer />
      <AskAI />
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
