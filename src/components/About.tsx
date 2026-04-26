import type { Profile } from "@/types";
import SectionHeader from "./SectionHeader";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section
      className="section"
      id="about-detail"
      style={
        {
          "--section-accent": "var(--aurora-green)",
          "--section-accent-soft": "rgba(34, 197, 94, 0.18)",
        } as React.CSSProperties
      }
    >
      <SectionHeader number="01" label="about" tag="who i am" />

      <p className="about-bio">{profile.bio}</p>
    </section>
  );
}
