import axios from 'axios';

const API_KEY = 'YYBIE619OMLI7CGG';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchIntradayData = async (symbol: string, interval: string = '5min') => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval,
      apikey: API_KEY,
    },
  });

  if (data['Error Message']) throw new Error(data['Error Message']);
  if (data.Note) throw new Error(data.Note || "API call limit reached.");

  return data;
};

export const fetchDailyData = async (symbol: string, outputsize: 'compact' | 'full' = 'compact') => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize,
      apikey: API_KEY,
    },
  });

  if (data['Error Message']) throw new Error(data['Error Message']);
  if (data.Note) throw new Error(data.Note || "API call limit reached.");

  return data;
};
