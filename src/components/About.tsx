import type { Profile } from "@/types";

export default function About({ profile }: { profile: Profile }) {
  const socials = Object.entries(profile.social || {}).filter(([, v]) => v);

  return (
    <section className="section" id="about-detail">
      <div className="section-label">
        <span className="section-label-text mono">about</span>
        <div className="section-label-line" />
      </div>

      <p
        style={{
          fontSize: "18px",
          color: "var(--t2)",
          lineHeight: 1.75,
          marginBottom: "28px",
          maxWidth: "600px",
        }}
      >
        {profile.bio}
      </p>

      {socials.length > 0 && (
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
              accent
            />
          )}
        </div>
      )}
    </section>
  );
}

function SLink({
  href,
  label,
  accent,
}: {
  href: string;
  label: string;
  accent?: boolean;
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
        border: accent
          ? "1px solid var(--accent-border)"
          : "1px solid var(--b1)",
        color: accent ? "var(--accent)" : "var(--t3)",
        textDecoration: "none",
        background: accent ? "var(--accent-soft)" : "transparent",
        fontWeight: accent ? 700 : 400,
      }}
    >
      {label}
    </a>
  );
}
