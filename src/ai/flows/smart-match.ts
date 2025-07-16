'use server';

/**
 * @fileOverview An AI-powered smart match flow for recommending compatible partners.
 *
 * - smartMatch - A function that provides match recommendations based on user preferences and profile details.
 * - SmartMatchInput - The input type for the smartMatch function, including user profiles and preferences.
 * - SmartMatchOutput - The return type for the smartMatch function, providing a list of recommended matches.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UserProfileSchema = z.object({
  age: z.number().describe('Age of the user.'),
  location: z.string().describe('Location of the user.'),
  education: z.string().describe('Education level of the user.'),
  interests: z.array(z.string()).describe('List of interests of the user.'),
  profileDetails: z.string().describe('A detailed profile description of the user.'),
  preferences: z.string().describe('The partner preferences of the user'),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

const SmartMatchInputSchema = z.object({
  userProfile: UserProfileSchema.describe('The profile and preferences of the user requesting matches.'),
  candidateProfiles: z.array(UserProfileSchema).describe('A list of candidate user profiles to evaluate.'),
});

export type SmartMatchInput = z.infer<typeof SmartMatchInputSchema>;

const MatchedProfileSchema = z.object({
  profile: UserProfileSchema,
  matchScore: z.number().describe('A score indicating the compatibility of the match (0-1).'),
  reason: z.string().describe('The reason for match and the score given'),
});

const SmartMatchOutputSchema = z.array(MatchedProfileSchema);

export type SmartMatchOutput = z.infer<typeof SmartMatchOutputSchema>;

export async function smartMatch(input: SmartMatchInput): Promise<SmartMatchOutput> {
  return smartMatchFlow(input);
}

const smartMatchPrompt = ai.definePrompt({
  name: 'smartMatchPrompt',
  input: {schema: SmartMatchInputSchema},
  output: {schema: SmartMatchOutputSchema},
  prompt: `You are an AI matchmaker for a matrimony app, tasked with finding the best matches for a user based on their profile and preferences.  Review each candidate profile and determine a match score between 0 and 1, and a short reason.  Provide the list of matched profiles, ordered by match score descending (highest score first).

User Profile:
Age: {{{userProfile.age}}}
Location: {{{userProfile.location}}}
Education: {{{userProfile.education}}}
Interests: {{#each userProfile.interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Profile Details: {{{userProfile.profileDetails}}}
Preferences: {{{userProfile.preferences}}}

Candidate Profiles:
{{#each candidateProfiles}}
---Candidate Profile---
Age: {{{this.age}}}
Location: {{{this.location}}}
Education: {{{this.education}}}
Interests: {{#each this.interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Profile Details: {{{this.profileDetails}}}
Preferences: {{{this.preferences}}}
{{/each}}`,
});

const smartMatchFlow = ai.defineFlow(
  {
    name: 'smartMatchFlow',
    inputSchema: SmartMatchInputSchema,
    outputSchema: SmartMatchOutputSchema,
  },
  async input => {
    const {output} = await smartMatchPrompt(input);
    return output!;
  }
);
