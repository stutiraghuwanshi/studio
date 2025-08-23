"use client"

import { DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type KeyMetricsProps = {
  currentPrice: number | null;
  loading: boolean;
}

export function KeyMetrics({ currentPrice, loading }: KeyMetricsProps) {
  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
                <Skeleton className="h-8 w-24" />
            </div>
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <CardTitle>Key Metrics</CardTitle>
        </div>
        <CardDescription>Essential stock information.</CardDescription>
      </CardHeader>
      <CardContent>
         <div>
          <h3 className="text-sm font-medium mb-2">Current Price</h3>
          <p className="text-3xl font-bold text-foreground">
            {currentPrice ? `$${currentPrice.toFixed(2)}` : "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
