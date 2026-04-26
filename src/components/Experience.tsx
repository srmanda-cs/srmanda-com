import type { Experience } from "@/types";
import SectionHeader from "./SectionHeader";

export default function ExperienceSection({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <section
      className="section"
      id="experience"
      style={
        {
          "--section-accent": "var(--aurora-violet)",
          "--section-accent-soft": "rgba(109, 98, 240, 0.20)",
        } as React.CSSProperties
      }
    >
      <SectionHeader number="03" label="experience" tag="where i've been" />

      <div className="timeline">
        {experience.roles.map((role) => (
          <div key={`${role.company}-${role.start}`} className="timeline-item">
            <div className={`timeline-dot${role.current ? " live" : ""}`} />

            <div className="card-glass">
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginBottom: "14px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p
                    className="mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--section-accent)",
                      textTransform: "uppercase",
                      letterSpacing: "1.4px",
                      marginBottom: "5px",
                      fontWeight: 600,
                    }}
                  >
                    {role.company_full} &middot; {role.location}
                  </p>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--t1)",
                      lineHeight: 1.25,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {role.title}
                  </h3>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--t3)",
                    border: "1px solid var(--b1)",
                    padding: "4px 9px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0.02)",
                  }}
                >
                  {role.start} — {role.end}
                </span>
              </div>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                {role.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      fontSize: "15px",
                      color: "var(--t2)",
                      lineHeight: 1.65,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        color: "var(--section-accent)",
                        flexShrink: 0,
                        marginTop: "5px",
                        fontSize: "9px",
                      }}
                    >
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Inline skills */}
              {role.tags && role.tags.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {role.tags.map((tag) => (
                    <span key={tag} className="skill-tag mono">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
