import type { Profile } from "@/types";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export default function Nav({ profile }: { profile: Profile }) {
  return (
    <nav className="nav">
      <div
        className="page-col"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "16px",
        }}
      >
        <a
          href="#about"
          className="mono"
          style={{
            fontSize: "13px",
            color: "var(--live)",
            textDecoration: "none",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--live)",
              boxShadow: "0 0 0 3px var(--live-soft)",
              animation: "live-pulse 2.5s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          {profile.first_name.toLowerCase()}
        </a>

        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
            flexWrap: "wrap",
          }}
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mono"
                style={{
                  color: "var(--t3)",
                  textDecoration: "none",
                  fontSize: "12px",
                  letterSpacing: "0.3px",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="mono"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--bg)",
            background: "var(--live)",
            padding: "6px 14px",
            textDecoration: "none",
            flexShrink: 0,
            letterSpacing: "0.2px",
          }}
        >
          hire me
        </a>
      </div>
    </nav>
  );
}
