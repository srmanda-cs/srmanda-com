"use client";

import type { Projects, Project } from "@/types";
import SectionHeader from "./SectionHeader";
import { useTagHover, useObservedTags } from "./SkillsContext";

export default function ProjectsSection({ projects }: { projects: Projects }) {
  return (
    <section
      className="section"
      id="projects"
      style={
        {
          "--section-accent": "var(--aurora-indigo)",
          "--section-accent-soft": "rgba(79, 70, 229, 0.22)",
        } as React.CSSProperties
      }
    >
      <SectionHeader number="03" label="projects" tag="things i've built" />

      <div className="projects-grid">
        {projects.featured.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const hover = useTagHover(p.tags);
  const observeRef = useObservedTags(p.tags, `project:${p.name}`);
  return (
    <article
      ref={observeRef as React.RefObject<HTMLElement>}
      className="card-glass project-card"
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
    >
      <div className="mac-chrome">
        <div className="mac-dots">
          <span className="mac-dot mac-dot-red" aria-hidden />
          <span className="mac-dot mac-dot-yellow" aria-hidden />
          <span className="mac-dot mac-dot-green" aria-hidden />
        </div>
        <span className="mac-chrome-title mono">{p.name}</span>
        <div className="project-card-actions">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="project-card-link mono"
              aria-label={`${p.name} on GitHub`}
            >
              github
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="project-card-link mono"
              aria-label={`${p.name} live demo`}
            >
              demo&nbsp;↗
            </a>
          )}
        </div>
      </div>

      <div className="project-card-body">
        <p className="project-card-desc">{p.description}</p>

        {p.metric && (
          <span className="project-card-metric mono">{p.metric}</span>
        )}

        <div className="project-card-tags">
          {p.tags.map((tag) => (
            <span key={tag} className="skill-tag mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
