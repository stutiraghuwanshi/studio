"use client";

import { useState } from "react";
import { StockSearch } from "@/components/stock-search";
import { StockDashboard } from "@/components/stock-dashboard";
import { Icons } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Icons.logo className="h-8 w-8 mr-2 text-primary" />
            <span className="font-bold text-lg">Stock Insights</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <StockSearch onStockSelect={setSelectedStock} />
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="profile" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="container">
          {selectedStock ? (
            <StockDashboard key={selectedStock} ticker={selectedStock} />
          ) : (
            <WelcomeMessage />
          )}
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-sm leading-loose text-center text-muted-foreground">
            Built by your AI assistant.
          </p>
        </div>
      </footer>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <TrendingUp className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">
            Welcome to Stock Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Search for a stock ticker above to get started. See AI-powered price
            predictions and news analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
