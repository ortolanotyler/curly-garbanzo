export enum Section {
  HERO = 'hero',
  INDUSTRIES = 'industries',
  SERVICES = 'services',
  HOW_WE_WORK = 'how-we-work',
  INSIGHTS = 'insights',
  CONTACT = 'contact',
  JOB_BOARD = 'job-board'
}

export type View = 'gateway' | 'landing' | 'jobs' | 'submit' | 'blog' | 'not-found';

export interface JobPosting {
  id: string | number;
  ref: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  posted?: string;
  summary: string;
  description?: string;
  responsibilities: string[];
  requirements: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO date (YYYY-MM-DD)
  tags?: string[];
  coverImage?: string;
  content: string; // Markdown
}

export interface LinkedInPost {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
  avatar: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}