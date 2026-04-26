"use client";

import type { Certification } from "@/types";
import SectionHeader from "./SectionHeader";
import { useTagHover, useObservedTags } from "./SkillsContext";

function inferTags(c: Certification): string[] {
  const text = `${c.name} ${c.short} ${c.issuer}`.toLowerCase();
  const tags: string[] = [];
  if (text.includes("terraform")) tags.push("Terraform", "HCL");
  if (text.includes("aws")) tags.push("AWS");
  if (text.includes("gcp") || text.includes("google cloud")) tags.push("GCP");
  if (
    text.includes("kubernetes") ||
    text.includes("cka") ||
    text.includes("ckad")
  )
    tags.push("Kubernetes");
  if (text.includes("hashicorp")) tags.push("Terraform");
  return Array.from(new Set(tags));
}

const HashiCorpLogo = (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden
    role="img"
  >
    <path d="M3.5 3 12 0l8.5 3v18L12 24l-8.5-3V3zm5.06 5.13v7.74h2.32v-3.36h2.24v3.36h2.32V8.13h-2.32v2.94h-2.24V8.13H8.56z" />
  </svg>
);

const AWSLogo = (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="currentColor"
    aria-hidden
    role="img"
  >
    <path d="M6.76 9.97c0 .39.04.7.12.93.08.23.19.48.34.75.05.08.07.16.07.23 0 .1-.06.2-.18.3l-.6.4c-.09.06-.18.09-.26.09-.1 0-.2-.05-.3-.14-.14-.15-.26-.31-.36-.47a7.27 7.27 0 0 1-.32-.6c-.74.88-1.68 1.31-2.81 1.31-.8 0-1.44-.23-1.91-.69-.47-.46-.71-1.07-.71-1.84 0-.81.29-1.47.87-1.96.58-.5 1.36-.74 2.34-.74.32 0 .65.03.99.08.34.05.69.13 1.06.21V7.4c0-.74-.15-1.26-.45-1.55-.31-.3-.84-.44-1.59-.44-.34 0-.69.04-1.05.13-.36.08-.71.19-1.05.32-.16.07-.27.11-.34.13-.07.02-.12.03-.16.03-.14 0-.21-.1-.21-.31v-.49c0-.16.02-.28.07-.36.05-.07.13-.14.26-.21.34-.18.75-.32 1.23-.44.48-.12.99-.18 1.52-.18 1.16 0 2 .26 2.54.79.53.53.8 1.33.8 2.41V9.97zM3.34 11.27c.32 0 .65-.06.99-.18.34-.12.65-.34.91-.64.16-.18.27-.39.33-.62.06-.23.1-.51.1-.84v-.4a7.55 7.55 0 0 0-1.7-.21c-.61 0-1.05.12-1.35.36-.3.24-.45.59-.45 1.05 0 .43.11.75.34.97.22.23.55.34.83.51zm6.78.91c-.18 0-.3-.03-.38-.1-.08-.06-.15-.2-.21-.39L7.62 4.65c-.06-.2-.09-.33-.09-.4 0-.16.08-.25.24-.25h.94c.19 0 .32.03.4.1.08.06.14.2.2.39l1.37 5.39 1.27-5.39c.05-.2.11-.33.19-.39.08-.07.22-.1.4-.1h.77c.19 0 .32.03.4.1.08.06.15.2.19.39l1.29 5.45 1.41-5.45c.06-.2.13-.33.2-.39.08-.07.21-.1.4-.1h.89c.16 0 .25.08.25.25 0 .05-.01.1-.02.16-.01.06-.03.14-.07.25l-1.97 6.3c-.06.2-.13.33-.21.39-.08.06-.21.1-.39.1h-.83c-.19 0-.32-.03-.4-.1-.08-.07-.15-.2-.19-.39l-1.27-5.25-1.26 5.24c-.05.2-.11.33-.19.39-.08.07-.22.1-.4.1h-.84zm10.89.27c-.5 0-1-.06-1.48-.18-.48-.12-.85-.25-1.1-.4-.15-.09-.25-.18-.29-.27-.04-.08-.06-.18-.06-.27v-.5c0-.21.08-.31.23-.31.06 0 .12.01.18.03.06.02.15.06.25.1.34.15.71.27 1.1.35.4.08.79.12 1.19.12.63 0 1.12-.11 1.46-.33.34-.22.52-.54.52-.95 0-.28-.09-.51-.27-.7-.18-.19-.52-.36-1.01-.52l-1.45-.45c-.73-.23-1.27-.57-1.6-1.02-.33-.44-.5-.93-.5-1.45 0-.42.09-.79.27-1.11.18-.32.42-.6.72-.82.3-.23.64-.4 1.04-.52.4-.12.82-.17 1.26-.17.22 0 .45.01.67.04.23.03.44.07.65.11.2.05.39.1.57.16.18.06.32.12.42.18.14.08.24.16.3.25.06.08.09.19.09.33v.46c0 .21-.08.32-.23.32-.08 0-.21-.04-.38-.12-.57-.26-1.21-.39-1.92-.39-.57 0-1.02.09-1.33.28-.31.19-.47.48-.47.88 0 .28.1.51.3.7.2.19.57.38 1.1.55l1.42.45c.72.23 1.24.55 1.55.96.31.41.46.88.46 1.4 0 .43-.09.82-.26 1.16-.18.34-.42.64-.73.88-.31.25-.68.43-1.11.56-.45.14-.92.21-1.43.21z" />
    <path d="M21.7 18.95c-2.71 2-6.65 3.06-10.04 3.06-4.75 0-9.04-1.76-12.27-4.69-.26-.23-.03-.55.27-.37 3.5 2.03 7.81 3.26 12.28 3.26 3.02 0 6.34-.63 9.4-1.91.45-.21.84.3.36.65zm.91-1.04c-.34-.44-2.27-.21-3.13-.1-.26.03-.3-.2-.07-.36 1.54-1.08 4.07-.77 4.36-.41.29.36-.08 2.89-1.52 4.1-.22.18-.43.08-.34-.16.32-.79 1.04-2.59.7-3.07z" />
  </svg>
);

