import { Theme } from "@/lib/theme";

export type { Theme };

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  year: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  color: string;
}

export interface TechLogo {
  name: string;
  color: string;
  bg: string;
}
