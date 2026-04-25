import type { Experience } from "@/types";

export default function ExperienceSection({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <section className="section" id="experience">
      <div className="section-label">
        <span className="section-label-text mono">experience</span>
        <div className="section-label-line" />
      </div>

      <div className="timeline">
        {experience.roles.map((role) => (
          <div key={`${role.company}-${role.start}`} className="timeline-item">
            <div className={`timeline-dot${role.current ? " live" : ""}`} />

            <div className="card">
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--t3)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "4px",
                    }}
                  >
                    {role.company_full} &middot; {role.location}
                  </p>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--t1)",
                      lineHeight: 1.2,
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
                    padding: "3px 8px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
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
                  gap: "7px",
                  marginBottom: "14px",
                }}
              >
                {role.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "15px",
                      color: "var(--t2)",
                      lineHeight: 1.65,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        color: "var(--live)",
                        flexShrink: 0,
                        marginTop: "3px",
                        fontSize: "10px",
                      }}
                    >
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Inline skills — adithyakrishnan-style */}
              {role.tags && role.tags.length > 0 && (
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
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