function logoFor(c: Certification): React.ReactNode {
  const text = `${c.name} ${c.issuer}`.toLowerCase();
  if (text.includes("hashicorp") || text.includes("terraform"))
    return HashiCorpLogo;
  if (text.includes("aws")) return AWSLogo;
  return <span className="cert-card-emoji">{c.icon}</span>;
}

function logoTint(c: Certification): string | undefined {
  const text = `${c.name} ${c.issuer}`.toLowerCase();
  if (text.includes("hashicorp") || text.includes("terraform"))
    return "var(--aurora-violet)";
  if (text.includes("aws")) return "#ff9900";
  return undefined;
}

export default function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  if (!certifications || certifications.length === 0) return null;
  return (
    <section
      className="section"
      id="certifications"
      style={
        {
          "--section-accent": "var(--aurora-cyan)",
          "--section-accent-soft": "rgba(6, 182, 212, 0.22)",
        } as React.CSSProperties
      }
    >
      <SectionHeader number="04" label="certifications" tag="receipts" />

      <div className="cert-grid">
        {certifications.map((c) => (
          <CertCard key={c.short} c={c} />
        ))}
      </div>
    </section>
  );
}

function CertCard({ c }: { c: Certification }) {
  const tags = inferTags(c);
  const hover = useTagHover(tags);
  const observeRef = useObservedTags(tags, `cert:${c.short}`);
  const tint = logoTint(c);
  return (
    <div
      ref={observeRef as React.RefObject<HTMLDivElement>}
      className="card-glass cert-card"
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
    >
      <div
        className="cert-card-icon"
        style={tint ? { color: tint } : undefined}
        aria-hidden
      >
        {logoFor(c)}
      </div>
      <div className="cert-card-body">
        <div className="cert-card-meta">
          <span className="mono cert-card-short">{c.short}</span>
          <span className="mono cert-card-year">{c.year}</span>
        </div>
        <p className="cert-card-name">{c.name}</p>
        <p className="mono cert-card-issuer">{c.issuer}</p>
        {tags.length > 0 && (
          <div className="cert-card-tags">
            {tags.map((t) => (
              <span key={t} className="skill-tag mono">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
