/**
 * portfolioData.js
 * Single source of truth for all portfolio content.
 * Both the real portfolio and the MiniPortfolio inside the 3D workspace
 * reference this file, so a single edit propagates everywhere.
 */

import {
  SiJavascript, SiTypescript, SiReact, SiTailwindcss, SiNodedotjs, SiExpress,
  SiPython, SiFastapi, SiDjango, SiMysql, SiMongodb, SiPhp, SiGoogle, SiGit, SiPostman
} from "react-icons/si";
import { FaJava, FaCuttlefish, FaProjectDiagram, FaTerminal } from "react-icons/fa";

export const HERO = {
  name: "Shrivardhan Mohite",
  subtitle: "LLM Systems • AI Architecture • Backend Engineering",
  heading: ["Building", "Intelligent", "Systems"],
  description: "CS engineer passionate about scalable backend systems, RAG, and production-ready LLM applications.",
  github: "https://github.com/shrivardhanmohite",
  linkedin: "https://www.linkedin.com/in/shrivardhan-mohite-b67958289/",
  email: "shrivardhan18188@gmail.com",
};

export const PROJECTS = [
  {
    id: "scrapeiq",
    name: "ScrapeIQ",
    category: "AI Data Extraction Platform",
    description: "An intelligent AI-powered web scraping platform that transforms websites into structured datasets. Features autonomous data extraction, analytics dashboards, dataset management, exports, and AI-assisted research workflows.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Playwright", "AI Integration", "REST APIs"],
    status: "In Progress",
    github: "https://github.com/shrivardhanmohite",
    demo: null,
    live: null,
    image: null,
    featured: true,
  },
  {
    id: "biosync",
    name: "BioSync Digital Twin",
    category: "3D Simulation Platform",
    description: "A real-time digital twin for third-generation bioethanol production. Simulates algae cultivation, photobioreactors, equipment telemetry, processing pipelines, and production workflows in an immersive 3D environment.",
    tech: ["React Three Fiber", "Three.js", "React", "Zustand", "Tailwind CSS", "Framer Motion"],
    status: "Ongoing Research",
    github: "https://github.com/shrivardhanmohite",
    demo: null,
    live: null,
    image: null,
    featured: true,
  },
  {
    id: "revizo",
    name: "Revizo",
    category: "AI Study Platform",
    description: "An AI-powered study management platform that helps students organize notes, summarize PDFs, manage subjects, and streamline exam preparation using LLM-powered workflows.",
    tech: ["React", "Node.js", "Express", "MongoDB", "LLM Integration", "REST APIs"],
    status: null,
    github: "https://github.com/shrivardhanmohite/Revizo",
    demo: null,
    live: null,
    image: null,
    featured: true,
  },
  {
    id: "carboncalc",
    name: "CarbonCalc",
    category: "Sustainability Tool",
    description: "Carbon footprint calculator integrated with Gemini API to generate personalized sustainability insights.",
    tech: ["React", "Node.js", "Gemini API"],
    status: null,
    github: "https://github.com/shrivardhanmohite/CarbonCalc",
    demo: "https://carboncalc-qjui.onrender.com/home",
    live: "https://carboncalc-qjui.onrender.com/home",
    image: null,
    featured: false,
  },
  {
    id: "complaint-platform",
    name: "Public Complaint Platform",
    category: "Civic Tech",
    description: "Role-based civic issue management system with admin dashboard and real-time complaint tracking.",
    tech: ["Node.js", "Express", "MongoDB", "EJS"],
    status: null,
    github: "https://github.com/shrivardhanmohite/public-complaining-platform",
    demo: null,
    live: null,
    image: null,
    featured: false,
  },
  {
    id: "mapmycampus",
    name: "MapMyCampus",
    category: "Navigation System",
    description: "Smart campus navigation system using Google Maps API and graph-based shortest path algorithms.",
    tech: ["JavaScript", "Maps API", "Algorithms"],
    status: null,
    github: "https://github.com/shrivardhanmohite/mapmycampus",
    demo: null,
    live: null,
    image: null,
    featured: false,
  },
  {
    id: "farmconnect",
    name: "FarmConnect",
    category: "AgriTech Platform",
    description: "AI-powered farmer-buyer marketplace integrating crop advisory and government scheme alerts.",
    tech: ["MERN Stack", "AI Integration"],
    status: null,
    github: "https://github.com/shrivardhanmohite/farmConnect",
    demo: "https://farmconnect-b3dv.onrender.com",
    live: "https://farmconnect-b3dv.onrender.com",
    image: null,
    featured: false,
  },
];

export const SKILLS = {
  development: [
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: SiReact },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "Python", icon: SiPython },
    { name: "FastAPI", icon: SiFastapi },
    { name: "Django", icon: SiDjango },
    { name: "SQL", icon: SiMysql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Java", icon: FaJava },
    { name: "C/C++", icon: FaCuttlefish },
    { name: "PHP", icon: SiPhp }
  ],
  llm: [
    { name: "Ollama", icon: FaTerminal },
    { name: "OpenAI", icon: FaProjectDiagram },
    { name: "Gemini", icon: SiGoogle },
    { name: "RAG", icon: FaProjectDiagram }
  ],
  tools: [
    { name: "Git", icon: SiGit },
    { name: "Postman", icon: SiPostman },
    { name: "MongoDB Atlas", icon: SiMongodb },
    { name: "DOSBox", icon: FaTerminal }
  ]
};

