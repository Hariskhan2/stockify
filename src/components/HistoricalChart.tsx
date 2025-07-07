import React, { useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import { useStock } from '../hooks/useStock';

const HistoricalChart= () => {
  const { 
    selectedStock, 
    timeRange, 
    timeRangeOptions, 
    handleTimeRangeChange, 
    historicalQuery: { data, isLoading, isError, error } 
  } = useStock();

  const formatXAxis = useCallback((tickItem: string) => {
    return moment(tickItem).format('MMM DD');
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full animate-pulse flex-grow">
        <h2 className="text-xl font-bold mb-4">Historical Data Chart</h2>
        <div className="h-64 bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-700 text-white p-6 rounded-lg shadow-md w-full flex-grow">
        <h2 className="text-xl font-bold mb-4">Historical Data Chart - Error</h2>
        <p>{error?.message || "Failed to fetch historical data."}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full flex flex-col flex-grow">
      <h2 className="text-xl font-bold mb-4">Historical Data Chart ({selectedStock})</h2>

      <div className="mb-4">
        <label htmlFor="time-range-select" className="block text-gray-400 text-sm font-bold mb-2">Time Range:</label>
        <select
          id="time-range-select"
          value={timeRange}
          onChange={handleTimeRangeChange}
          className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
        >
          {timeRangeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300} className="flex-grow">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="#cbd5e0" />
            <YAxis stroke="#cbd5e0" domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', borderRadius: '4px' }}
              labelStyle={{ color: '#cbd5e0' }}
              itemStyle={{ color: '#a0aec0' }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
              labelFormatter={(label: string) => `Date: ${moment(label).format('MMM DD, YYYY')}`}
            />
            <Legend wrapperStyle={{ color: '#cbd5e0', paddingTop: '10px' }} />
            <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} name="Closing Price" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-gray-400 mt-8">No historical data available for the selected range.</div>
      )}
    </div>
  );
};

export default HistoricalChart;
