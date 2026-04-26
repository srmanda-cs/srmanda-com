export interface Social {
  github?: string;
  linkedin?: string;
  staff_directory?: string;
  leetcode?: string;
  zulip?: string;
  email?: string;
}

export interface Profile {
  name: string;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  company_full: string;
  location: string;
  timezone: string;
  status: string;
  bio: string;
  social: Social;
}

export interface StatItem {
  value: string;
  label: string;
  color: "green" | "purple" | "cyan" | "white";
}

export interface Stats {
  items: StatItem[];
}

export interface CurrentProject {
  title: string;
  description: string;
  progress: number;
  status: string;
}

export interface SkillGroup {
  label: string;
  color: "green" | "purple" | "cyan" | "white";
  items: string[];
}

export interface Skills {
  groups: SkillGroup[];
  ticker: string[];
}

export interface Role {
  company: string;
  company_full: string;
  title: string;
  location: string;
  start: number;
  end: string | number;
  current: boolean;
  bullets: string[];
  tags: string[];
}

export interface Experience {
  roles: Role[];
}

export interface Project {
  name: string;
  description: string;
  metric?: string;
  github?: string;
  demo?: string;
  tags: string[];
}

export interface Projects {
  featured: Project[];
}

export interface Degree {
  school: string;
  short: string;
  degree: string;
  field: string;
  start: number;
  end: string | number;
  current: boolean;
}

export interface Certification {
  name: string;
  short: string;
  issuer: string;
  icon: string;
  year: number;
}

export interface Education {
  degrees: Degree[];
  certifications: Certification[];
}

export interface Impact {
  phrases: string[];
}
