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
            description: "Urban.ai is a fun and interactive chatbot that bridges the gap between technology and street culture. Designed to engage users in a unique way, it responds to queries and conversations using the vibrant and dynamic language of urban slang.n",
            technologies: ["React", "TypeScript", "Tailwind"],
            content: {
              type: "video",
              src: `/api/video?url=${encodeURIComponent("https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/urban.v3/3.0.0/URBAN-2.mp4")}`,
            },
            links: {
              demo: "https://urbanai.info",
              github: "https://github.com/vintvgx/URBAN.ai.njs",
            },
            date: "12/2024",
            isLatest: true
          },
          "1.0.0": {
            title: "Urban AI v2",
            description:
              "Welcome to Urban.ai, an innovative chatbot designed to bring you a unique conversational experience! Powered by ChatGPT-4 Turbo, our chatbot not only provides accurate and coherent responses but also incorporates phrases and slang from Urban Dictionary to keep the conversation lively and contemporary.",
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
          "A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by prioritizing user content and experience. ",
        name: "Collections",
        versions: {
          "2.0.6": {
            title: "COLLECTIONS",
            description:
              "A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by prioritizing user content and experience. ",
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
                src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/COLLECTIONS/1.0.6/Collections.mp4')}`,
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
              "A full-stack multimedia social application curated and designed for art enthusiasts. Collections reimagines social media by prioritizing user content and experience. ",
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
              "SCOUT is a React Native application designed to track issues and errors for your projects using the Sentry API. This app provides real-time error tracking through notifications and integrates with ipGeolocation to display the location of IP addresses for each event. Additionally, it utilizes MapView from react-native-maps to visualize these geolocations, helping you gain insights into user engagement and application performance.",
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
              src:`/api/video?url=${encodeURIComponent('https://comm-port-bucket.s3.us-east-1.amazonaws.com/studio.cloud/video/port.25/3.0.0/SCOUT/1.3.8/SCOUT.mp4')}`,
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
