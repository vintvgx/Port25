import { NavItem } from '@/types/content';

export const navigationItems: NavItem[] = [
  {
    category: "PROJECTS",
    items: [
      { 
        id: 'urbanv3',
        version: '3.0.0',
        title: 'Urban AI v3',
        description: 'An innovative web application',
        technologies: ['React', 'TypeScript', 'Tailwind'],
        name: "Urban AI", 
        content: {
          type: 'text',
          text: 'Detailed case studies of our most impactful projects...'
        },
        links: {
            demo: 'https://demo.project1.com',
            github: 'https://github.com/username/project1'
          }
      },
      { 
        id: 'urbanv2',
        version: '2.0.0',
        title: 'Urban AI v2',
        description: 'An innovative web application',
        technologies: ['React', 'TypeScript', 'Tailwind'],
        name: "Urban AI v2", 
        content: {
          type: 'text',
          text: 'Detailed case studies of our most impactful projects...'
        },
        links: {
            demo: 'https://demo.project1.com',
            github: 'https://github.com/username/project1'
          }
      },
      { 
        id: 'collectionsv2',
        //todo update version of collectionsv2 to 2.0.6 in project 
        version: '2.0.6',
        title: 'COLLECTIONS v2',
        description: 'A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by prioritizing user content and experience. ',
        name: "Collections v2", 
        technologies: ['React Native', 'Typescript', 'Django', 'Railway', 'Expo', 'Heroku', 'AWS ( S3 / Cloudfront / Elastic Beanstalk)'],
        content: {
          type: 'image',
          src: '/images/playground.jpg'
        }
      },
      { 
        name: "Notes", 
        description: "Thoughts and documentation",
        content: {
          type: 'text',
          text: 'Collection of insights and learnings...'
        }
      },
    ],
  },
  {
    category: "CAREER",
    items: [
      { 
        name: "Past", 
        description: "Previous work experience",
        content: {
          type: 'text',
          text: 'Timeline of professional experience...'
        }
      },
      { 
        name: "Now", 
        description: "Current projects and focus",
        content: {
          type: 'video',
          src: '/videos/current-work.mp4'
        }
      },
    ],
  },
  {
    category: "INFO",
    items: [
      { 
        name: "Contact", 
        description: "Get in touch",
        content: {
          type: 'text',
          text: 'Contact information and form...'
        }
      },
      { 
        name: "Socials", 
        description: "Connect on social media",
        content: {
          type: 'text',
          text: 'Links to social media profiles...'
        }
      },
    ],
  },
]; 