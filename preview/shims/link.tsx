// Shim de next/link para a prévia estática (roteamento por hash).
import type { AnchorHTMLAttributes, ReactNode } from "react";
export function toHash(href: string) {
  if (href.startsWith("/projetos/")) return "#" + href;
  if (href.startsWith("/#")) return href.slice(1);
  if (href === "/") return "#inicio";
  return href;
}
export default function Link({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) {
  return <a href={toHash(href)} {...rest}>{children}</a>;
}
