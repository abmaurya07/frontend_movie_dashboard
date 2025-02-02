import React, { FC } from 'react';
import MovieChart from './common/MovieChart';
import { ChartData } from '../types/movie.types';

interface TopVotedMoviesChartProps {
  data: ChartData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Component to display top voted movies chart
 * Shows line chart of top 5 movies by number of votes
 */
const TopVotedMoviesChart: FC<TopVotedMoviesChartProps> = ({ 
  data,
  isLoading,
  error
}) => {
  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-0.5 sm:mb-1">
          Audience Engagement
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">
          Most voted movies of all time
        </p>
      </div>
      <MovieChart 
        type="votes"
        data={data || { labels: [], datasets: [] }}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TopVotedMoviesChart; 