import { ProjectConfig } from "@/types/Project";
// import COLLECTIONS from "https://comm-port-bucket.s3.us-east-1.amazonaws.com/1.0.6/Collections.mp4";

export const projects: ProjectConfig[] = [
  {
    id: 'urbanv3',
    title: 'Urban AI',
    description: 'An innovative web application',
    backgroundColor: 'bg-blue-500',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    links: {
      demo: 'https://demo.project1.com',
      github: 'https://github.com/username/project1'
    }
  },
  {
    id: 'project2',
    title: 'Project 2',
    description: 'A revolutionary mobile app',
    backgroundColor: 'bg-green-500',
    technologies: ['React Native', 'Firebase', 'Redux'],
    contentVideo: `/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/COLLECTIONS/1.0.6/Collections.mp4')}`,
    links: {
      live: 'https://project2.com'
    }
  },
  {
    id: 'project3',
    title: 'Project 3',
    description: 'An AI-powered data analysis tool',
    backgroundColor: 'bg-purple-500',
    technologies: ['Python', 'TensorFlow', 'FastAPI'],
    links: {
      github: 'https://github.com/username/project3',
      demo: 'https://demo.project3.com'
    }
  }
]; 