import { NavItem } from "@/types/content";

export const navigationItems: NavItem[] = [
  {
    category: "PROJECTS",
    items: [
      {
        id: "urban",
        name: "Urban AI",
        currentVersion: "3.0.0",
        category: "project",
        versions: {
          "3.0.0": {
            title: "Urban AI v3",
            description: "An innovative web application",
            technologies: ["React", "TypeScript", "Tailwind"],
            content: {
              type: "text",
              text: "Detailed case studies of our most impactful projects...",
            },
            links: {
              demo: "https://demo.project1.com",
              github: "https://github.com/username/project1",
            },
          },
          "2.0.0": {
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
              type: "text",
              text: "Detailed case studies of our most impactful projects...",
            },
            links: {
              demo: "https://demo.project1.com",
              github: "https://github.com/username/project1",
            },
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
        name: "Collections v2",
        content: {
          type: "image",
          src: "/images/playground.jpg",
        },
        versions: {
          "2.0.6": {
            title: "COLLECTIONS v2",
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
              type: "image",
              src: "/images/playground.jpg",
            },
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
              type: "text",
              text: "Collection of insights and learnings...",
            },
          },
        },
      },
    ],
  },
  {
    category: "CAREER",
    items: [
      {
        name: "Now",
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
