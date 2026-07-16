export interface EducationItem {
  year: string;
  school: string;
  major?: string;
  details?: string;
}

export interface WorkExperienceItem {
  period: string;
  company: string;
  role: string;
  details: string[];
  techStack?: string[];
  type: string; // Contract, Outsourcing, Internship, etc.
}

export interface SkillItem {
  name: string;
  score: number; // 0 to 100
  color: string;
}

export interface ProjectItem {
  title: string;
  image: string;
  linked: string;
  description: string;
  category: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
