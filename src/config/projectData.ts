import { ProjectConfig } from "@/types/Project";
// import COLLECTIONS from "https://comm-port-bucket.s3.us-east-1.amazonaws.com/1.0.6/Collections.mp4";
// https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.legacy/2.0.0/URBAN_LEGACY_1.mp4

export const projects: ProjectConfig[] = [
  {
    id: 'urbanv3',
    title: 'Urban AI',
    description: 'An innovative web application',
    backgroundColor: 'bg-black',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    contentVideo: `/api/video?url=${encodeURIComponent("https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.v3/3.0.0/URBAN-2.mp4")}`,
    links: {
      demo: 'https://demo.project1.com',
      github: 'https://github.com/username/project1'
    }
  },
  {
    id: 'collections',
    version: '1.0.6',
    title: 'COLLECTIONS',
    description: 'A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by prioritizing user content and experience. ',
    backgroundColor: 'bg-green-500',
    technologies: ['React Native', 'Typescript', 'Django', 'Railway', 'Expo', 'Heroku', 'AWS ( S3 / Cloudfront / Elastic Beanstalk)'],
    contentVideo: `/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/COLLECTIONS/1.0.6/Collections.mp4')}`,
    links: {
      live: 'https://project2.com'
    }
  },
  {
    id: 'urban-legacy',
    version: '2.0.0',
    title: 'URBAN AI',
    description: 'Welcome to Urban.ai, an innovative chatbot designed to bring you a unique conversational experience! Powered by ChatGPT-4 Turbo, our chatbot not only provides accurate and coherent responses but also incorporates phrases and slang from Urban Dictionary to keep the conversation lively and contemporary.',
    backgroundColor: 'bg-purple-500',
    technologies: ['React', 'Typescript', 'ExpressJS', 'MongoDB', 'NodeJS', 'Gpt-4', 'Docker'],
    contentVideo: `/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.legacy/2.0.0/URBAN_LEGACY_1.mp4')}`,
    links: {
      github: 'https://github.com/username/project3',
      demo: 'https://demo.project3.com'
    }
  }
]; 