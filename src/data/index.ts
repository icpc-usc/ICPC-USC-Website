// Data exports for easy importing
export { default as leadersData } from './leaders.json';
export { default as teamsData } from './teams.json';
export { default as membersData } from './members.json';
export { default as trainingData } from './training.json';
export { default as galleryData } from './gallery.json';
export { default as historyData } from './history.json';
export { default as homeData } from './home.json';
export { default as contactData } from './contact.json';

// Type definitions
export interface Leader {
  name: string;
  role: string;
  season: string;
  description: string;
  achievements: string[];
  contact?: {
    email?: string;
    github?: string;
    cf?: string;
  };
}

export interface TeamMember {
  name: string;
  avatar?: string;
  handle?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  email?: string;
  maxRating?: number;
  roles?: string[];
  abouts?: string[];
}

export interface Team {
  name: string;
  type: 'technical' | 'media';
  description: string;
  members: TeamMember[];
}

export interface Member {
  name: string;
  handle: string;
  rating?: number;
  maxRating?: number;
  season: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  avatar: string;
  achievements: string[];
}

export interface TrainingSeason {
  season: string;
  year: string;
  description: string;
  currentWave: number;
  currentWeek: number;
  totalStudents: number;
  waves: TrainingWave[];
  isActive?: boolean;
}

export interface TrainingWave {
  wave: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  levels: TrainingLevel[];
}

export interface TrainingLevel {
  level: string;
  description: string;
  studentCount: number;
  currentWeek: number;
  weeks: Week[];
}

export interface Week {
  week: number;
  topic: string;
  recordingUrl?: string;
  problemSheetUrl?: string;
  practiceSession?: string;
  topContestant?: {
    name: string;
    handle: string;
    score: number;
  };
}

export interface GalleryEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  category: 'ECPC' | 'ACPC' | 'Training' | 'Social';
  description: string;
  coverImage: string;
  participants?: number;
  photoCount: number;
}

export interface Photo {
  id: number;
  url: string;
  caption?: string;
  photographer?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  achievements: string[];
  stats?: {
    members?: number;
    acpcTeams?: number;
    awards?: number;
  };
}