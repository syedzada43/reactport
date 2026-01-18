import { 
  Code2, 
  Cpu, 
  Terminal, 
  BookOpen, 
  Gamepad2, 
  Briefcase, 
  Linkedin, 
  Facebook, 
  Mail, 
  Video 
} from 'lucide-react';
import { ThemeConfig, Project, SocialLink } from './types';

export const THEMES: Record<string, ThemeConfig> = {
  light: {
    id: 'light',
    name: 'Daylight',
    colors: {
      bg: 'bg-gray-50',
      text: 'text-slate-800',
      primary: 'bg-blue-600',
      secondary: 'bg-indigo-100',
      accent: 'text-blue-600',
      border: 'border-gray-200',
      surface: 'bg-white',
      muted: 'text-slate-500'
    },
    font: 'font-[Inter]',
    radius: 'rounded-2xl'
  },
  dark: {
    id: 'dark',
    name: 'Midnight',
    colors: {
      bg: 'bg-slate-950',
      text: 'text-slate-200',
      primary: 'bg-indigo-500',
      secondary: 'bg-slate-800',
      accent: 'text-indigo-400',
      border: 'border-slate-800',
      surface: 'bg-slate-900',
      muted: 'text-slate-400'
    },
    font: 'font-[Inter]',
    radius: 'rounded-2xl'
  },
  techy: {
    id: 'techy',
    name: 'Cyber',
    colors: {
      bg: 'bg-[#0a0f1c]',
      text: 'text-cyan-100',
      primary: 'bg-cyan-600',
      secondary: 'bg-[#15203b]',
      accent: 'text-cyan-400',
      border: 'border-cyan-900',
      surface: 'bg-[#0f172a]',
      muted: 'text-cyan-700'
    },
    font: 'font-[Orbitron]',
    radius: 'rounded-sm'
  },
  hacker: {
    id: 'hacker',
    name: 'Terminal',
    colors: {
      bg: 'bg-black',
      text: 'text-green-500',
      primary: 'bg-green-700',
      secondary: 'bg-green-900/20',
      accent: 'text-green-400',
      border: 'border-green-800',
      surface: 'bg-black',
      muted: 'text-green-800'
    },
    font: 'font-[Fira Code]',
    radius: 'rounded-none'
  }
};

export const PROJECTS: Project[] = [
  {
    title: "Unique Science Academy Pro",
    description: "A comprehensive backend-integrated solution for student management and fee voucher generation. Streamlines administrative tasks for educational institutions.",
    link: "https://Syedzada43.github.io/pro",
    icon: BookOpen,
    tags: ["React", "Management", "Finance"]
  },
  {
    title: "Quiz Master",
    description: "An interactive quiz application. While it documents my learning curve with some glitches, it represents my problem-solving journey.",
    link: "https://Syedzada43.github.io/quiz",
    icon: Gamepad2,
    tags: ["Game", "JS Logic", "Interactive"]
  },
  {
    title: "Legacy Portfolio",
    description: "My first step into the world of web presence. A look back at where it all started.",
    link: "https://Syedzada43.github.io/portfolio",
    icon: Briefcase,
    tags: ["HTML/CSS", "Design", "History"]
  }
];

export const SOCIALS: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/muhammad-abdullah-ab4b3a3a2?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: Linkedin,
    display: "Connect"
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/share/1BFJnwcYFz/",
    icon: Facebook,
    display: "Follow"
  },
  {
    platform: "TikTok",
    url: "https://tiktok.com/@hashmer",
    icon: Video,
    display: "Watch"
  },
  {
    platform: "Email",
    url: "mailto:hashmertech@gmail.com",
    icon: Mail,
    display: "Contact"
  }
];

export const BIO_LONG = `
My name is Abdullah Hashmi, and my journey into the world of technology is a testament to curiosity meeting opportunity. 

It began during the global upheaval of the COVID-19 pandemic in 2020. While the world stood still, I decided to move forward. As a student at Darearqam School pursuing my matriculation, I found myself with time and a burning desire to create. I started with the basics of the web—HTML and CSS—and was instantly captivated by the power to build things from nothing.

Over the years, that initial curiosity evolved into a professional skillset. I didn't just stop at static pages; I dove deep into JavaScript, mastering the logic that makes the web alive. Today, I specialize in the modern React ecosystem, specifically Next.js and Tailwind CSS, crafting interfaces that are not only functional but visually compelling. 

My expertise extends beyond the frontend. I handle backend integrations and have recently embraced the cutting edge of Artificial Intelligence, integrating Large Language Models and complex APIs into web applications. From building management systems for Unique Science Academy to creating interactive games, every project I undertake is a step towards mastery.
`;

export const AI_SYSTEM_INSTRUCTION = `
You are an AI assistant for the portfolio website of Abdullah Hashmi.
Here is what you need to know about Abdullah:
- Name: Abdullah Hashmi.
- Role: Full Stack Web Developer & AI Specialist.
- Skills: HTML, CSS, JavaScript, Next.js, Tailwind CSS, Backend Integration, API Handling, AI Integration.
- Education: Studied at Darearqam School (Matriculation).
- Story: Started coding during COVID-19 (2020).
- Projects:
  1. Unique Science Academy (Fee/Student Management) - Syedzada43.github.io/pro
  2. Quiz Game - Syedzada43.github.io/quiz
  3. Old Portfolio - Syedzada43.github.io/portfolio
- Socials: LinkedIn, Facebook, TikTok (@hashmer), Email (hashmertech@gmail.com).

Your personality:
- You are helpful, professional, yet friendly.
- You can answer questions about Abdullah's skills, history, and projects.
- You are also a general-purpose assistant capable of answering questions about the world, coding, science, etc.
- Format your responses using simple Markdown (bold, italic, bullet points) for readability.
- Keep responses concise but informative.
`;
