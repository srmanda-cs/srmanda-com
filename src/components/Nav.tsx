"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/types";

const LINKS = [
  { href: "#about-detail", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#certifications", label: "certs" },
  { href: "#contact", label: "contact" },
];

export default function Nav({ profile }: { profile: Profile }) {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${shrunk ? " nav-shrunk" : ""}`}>
      <div className="nav-inner">
        <a href="#about" className="nav-logo mono">
          <span className="nav-logo-dot" aria-hidden />
          <span className="nav-logo-name">{profile.first_name.toLowerCase()}</span>
          <span className="nav-logo-sep" aria-hidden>/</span>
          <span className="nav-logo-role">{profile.title.toLowerCase()}</span>
        </a>

        <div className="nav-cluster">
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link mono">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-cta mono" aria-label="Hire me — jump to contact">
            <span aria-hidden>→</span>
            <span>hire me</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
