// A simple pseudo-random number generator for deterministic "randomness"
class PRNG {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }
  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed;
  }
  nextFloat() {
    return (this.next() - 1) / 2147483645;
  }
}


export function generateHistoricalData(timeframe: string) {
  const now = new Date();
  let days;
  switch (timeframe) {
    case '1m':
      days = 30;
      break;
    case '6m':
      days = 180;
      break;
    case '1y':
      days = 365;
      break;
    default:
      days = 180;
  }

  const data = [];
  let currentPrice = 150 + new PRNG(days).nextFloat() * 50;

  for (let i = days; i > 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Simple random walk for price
    const change = (new PRNG(i).nextFloat() - 0.49) * 5;
    currentPrice += change;
    if (currentPrice < 50) currentPrice = 50;
    if (currentPrice > 300) currentPrice = 300;
    
    data.push({
      date: date.toISOString().split('T')[0],
      close: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return data;
}

export function generateFutureDates(timeframe: string): string[] {
    const now = new Date();
    let days;
    switch (timeframe) {
      case '1m': days = 30; break;
      case '6m': days = 180; break;
      case '1y': days = 365; break;
      default: days = 180;
    }

    const dates = [];
    for (let i = 1; i <= days; i++) {
        const futureDate = new Date(now);
        futureDate.setDate(now.getDate() + i);
        dates.push(futureDate.toISOString().split('T')[0]);
    }
    return dates;
}

export function getNewsArticles(ticker: string) {
    const articles = [
      `${ticker} announced a new product line, causing a stir in the market. Analysts are optimistic about its potential.`,
      `Economic headwinds are causing concern for ${ticker}'s international sales, with experts predicting a slight downturn.`,
      `A new partnership with a major tech firm could see ${ticker}'s stock soar in the coming months, according to insiders.`,
      `Quarterly earnings for ${ticker} exceeded expectations, driving a positive sentiment among investors.`,
      `Regulatory changes may impact ${ticker}'s operational costs, a potential risk highlighted in their latest report.`
    ];
    return articles;
}
