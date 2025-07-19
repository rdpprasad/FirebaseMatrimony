import React from 'react';
import type { UserProfile } from "@/ai/flows/smart-match";
import { successStoriesData } from '@/lib/mock-data.ts';

export const mainUserProfile: UserProfile = {
  age: 29,
  location: "Mumbai",
  education: "Masters in Computer Science",
  interests: ["reading", "hiking", "cooking", "movies"],
  profileDetails: "I'm a software engineer who loves to explore new technologies. I enjoy quiet evenings with a book as much as I love going on adventurous hikes. Looking for someone who is kind, ambitious, and has a good sense of humor.",
  preferences: "Looking for a partner aged 28-32, well-educated, settled in a metropolitan city. Should be a non-smoker, enjoy a mix of social and quiet activities. Someone who values family, honesty, and open communication."
};

export const candidateProfiles: UserProfile[] = [
  {
    age: 28,
    location: "Bangalore",
    education: "MBA",
    interests: ["traveling", "photography", "food", "startups"],
    profileDetails: "A marketing professional with a passion for building brands. I'm an avid traveler and foodie, always looking for the next best cafe or travel destination. I believe in living life to the fullest.",
    preferences: "Seeking an independent and career-oriented partner who is open-minded and loves to travel. Age 27-31.",
  },
  {
    age: 31,
    location: "Mumbai",
    education: "PhD in Literature",
    interests: ["reading", "writing", "art", "theatre"],
    profileDetails: "I'm a university professor with a deep love for literature and arts. I find joy in simple things like a cup of coffee and a good conversation. I'm a calm, composed person who values intellectual connection.",
    preferences: "Looking for a partner who is intellectual, compassionate, and shares a love for arts and culture. Age 30-35.",
  },
  {
    age: 29,
    location: "Delhi",
    education: "Bachelors in Design",
    interests: ["graphic design", "music", "cycling", "street food"],
    profileDetails: "A freelance graphic designer who sees beauty in everything. I'm a creative soul, always working on a new project. I love exploring the city on my cycle and trying out new street food.",
    preferences: "Wants a creative and fun-loving partner. Someone who is spontaneous and doesn't take life too seriously. Age 28-32.",
  },
  {
    age: 26,
    location: "Pune",
    education: "Masters in Finance",
    interests: ["investing", "fitness", "podcasts", "cooking"],
    profileDetails: "An investment banker who is disciplined and ambitious. I'm very focused on my career but also prioritize health and fitness. I enjoy cooking healthy meals and listening to podcasts on finance and self-improvement.",
    preferences: "Seeking a partner who is ambitious, financially literate, and values a healthy lifestyle. Age 25-30.",
  },
  {
    age: 30,
    location: "Hyderabad",
    education: "Doctor (MD)",
    interests: ["medicine", "volunteering", "yoga", "movies"],
    profileDetails: "I am a doctor dedicated to my profession. In my free time, I like to unwind by practicing yoga and watching movies. I am passionate about giving back to the community and volunteer at a local clinic on weekends.",
    preferences: "I am looking for a caring, understanding partner who respects my profession and its demands. Preferably from a medical background. Age 29-34."
  }
];

export const allProfiles = [mainUserProfile, ...candidateProfiles].map((p, i) => ({
    id: `user${i+1}`,
    name: i === 0 ? "Aditi Sharma" : ["Rohan Mehra", "Priya Singh", "Vikram Rathod", "Neha Gupta", "Arjun Reddy"][i-1],
    ...p,
    avatar: `https://placehold.co/100x100.png`,
    verified: i % 2 === 0,
}));

export const successStories = successStoriesData;
