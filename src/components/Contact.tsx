"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { Icon } from "./Icon";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const enabled = Boolean(site.formEndpoint);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled) return;
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const { email, linkedin, whatsapp } = site.contacts;

  return (
    <section id="contato" className="section contact" aria-labelledby="contato-title">
      <div className="container contact__grid">
        <div>
          <p className="eyebrow">Contato</p>
          <h2 id="contato-title" className="section__title">Tem um desafio que a IA pode resolver?</h2>
          <p className="section__lead">Vamos conversar sobre tecnologia, automação, inteligência artificial e novas oportunidades.</p>
          <div className="contact__buttons">
            <a className="btn btn--primary" href={`mailto:${email}`}><Icon name="mail" size={18} /> Entrar em contato por e-mail</a>
            <a className="btn btn--ghost" href={linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={18} /> Conectar no LinkedIn</a>
            <a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} /> Conversar pelo WhatsApp</a>
            <a className="btn btn--ghost" href={site.resumeUrl} download><Icon name="download" size={18} /> Baixar currículo</a>
          </div>
          <p className="contact__mail">{email} · {site.location}</p>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate={false} aria-describedby="form-status">
          <div className="form__row">
            <label htmlFor="f-name">Nome</label>
            <input id="f-name" name="nome" required autoComplete="name" disabled={!enabled} />
          </div>
          <div className="form__row">
            <label htmlFor="f-email">E-mail</label>
            <input id="f-email" name="email" type="email" required autoComplete="email" disabled={!enabled} />
          </div>
          <div className="form__row">
            <label htmlFor="f-subject">Assunto</label>
            <input id="f-subject" name="assunto" required disabled={!enabled} />
          </div>
          <div className="form__row">
            <label htmlFor="f-msg">Mensagem</label>
            <textarea id="f-msg" name="mensagem" rows={5} required disabled={!enabled} />
          </div>
          <button className="btn btn--primary" type="submit" disabled={!enabled || status === "sending"}>
            <Icon name="send" size={16} /> {status === "sending" ? "Enviando…" : "Enviar mensagem"}
          </button>
          <p id="form-status" className={`form__status form__status--${enabled ? status : "off"}`} role="status">
            {!enabled && "O envio pelo formulário ainda não está ativo. Fale comigo por e-mail, LinkedIn ou WhatsApp."}
            {enabled && status === "sent" && "Mensagem enviada. Obrigada — respondo em breve!"}
            {enabled && status === "error" && "Não foi possível enviar agora. Tente novamente ou use o e-mail."}
          </p>
        </form>
      </div>
    </section>
  );
}
