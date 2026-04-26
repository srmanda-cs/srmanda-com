"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "certifications", label: "certs" },
  { id: "contact", label: "contact" },
];

export default function SideRail() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibility = new Map<string, number>();

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visibility.set(entry.target.id, entry.intersectionRatio);
          }
          let best = SECTIONS[0].id;
          let bestRatio = 0;
          for (const [sid, ratio] of visibility.entries()) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sid;
            }
          }
          if (bestRatio > 0) setActive(best);
        },
        {
          threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
          rootMargin: "-30% 0px -40% 0px",
        }
      );
      o.observe(el);
      observers.push(o);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="side-rail" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`rail-item${active === s.id ? " is-active" : ""}`}
          onClick={() => handleClick(s.id)}
          aria-label={`Jump to ${s.label}`}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span className="rail-dot" />
          <span className="rail-label mono">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
