import fs from "fs";
import path from "path";
import yaml from "js-yaml";
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

function loadYaml<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "src", "data", filename);
  const contents = fs.readFileSync(filePath, "utf8");
  return yaml.load(contents) as T;
}

export const getProfile = (): Profile => loadYaml<Profile>("profile.yaml");
export const getStats = (): Stats => loadYaml<Stats>("stats.yaml");
export const getCurrent = (): CurrentProject =>
  loadYaml<CurrentProject>("current.yaml");
export const getSkills = (): Skills => loadYaml<Skills>("skills.yaml");
export const getExperience = (): Experience =>
  loadYaml<Experience>("experience.yaml");
export const getProjects = (): Projects => loadYaml<Projects>("projects.yaml");
export const getEducation = (): Education =>
  loadYaml<Education>("education.yaml");
export const getImpact = (): Impact => loadYaml<Impact>("impact.yaml");
