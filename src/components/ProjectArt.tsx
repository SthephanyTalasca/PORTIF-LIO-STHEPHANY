// Ilustrações conceituais dos projetos (SVG). Não representam as telas reais.
import type { ReactNode } from "react";
import type { ProjectVisual } from "@/data/projects";

export function ProjectArt({ visual, className = "" }: { visual: ProjectVisual; className?: string }) {
  return (
    <div className={`art art--${visual} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`ag-${visual}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill={`url(#ag-${visual})`} />
        {shapes[visual]}
      </svg>
    </div>
  );
}

const shapes: Record<ProjectVisual, ReactNode> = {
  auditor: (
    <g>
      {Array.from({ length: 13 }).map((_, i) => {
        const h = [70, 92, 60, 110, 84, 98, 66, 120, 88, 76, 104, 94, 112][i];
        return <rect key={i} x={40 + i * 25} y={180 - h} width={14} height={h} rx={5} className={i === 7 ? "a-acc" : "a-bar"} />;
      })}
      <path d="M40 60 C120 40, 200 80, 360 34" className="a-line" fill="none" />
      <text x="40" y="200" className="a-txt">13 pilares · calibração humana</text>
    </g>
  ),
  agent: (
    <g>
      <rect x="40" y="36" width="210" height="34" rx="12" className="a-card" />
      <rect x="54" y="49" width="140" height="8" rx="4" className="a-bar" />
      <rect x="150" y="86" width="210" height="46" rx="12" className="a-card a-card--acc" />
      <rect x="164" y="99" width="170" height="8" rx="4" className="a-light" />
      <rect x="164" y="114" width="110" height="8" rx="4" className="a-light" />
      <rect x="40" y="148" width="170" height="34" rx="12" className="a-card" />
      <rect x="54" y="161" width="96" height="8" rx="4" className="a-bar" />
      <circle cx="360" cy="52" r="16" className="a-acc" />
    </g>
  ),
  evaluator: (
    <g>
      <circle cx="110" cy="110" r="58" className="a-ring" />
      <path d="M110 52 A58 58 0 1 1 58 136" className="a-arc" fill="none" />
      <text x="110" y="118" textAnchor="middle" className="a-big">S·P·I·N</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(210 ${46 + i * 36})`}>
          <rect width="150" height="10" rx="5" className="a-bar" />
          <rect width={[120, 90, 135, 104][i]} height="10" rx="5" className={i === 2 ? "a-acc" : "a-light"} />
        </g>
      ))}
    </g>
  ),
  onboarding: (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 118} 50)`}>
          <rect width="100" height="120" rx="14" className={i === 1 ? "a-card a-card--acc" : "a-card"} />
          <circle cx="24" cy="26" r="9" className={i === 1 ? "a-acc" : "a-bar"} />
          <rect x="16" y="50" width="68" height="8" rx="4" className="a-light" />
          <rect x="16" y="66" width="52" height="8" rx="4" className="a-bar" />
          <rect x="16" y="92" width="68" height="14" rx="7" className={i === 1 ? "a-acc" : "a-bar"} />
        </g>
      ))}
    </g>
  ),
  pipeline: (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${30 + i * 92} 80)`}>
          <rect width="68" height="60" rx="12" className={i === 2 ? "a-card a-card--acc" : "a-card"} />
          <rect x="14" y="18" width="40" height="6" rx="3" className="a-light" />
          <rect x="14" y="32" width="28" height="6" rx="3" className="a-bar" />
          {i < 3 && <path d={`M70 30 h22`} className="a-line" />}
        </g>
      ))}
      <text x="30" y="190" className="a-txt">Calendar → Drive → Apps Script → HubSpot</text>
    </g>
  ),
  postmeeting: (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(70 ${30 + i * 34})`}>
          <rect width="260" height="24" rx="8" className="a-card" />
          <rect x="10" y="7" width="10" height="10" rx="3" className={i < 3 ? "a-acc" : "a-bar"} />
          <rect x="32" y="9" width={[150, 120, 180, 100, 140][i]} height="6" rx="3" className="a-light" />
        </g>
      ))}
    </g>
  ),
  roleplay: (
    <g>
      <rect x="40" y="40" width="190" height="44" rx="16" className="a-card" />
      <rect x="56" y="58" width="130" height="8" rx="4" className="a-light" />
      <rect x="170" y="100" width="190" height="44" rx="16" className="a-card a-card--acc" />
      <rect x="186" y="118" width="140" height="8" rx="4" className="a-light" />
      <rect x="40" y="160" width="150" height="36" rx="14" className="a-card" />
      <circle cx="70" cy="178" r="4" className="a-light" />
      <circle cx="86" cy="178" r="4" className="a-light" />
      <circle cx="102" cy="178" r="4" className="a-light" />
    </g>
  ),
  hackathon: (
    <g>
      {Array.from({ length: 40 }).map((_, i) => {
        const col = i % 10, row = Math.floor(i / 10);
        const on = [2, 7, 13, 18, 21, 26, 33, 38].includes(i);
        return <rect key={i} x={40 + col * 33} y={34 + row * 38} width={22} height={22} rx={6} className={on ? "a-acc" : i % 3 === 0 ? "a-light" : "a-bar"} />;
      })}
      <text x="40" y="206" className="a-txt">40 projetos · ~25 em desenvolvimento · 5–10 em uso</text>
    </g>
  ),
};
