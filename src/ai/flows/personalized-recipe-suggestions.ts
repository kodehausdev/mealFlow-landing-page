'use server';

/**
 * @fileOverview AI flow for generating personalized meal suggestions based on available ingredients, dietary restrictions, and past meal patterns.
 *
 * - personalizedRecipeSuggestions - A function that suggests meal recipes based on user preferences.
 * - PersonalizedRecipeSuggestionsInput - The input type for the personalizedRecipeSuggestions function.
 * - PersonalizedRecipeSuggestionsOutput - The return type for the personalizedRecipeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecipeSuggestionsInputSchema = z.object({
  availableIngredients: z
    .string()
    .describe('A comma-separated list of ingredients currently available in the household.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'A comma-separated list of dietary restrictions or preferences (e.g., vegetarian, gluten-free, dairy-free).'
    ),
  pastMealPatterns: z
    .string()
    .describe(
      'A description of past meal patterns and preferences of the household.'
    ),
  numSuggestions: z
    .number()
    .default(3)
    .describe('The number of recipe suggestions to generate.'),
});
export type PersonalizedRecipeSuggestionsInput = z.infer<
  typeof PersonalizedRecipeSuggestionsInputSchema
>;

const PersonalizedRecipeSuggestionsOutputSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string().describe('The name of the suggested recipe.'),
      ingredients: z
        .string()
        .describe('A comma-separated list of ingredients required for the recipe.'),
      instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
      reason: z
        .string()
        .describe(
          'The reason why this recipe was suggested based on the input parameters.'
        ),
    })
  ).describe('An array of personalized recipe suggestions.'),
});
export type PersonalizedRecipeSuggestionsOutput = z.infer<
  typeof PersonalizedRecipeSuggestionsOutputSchema
>;

export async function personalizedRecipeSuggestions(
  input: PersonalizedRecipeSuggestionsInput
): Promise<PersonalizedRecipeSuggestionsOutput> {
  return personalizedRecipeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecipeSuggestionsPrompt',
  input: {schema: PersonalizedRecipeSuggestionsInputSchema},
  output: {schema: PersonalizedRecipeSuggestionsOutputSchema},
  prompt: `You are a personal meal planning assistant. Generate personalized meal suggestions based on the following information:

Available Ingredients: {{{availableIngredients}}}
Dietary Restrictions: {{{dietaryRestrictions}}}
Past Meal Patterns: {{{pastMealPatterns}}}

Please provide {{{numSuggestions}}} recipe suggestions, including the recipe name, required ingredients, step-by-step instructions, and a brief explanation of why each recipe was suggested based on the provided information. The output should be formatted as a JSON object.`,
});

const personalizedRecipeSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedRecipeSuggestionsFlow',
    inputSchema: PersonalizedRecipeSuggestionsInputSchema,
    outputSchema: PersonalizedRecipeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
