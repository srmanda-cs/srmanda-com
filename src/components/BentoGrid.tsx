import type { Profile, Stats, CurrentProject, StatItem } from "@/types";

const statColor: Record<StatItem["color"], string> = {
  green: "var(--green)",
  purple: "var(--accent)",
  cyan: "var(--teal)",
  white: "var(--text-primary)",
};

export default function BentoGrid({
  profile,
  stats,
  current,
}: {
  profile: Profile;
  stats: Stats;
  current: CurrentProject;
}) {
  return (
    <section
      id="about-bento"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}
    >
      <div className="bento-grid">
        {/* Bio + Socials — spans 7 cols on desktop */}
        <div
          className="card"
          style={{
            gridColumn: "span 7",
            padding: "22px",
            background:
              "linear-gradient(135deg, var(--accent-dim) 0%, var(--teal-dim) 100%)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
            }}
          >
            {profile.bio}
          </p>

          {/* Socials — only show if non-empty */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {profile.social?.github && (
              <SLink href={profile.social.github} label="GitHub" />
            )}
            {profile.social?.linkedin && (
              <SLink href={profile.social.linkedin} label="LinkedIn" />
            )}
            {profile.social?.staff_directory && (
              <SLink
                href={profile.social.staff_directory}
                label="Staff Directory"
              />
            )}
            {profile.social?.leetcode && (
              <SLink href={profile.social.leetcode} label="LeetCode" />
            )}
            {profile.social?.zulip && (
              <SLink href={profile.social.zulip} label="Zulip" />
            )}
            {profile.social?.email && (
              <SLink
                href={`mailto:${profile.social.email}`}
                label={profile.social.email}
                primary
              />
            )}
          </div>
        </div>

        {/* System Status — 5 cols */}
        <div
          className="card"
          style={{
            gridColumn: "span 5",
            padding: "20px",
            background: "var(--bg2)",
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: "10px",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}
          >
            system.status
          </div>
          {[
            {
              key: "location",
              val: profile.location,
              color: "var(--text-primary)",
            },
            { key: "role", val: profile.title, color: "var(--text-secondary)" },
            { key: "company", val: profile.company, color: "var(--teal)" },
            { key: "hire_status", val: profile.status, color: "var(--green)" },
            {
              key: "response_time",
              val: "< 24h",
              color: "var(--text-secondary)",
            },
          ].map((row) => (
            <div
              key={row.key}
              className="mono"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "var(--text-tertiary)" }}>{row.key}</span>
              <span style={{ color: row.color, fontWeight: 700 }}>
                {row.val}
              </span>
            </div>
          ))}
        </div>

        {/* Stats 2×2 — 4 cols */}
        <div
          style={{
            gridColumn: "span 4",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "var(--border)",
            overflow: "hidden",
          }}
        >
          {stats.items.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--bg2)",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                  color: statColor[stat.color],
                }}
              >
                {stat.value}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: "10px",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Shipping — 8 cols */}
        <div
          className="card"
          style={{
            gridColumn: "span 8",
            padding: "20px",
            background:
              "linear-gradient(135deg, var(--green-dim) 0%, transparent 60%)",
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: "10px",
              color: "var(--green)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                background: "var(--green)",
                borderRadius: "50%",
                boxShadow: "0 0 5px var(--green)",
                animation: "pulse-status 1.5s infinite",
                flexShrink: 0,
              }}
            />
            currently shipping
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "6px",
            }}
          >
            {current.title}
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "14px",
            }}
          >
            {current.description}
          </p>
          <div
            style={{
              height: "3px",
              background: "var(--border)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${current.progress}%`,
                background: "linear-gradient(90deg, var(--green), var(--teal))",
                animation: "progress-shine 2s ease-in-out infinite",
              }}
            />
          </div>
          <div
            className="mono"
            style={{
              fontSize: "11px",
              color: "var(--text-tertiary)",
              marginTop: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>progress</span>
            <span style={{ color: "var(--green)" }}>{current.progress}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SLink({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      className="mono"
      style={{
        fontSize: "12px",
        padding: "5px 12px",
        border: primary
          ? "1px solid var(--accent-border)"
          : "1px solid var(--border-active)",
        color: primary ? "var(--accent)" : "var(--text-tertiary)",
        textDecoration: "none",
        background: primary ? "var(--accent-dim)" : "transparent",
        fontWeight: primary ? 700 : 400,
      }}
    >
      {label}
    </a>
  );
}
