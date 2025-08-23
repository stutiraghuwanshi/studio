"use client"

import { PredictStockPriceOutput } from "@/ai/flows/predict-stock-price"
import { Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

type PredictionDetailsProps = {
  prediction: PredictStockPriceOutput | null;
  loading: boolean;
}

export function PredictionDetails({ prediction, loading }: PredictionDetailsProps) {
    if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-7 w-40" />
           <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div>
                 <Skeleton className="h-4 w-48 mb-2" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-3/4" />
            </div>
        </CardContent>
      </Card>
    )
  }

  const confidenceValue = (prediction?.confidence ?? 0) * 100;
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle>AI Prediction Insights</CardTitle>
        </div>
        <CardDescription>Factors influencing the price prediction.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Prediction Confidence</h3>
          <div className="flex items-center gap-2">
            <Progress value={confidenceValue} className="w-full" />
            <span className="font-semibold text-sm">{confidenceValue.toFixed(0)}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Analyst's Note</h3>
          <p className="text-sm text-foreground/90">
            {prediction?.explanation || "No explanation available."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
