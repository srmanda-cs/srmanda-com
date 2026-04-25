import type { Projects } from "@/types";

export default function ProjectsSection({ projects }: { projects: Projects }) {
  return (
    <section className="section" id="projects">
      <div className="section-label">
        <span className="section-label-text mono">projects</span>
        <div className="section-label-line" />
      </div>

      {/* Scroll-snap carousel — one card visible, edges of others peek */}
      <div className="carousel">
        {projects.featured.map((p) => (
          <div key={p.name} className="carousel-item">
            <div className="card" style={{ height: "100%" }}>
              {/* Project name + links */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3
                  className="mono"
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--t1)",
                    wordBreak: "break-all",
                    lineHeight: 1.3,
                  }}
                >
                  {p.name}
                </h3>
                <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                  {p.github && <PLink href={p.github} label="GH" />}
                  {p.demo && <PLink href={p.demo} label="↗" />}
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--t2)",
                  lineHeight: 1.7,
                  marginBottom: "14px",
                }}
              >
                {p.description}
              </p>

              {/* Inline tech stack — key feature from adithyakrishnan */}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <span key={tag} className="skill-tag mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        className="mono"
        style={{
          marginTop: "10px",
          fontSize: "11px",
          color: "var(--t4)",
          letterSpacing: "0.5px",
        }}
      >
        ← swipe or scroll →
      </p>
    </section>
  );
}

function PLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mono"
      style={{
        fontSize: "11px",
        color: "var(--t3)",
        textDecoration: "none",
        border: "1px solid var(--b1)",
        padding: "2px 7px",
      }}
    >
      {label}
    </a>
  );
}
