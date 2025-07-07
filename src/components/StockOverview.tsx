import React from 'react';
import { useStock } from '../hooks/useStock';

const StockOverview = () => {
  const { 
    selectedStock, 
    predefinedStocks, 
    handleStockChange, 
    overviewQuery: { data, isLoading, isError, error } 
  } = useStock();

  if (isLoading) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full animate-pulse">
        <h2 className="text-xl font-bold mb-4">Stock Overview</h2>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-700 text-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-bold mb-4">Stock Overview - Error</h2>
        <p>{error?.message || "Failed to fetch stock data."}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Stock Overview</h2>

      <div className="mb-4">
        <label htmlFor="stock-select" className="block text-gray-400 text-sm font-bold mb-2">Select Stock:</label>
        <select
          id="stock-select"
          value={selectedStock}
          onChange={handleStockChange}
          className="block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
        >
          {predefinedStocks.map(stock => (
            <option key={stock} value={stock}>{stock}</option>
          ))}
        </select>
      </div>

      {data && (
        <div className="flex-grow">
          <p className="text-3xl font-semibold mb-2">${data.price.toFixed(2)}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p><span className="text-gray-400">Open:</span> ${data.open.toFixed(2)}</p>
            <p><span className="text-gray-400">High:</span> ${data.high.toFixed(2)}</p>
            <p><span className="text-gray-400">Low:</span> ${data.low.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockOverview;
