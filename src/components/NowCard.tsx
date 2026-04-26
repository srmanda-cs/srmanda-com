import type { CurrentProject } from "@/types";

export default function NowCard({ current }: { current?: CurrentProject }) {
  if (!current) return null;
  const pct = Math.max(0, Math.min(100, current.progress ?? 0));
  return (
    <div className="now-card card-glass">
      <header className="now-card-head">
        <span className="now-card-label mono">
          <span className="now-card-dot" aria-hidden />
          currently shipping
        </span>
        <span className="now-card-pct mono">{pct}%</span>
      </header>

      <h3 className="now-card-title">{current.title}</h3>
      <p className="now-card-desc">{current.description}</p>

      <div
        className="now-card-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="now-card-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
