import React from 'react';
import type { UserProfile } from "@/ai/flows/smart-match";
import { Users, Search, Heart } from 'lucide-react';

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

export const successStories = [
    {
      id: 1,
      name: "Anjali & Sameer",
      location: "Joined 2023, Married 2024",
      story: "We connected instantly over our shared love for old Hindi music and spicy food. No Caste Matrimony made it so easy to find someone who truly understands me. We're so grateful!",
      avatar: "https://placehold.co/100x100.png",
    },
    {
      id: 2,
      name: "Karan & Sunita",
      location: "Joined 2022, Married 2023",
      story: "I wasn't sure about online matrimony, but the verified profiles and detailed preferences on No Caste Matrimony gave me confidence. I found Karan, and our journey has been nothing short of magical.",
      avatar: "https://placehold.co/100x100.png",
    },
    {
      id: 3,
      name: "Rahul & Meera",
      location: "Joined 2023, Married 2024",
      story: "The Smart Match tool was a game-changer! It suggested Meera's profile, and the reasons for our match were spot on. We're now happily married and planning our next adventure.",
      avatar: "https://placehold.co/100x100.png",
    },
     {
      id: 4,
      name: "Aisha & Kabir",
      location: "Joined 2022, Married 2023",
      story: "Finding someone who shared my modern values and respected my career was important. No Caste Matrimony connected me with Kabir, my perfect partner in every sense.",
      avatar: "https://placehold.co/100x100.png",
    },
];

export const howItWorks = [
    {
        id: 1,
        title: 'Create Your Profile',
        description: 'Fill in your details, preferences, and what makes you unique. A complete profile gets more attention.',
        icon: <Users className="w-8 h-8" />
    },
    {
        id: 2,
        title: 'Search & Discover',
        description: 'Use our advanced filters or AI-powered Smart Match tool to find profiles that truly resonate with you.',
        icon: <Search className="w-8 h-8" />
    },
    {
        id: 3,
        title: 'Connect & Communicate',
        description: 'Start conversations with your matches through our secure messaging system and build your connection.',
        icon: <Heart className="w-8 h-8" />
    }
];
