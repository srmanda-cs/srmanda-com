import type { Profile } from "@/types";
import SectionHeader from "./SectionHeader";
import MagneticButton from "./MagneticButton";
import ContactForm from "./ContactForm";
import SocialIcons from "./SocialIcons";

export default function Contact({ profile }: { profile: Profile }) {
  const email = profile.social?.email;
  return (
    <section
      className="section contact-section"
      id="contact"
      style={
        {
          "--section-accent": "var(--aurora-violet)",
          "--section-accent-soft": "rgba(225, 29, 72, 0.22)",
        } as React.CSSProperties
      }
    >
      <div className="contact-wash" aria-hidden />

      <SectionHeader number="05" label="contact" tag="get in touch" />

      <h2 className="contact-headline">
        {"Let's build something "}
        <span className="contact-headline-gradient">remarkable.</span>
      </h2>

      <p className="contact-lede">
        Open to new roles, collaborations, and interesting problems.
        {profile.company && ` Currently at ${profile.company}.`} The fastest
        way to reach me is the form below — it lands directly in my inbox.
      </p>

      <div className="contact-grid">
        <div className="contact-form-wrap">
          {email ? (
            <ContactForm toEmail={email} />
          ) : (
            <p className="mono" style={{ color: "var(--t3)", fontSize: "12px" }}>
              email not configured
            </p>
          )}
        </div>

        <aside className="contact-sidebar">
          <div className="contact-sidebar-block">
            <p className="mono contact-sidebar-label">or, direct</p>
            {email && (
              <MagneticButton href={`mailto:${email}`}>
                <span style={{ color: "var(--t1)" }}>{email}</span>
                <span className="magnetic-arrow" aria-hidden>
                  →
                </span>
              </MagneticButton>
            )}
          </div>

          <div className="contact-sidebar-block contact-sidebar-block-grow">
            <p className="mono contact-sidebar-label">find me elsewhere</p>
            <SocialIcons
              profile={profile}
              layout="column"
              only={["github", "linkedin", "zulip"]}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
