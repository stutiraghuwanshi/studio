'use server';

/**
 * @fileOverview Predicts future stock prices based on historical data using a Genkit flow.
 *
 * - predictStockPrice - A function that handles the stock price prediction process.
 * - PredictStockPriceInput - The input type for the predictStockPrice function.
 * - PredictStockPriceOutput - The return type for the predictStockPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictStockPriceInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical stock data, such as closing prices over a period, as a JSON string.'
    ),
  ticker: z.string().describe('The ticker symbol of the stock to predict.'),
  timeframe: z.string().describe('The timeframe for the prediction (e.g., 1 month, 6 months, 1 year).'),
});
export type PredictStockPriceInput = z.infer<typeof PredictStockPriceInputSchema>;

const PredictStockPriceOutputSchema = z.object({
  predictedPrices: z
    .string()
    .describe('Predicted stock prices for the given timeframe, as a JSON string.'),
  confidence: z
    .number()
    .describe('A confidence score (0-1) indicating the reliability of the prediction.'),
  explanation: z
    .string()
    .describe('An explanation of the factors influencing the prediction.'),
});
export type PredictStockPriceOutput = z.infer<typeof PredictStockPriceOutputSchema>;

export async function predictStockPrice(input: PredictStockPriceInput): Promise<PredictStockPriceOutput> {
  return predictStockPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictStockPricePrompt',
  input: {schema: PredictStockPriceInputSchema},
  output: {schema: PredictStockPriceOutputSchema},
  prompt: `You are a financial analyst specializing in stock price prediction.

  Based on the historical stock data provided, predict the stock prices for the next {{{timeframe}}}.
  Also, provide a confidence score (0-1) for your prediction and explain the factors that influenced your prediction.

  Historical Data: {{{historicalData}}}
  Ticker: {{{ticker}}}
  Timeframe: {{{timeframe}}}

  Ensure the predictedPrices are returned as a JSON string.
`,
});

const predictStockPriceFlow = ai.defineFlow(
  {
    name: 'predictStockPriceFlow',
    inputSchema: PredictStockPriceInputSchema,
    outputSchema: PredictStockPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
