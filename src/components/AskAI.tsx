"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ask, suggestions, type Doc } from "@/lib/knowledge";
import { Icon } from "./Icon";

type Msg = { role: "user" | "bot"; text: string; sources?: Doc[] };

const WELCOME: Msg = {
  role: "bot",
  text: "Olá! Sou o assistente do portfólio. Respondo apenas com base no conteúdo público deste site — projetos, tecnologias e trajetória da Sthephany.",
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

  const send = (q: string) => {
    const question = q.trim();
    if (!question) return;
    const a = ask(question);
    setMsgs((m) => [...m, { role: "user", text: question }, { role: "bot", text: a.text, sources: a.sources }]);
    setInput("");
  };

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
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="ask__suggest">
                {suggestions.map((s) => <button key={s} className="chip" onClick={() => send(s)}>{s}</button>)}
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
