"use client";

import Link from "next/link";
import { nav, site } from "@/data/site";
import { Icon } from "./Icon";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, linkedin, whatsapp, github } = site.contacts;
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="logo">STHEPHANY<span className="logo__dot">.DEV</span></p>
          <p className="footer__tag">{site.tagline}</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="footer__nav">
            {nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <ul className="footer__social">
          <li><a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a></li>
          <li><a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a></li>
          <li><a href={`mailto:${email}`} aria-label="E-mail"><Icon name="mail" /></a></li>
          <li><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a></li>
        </ul>
      </div>
      <div className="container footer__bottom">
        <p>© {year} {site.name}. Todos os direitos reservados.</p>
        <p>Projetos corporativos apresentados com ilustrações conceituais.</p>
      </div>
    </footer>
  );
}
