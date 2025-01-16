import { ProjectConfig } from '@/components/ProjectCard';

export const projects: ProjectConfig[] = [
  {
    id: 'project1',
    title: 'Project 1',
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