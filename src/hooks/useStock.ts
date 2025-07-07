import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedStock, setTimeRange } from '../store/reducers/stockSlice';
import { fetchIntradayData, fetchDailyData } from '../api/alphaVantage';
import moment from 'moment';

export const predefinedStocks = ['AAPL', 'MSFT', 'GOOGL'];

export const timeRangeOptions = [
  { label: '1 Week', value: '1week' },
  { label: '1 Month', value: '1month' },
  { label: '3 Months', value: '3months' },
];

export interface StockOverviewData {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
}

export interface HistoricalDataPoint {
  date: string;
  close: number;
}

export const useStock = () => {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state: RootState) => state.preferences.selectedStock);
  const timeRange = useSelector((state: RootState) => state.preferences.timeRange);

  const handleStockChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedStock(event.target.value));
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimeRange(event.target.value as '1week' | '1month' | '3months'));
  };

  const overviewQuery = useQuery<StockOverviewData>({
    queryKey: ['stockOverview', selectedStock],
    queryFn: async () => {
      const intradayData = await fetchIntradayData(selectedStock);
      const timeSeries = intradayData["Time Series (5min)"];
      if (!timeSeries) {
        throw new Error("No intraday data available for the selected stock.");
      }
      const latestTimestamp = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTimestamp];

      return {
        symbol: intradayData["Meta Data"]["2. Symbol"],
        price: parseFloat(latestData["4. close"]),
        open: parseFloat(latestData["1. open"]),
        high: parseFloat(latestData["2. high"]),
        low: parseFloat(latestData["3. low"]),
      };
    },
    refetchInterval: 60000,
    staleTime: 50000,
  });

  const historicalQuery = useQuery<HistoricalDataPoint[]>({
    queryKey: ['historicalData', selectedStock, timeRange],
    queryFn: async () => {
      const dailyData = await fetchDailyData(selectedStock, 'full');
      const timeSeries = dailyData["Time Series (Daily)"];
      if (!timeSeries) {
        throw new Error("No daily data available for the selected stock.");
      }

      const rawData = Object.keys(timeSeries).map(date => ({
        date: date,
        close: parseFloat(timeSeries[date]["4. close"]),
      })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      let filteredData = [];

      switch (timeRange) {
        case '1week':
          filteredData = rawData.filter(d => moment(d.date).isAfter(moment().subtract(7, 'days')));
          break;
        case '1month':
          filteredData = rawData.filter(d => moment(d.date).isAfter(moment().subtract(1, 'month')));
          break;
        case '3months':
          filteredData = rawData.filter(d => moment(d.date).isAfter(moment().subtract(3, 'months')));
          break;
        default:
          filteredData = rawData;
      }

      return filteredData.slice(-30);
    },
    refetchInterval: 300000,
    staleTime: 240000,
  });

  return {
    selectedStock,
    timeRange,
    predefinedStocks,
    timeRangeOptions,
    handleStockChange,
    handleTimeRangeChange,
    overviewQuery,
    historicalQuery,
  };
};