'use server';

/**
 * @fileOverview Summarizes news articles related to a specific stock.
 *
 * - summarizeStockNews - A function that summarizes news articles about a stock.
 * - SummarizeStockNewsInput - The input type for the summarizeStockNews function.
 * - SummarizeStockNewsOutput - The return type for the summarizeStockNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStockNewsInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to summarize news for.'),
  newsArticles: z.array(z.string()).describe('An array of news articles related to the stock.'),
});
export type SummarizeStockNewsInput = z.infer<typeof SummarizeStockNewsInputSchema>;

const SummarizeStockNewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the news articles related to the stock.'),
});
export type SummarizeStockNewsOutput = z.infer<typeof SummarizeStockNewsOutputSchema>;

export async function summarizeStockNews(input: SummarizeStockNewsInput): Promise<SummarizeStockNewsOutput> {
  return summarizeStockNewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStockNewsPrompt',
  input: {schema: SummarizeStockNewsInputSchema},
  output: {schema: SummarizeStockNewsOutputSchema},
  prompt: `You are a financial expert summarizing news articles for a given stock.

  Ticker: {{{ticker}}}

  Summarize the following news articles:

  {{#each newsArticles}}
  Article {{@index + 1}}: {{{this}}}
  {{/each}}
  `,
});

const summarizeStockNewsFlow = ai.defineFlow(
  {
    name: 'summarizeStockNewsFlow',
    inputSchema: SummarizeStockNewsInputSchema,
    outputSchema: SummarizeStockNewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
