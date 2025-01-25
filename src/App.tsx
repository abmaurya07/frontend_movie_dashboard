import React, { FC } from 'react';
import Dashboard from './components/Dashboard';
import { MovieDataProvider } from './context/MovieDataContext';
import { MovieStatsProvider } from './context/MovieStatsContext';

const App: FC = () => {
  return (
    <div className="w-screen min-h-screen">
      <MovieDataProvider>
        <MovieStatsProvider>
          <Dashboard />
        </MovieStatsProvider>
      </MovieDataProvider>
    </div>
  );
};

export default App; 