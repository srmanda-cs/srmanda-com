/**
 * Data layer — imports JSON files at build time.
 * No `fs`, no `js-yaml`, works in Cloudflare Workers.
 * To update content, edit the files in src/data/*.json
 */
import type {
  Profile,
  Stats,
  CurrentProject,
  Skills,
  Experience,
  Projects,
  Education,
  Impact,
} from "@/types";

import profileData from "@/data/profile.json";
import statsData from "@/data/stats.json";
import currentData from "@/data/current.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import educationData from "@/data/education.json";
import impactData from "@/data/impact.json";

export const getProfile = (): Profile => profileData as Profile;
export const getStats = (): Stats => statsData as Stats;
export const getCurrent = (): CurrentProject => currentData as CurrentProject;
export const getSkills = (): Skills => skillsData as Skills;
export const getExperience = (): Experience => experienceData as Experience;
export const getProjects = (): Projects => projectsData as Projects;
export const getEducation = (): Education => educationData as Education;
export const getImpact = (): Impact => impactData as Impact;
