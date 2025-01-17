export interface ProjectConfig {
    id: string;
    title: string;
    description: string;
    backgroundColor?: string;
    technologies?: string[];
    contentVideo?: string;
    links?: {
      demo?: string;
      github?: string;
      live?: string;
    };
  }