import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ParallelTimeline from "@/components/ParallelTimeline";
import ProjectsSection from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import SideRail from "@/components/SideRail";
import SkillsRail from "@/components/SkillsRail";
import { SkillsProvider } from "@/components/SkillsContext";
import Reveal from "@/components/Reveal";
import {
  getProfile,
  getExperience,
  getProjects,
  getEducation,
  getImpact,
  getSkills,
  getStats,
  getCurrent,
} from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const experience = getExperience();
  const projects = getProjects();
  const education = getEducation();
  const impact = getImpact();
  const skills = getSkills();
  const stats = getStats();
  const current = getCurrent();

  return (
    <>
      <Nav profile={profile} />
      <Ticker phrases={impact.phrases} />

      <Hero profile={profile} stats={stats} current={current} />

      <SideRail />

      <SkillsProvider>
        <div className="work-layout">
          <main className="work-main">
            <Reveal>
              <About profile={profile} />
            </Reveal>

            {/* Mobile: stack/skills inline (rail is desktop-only sticky) */}
            <div className="work-rail-mobile">
              <SkillsRail skills={skills} />
            </div>

            <Reveal>
              <ParallelTimeline education={education} experience={experience} />
            </Reveal>
            <Reveal>
              <ProjectsSection projects={projects} />
            </Reveal>
            <Reveal>
              <Certifications certifications={education.certifications} />
            </Reveal>
          </main>

          <aside className="work-rail">
            <div className="work-rail-sticky">
              <SkillsRail skills={skills} />
            </div>
          </aside>
        </div>
      </SkillsProvider>

      <Reveal>
        <Contact profile={profile} />
      </Reveal>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-block">
            <span className="footer-label mono">built with</span>
            <span className="footer-value">
              Claude Code · VSCode · EndeavourOS
            </span>
          </div>
          <div className="footer-block">
            <span className="footer-label mono">stack</span>
            <span className="footer-value">
              Next · React · TypeScript · Tailwind · Motion
            </span>
          </div>
          <div className="footer-block">
            <span className="footer-label mono">hosted &amp; shipped</span>
            <span className="footer-value">
              source on GitHub · deployed on Cloudflare
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
