
'use server';
/**
 * @fileOverview An AI-powered Kundali matching flow for astrological compatibility.
 *
 * - kundaliMatch - A function that generates a detailed astrological compatibility report.
 * - KundaliMatchInput - The input type for the kundaliMatch function.
 * - KundaliMatchOutput - The return type for the kundaliMatch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BirthDetailsSchema = z.object({
  name: z.string().describe('Full name of the person.'),
  gender: z.enum(['male', 'female']).describe('Gender of the person.'),
  datetimeOfBirth: z.string().describe('The exact date and time of birth in ISO 8601 format (YYYY-MM-DDTHH:mm).'),
  placeOfBirth: z.string().describe('The city and country of birth (e.g., "Mumbai, India").'),
});

const KundaliMatchInputSchema = z.object({
  brideDetails: BirthDetailsSchema.describe("The bride's birth details."),
  groomDetails: BirthDetailsSchema.describe("The groom's birth details."),
});
export type KundaliMatchInput = z.infer<typeof KundaliMatchInputSchema>;

const KootDetailSchema = z.object({
  name: z.string().describe('Name of the Koot (e.g., "Varna").'),
  description: z.string().describe("A brief description of what this Koot represents."),
  totalPoints: z.number().describe('The maximum points for this Koot.'),
  receivedPoints: z.number().describe('The points received for this Koot in the match.'),
  comment: z.string().describe('A brief comment on the matching for this Koot.'),
});

const GunMilanSchema = z.object({
  totalPoints: z.number().describe('The total Gun Milan score out of 36.'),
  conclusion: z.string().describe('A one-sentence conclusion based on the score (e.g., "Excellent Match", "Average Match", "Not Recommended").'),
  kootDetails: z.array(KootDetailSchema).describe('An array containing the details for all 8 Koots.'),
});

const ManglikReportSchema = z.object({
    brideManglikStatus: z.string().describe("The bride's Manglik status (e.g., 'Non-Manglik', 'Manglik', 'Anshik Manglik')."),
    groomManglikStatus: z.string().describe("The groom's Manglik status (e.g., 'Non-Manglik', 'Manglik', 'Anshik Manglik')."),
    conclusion: z.string().describe("A conclusion about Manglik dosha compatibility, including whether any dosha cancels out."),
});

const KundaliMatchOutputSchema = z.object({
  brideName: z.string(),
  groomName: z.string(),
  gunMilan: GunMilanSchema,
  manglikReport: ManglikReportSchema,
  conclusion: z.string().describe("A detailed, multi-paragraph conclusion summarizing the entire compatibility report, including strengths, weaknesses, and potential remedies."),
});
export type KundaliMatchOutput = z.infer<typeof KundaliMatchOutputSchema>;


export async function kundaliMatch(input: KundaliMatchInput): Promise<KundaliMatchOutput> {
  return kundaliMatchFlow(input);
}


const kundaliMatchPrompt = ai.definePrompt({
    name: 'kundaliMatchPrompt',
    input: { schema: KundaliMatchInputSchema },
    output: { schema: KundaliMatchOutputSchema },
    prompt: `You are an expert Vedic astrologer specializing in horoscope matching (Kundali Milan) for matrimony.
    
    Given the birth details of a bride and a groom, perform a detailed astrological analysis using the Ashtakoota Milan system.

    Your analysis must include:
    1.  **Ashtakoota Milan (Gun Milan):** Calculate the points for each of the 8 Koots (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi). Provide the points received out of the total for each koot. The total score must be out of 36. Provide a brief comment for each koot's result.
    2.  **Manglik Dosha Analysis:** Determine if the bride or groom has Manglik Dosha (Mars affliction). Provide a clear status for both. State whether the doshas, if present, are cancelled out and provide a conclusion.
    3.  **Final Conclusion:** Write a comprehensive summary of the match. Discuss the overall compatibility, highlighting the strengths (high scores in important koots like Nadi, Bhakoot) and weaknesses (low scores, presence of doshas). Suggest if the match is recommended and mention any potential remedies if applicable.

    Bride's Details:
    - Name: {{{brideDetails.name}}}
    - Date & Time of Birth: {{{brideDetails.datetimeOfBirth}}}
    - Place of Birth: {{{brideDetails.placeOfBirth}}}

    Groom's Details:
    - Name: {{{groomDetails.name}}}
    - Date & Time of Birth: {{{groomDetails.datetimeOfBirth}}}
    - Place of Birth: {{{groomDetails.placeOfBirth}}}

    Generate a complete report based on these details. Ensure the names are correctly placed in the output.
    `,
});


const kundaliMatchFlow = ai.defineFlow(
  {
    name: 'kundaliMatchFlow',
    inputSchema: KundaliMatchInputSchema,
    outputSchema: KundaliMatchOutputSchema,
  },
  async (input) => {
    const { output } = await kundaliMatchPrompt(input);
    return output!;
  }
);
