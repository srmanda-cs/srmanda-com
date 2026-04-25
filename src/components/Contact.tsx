import type { Profile } from "@/types";

export default function Contact({ profile }: { profile: Profile }) {
  return (
    <section
      className="section"
      id="contact"
      style={{ paddingBottom: "100px" }}
    >
      <div
        style={{
          borderTop: "1px solid var(--b1)",
          paddingTop: "64px",
        }}
      >
        <p
          className="mono"
          style={{
            fontSize: "11px",
            color: "var(--t3)",
            textTransform: "uppercase",
            letterSpacing: "2.5px",
            marginBottom: "20px",
          }}
        >
          contact
        </p>

        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700,
            color: "var(--t1)",
            letterSpacing: "-1.5px",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          {"Let's build something "}
          <span
            style={{
              background: "linear-gradient(90deg, var(--accent), #38bdf8)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            remarkable.
          </span>
        </h2>

        <p
          style={{
            fontSize: "17px",
            color: "var(--t2)",
            lineHeight: 1.7,
            maxWidth: "440px",
            marginBottom: "32px",
          }}
        >
          Open to new roles, collaborations, and interesting problems.
          {profile.company && ` Currently at ${profile.company}.`}
        </p>

        {profile.social?.email && (
          <a
            href={`mailto:${profile.social.email}`}
            className="mono"
            style={{
              display: "inline-block",
              fontSize: "15px",
              color: "var(--t1)",
              textDecoration: "none",
              border: "1px solid var(--b2)",
              padding: "12px 28px",
              marginBottom: "24px",
              transition: "border-color 0.15s",
            }}
          >
            → {profile.social.email}
          </a>
        )}

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
        </div>
      </div>
    </section>
  );
}

function SLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mono"
      style={{
        fontSize: "12px",
        color: "var(--t3)",
        textDecoration: "none",
        border: "1px solid var(--b1)",
        padding: "5px 12px",
      }}
    >
      {label}
    </a>
  );
}
