export interface ProjectVersion {
  title: string;
  description: string;
  technologies: string[];
  content: {
    type: 'text' | 'image' | 'video';
    text?: string;
    src?: string;
  };
  links?: {
    demo?: string;
    github?: string;
  };
  date: string;
  isLatest?: boolean;
}

export interface Project {
  id: string;
  name: string;
  currentVersion?: string;
  category: string;
  versions: {
    [version: string]: ProjectVersion;
  };
}

export interface CareerItem {
  name: string;
  description: string;
  category: string;
  content: {
    type: 'text' | 'image';
    text?: string;
    src?: string;
  };
}

export interface InfoItem {
  name: string;
  description: string;
  category: string;
  content: {
    type: 'text' | 'image';
    text?: string;
    src?: string;
  };
}

export interface NavItem {
  category: 'PROJECTS' | 'CAREER' | 'INFO';
  items: (Project | CareerItem | InfoItem)[];
}

// Add other necessary types...
