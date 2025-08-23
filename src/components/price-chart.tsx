"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

export type ChartData = {
  date: string;
  "Historical Price": number | null;
  "Predicted Price": number | null;
}

const chartConfig = {
  historical: {
    label: "Historical Price",
    color: "hsl(var(--accent))",
  },
  predicted: {
    label: "Predicted Price",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

type PriceChartProps = {
  data: ChartData[];
  loading: boolean;
}

export function PriceChart({ data, loading }: PriceChartProps) {
  if (loading) {
    return (
       <Card className="shadow-lg">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Price Analysis</CardTitle>
        <CardDescription>Historical vs. AI-Predicted Prices</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
             <YAxis
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={(value) => `$${value}`}
                />
            <Tooltip
              content={<ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex flex-col">
                    <span className="font-bold">{`$${Number(value).toFixed(2)}`}</span>
                  </div>
                )}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                 />}
            />
            <Line
              dataKey="Historical Price"
              type="monotone"
              stroke={chartConfig.historical.color}
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <Line
              dataKey="Predicted Price"
              type="monotone"
              stroke={chartConfig.predicted.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
