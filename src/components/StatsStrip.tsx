import type { Stats, StatItem } from "@/types";

// 4 vibrant tints, NONE in the aurora palette (violet/indigo/cyan/green).
// Hues distributed across the warm/pink half of the wheel so they pop without
// clashing with the cool aurora used elsewhere.
//   green  → rose-pink (yrs exp)
//   purple → orange    (services)
//   cyan   → amber     (cloud certs)
//   white  → fuchsia   (cost saved)
const TINT: Record<StatItem["color"], { solid: string; soft: string; border: string }> = {
  green: {
    solid: "#e11d48",
    soft: "rgba(225, 29, 72, 0.14)",
    border: "rgba(225, 29, 72, 0.32)",
  },
  purple: {
    solid: "#38bdf8",
    soft: "rgba(56, 189, 248, 0.14)",
    border: "rgba(56, 189, 248, 0.32)",
  },
  cyan: {
    solid: "#f97316",
    soft: "rgba(249, 115, 22, 0.14)",
    border: "rgba(249, 115, 22, 0.32)",
  },
  white: {
    solid: "#a855f7",
    soft: "rgba(168, 85, 247, 0.14)",
    border: "rgba(168, 85, 247, 0.32)",
  },
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
            <span className="stats-tile-num">{s.value}</span>
            <span className="stats-tile-label mono">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}
