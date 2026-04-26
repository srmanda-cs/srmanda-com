import type { Profile } from "@/types";

type IconKey =
  | "github"
  | "linkedin"
  | "email"
  | "leetcode"
  | "zulip"
  | "staff_directory";

// Brand colors — applied as the icon's hover/idle tint so each one pops.
const BRAND: Record<IconKey, string> = {
  github: "#ffffff",
  linkedin: "#0a66c2",
  email: "#ea4335", // Gmail red
  leetcode: "#ffa116",
  zulip: "#329ea1",
  staff_directory: "#4b9cd3", // Carolina Blue (UNC)
};

const ICONS: Record<IconKey, React.ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46zM5.34 7.43A2.06 2.06 0 1 1 5.35 3.3a2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  // Multi-color Gmail envelope (red/yellow/green/blue)
  email: (
    <svg viewBox="0 0 24 18" width="20" height="15" aria-hidden>
      <path fill="#4285F4" d="M2 18h3.273V9.818L.6 6.327A2 2 0 0 0 0 7.745V16a2 2 0 0 0 2 2z" />
      <path fill="#34A853" d="M18.727 18H22a2 2 0 0 0 2-2V7.745a2 2 0 0 0-.6-1.418l-4.673 3.491V18z" />
      <path fill="#FBBC04" d="m18.727 2 .001 7.818L24 5.818V3a2 2 0 0 0-2-2h-3.273z" />
      <path fill="#EA4335" d="M5.273 9.818V2H2a2 2 0 0 0-2 2v1.818l5.273 4z" />
      <path fill="#C5221F" d="m5.273 9.818-.058-7.815L12 7.09l6.727-5.09.058 7.815L12 14.91z" opacity=".1" />
      <path fill="#EA4335" d="M5.273 2 12 7.09 18.727 2 12 7.09z" />
      <path fill="#FBBC04" d="m5.273 2 6.727 5.09V14.91L5.273 9.818z" />
      <path fill="#34A853" d="M18.727 2 12 7.09v7.82l6.727-5.092z" />
    </svg>
  ),
  leetcode: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 1.225 1.196c1.583 1.553 4.31 1.567 5.91 0l2.169-2.123c.661-.65.661-1.704 0-2.354a1.692 1.692 0 0 0-2.4 0l-2.158 2.116c-.595.583-1.66.583-2.255 0L7.86 16.65a1.659 1.659 0 0 1-.42-.6 1.595 1.595 0 0 1-.078-.281c-.08-.34-.06-.69.078-.997.07-.156.198-.355.378-.55l4.252-4.106 6.292-6.099a1.65 1.65 0 0 0 0-2.355A1.74 1.74 0 0 0 17.122 0H13.483zm-3.025 13.575a1.62 1.62 0 0 0-1.143.45 1.595 1.595 0 0 0-.467 1.131 1.598 1.598 0 0 0 .467 1.13 1.621 1.621 0 0 0 2.286 0l4.276-4.193a1.598 1.598 0 0 0 0-2.262 1.621 1.621 0 0 0-2.285 0l-3.134 3.094z" />
    </svg>
  ),
  zulip: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  staff_directory: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const ORDER: { key: IconKey; label: string; isMail?: boolean }[] = [
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "email", label: "Email", isMail: true },
  { key: "leetcode", label: "LeetCode" },
  { key: "staff_directory", label: "Staff Directory" },
  { key: "zulip", label: "Zulip" },
];

export default function SocialIcons({
  profile,
  size = "md",
  layout = "row",
  only,
}: {
  profile: Profile;
  size?: "sm" | "md" | "lg";
  layout?: "row" | "column";
  /** Restrict to specific channels (e.g. just real contact channels in the contact sidebar). */
  only?: IconKey[];
}) {
  const allowed = only ? new Set<IconKey>(only) : null;
  const links = ORDER.filter((entry) => !allowed || allowed.has(entry.key))
    .map((entry) => {
      const value = profile.social?.[entry.key];
      if (!value) return null;
      const href = entry.isMail ? `mailto:${value}` : value;
      const target = entry.isMail ? undefined : "_blank";
      return { ...entry, href, target, value, brand: BRAND[entry.key] };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  if (links.length === 0) return null;

  if (layout === "column") {
    return (
      <ul className="socials-column">
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={l.href}
              target={l.target}
              rel={l.target ? "noreferrer" : undefined}
              className="socials-row-link"
              style={{ "--brand": l.brand } as React.CSSProperties}
            >
              <span className="socials-row-icon" aria-hidden>
                {ICONS[l.key]}
              </span>
              <span className="socials-row-label mono">{l.label}</span>
              <span className="socials-row-arrow mono" aria-hidden>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`socials socials-${size}`}>
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target={l.target}
          rel={l.target ? "noreferrer" : undefined}
          className="social-icon"
          aria-label={l.label}
          title={l.label}
          style={{ "--brand": l.brand } as React.CSSProperties}
        >
          {ICONS[l.key]}
        </a>
      ))}
    </div>
  );
}
