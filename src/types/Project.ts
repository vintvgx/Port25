import { Asset } from "next-video/dist/assets.js";

export interface ProjectConfig {
    id: string;
    title: string;
    description: string;
    backgroundColor?: string;
    technologies?: string[];
    contentVideo?: string | Asset;
    links?: {
      demo?: string;
      github?: string;
      live?: string;
    };
  }