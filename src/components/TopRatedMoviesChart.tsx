import React, { FC } from 'react';
import MovieChart from './common/MovieChart';
import MovieStats from './common/MovieStats';
import useMovieData from '../hooks/useMovieData';

interface TopRatedMoviesChartProps {
  year: number;
}

/**
 * Component to display top rated movies chart
 * Shows bar chart of top 10 movies by rating
 */
const TopRatedMoviesChart: FC<TopRatedMoviesChartProps> = ({ year }) => {
  const { data, isLoading, error } = useMovieData({ 
    type: 'rating',
    year 
  });

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-0.5 sm:mb-1">
            Audience Ratings
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Top rated movies of {year}
          </p>
        </div>
        {/* Stats Section */}
        <div className="w-full sm:w-auto">
          <MovieStats startYear={year} type='rating'/>
        </div>
      </div>
      <MovieChart 
        type="rating"
        data={data}
        year={year}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TopRatedMoviesChart; 