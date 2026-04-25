import type { Skills } from "@/types";

const colorMap: Record<string, { border: string; text: string; bg: string }> = {
  green: {
    border: "var(--green-border)",
    text: "var(--green)",
    bg: "var(--green-dim)",
  },
  purple: {
    border: "var(--accent-border)",
    text: "var(--accent)",
    bg: "var(--accent-dim)",
  },
  cyan: {
    border: "rgba(45,212,191,0.3)",
    text: "var(--teal)",
    bg: "var(--teal-dim)",
  },
  white: {
    border: "var(--border-active)",
    text: "var(--text-secondary)",
    bg: "transparent",
  },
};

export default function SkillsMatrix({ skills }: { skills: Skills }) {
  return (
    <section
      id="skills"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}
    >
      <SectionHeader label="skill_matrix.yaml" />
      <div className="card" style={{ padding: "20px 22px" }}>
        <div
          style={{
            display: "flex",
            gap: "28px",
            flexWrap: "wrap",
            rowGap: "18px",
          }}
        >
          {skills.groups.map((group) => {
            const c = colorMap[group.color] ?? colorMap.white;
            return (
              <div key={group.label}>
                <div
                  className="mono"
                  style={{
                    fontSize: "10px",
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="mono"
                      style={{
                        padding: "4px 10px",
                        fontSize: "12px",
                        border: `1px solid ${c.border}`,
                        color: c.text,
                        background: c.bg,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: "11px",
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "2.5px",
        }}
      >
        {label}
      </span>
      <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
    </div>
  );
}
