
const ALPHA_VANTAGE_API_KEY = "PDPCE14PES7U20M6";
const BASE_URL = "https://www.alphavantage.co/query";

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export const stockService = {
  async getQuote(symbol: string): Promise<StockQuote | null> {
    try {
      const response = await fetch(
        `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      
      const quote = data["Global Quote"];
      if (!quote || !quote["05. price"]) {
        console.warn(`No quote data found for ${symbol}`, data);
        return null;
      }

      return {
        symbol: quote["01. symbol"],
        price: parseFloat(quote["05. price"]),
        change: parseFloat(quote["09. change"]),
        changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
      };
    } catch (error) {
      console.error(`Error fetching quote for ${symbol}:`, error);
      return null;
    }
  }
};
