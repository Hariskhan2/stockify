export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface IntradayDataSuccess {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
  };
  "Time Series (5min)": {
    [timestamp: string]: TimeSeriesData;
  };
}

export interface DailyDataSuccess {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [date: string]: TimeSeriesData;
  };
}

export interface AlphaVantageErrorResponse {
  "Error Message"?: string;
  Note?: string;
}

export type IntradayData = IntradayDataSuccess | AlphaVantageErrorResponse;
export type DailyData = DailyDataSuccess | AlphaVantageErrorResponse;

export interface StockOverviewData {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
}

export interface HistoricalChartData {
  date: string;
  close: number;
}