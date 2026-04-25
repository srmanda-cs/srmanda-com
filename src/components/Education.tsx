import type { Education } from "@/types";

export default function EducationSection({
  education,
}: {
  education: Education;
}) {
  return (
    <section className="section" id="education">
      <div className="section-label">
        <span className="section-label-text mono">
          education &amp; certifications
        </span>
        <div className="section-label-line" />
      </div>

      <div className="edu-grid">
        {/* Degrees */}
        <div>
          <p
            className="mono"
            style={{
              fontSize: "10px",
              color: "var(--t3)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            degrees
          </p>
          <div className="timeline">
            {education.degrees.map((d) => (
              <div key={`${d.school}-${d.start}`} className="timeline-item">
                <div className={`timeline-dot${d.current ? " live" : ""}`} />
                <div className="card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <p
                        className="mono"
                        style={{
                          fontSize: "10px",
                          color: "var(--accent)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "3px",
                        }}
                      >
                        {d.degree}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "var(--t1)",
                          marginBottom: "2px",
                        }}
                      >
                        {d.field}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--t2)" }}>
                        {d.school}
                      </p>
                    </div>
                    <span
                      className="mono"
                      style={{
                        fontSize: "11px",
                        color: "var(--t3)",
                        border: "1px solid var(--b1)",
                        padding: "2px 7px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {d.start} — {d.end}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div id="certifications">
          <p
            className="mono"
            style={{
              fontSize: "10px",
              color: "var(--t3)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "12px",
            }}
          >
            certifications
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {education.certifications.map((c) => (
              <div
                key={c.short}
                className="card"
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>
                  {c.icon}
                </span>
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--t1)",
                      marginBottom: "2px",
                    }}
                  >
                    {c.short}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--t2)",
                      marginBottom: "1px",
                    }}
                  >
                    {c.name}
                  </p>
                  <p
                    className="mono"
                    style={{ fontSize: "11px", color: "var(--t3)" }}
                  >
                    {c.issuer} &middot; {c.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
