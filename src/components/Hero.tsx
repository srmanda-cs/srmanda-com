import type { Profile } from "@/types";

const NAME_STYLE: React.CSSProperties = {
  fontSize: "clamp(64px, 12vw, 96px)",
  fontWeight: 700,
  letterSpacing: "-3px",
  lineHeight: 0.95,
  display: "inline-block",
};

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero" id="about">
      {/* Label */}
      <p
        className="mono"
        style={{
          fontSize: "11px",
          color: "var(--t3)",
          textTransform: "uppercase",
          letterSpacing: "2.5px",
          marginBottom: "24px",
        }}
      >
        {profile.title} &middot; {profile.company}
      </p>

      {/* Name — large, glitch effect on last name */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ ...NAME_STYLE, color: "var(--t1)", display: "block" }}>
          {profile.first_name}
        </div>
        <div className="glitch-wrap" style={{ display: "block" }}>
          <span
            className="glitch-base"
            style={{
              ...NAME_STYLE,
              background: "linear-gradient(90deg, var(--accent), #38bdf8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {profile.last_name}
          </span>
          <span
            className="glitch-shard glitch-shard-a"
            aria-hidden
            style={NAME_STYLE}
          >
            {profile.last_name}
          </span>
          <span
            className="glitch-shard glitch-shard-b"
            aria-hidden
            style={NAME_STYLE}
          >
            {profile.last_name}
          </span>
          <span
            className="glitch-shard glitch-shard-c"
            aria-hidden
            style={NAME_STYLE}
          >
            {profile.last_name}
          </span>
        </div>
      </div>

      {/* One-liner tagline — punchy, not a paragraph */}
      <p
        style={{
          fontSize: "20px",
          color: "var(--t2)",
          lineHeight: 1.5,
          maxWidth: "480px",
          marginBottom: "40px",
          fontWeight: 400,
        }}
      >
        Building the infrastructure that lets teams ship fearlessly.
      </p>

      {/* Status pill + CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {profile.status && (
          <div
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              color: "var(--live)",
              background: "var(--live-soft)",
              border: "1px solid var(--live-border)",
              padding: "4px 10px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--live)",
                animation: "pulse-live 2s infinite",
              }}
            />
            {profile.status}
          </div>
        )}
        <a
          href="#experience"
          className="mono"
          style={{
            fontSize: "12px",
            color: "var(--t3)",
            textDecoration: "none",
            letterSpacing: "0.3px",
          }}
        >
          scroll to explore ↓
        </a>
      </div>
    </section>
  );
}
