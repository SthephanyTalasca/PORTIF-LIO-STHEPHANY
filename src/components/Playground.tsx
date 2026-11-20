"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";

// Todas as demonstrações rodam no navegador, com dados fictícios. Nada é enviado a serviços externos.

const tabs = [
  { id: "workflow", label: "Workflow" },
  { id: "evaluator", label: "Avaliação de reunião" },
  { id: "agent", label: "Agente + ferramentas" },
  { id: "dashboard", label: "Dashboard" },
] as const;
type TabId = (typeof tabs)[number]["id"];

export function Playground() {
  const [tab, setTab] = useState<TabId>("workflow");
  return (
    <section id="playground" className="section" aria-labelledby="lab-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">AI Playground</p>
          <h2 id="lab-title" className="section__title">Um laboratório para experimentar.</h2>
          <p className="section__lead">
            Pequenas demonstrações interativas dos tipos de sistema que eu construo. Dados 100% fictícios,
            processados no seu navegador.
          </p>
        </header>

        <div className="lab">
          <div className="lab__tabs" role="tablist" aria-label="Demonstrações">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                className={`lab__tab ${tab === t.id ? "is-active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="lab__panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === "workflow" && <WorkflowDemo />}
            {tab === "evaluator" && <EvaluatorDemo />}
            {tab === "agent" && <AgentDemo />}
            {tab === "dashboard" && <DashboardDemo />}
          </div>
          <p className="lab__note"><Icon name="lock" size={14} /> Demonstrações com dados sintéticos. Nenhuma informação de empresas reais é utilizada.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Workflow ---------------- */

const flow = [
  { name: "Webhook", desc: "Reunião fictícia finalizada", out: "payload recebido: reunião #A-104" },
  { name: "Resumo com LLM", desc: "Gera resumo e próximos passos", out: "3 próximos passos identificados" },
  { name: "Classificação", desc: "Define prioridade", out: "prioridade: alta" },
  { name: "CRM", desc: "Cria tarefa para o responsável", out: "tarefa criada para Ana (fictícia)" },
  { name: "Slack", desc: "Notifica o canal do time", out: "mensagem enviada em #demo" },
];

function WorkflowDemo() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = () => {
    clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStep(flow.length - 1); return; }
    setRunning(true);
    setStep(0);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i < flow.length) { setStep(i); timer.current = setTimeout(tick, 700); }
      else setRunning(false);
    };
    timer.current = setTimeout(tick, 700);
  };
  const reset = () => { clearTimeout(timer.current); setRunning(false); setStep(-1); };

  return (
    <div className="demo">
      <div className="demo__bar">
        <p className="demo__title">Pós-reunião automatizado</p>
        <div className="demo__actions">
          <button className="btn btn--primary btn--sm" onClick={run} disabled={running}>
            <Icon name="play" size={14} /> {running ? "Executando…" : "Executar"}
          </button>
          <button className="btn btn--ghost btn--sm" onClick={reset}><Icon name="reset" size={14} /> Reiniciar</button>
        </div>
      </div>
      <ol className="wf">
        {flow.map((n, i) => (
          <li key={n.name} className={`wf__node ${i <= step ? "is-done" : ""} ${i === step && running ? "is-running" : ""}`}>
            <span className="wf__idx">{i + 1}</span>
            <span className="wf__name">{n.name}</span>
            <span className="wf__desc">{n.desc}</span>
          </li>
        ))}
      </ol>
      <div className="console" aria-live="polite">
        {step < 0 ? (
          <p className="console__muted">› Clique em “Executar” para rodar o fluxo.</p>
        ) : (
          flow.slice(0, step + 1).map((n) => <p key={n.name}><span className="console__ok">✓</span> {n.name}: {n.out}</p>)
        )}
      </div>
    </div>
  );
}

/* ---------------- Avaliador ---------------- */

const samples = [
  {
    label: "Reunião A (fictícia)",
    text:
      "Bom dia, Carla! Obrigado pelo tempo. Antes de começar, posso entender como vocês fazem a conciliação hoje? Quantas pessoas participam? Entendi, então o maior problema é o retrabalho no fechamento. Faz sentido. Como próximo passo, vou enviar a proposta hoje e agendamos uma demonstração na quinta-feira.",
  },
  {
    label: "Reunião B (fictícia)",
    text:
      "Oi. Então, nossa ferramenta tem muitos recursos, relatórios, integrações, aplicativo, tudo o que você imaginar e mais um pouco, e o preço é ótimo e a gente tem vários clientes. Qualquer coisa me chama.",
  },
];

type Score = { pillar: string; score: number; why: string };

function evaluate(text: string): Score[] {
  const t = text.toLowerCase();
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const questions = (text.match(/\?/g) || []).length;
  const avgWords = sentences.length ? text.split(/\s+/).length / sentences.length : 0;
  const has = (words: string[]) => words.filter((w) => t.includes(w)).length;

  const opening = has(["bom dia", "boa tarde", "olá", "obrigad", "prazer"]);
  const listening = has(["entendi", "faz sentido", "então o", "se entendi", "resumindo"]);
  const next = has(["próximo passo", "agend", "envio", "vou enviar", "quinta", "amanhã", "semana"]);

  const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(n)));
  return [
    { pillar: "Abertura", score: clamp(1 + opening * 2), why: opening ? "Cumprimenta e agradece o tempo do cliente." : "Não há uma abertura clara da conversa." },
    { pillar: "Descoberta", score: clamp(1 + questions * 1.5), why: questions ? `${questions} pergunta(s) para entender o contexto.` : "Nenhuma pergunta de descoberta." },
    { pillar: "Escuta ativa", score: clamp(1 + listening * 2), why: listening ? "Resume o que ouviu antes de avançar." : "Não confirma o entendimento do problema." },
    { pillar: "Clareza", score: clamp(avgWords <= 18 ? 5 : avgWords <= 28 ? 3 : 2), why: `Média de ${Math.round(avgWords)} palavras por frase.` },
    { pillar: "Próximos passos", score: clamp(1 + next * 1.5), why: next ? "Define ação e data para continuidade." : "A conversa termina sem próximo passo definido." },
  ];
}

function EvaluatorDemo() {
  const [text, setText] = useState(samples[0].text);
  const [result, setResult] = useState<Score[] | null>(null);
  const avg = result ? result.reduce((a, b) => a + b.score, 0) / result.length : 0;

  return (
    <div className="demo demo--split">
      <div>
        <div className="demo__bar">
          <p className="demo__title">Transcrição</p>
          <div className="chips">
            {samples.map((s) => (
              <button key={s.label} className={`chip ${text === s.text ? "is-active" : ""}`} onClick={() => { setText(s.text); setResult(null); }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <label className="sr-only" htmlFor="transcript">Transcrição fictícia</label>
        <textarea id="transcript" className="textarea" rows={7} value={text} onChange={(e) => { setText(e.target.value); setResult(null); }} />
        <button className="btn btn--primary btn--sm" onClick={() => setResult(evaluate(text))} disabled={!text.trim()}>
          <Icon name="sparkles" size={14} /> Avaliar com a rubrica de exemplo
        </button>
        <p className="demo__hint">Esta demo usa heurísticas locais com 5 critérios de exemplo — não usa LLM nem a rubrica real.</p>
      </div>
      <div className="score" aria-live="polite">
        {result ? (
          <>
            <div className="score__head">
              <span className="score__avg">{avg.toFixed(1)}</span>
              <span className="score__max">/ 5 · nota média</span>
            </div>
            <ul className="score__list">
              {result.map((r) => (
                <li key={r.pillar}>
                  <div className="score__row"><span>{r.pillar}</span><span>{r.score}/5</span></div>
                  <div className="meter"><span style={{ width: `${r.score * 20}%` }} /></div>
                  <p className="score__why">{r.why}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="console__muted">As notas justificadas aparecem aqui.</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- Agente ---------------- */

const tools = [
  { id: "kb", label: "Base de conhecimento" },
  { id: "crm", label: "CRM" },
  { id: "calendar", label: "Agenda" },
  { id: "slack", label: "Slack" },
] as const;
type ToolId = (typeof tools)[number]["id"];

const questions: { q: string; route: ToolId[]; answer: string }[] = [
  { q: "Quais melhorias saíram este mês?", route: ["kb"], answer: "Consulta a base de conhecimento e responde com as 3 melhorias publicadas (dados fictícios)." },
  { q: "Agende um retorno com o cliente Demo S.A.", route: ["crm", "calendar"], answer: "Busca o contato no CRM, encontra um horário livre e cria o evento." },
  { q: "Avise o time sobre a nova proposta", route: ["crm", "slack"], answer: "Lê o status da proposta no CRM e publica um resumo no canal do time." },
  { q: "Qual é a senha do servidor?", route: [], answer: "Pedido bloqueado pelas regras de segurança: o agente não divulga credenciais nem dados internos." },
];

function AgentDemo() {
  const [i, setI] = useState(0);
  const cur = questions[i];
  return (
    <div className="demo">
      <div className="chips chips--wrap">
        {questions.map((q, idx) => (
          <button key={q.q} className={`chip ${idx === i ? "is-active" : ""}`} onClick={() => setI(idx)}>{q.q}</button>
        ))}
      </div>
      <div className="agent">
        <div className="agent__user"><Icon name="message" size={16} /> {cur.q}</div>
        <div className={`agent__core ${cur.route.length ? "" : "is-blocked"}`}>
          <Icon name="bot" size={22} />
          <span>Agente</span>
          <small>{cur.route.length ? "planeja e chama ferramentas" : "regra de segurança"}</small>
        </div>
        <ul className="agent__tools">
          {tools.map((t) => (
            <li key={t.id} className={cur.route.includes(t.id) ? "is-on" : ""}>
              <span className="agent__line" aria-hidden="true" />
              {t.label}
              {cur.route.includes(t.id) && <span className="agent__step">{cur.route.indexOf(t.id) + 1}</span>}
            </li>
          ))}
        </ul>
        <p className="agent__answer" aria-live="polite">{cur.answer}</p>
      </div>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */

function seeded(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function DashboardDemo() {
  const [days, setDays] = useState<7 | 30 | 90>(30);
  const data = useMemo(() => {
    const rnd = seeded(days);
    const n = days === 7 ? 7 : days === 30 ? 15 : 18;
    return Array.from({ length: n }, (_, i) => Math.round(40 + i * 2 + rnd() * 30));
  }, [days]);
  const max = Math.max(...data);
  const total = data.reduce((a, b) => a + b, 0) * (days === 7 ? 1 : days === 30 ? 2 : 5);
  const avgScore = (3.4 + (data[data.length - 1] % 10) / 10).toFixed(1);
  const W = 560, H = 180, bw = W / data.length;
  const line = data.map((v, i) => `${i === 0 ? "M" : "L"}${i * bw + bw / 2} ${H - (v / max) * (H - 20)}`).join(" ");

  return (
    <div className="demo">
      <div className="demo__bar">
        <p className="demo__title">Avaliações processadas (dados sintéticos)</p>
        <div className="chips">
          {[7, 30, 90].map((d) => (
            <button key={d} className={`chip ${days === d ? "is-active" : ""}`} onClick={() => setDays(d as 7 | 30 | 90)}>{d} dias</button>
          ))}
        </div>
      </div>
      <div className="kpis">
        <div className="kpi"><span className="kpi__v">{total.toLocaleString("pt-BR")}</span><span className="kpi__l">avaliações</span></div>
        <div className="kpi"><span className="kpi__v">{avgScore}</span><span className="kpi__l">nota média</span></div>
        <div className="kpi"><span className="kpi__v">{Math.round(max / 2)}%</span><span className="kpi__l">em lote</span></div>
      </div>
      <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Gráfico sintético de ${days} dias`}>
        {data.map((v, i) => (
          <rect key={i} x={i * bw + bw * 0.2} y={H - (v / max) * (H - 20)} width={bw * 0.6} height={(v / max) * (H - 20)} rx={4} className="chart__bar" />
        ))}
        <path d={line} className="chart__line" fill="none" />
      </svg>
    </div>
  );
}
