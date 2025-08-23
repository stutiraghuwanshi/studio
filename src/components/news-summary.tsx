"use client"

import { SummarizeStockNewsOutput } from "@/ai/flows/summarize-stock-news"
import { Newspaper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type NewsSummaryProps = {
  summary: SummarizeStockNewsOutput | null;
  loading: boolean;
}

export function NewsSummary({ summary, loading }: NewsSummaryProps) {
  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <CardTitle>AI News Summary</CardTitle>
        </div>
        <CardDescription>Key takeaways from recent market news.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90">
          {summary?.summary || "No summary available."}
        </p>
      </CardContent>
    </Card>
  )
}
