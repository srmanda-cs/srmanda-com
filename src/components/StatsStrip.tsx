import type { Stats, StatItem } from "@/types";

// Restrained palette — only aurora tones, nothing warm/foreign.
const TINT: Record<StatItem["color"], { solid: string; soft: string; border: string }> = {
  green: {
    solid: "var(--aurora-green)",
    soft: "rgba(34, 197, 94, 0.12)",
    border: "rgba(34, 197, 94, 0.22)",
  },
  purple: {
    solid: "var(--aurora-violet)",
    soft: "rgba(109, 98, 240, 0.12)",
    border: "rgba(109, 98, 240, 0.22)",
  },
  cyan: {
    solid: "var(--aurora-cyan)",
    soft: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.22)",
  },
  white: {
    solid: "var(--aurora-indigo)",
    soft: "rgba(79, 70, 229, 0.12)",
    border: "rgba(79, 70, 229, 0.22)",
  },
};

const ICON: Record<StatItem["color"], React.ReactNode> = {
  green: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  purple: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h18M3 12h18M3 17h12" />
    </svg>
  ),
  cyan: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  white: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
      <path d="M6 17h12" />
    </svg>
  ),
};

export default function StatsStrip({ stats }: { stats?: Stats }) {
  const items = stats?.items ?? [];
  if (items.length === 0) return null;

  return (
    <div className="stats-bento">
      {items.map((s) => {
        const t = TINT[s.color];
        return (
          <div
            key={s.label}
            className="stats-tile"
            style={
              {
                "--tint": t.solid,
                "--tint-soft": t.soft,
                "--tint-border": t.border,
              } as React.CSSProperties
            }
          >
            <span className="stats-tile-icon" aria-hidden>
              {ICON[s.color]}
            </span>
            <div className="stats-tile-text">
              <span className="stats-tile-num">{s.value}</span>
              <span className="stats-tile-label mono">{s.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
