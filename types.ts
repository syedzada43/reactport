import { LucideIcon } from 'lucide-react';

export type ThemeId = 'light' | 'dark' | 'techy' | 'hacker';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: {
    bg: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    surface: string;
    muted: string;
  };
  font: string;
  radius: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
  display: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}
