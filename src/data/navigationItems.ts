import { NavItem } from "@/types/content";

export const navigationItems: NavItem[] = [
  {
    category: "PROJECTS",
    items: [
      {
        id: "urban",
        name: "Urban AI",
        currentVersion: "2.0.0",
        category: "project",
        versions: {
          "2.0.0": {
            title: "Urban AI",
            description: "Urban.ai is an interactive chatbot that bridges the gap between technology and street culture. Designed to engage users in a unique way, it responds to queries and conversations using the dynamic language of urban slang.",
            technologies: ["React", "Open AI", "MongoDB", "TypeScript", "Tailwind", "Next JS"],
            content: {
              type: "video",
              src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.legacy/2.0.0/URBAN-16.9.mp4')}`,
              mobileSrc:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.legacy/2.0.0/URBAN-9.16.mp4')}`,            },
            links: {
              demo: "https://urbanai.info",
              github: "https://github.com/vintvgx/URBAN.ai.njs",
            },
            date: "12/2024",
            version: "2.0.0",
            isLatest: true
          },
          "1.0.0": {
            title: "Urban AI ",
            description: "Urban.ai is an interactive chatbot that bridges the gap between technology and street culture using Chat-GPT4. Designed to engage users in a unique way, it responds to queries and conversations using the dynamic language of urban slang.",
            technologies: [
              "React",
              "Typescript",
              "ExpressJS",
              "MongoDB",
              "NodeJS",
              "Gpt-4",
              "Docker",
            ],
            content: {
                type: "video",
                src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.legacy/2.0.0/URBAN_LEGACY_1.mp4')}`,
              },
            links: {
              demo: "https://urbanai.info",
              github: "https://github.com/vintvgx/Urban.ai",
            },
            version: "1.0.0",
            date: "09/2022"
          },
        },
      },
      {
        id: "collectionsv2",
        //todo update version of collectionsv2 to 2.0.6 in project
        currentVersion: "2.0.6",
        category: "project",
        description:
          "A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by prioritizing user content and cultivating a seamless user experience. ",
        name: "Collections",
        versions: {
          "2.0.6": {
            title: "COLLECTIONS",
            description:
              "A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by  prioritizing user content and cultivating a seamless user experience. ",
            technologies: [
              "React Native",
              "Typescript",
              "Django",
              "Railway",
              "Expo",
              "Heroku",
              "AWS ( S3 / Cloudfront / Elastic Beanstalk)",
            ],
            content: {
                type: "video",
                src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/COLLECTIONS/1.0.6/COLLECTIONS-16.9-2025+.mp4')}`,
                mobileSrc: `/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/COLLECTIONS/1.0.6/COLLECTIONS-9.16-2025.mp4')}`
              },
            links: {
                github: "https://github.com/vintvgx"
            },
            date: "08/2024",
            isLatest: true
          },
          "1.0.0": {
            title: "COLLECTIONS",
            description:
              "A multimedia social application curated and designed for art enthusiasts implemented by utilizing React Native and Google Firebase. Collections reimagines social media by prioritizing user content.",
            technologies: [
              "React Native",
              "Typescript",
              "Firebase"
            ],
            content: {
                type: "video",
                src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/COLLECTIONS/1.0.0/1Collections.mp4')}`,
              },
            links: {
                github: "https://github.com/vintvgx"
            },
            date: '02/2023'
          },
        },
      },
      {
        name: "Scout",
        id: "scoutv1",
        //todo update version of scout
        currentVersion: "1.3.8",
        category: "project",
        description:
          "SCOUT is a React Native application designed to track issues and errors for your projects using the Sentry API. This app provides real-time error tracking through notifications and integrates with ipGeolocation to display the location of IP addresses for each event. Additionally, it utilizes MapView from react-native-maps to visualize these geolocations, helping you gain insights into user engagement and application performance.",
        content: {
          type: "text",
          text: "Collection of insights and learnings...",
        },
        versions: {
          "1.3.8": {
            title: "SCOUT",
            description:
              "SCOUT is a React Native application designed to track issues and errors for development projects using the Sentry API. This app provides real-time error tracking through notifications and integrates ipGeolocation to display the location of IP addresses for each event. Additionally, it utilizes MapView from react-native-maps to visualize these geolocations, helping you gain insights into user engagement and application performance.",
            technologies: [
              "React Native",
              "Typescript",
              "Expo",
              "Redux Toolkit",
              "Firebase",
              "Sentry API",
              "ipGeolocation",
            ],
            content: {
              type: "video",
              src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/SCOUT/1.3.8/SCOUT-16.9.mp4')}`,
              mobileSrc:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/SCOUT/1.3.8/SCOUT-9.16.mp4')}`,
            },
            links: {
                github: 'https://github.com/vintvgx/SCOUT',
            },
            date: "03/2024",
            isLatest: true
          },
        },
      },
    ],
  },
  {
    category: "CAREER",
    items: [
      {
        name: "DEKA R&D",
        description: "Deka Reserach & Development: Kotlin Software Engineer",
        category: "career",
        content: {
          type: "text",
          src: "I am software engineer for DEKA RESEARCH & DEVELOPMENT. I developed and thoroughly tested the Remodulin application.",
        },
      },
    ],
  },
  {
    category: "INFO",
    items: [
      {
        // TODO add a form to send an email
        name: "Contact",
        description: "Get in touch",
        category: "info",
        content: {
          type: "text",
          text: "Contact information and form...",
        },
      },
      {
        name: "About",
        description: "Update About Me section",
        category: "info",
        content: {
          type: "text",
          text: "Links to social media profiles...",
        },
      },
    ],
  },
];
