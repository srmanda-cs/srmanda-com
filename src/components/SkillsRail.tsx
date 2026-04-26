"use client";

import type { Skills, SkillGroup } from "@/types";
import { useSkills } from "./SkillsContext";

const COLOR_VAR: Record<SkillGroup["color"] | "default", string> = {
  green: "var(--aurora-green)",
  purple: "var(--aurora-violet)",
  cyan: "var(--aurora-cyan)",
  white: "var(--aurora-indigo)",
  default: "var(--aurora-violet)",
};

// Per-group accent so each category has its own dot color, not all the same.
const GROUP_TINT: Record<string, string> = {
  Languages: "var(--aurora-green)",
  "Cloud & IaC": "var(--aurora-cyan)",
  "Containers & Orchestration": "var(--aurora-violet)",
  "CI/CD & GitOps": "var(--aurora-indigo)",
  Observability: "#f59e0b", // amber
  Databases: "#ec4899", // pink
};

export default function SkillsRail({ skills }: { skills: Skills }) {
  const ctx = useSkills();
  const hasActive = ctx?.hasActive ?? false;

  return (
    <aside className="skills-rail" aria-label="Skills">
      <div className="skills-rail-head">
        <span className="skills-rail-label mono">stack</span>
        <span className="skills-rail-line" />
      </div>

      <div className="skills-rail-groups">
        {skills.groups.map((group) => {
          const tint = GROUP_TINT[group.label] ?? COLOR_VAR[group.color];
          return (
            <div key={group.label} className="skills-rail-group">
              <div className="skills-rail-group-label mono">
                <span
                  className="skills-rail-dot"
                  aria-hidden
                  style={
                    {
                      background: tint,
                      boxShadow: `0 0 8px ${tint}`,
                    } as React.CSSProperties
                  }
                />
                {group.label}
              </div>
              <div className="skills-rail-chips">
                {group.items.map((item) => {
                  const dim = ctx?.isDimmed(item) ?? false;
                  const hi = ctx?.isHighlighted(item) ?? false;
                  return (
                    <span
                      key={item}
                      className={`skills-rail-chip mono${
                        dim ? " is-dim" : ""
                      }${hi ? " is-hi" : ""}`}
                      style={
                        hi
                          ? ({
                              "--chip-tint": tint,
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p
        className={`skills-rail-hint mono${hasActive ? " is-active" : ""}`}
        aria-live="polite"
      >
        {hasActive ? "↑ tools used here" : "hover a role / project to see tools used"}
      </p>
    </aside>
  );
}
