// Visualizações conceituais do carrossel (SVG puro, decorativas).
import type { Slide } from "@/data/content";

type Props = { kind: Slide["visual"]; active: boolean };

export function SlideVisual({ kind, active }: Props) {
  const cls = `viz viz--${kind} ${active ? "is-active" : ""}`;
  return (
    <div className={cls} aria-hidden="true">
      {kind === "agent" && <AgentViz />}
      {kind === "workflow" && <WorkflowViz />}
      {kind === "saas" && <SaasViz />}
      {kind === "network" && <NetworkViz />}
      <span className="viz__label">Visualização conceitual</span>
    </div>
  );
}

function Node({ x, y, w = 120, h = 44, label, sub, tone = "base" }: {
  x: number; y: number; w?: number; h?: number; label: string; sub?: string; tone?: "base" | "accent" | "pink";
}) {
  return (
    <g transform={`translate(${x - w / 2} ${y - h / 2})`} className={`vnode vnode--${tone}`}>
      <rect width={w} height={h} rx={12} />
      <text x={w / 2} y={sub ? h / 2 - 3 : h / 2 + 5} textAnchor="middle" className="vnode__t">{label}</text>
      {sub && <text x={w / 2} y={h / 2 + 13} textAnchor="middle" className="vnode__s">{sub}</text>}
    </g>
  );
}

function AgentViz() {
  const center = { x: 260, y: 215 };
  const nodes = [
    { x: 95, y: 90, label: "Gemini", sub: "LLM" },
    { x: 425, y: 90, label: "Claude", sub: "LLM" },
    { x: 70, y: 260, label: "MCP", sub: "ferramentas" },
    { x: 450, y: 260, label: "APIs", sub: "Slack · HubSpot" },
    { x: 150, y: 375, label: "Supabase", sub: "dados" },
    { x: 370, y: 375, label: "LangChain", sub: "orquestração" },
  ];
  return (
    <svg viewBox="0 0 520 440" className="viz__svg">
      <defs>
        <radialGradient id="g-agent" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={center.x} cy={center.y} r={150} fill="url(#g-agent)" />
      <circle cx={center.x} cy={center.y} r={120} className="vring" />
      <circle cx={center.x} cy={center.y} r={175} className="vring vring--faint" />
      {nodes.map((n) => (
        <line key={n.label} x1={center.x} y1={center.y} x2={n.x} y2={n.y} className="vline vline--flow" />
      ))}
      {nodes.map((n) => <Node key={n.label} {...n} w={112} />)}
      <g transform={`translate(${center.x - 70} ${center.y - 38})`} className="vnode vnode--core">
        <rect width={140} height={76} rx={20} />
        <text x={70} y={34} textAnchor="middle" className="vnode__t vnode__t--lg">Agente</text>
        <text x={70} y={54} textAnchor="middle" className="vnode__s">raciocínio + ferramentas</text>
      </g>
    </svg>
  );
}

function WorkflowViz() {
  const steps = [
    { x: 80, y: 120, label: "Webhook", sub: "gatilho" },
    { x: 260, y: 120, label: "Gemini", sub: "classificar", tone: "accent" as const },
    { x: 440, y: 120, label: "Condição", sub: "IF" },
    { x: 350, y: 290, label: "HubSpot", sub: "criar tarefa" },
    { x: 170, y: 290, label: "Slack", sub: "notificar", tone: "pink" as const },
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4]];
  return (
    <svg viewBox="0 0 520 440" className="viz__svg">
      <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" className="vdot" />
      </pattern>
      <rect width="520" height="440" fill="url(#dots)" rx="24" />
      {links.map(([a, b]) => {
        const A = steps[a], B = steps[b];
        const d = A.y === B.y
          ? `M${A.x + 60} ${A.y} L${B.x - 60} ${B.y}`
          : `M${A.x} ${A.y + 24} C${A.x} ${A.y + 110}, ${B.x + 60} ${B.y}, ${B.x + 60} ${B.y}`;
        return <path key={`${a}-${b}`} d={a === 3 ? `M${A.x - 60} ${A.y} L${B.x + 60} ${B.y}` : d} className="vline vline--flow" fill="none" />;
      })}
      {steps.map((s) => <Node key={s.label} {...s} />)}
      <g transform="translate(150 370)" className="vlog">
        <rect width="220" height="40" rx="10" />
        <circle cx="20" cy="20" r="5" className="vlog__ok" />
        <text x="34" y="25" className="vnode__s">execução concluída · 5 nós</text>
      </g>
    </svg>
  );
}

