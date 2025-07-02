# Real-Time Stock Market Dashboard

A modern, responsive financial data dashboard built with React that displays live stock market data using the Alpha Vantage API.

## Features

- **Real-Time Stock Data**: Live stock prices with 5-minute interval updates
- **Historical Charts**: Interactive line charts showing stock performance over time
- **Multiple Stocks**: Support for AAPL, MSFT, GOOGL, and more
- **Concurrent Loading**: Widgets load independently using React Suspense
- **Auto-Refresh**: Background data updates every 5 minutes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **TanStack Query** (React Query) for data fetching and caching
- **Redux Toolkit** for state management
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **Alpha Vantage API** for stock market data

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alpha Vantage API key (free at [alphavantage.co](https://www.alphavantage.co/support/#api-key))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint
- `npm run typecheck` - Runs TypeScript type checking

## Project Structure

```
src/
├── api/           # API integration and endpoints
├── components/    # React components (widgets)
├── features/      # Redux slices
├── hooks/         # Custom React hooks
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## Key Features Implementation

### Concurrent Features
- React.lazy for code-splitting widgets
- Suspense boundaries with loading states
- startTransition for non-blocking updates

### Data Management
- TanStack Query for efficient data fetching
- 5-minute cache and automatic background refetching
- Redux for global state (selected stock, time ranges)

### Performance Optimizations
- Memoized components and callbacks
- Lazy loading for better initial load time
- Optimized re-renders with React.memo

## API Rate Limits

Alpha Vantage free tier allows:
- 5 API requests per minute
- 500 requests per day

The app is optimized to work within these limits through intelligent caching.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.