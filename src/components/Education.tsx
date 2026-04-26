import type { Education, Degree, Certification } from "@/types";
import SectionHeader from "./SectionHeader";

export default function EducationSection({
  education,
}: {
  education: Education;
}) {
  return (
    <section
      className="section"
      id="education"
      style={
        {
          "--section-accent": "var(--aurora-cyan)",
          "--section-accent-soft": "rgba(6, 182, 212, 0.22)",
        } as React.CSSProperties
      }
    >
      <SectionHeader
        number="05"
        label="education"
        tag="degrees & certifications"
      />

      <div className="edu-columns">
        <div className="edu-column">
          <h3 className="edu-column-label mono">degrees</h3>
          <div className="edu-stack">
            {education.degrees.map((d) => (
              <DegreeCard key={`${d.school}-${d.start}`} d={d} />
            ))}
          </div>
        </div>

        <div className="edu-column" id="certifications">
          <h3 className="edu-column-label mono">certifications</h3>
          <div className="edu-stack">
            {education.certifications.map((c) => (
              <CertCard key={c.short} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DegreeCard({ d }: { d: Degree }) {
  return (
    <div className={`card-glass edu-card${d.current ? " is-live" : ""}`}>
      <div className="edu-card-meta">
        <span className="mono edu-card-kicker">{d.degree}</span>
        <span className="mono edu-card-dates">
          {d.start} — {d.end}
        </span>
      </div>
      <div className="edu-card-body">
        <p className="edu-card-title">{d.field}</p>
        <p className="edu-card-sub">{d.school}</p>
      </div>
      {d.current && (
        <span className="edu-card-status mono">
          <span className="edu-card-status-dot" aria-hidden /> in progress
        </span>
      )}
    </div>
  );
}

function CertCard({ c }: { c: Certification }) {
  return (
    <div className="card-glass edu-card">
      <div className="edu-card-meta">
        <span className="edu-card-icon" aria-hidden>
          {c.icon}
        </span>
        <span className="mono edu-card-dates">{c.year}</span>
      </div>
      <div className="edu-card-body">
        <p className="edu-card-title">{c.short}</p>
        <p className="edu-card-sub">{c.name}</p>
        <p className="mono edu-card-issuer">{c.issuer}</p>
      </div>
    </div>
  );
}