function SaasViz() {
  const bars = [52, 78, 64, 96, 72, 118, 104];
  return (
    <svg viewBox="0 0 520 440" className="viz__svg">
      <g className="vwin">
        <rect x="20" y="30" width="480" height="380" rx="20" />
        <rect x="20" y="30" width="480" height="40" rx="20" className="vwin__bar" />
        <circle cx="46" cy="50" r="5" className="vwin__dot" />
        <circle cx="64" cy="50" r="5" className="vwin__dot" />
        <circle cx="82" cy="50" r="5" className="vwin__dot" />
        <rect x="20" y="70" width="96" height="340" className="vwin__side" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="36" y={96 + i * 34} width={i === 1 ? 64 : 52} height="10" rx="5" className={i === 1 ? "vwin__nav is-on" : "vwin__nav"} />
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${136 + i * 120} 92)`} className="vkpi">
          <rect width="108" height="66" rx="12" />
          <rect x="14" y="16" width="40" height="8" rx="4" className="vkpi__l" />
          <rect x="14" y="34" width={[62, 48, 70][i]} height="16" rx="5" className={i === 0 ? "vkpi__v is-accent" : "vkpi__v"} />
        </g>
      ))}
      <g transform="translate(136 176)" className="vchart">
        <rect width="348" height="210" rx="14" />
        {bars.map((h, i) => (
          <rect key={i} x={26 + i * 45} y={184 - h} width="26" height={h} rx="6" className={i === 5 ? "vchart__bar is-accent" : "vchart__bar"} style={{ animationDelay: `${i * 70}ms` }} />
        ))}
        <path d="M39 120 L84 98 L129 108 L174 72 L219 90 L264 52 L309 62" className="vchart__line" fill="none" />
      </g>
    </svg>
  );
}

function NetworkViz() {
  const pts = [
    [260, 210], [140, 120], [380, 110], [110, 300], [410, 310], [260, 70], [260, 360],
    [60, 200], [470, 200], [190, 250], [330, 255], [200, 160], [320, 160],
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,7],[2,8],[3,7],[4,8],[0,9],[0,10],[9,3],[10,4],[0,11],[0,12],[11,1],[12,2],[5,11],[5,12],[6,9],[6,10]];
  return (
    <svg viewBox="0 0 520 440" className="viz__svg">
      <g transform="translate(26 4) scale(0.9)">
      {edges.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} className="vline" />
      ))}
      {pts.slice(1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i < 6 ? 12 : 8} className={`vpeer ${i % 3 === 0 ? "is-pink" : ""}`} style={{ animationDelay: `${i * 120}ms` }} />
      ))}
      <circle cx={260} cy={210} r={46} className="vhub" />
      <text x={260} y={206} textAnchor="middle" className="vnode__t vnode__t--lg">IA</text>
      <text x={260} y={226} textAnchor="middle" className="vnode__s">inovação</text>
      </g>
      {[
        { x: 70, y: 400, v: "~90", l: "participantes" },
        { x: 210, y: 400, v: "40", l: "projetos" },
        { x: 350, y: 400, v: "~25", l: "em desenvolvimento" },
      ].map((s) => (
        <g key={s.l} transform={`translate(${s.x} ${s.y - 26})`} className="vstat">
          <rect width="120" height="48" rx="12" />
          <text x="14" y="22" className="vstat__v">{s.v}</text>
          <text x="14" y="38" className="vnode__s">{s.l}</text>
        </g>
      ))}
    </svg>
  );
}
