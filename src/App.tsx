import React, { Suspense, startTransition, useState, useCallback } from 'react';
import {useQueryClient } from '@tanstack/react-query';

const StockOverview = React.lazy(() => import('./components/StockOverview'));
const HistoricalChart = React.lazy(() => import('./components/HistoricalChart'));

const App: React.FC = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAll = useCallback(() => {
    setIsRefreshing(true);
    startTransition(() => {
      queryClient.invalidateQueries();
      setIsRefreshing(false);
    });
  }, [queryClient]);


  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-6">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-blue-400">Financial data dashboard</h1>
        <button
          onClick={handleRefreshAll}
          disabled={isRefreshing}
          className={`px-6 py-3 rounded-lg font-bold transition duration-300 ${
            isRefreshing ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh All'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">

          <Suspense fallback={
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full animate-pulse">
              <h2 className="text-xl font-bold mb-4">Loading Stock Overview...</h2>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          }>
            <StockOverview />
          </Suspense>
        </div>

        <div className="lg:col-span-3 flex">
          <Suspense fallback={
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full animate-pulse flex-grow">
              <h2 className="text-xl font-bold mb-4">Loading Historical Chart...</h2>
              <div className="h-64 bg-gray-700 rounded w-full"></div>
            </div>
          }>
            <HistoricalChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;