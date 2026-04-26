import type { Stats, StatItem } from "@/types";

const colorVar: Record<StatItem["color"], string> = {
  green: "var(--aurora-green)",
  purple: "var(--aurora-violet)",
  cyan: "var(--aurora-cyan)",
  white: "var(--t1)",
};

export default function StatsStrip({ stats }: { stats?: Stats }) {
  const items = stats?.items ?? [];
  if (items.length === 0) return null;

  return (
    <div className="stats-strip">
      {items.map((s) => (
        <div key={s.label} className="stats-cell">
          <div className="stats-value" style={{ color: colorVar[s.color] }}>
            {s.value}
          </div>
          <div className="stats-label mono">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
