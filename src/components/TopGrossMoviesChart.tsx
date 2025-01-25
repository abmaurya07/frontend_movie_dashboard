import React, { FC } from 'react';
import MovieChart from './common/MovieChart';
import MovieStats from './common/MovieStats';
import { ChartData } from '../types/movie.types';

interface TopGrossMoviesChartProps {
  year: number;
  data: ChartData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Component to display top grossing movies chart
 * Shows bar chart of top 5 movies by gross revenue
 */
const TopGrossMoviesChart: FC<TopGrossMoviesChartProps> = ({ 
  year,
  data,
  isLoading,
  error
}) => {
  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4'>
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-0.5 sm:mb-1">
            Box Office Performance
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Top grossing movies of {year}
          </p>
        </div>
        {/* Stats Section */}
        <div className="w-full sm:w-auto">
          <MovieStats startYear={year} type='gross'/>
        </div>
      </div>
      <MovieChart 
        type="gross"
        data={data || { labels: [], datasets: [] }}
        year={year}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TopGrossMoviesChart; 