export const JOURNEY = [
  {
    title: "Advanced LLM Engineering",
    description: "Independent Research & Applied AI Systems\n\n2025 – Present\n\nSpecializing in Retrieval-Augmented Generation (RAG), LLM orchestration, FastAPI microservices and production-grade AI architecture."
  },
  {
    title: "B.TECH (Computer Science & Technology)",
    description: "Shivaji University School of Engineering & Technology, Kolhapur\n2023 – Pursuing\n\nStudying DSA, Operating Systems, DBMS and system design while building full-stack and AI-integrated applications."
  },
  {
    title: "HSC (CBSE)",
    description: "Teens World Corporate School, Boisar\n2022 – 2023 • 88.6%\n\nComputer Science as core subject. Strengthened programming fundamentals and analytical thinking."
  },
  {
    title: "SSC (CBSE)",
    description: "Teens World Corporate School, Boisar\n2020 – 2021 • 94.3%\n\nBuilt strong mathematical reasoning and structured problem-solving foundation."
  }
];

export const CONTACT = {
  email: "shrivardhan18188@gmail.com",
  github: "https://github.com/shrivardhanmohite",
  linkedin: "https://www.linkedin.com/in/shrivardhan-mohite-b67958289/",
  leetcode: "https://leetcode.com/u/shrivardhanmohite/",
  twitter: "https://x.com/shrivardha36507",
};

/**
 * DEVELOPER_ANALYTICS
 * Structured to accept live API data in the future.
 * Replace the static values below once a backend/proxy is in place.
 */
export const DEVELOPER_ANALYTICS = {
  github: {
    username: "shrivardhanmohite",
    avatar: "https://github.com/shrivardhanmohite.png",
    profileUrl: "https://github.com/shrivardhanmohite",
    reposUrl: "https://github.com/shrivardhanmohite?tab=repositories",
    stats: {
      totalRepos: 18,
      followers: 2,
      following: 0,
      totalCommits: 97,          // Total contributions Jul 15 2023 – Present
      streak: 0,                 // Current streak
      longestStreak: 6,          // Feb 13 – Feb 18, 2025
      totalContributions: 72,    // Contributions in the last year
    },
    languages: [
      { name: "JavaScript", percent: 40, color: "#f7df1e" },
      { name: "Python",     percent: 30, color: "#3572A5" },
      { name: "TypeScript", percent: 15, color: "#3178c6" },
      { name: "CSS",        percent: 10, color: "#7c3aed" },
      { name: "Other",      percent:  5, color: "#6e7681" },
    ],
  },
  leetcode: {
    username: "shrivardhanmohite",
    profileUrl: "https://leetcode.com/u/shrivardhanmohite/",
    stats: {
      totalSolved: 164,
      totalProblems: 3999,
      easy:   { solved: 76, total: 955  },
      medium: { solved: 84, total: 2089 },
      hard:   { solved:  4, total: 955  },
      acceptanceRate: 56.4,      // 190 submissions / 44 active days estimated
      streak: 16,                // Max streak
      activeDays: 44,
      submissions: 190,
      globalRanking: 1037261,
      contestRating: null,
    },
    languages: [
      { name: "Python", percent: 55, color: "#3572A5" },
      { name: "Java",   percent: 30, color: "#b07219" },
      { name: "C++",    percent: 15, color: "#f34b7d" },
    ],
  },
};

export const CREDENTIALS = [
  {
    id: "cred-1",
    title: "Professional Certifications",
    issuer: "Multiple Platforms",
    category: "Certification",
    issueDate: "2023–2025",
    duration: "Ongoing",
    description: "A curated collection of professional certifications completed across various platforms covering software development, AI, cloud computing, programming, and related technologies.",
    skills: ["Software Development", "AI", "Cloud Computing"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    driveLink: "https://drive.google.com/drive/u/0/folders/1tw95LoEDTmPK9jSIEaYm3NBZ4SLomN-z",
    featured: true,
    verified: true
  },
  {
    id: "cred-2",
    title: "Academic Achievements",
    issuer: "Shivaji University & Academic Institutions",
    category: "Academic",
    issueDate: "2023–2025",
    duration: "Ongoing",
    description: "A collection of academic certificates, merit recognitions, workshops, and university achievements earned throughout my academic journey.",
    skills: ["Computer Science", "Algorithms", "Systems Design"],
    image: "./images/academic_credentials_cover.jpg",
    driveLink: "https://drive.google.com/drive/u/0/folders/16IeHKLHTsJ9oqqSStnUtjP9bU_9XzkyS",
    featured: false,
    verified: true
  },
  {
    id: "cred-3",
    title: "IoT Internship",
    issuer: "Internship Program",
    category: "Internship",
    issueDate: "2024",
    duration: "Completed",
    description: "Successfully completed an Internet of Things (IoT) internship involving embedded systems, Arduino, ESP8266, sensors, IoT communication, and real-world hardware development.",
    skills: ["Arduino", "ESP8266", "Embedded Systems", "IoT"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    driveLink: "https://drive.google.com/drive/u/0/folders/1hgHuyGf14cxmWm3JvoXmHtuafpbOdo6T",
    featured: false,
    verified: true
  }
];
