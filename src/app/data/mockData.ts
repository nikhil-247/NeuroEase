// Mock data for NeuroEase application

export interface Patient {
  id: string;
  name: string;
  age: number;
  dementiaStage: string;
  relationship: string;
  photoUrl: string;
}

export interface Memory {
  id: string;
  category: string;
  question: string;
  answer: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface Session {
  id: string;
  type: string;
  title: string;
  duration: string;
  contentSummary: string;
  audioUrl: string;
  createdAt: string;
}

export interface Schedule {
  id: string;
  sessionId: string;
  title: string;
  time: string;
  days: string[];
  device: string;
  isActive: boolean;
}

export const mockPatient: Patient = {
  id: '1',
  name: 'Margaret Thompson',
  age: 78,
  dementiaStage: 'Moderate',
  relationship: 'Mother',
  photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
};

export const mockMemories: Memory[] = [
  {
    id: '1',
    category: 'Life Story',
    question: 'Where did you grow up?',
    answer: 'I grew up in a small town in Vermont, surrounded by mountains and maple trees.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    category: 'People',
    question: 'Tell me about your husband',
    answer: 'John was my high school sweetheart. We were married for 52 wonderful years.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    category: 'Places',
    question: 'What is your favorite place?',
    answer: 'The beach cottage where we spent every summer with our grandchildren.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
  },
];

export const mockSessions: Session[] = [
  {
    id: '1',
    type: 'Reassurance',
    title: 'Morning Comfort Session',
    duration: '5 min',
    contentSummary: 'Gentle reminder that you are safe, loved, and in your home. Your daughter Sarah visits every Tuesday.',
    audioUrl: '/mock-audio.mp3',
    createdAt: '2025-12-18',
  },
  {
    id: '2',
    type: 'Happy Memories',
    title: 'Vermont Childhood Memories',
    duration: '8 min',
    contentSummary: 'Stories about growing up in Vermont, playing in the maple groves, and family gatherings.',
    audioUrl: '/mock-audio.mp3',
    createdAt: '2025-12-17',
  },
];

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    sessionId: '1',
    title: 'Morning Comfort Session',
    time: '08:00 AM',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    device: 'Bedroom Speaker',
    isActive: true,
  },
  {
    id: '2',
    sessionId: '2',
    title: 'Vermont Childhood Memories',
    time: '02:00 PM',
    days: ['Tue', 'Thu', 'Sat'],
    device: 'Living Room Tablet',
    isActive: true,
  },
];

export const memoryCategories = [
  'Life Story',
  'People',
  'Places',
  'Routines',
  'Emotional Triggers',
];

export const sessionTypes = [
  {
    id: 'reassurance',
    name: 'Reassurance',
    description: 'Calm and comfort during confusion',
  },
  {
    id: 'happy',
    name: 'Happy Memories',
    description: 'Positive stories from the past',
  },
  {
    id: 'routine',
    name: 'Routine Orientation',
    description: 'Daily schedule and activities',
  },
  {
    id: 'family',
    name: 'Family Connection',
    description: 'Stories about loved ones',
  },
  {
    id: 'grounding',
    name: 'Grounding',
    description: 'Present moment awareness',
  },
];
