import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceSection from "@/components/Experience";
import ProjectsSection from "@/components/Projects";
import EducationSection from "@/components/Education";
import Contact from "@/components/Contact";
import {
  getProfile,
  getExperience,
  getProjects,
  getEducation,
  getImpact,
} from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const experience = getExperience();
  const projects = getProjects();
  const education = getEducation();
  const impact = getImpact();

  return (
    <>
      <Nav profile={profile} />
      <Ticker phrases={impact.phrases} />
      <Hero profile={profile} />

      <main>
        <About profile={profile} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} />
        <Contact profile={profile} />
      </main>

      <footer
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "24px var(--page-pad)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--b1)",
        }}
      >
        <span className="mono" style={{ fontSize: "11px", color: "var(--t3)" }}>
          {profile.name} · {new Date().getFullYear()}
        </span>
        <span className="mono" style={{ fontSize: "11px", color: "var(--t3)" }}>
          next.js + yaml
        </span>
      </footer>
    </>
  );
}
