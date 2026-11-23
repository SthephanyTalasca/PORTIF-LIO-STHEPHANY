// Base de conhecimento do "Ask Sthephany AI".
// É montada SOMENTE a partir do conteúdo público do portfólio (pasta src/data).
// A busca roda no navegador: nenhuma pergunta é enviada a servidores.

import { about, innovation, skills, timeline } from "@/data/content";
import { faq, type Faq, type FaqLink } from "@/data/faq";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export type Doc = { id: string; title: string; text: string; short?: string; href?: string; extra?: string };

const STOP = new Set(
  "a o as os de da do das dos e em no na nos nas um uma uns umas com por para que qual quais quem como ela ele tem ter teve sobre ja já mais seu sua suas seus isso esse essa este esta foi ser são sao é me te se ao aos à às ou onde quando sthephany voce você experiencia experiência projetos projeto fez desenvolveu".split(" "),
);

export const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9.+#\s]/g, " ");

export const tokenize = (s: string) =>
  normalize(s).split(/\s+/).map((t) => t.replace(/\.$/, "")).filter((t) => t.length > 1 && !STOP.has(t));

export function buildDocs(): Doc[] {
  const docs: Doc[] = [];
  for (const p of projects) {
    docs.push({
      id: `p-${p.slug}`,
      title: p.title,
      text: `${p.description.join(" ")} Tecnologias: ${p.technologies.join(", ")}.${
        p.results.length ? " Resultados: " + p.results.map((r) => (r.value ? `${r.value} ${r.label}` : r.label)).join("; ") + "." : ""
      }`,
      short: `${p.summary} (${p.technologies.slice(0, 4).join(", ")})`,
      extra: `${p.solution.join(" ")} ${p.categories.join(" ")}`,
      href: `/projetos/${p.slug}`,
    });
  }
  for (const s of skills) {
    docs.push({ id: `s-${s.title}`, title: s.title, text: `${s.description} Ferramentas e temas: ${s.items.join(", ")}.`, short: s.items.join(", "), href: "/#especialidades" });
  }
  docs.push({
    id: "about",
    title: "Sobre a Sthephany",
    text: about.paragraphs.slice(0, 3).join(" "),
    extra: "formação graduação marketing pós-graduação faculdade estudo nibo trajetória",
    href: "/#sobre",
  });
  docs.push({
    id: "timeline",
    title: "Trajetória profissional",
    text: timeline.map((t) => `${t.period}: ${t.title}.`).join(" "),
    extra: "carreira experiência anos pré-vendas customer success cargo",
    href: "/#experiencia",
  });
  docs.push({
    id: "innovation",
    title: innovation.title,
    text: `${innovation.intro} Números do Hackathon: ${innovation.hackathon.map((h) => `${h.value} ${h.label}`).join(", ")}.`,
    extra: "hackathon mentoria mentorias inovação adoção liderança evento",
    href: "/#inovacao",
  });
  docs.push({
    id: "contact",
    title: "Contato",
    text: `E-mail: ${site.contacts.email}. LinkedIn e WhatsApp disponíveis na seção de contato. Localização: ${site.location}.`,
    extra: "contato email e-mail falar conversar whatsapp linkedin contratar onde mora localização cidade",
    href: "/#contato",
  });
  return docs;
}

const DOCS = buildDocs();
const INDEX = DOCS.map((d) => ({ d, tokens: new Set(tokenize(`${d.title} ${d.title} ${d.text} ${d.extra ?? ""}`)) }));

export type Answer = { text: string; sources: Doc[]; links?: FaqLink[]; faqId?: string };

const faqAnswer = (f: Faq): Answer => ({ text: f.answer, sources: [], links: f.links, faqId: f.id });

export const answerFaq = (id: string): Answer | null => {
  const f = faq.find((x) => x.id === id);
  return f ? faqAnswer(f) : null;
};

// Pergunta digitada parecida com uma pergunta pronta? Usa a resposta pronta.
function matchFaq(q: string[]): Faq | null {
  let best: { f: Faq; score: number } | null = null;
  for (const f of faq) {
    const keys = new Set([...f.keywords.map(normalize), ...tokenize(f.question)]);
    let score = 0;
    for (const t of q) if (keys.has(t)) score += 1;
    if (score > 0 && (!best || score > best.score)) best = { f, score };
  }
  // Exige pelo menos metade das palavras da pergunta batendo, para não "roubar" perguntas técnicas.
  return best && best.score >= Math.max(1, Math.ceil(q.length / 2)) ? best.f : null;
}

export function ask(question: string): Answer {
  const q = tokenize(question);
  if (!q.length) return { text: "Pode reformular? Pergunte, por exemplo, sobre um projeto, uma tecnologia ou a trajetória da Sthephany.", sources: [] };

  const f = matchFaq(q);
  if (f) return faqAnswer(f);

  const scored = INDEX.map(({ d, tokens }) => {
    let score = 0;
    for (const t of q) {
      if (tokens.has(t)) score += 2;
      else if (t.length >= 4) for (const k of tokens) if (k.startsWith(t) || t.startsWith(k) && k.length >= 4) { score += 1; break; }
    }
    return { d, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    return {
      text: "Não encontrei essa informação no conteúdo público do portfólio. Para outros detalhes, o melhor caminho é falar diretamente com a Sthephany pela seção de contato.",
      sources: [DOCS.find((d) => d.id === "contact")!],
    };
  }

  const best = scored[0].score;
  const top = scored.filter((x) => x.score >= Math.max(2, best * 0.6)).slice(0, 3).map((x) => x.d);
  const list = top.length ? top : [scored[0].d];

  const text =
    list.length === 1
      ? `${list[0].title}: ${list[0].text}`
      : `Encontrei ${list.length} pontos relacionados:\n\n` + list.map((d) => `• ${d.title} — ${d.short ?? d.text}`).join("\n\n");
  return { text, sources: list };
}

export const suggestions = faq.map((f) => ({ id: f.id, question: f.question }));
