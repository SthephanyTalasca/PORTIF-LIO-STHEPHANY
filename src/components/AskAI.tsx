"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { answerFaq, ask, suggestions, type Answer, type Doc } from "@/lib/knowledge";
import type { FaqLink } from "@/data/faq";
import { Icon } from "./Icon";

type Msg = { role: "user" | "bot"; text: string; sources?: Doc[]; links?: FaqLink[] };

const WELCOME: Msg = {
  role: "bot",
  text: "Olá! Sou o assistente do portfólio da Sthephany. Escolha uma das perguntas abaixo ou escreva a sua: respondo com base no conteúdo público deste site.",
};

export function AskAI() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const [asked, setAsked] = useState<string[]>([]);

  const reply = (question: string, a: Answer) => {
    setMsgs((m) => [...m, { role: "user", text: question }, { role: "bot", text: a.text, sources: a.sources, links: a.links }]);
    if (a.faqId) setAsked((x) => (x.includes(a.faqId!) ? x : [...x, a.faqId!]));
  };

  const send = (q: string) => {
    const question = q.trim();
    if (!question) return;
    reply(question, ask(question));
    setInput("");
  };

  const pick = (id: string, question: string) => {
    const a = answerFaq(id);
    if (a) reply(question, a);
  };

  const pending = suggestions.filter((s) => !asked.includes(s.id));

  const onSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };

  return (
    <>
      <button
        className={`ask-fab ${open ? "is-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Icon name="sparkles" size={18} /> <span>Ask Sthephany AI</span>
      </button>

      {open && (
        <div className="ask" role="dialog" aria-modal="false" aria-labelledby="ask-title">
          <div className="ask__head">
            <div>
              <p id="ask-title" className="ask__title"><Icon name="bot" size={18} /> Ask Sthephany AI</p>
              <p className="ask__sub">Busca local no conteúdo do portfólio · sem envio de dados</p>
            </div>
            <button className="icon-btn icon-btn--sm" onClick={() => setOpen(false)} aria-label="Fechar assistente">
              <Icon name="close" size={18} />
            </button>
          </div>

          <div className="ask__list" ref={listRef} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`ask__msg ask__msg--${m.role}`}>
                <p>{m.text}</p>
                {m.sources && m.sources.length > 0 && (
                  <ul className="ask__sources">
                    {m.sources.map((s) => s.href && (
                      <li key={s.id}><Link href={s.href} onClick={() => setOpen(false)}>{s.title} <Icon name="arrowUpRight" size={12} /></Link></li>
                    ))}
                  </ul>
                )}
                {m.links && m.links.length > 0 && (
                  <ul className="ask__sources">
                    {m.links.map((l) => (
                      <li key={l.href + l.label}>
                        {l.external ? (
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className={l.href.includes("wa.me") ? "is-whatsapp" : undefined}>
                            {l.href.includes("wa.me") && <Icon name="whatsapp" size={12} />} {l.label} <Icon name="arrowUpRight" size={12} />
                          </a>
                        ) : (
                          <Link href={l.href} onClick={() => setOpen(false)}>{l.label} <Icon name="arrowUpRight" size={12} /></Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {pending.length > 0 && (
              <div className="ask__suggest">
                {msgs.length > 1 && <p className="ask__suggest-label">Outras perguntas</p>}
                {pending.map((s) => <button key={s.id} className="chip" onClick={() => pick(s.id, s.question)}>{s.question}</button>)}
              </div>
            )}
          </div>

          <form className="ask__form" onSubmit={onSubmit}>
            <label htmlFor="ask-input" className="sr-only">Pergunta</label>
            <input
              id="ask-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre projetos ou tecnologias…"
              maxLength={200}
              autoComplete="off"
            />
            <button className="icon-btn icon-btn--accent" type="submit" aria-label="Enviar pergunta" disabled={!input.trim()}>
              <Icon name="send" size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
