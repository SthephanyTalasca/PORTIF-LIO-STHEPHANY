"use client";

import { useEffect, useRef, useState } from "react";
import { metrics, type Metric } from "@/data/content";

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ m, run }: { m: Metric; run: boolean }) {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!run || m.countTo === undefined) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(m.countTo); return; }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * (m.countTo as number)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, m.countTo]);

  if (m.countTo === undefined || n === null) return <>{m.value}</>;
  return <>{m.prefix}{n.toLocaleString("pt-BR")}{m.suffix}</>;
}

export function Metrics() {
  const { ref, inView } = useInView<HTMLUListElement>();
  return (
    <section className="metrics" aria-labelledby="metrics-title">
      <div className="container">
        <h2 id="metrics-title" className="sr-only">Resultados</h2>
        <ul ref={ref} className={`metrics__list ${inView ? "is-visible" : ""}`}>
          {metrics.map((m, i) => (
            <li key={m.label} className="metric" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="metric__value" aria-hidden="true"><Counter m={m} run={inView} /></span>
              <span className="sr-only">{m.value}</span>
              <span className="metric__label">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
