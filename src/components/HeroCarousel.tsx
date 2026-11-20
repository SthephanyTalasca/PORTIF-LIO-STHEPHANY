"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { slides } from "@/data/content";
import { requestProjectFilter } from "@/lib/events";
import { Icon } from "./Icon";
import { SlideVisual } from "./SlideVisual";

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const start = useRef<{ x: number; y: number } | null>(null);
  const [drag, setDrag] = useState(0);

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  // Swipe no celular (pointer events, sem bibliotecas)
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onMove = (e: PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.abs(dx) > Math.abs(dy)) setDrag(dx);
  };
  const onUp = () => {
    if (!start.current) return;
    if (drag < -50) next();
    else if (drag > 50) prev();
    start.current = null;
    setDrag(0);
  };

  return (
    <section
      id="inicio"
      className="hero"
      aria-roledescription="carrossel"
      aria-label="Áreas de atuação"
      onKeyDown={onKey}
    >
      <div className="hero__glow" aria-hidden="true" />
      <div
        className="hero__viewport"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          className={`hero__track ${drag ? "is-dragging" : ""}`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${drag}px))` }}
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.id}
                className={`slide ${active ? "is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}: ${s.kicker}`}
                aria-hidden={!active}
                inert={!active}
              >
                <div className="container slide__inner">
                  <div className="slide__copy">
                    <p className="kicker">
                      <span className="kicker__dot" aria-hidden="true" />
                      {s.kicker}
                      <span className="kicker__count">{pad(i + 1)} / {pad(total)}</span>
                    </p>
                    {i === 0 ? (
                      <h1 className="slide__title">{s.title}</h1>
                    ) : (
                      <h2 className="slide__title">{s.title}</h2>
                    )}
                    <p className="slide__desc">{s.description}</p>
                    {s.highlights && (
                      <ul className="slide__highlights">
                        {s.highlights.map((h) => (
                          <li key={h}><Icon name="check" size={16} /> {h}</li>
                        ))}
                      </ul>
                    )}
                    <ul className="tags" aria-label="Tecnologias">
                      {s.tags.map((t) => (
                        <li key={t} className="tag">{t}</li>
                      ))}
                    </ul>
                    <div className="slide__actions">
                      <Link
                        href={s.cta.href}
                        className="btn btn--primary"
                        onClick={() => s.cta.filter && requestProjectFilter(s.cta.filter)}
                      >
                        {s.cta.label} <Icon name="arrowRight" size={18} />
                      </Link>
                      <Link href="/#contato" className="btn btn--ghost">Fale comigo</Link>
                    </div>
                  </div>
                  <div className="slide__visual">
                    <SlideVisual kind={s.visual} active={active} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container hero__controls">
        <div className="hero__progress" role="tablist" aria-label="Escolher slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir para o slide ${i + 1}: ${s.kicker}`}
              className={`hero__bar ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="hero__bar-label">{s.kicker}</span>
            </button>
          ))}
        </div>
        <div className="hero__arrows">
          <button className="icon-btn" onClick={prev} aria-label="Slide anterior">
            <Icon name="arrowLeft" />
          </button>
          <button className="icon-btn" onClick={next} aria-label="Próximo slide">
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} de {total}: {slides[index].kicker}
      </p>
    </section>
  );
}
