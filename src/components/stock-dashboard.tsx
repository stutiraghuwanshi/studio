"use client"

import { useState, useEffect } from "react"
import { predictStockPrice, PredictStockPriceOutput } from "@/ai/flows/predict-stock-price"
import { summarizeStockNews, SummarizeStockNewsOutput } from "@/ai/flows/summarize-stock-news"
import { useToast } from "@/hooks/use-toast"
import { PriceChart, ChartData } from "./price-chart"
import { NewsSummary } from "./news-summary"
import { PredictionDetails } from "./prediction-details"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateHistoricalData, getNewsArticles, generateFutureDates } from "@/lib/mock-data"

type StockDashboardProps = {
  ticker: string;
}

export function StockDashboard({ ticker }: StockDashboardProps) {
  const { toast } = useToast()
  const [timeframe, setTimeframe] = useState("6m");
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [prediction, setPrediction] = useState<PredictStockPriceOutput | null>(null);
  const [summary, setSummary] = useState<SummarizeStockNewsOutput | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Mock data fetching
        const historicalData = generateHistoricalData(timeframe);
        const newsArticles = getNewsArticles(ticker);
        
        const timeframeMap: { [key: string]: string } = {
          '1m': '1 month',
          '6m': '6 months',
          '1y': '1 year',
        };
        const predictionTimeframe = timeframeMap[timeframe];

        const historicalPricePoints = historicalData.map(d => ({
            date: d.date,
            price: d.close,
        }));

        // AI-powered features
        const [predictionResult, summaryResult] = await Promise.all([
          predictStockPrice({
            historicalData: historicalPricePoints,
            ticker,
            timeframe: predictionTimeframe,
          }),
          summarizeStockNews({
            ticker,
            newsArticles,
          })
        ]);
        
        setPrediction(predictionResult);
        setSummary(summaryResult);

        // Prepare chart data
        const predictedPrices = predictionResult.predictedPrices;
        
        const combinedChartData: ChartData[] = historicalData.map(d => ({
          date: d.date,
          "Historical Price": d.close,
          "Predicted Price": null,
        }));

        const lastHistoricalPrice = historicalData[historicalData.length-1].close;
        
        predictedPrices.forEach((d, i) => {
          combinedChartData.push({
            date: d.date,
            "Historical Price": null,
            "Predicted Price": d.price,
          });
        });

        // Bridge the gap for a continuous line
        if(combinedChartData.length > historicalData.length && historicalData.length > 0) {
            const bridgePoint = { ...combinedChartData[historicalData.length -1] };
            bridgePoint["Predicted Price"] = lastHistoricalPrice;
            combinedChartData.splice(historicalData.length -1, 1, bridgePoint);
        }

        setChartData(combinedChartData);
        
      } catch (error) {
        console.error("Error fetching stock data:", error);
        toast({
          variant: "destructive",
          title: "An error occurred.",
          description: "Failed to fetch stock data or get AI insights.",
        })
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [ticker, timeframe, toast]);

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
          {ticker} Dashboard
        </h1>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="1m">1 Month</TabsTrigger>
            <TabsTrigger value="6m">6 Months</TabsTrigger>
            <TabsTrigger value="1y">1 Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-8">
        <PriceChart data={chartData} loading={loading} />
        <div className="grid md:grid-cols-2 gap-8">
          <NewsSummary summary={summary} loading={loading} />
          <PredictionDetails prediction={prediction} loading={loading} />
        </div>
      </div>
    </div>
  )
}
