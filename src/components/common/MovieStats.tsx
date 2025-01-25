import React, { FC, useEffect, useState } from 'react';
import { MovieStats as MovieStatsType } from '../../types/movie.types';
import movieService from '../../services/movieService';
import { UI_CONFIG } from '../../config/constants';

interface MovieStatsProps {
  startYear: number;
  endYear?: number;
  type?: 'rating' | 'gross';
}

/**
 * Component to display movie statistics for a given year or range
 * Shows total movies and average rating
 */
const MovieStats: FC<MovieStatsProps> = ({ startYear, endYear, type = 'rating' }) => {
  const [stats, setStats] = useState<MovieStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const statsData = await movieService.getMovieStats(startYear, endYear);
        const yearStats = statsData.find(stat => stat.year === startYear) || {
          total_movies: 0,
          average_rating: 0,
          average_gross: 0,
          year: startYear
        };
        
        setStats(yearStats);
      } catch (error) {
        setError('Failed to fetch stats. Please try again later.');
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [startYear, endYear]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 w-full">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-3 sm:p-4 animate-pulse">
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 mb-2 sm:mb-3" />
            <div className="h-6 sm:h-7 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center p-3 sm:p-4 ${UI_CONFIG.COLORS.ERROR.DEFAULT}`}>
        <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className={`${UI_CONFIG.FONTS.SIZES.SM} sm:${UI_CONFIG.FONTS.SIZES.BASE}`}>{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className={`w-full max-w-screen-lg mx-auto ${UI_CONFIG.SPACING.SM} sm:${UI_CONFIG.SPACING.MD}`}>
      <div className="flex items-start justify-start">
        <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full ${UI_CONFIG.FONTS.SIZES.XS} sm:${UI_CONFIG.FONTS.SIZES.SM} ${UI_CONFIG.COLORS.PRIMARY.LIGHT} ${UI_CONFIG.COLORS.PRIMARY.DEFAULT}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Stats Overview
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className={`${UI_CONFIG.FONTS.SIZES.BASE} sm:${UI_CONFIG.FONTS.SIZES.LG} font-semibold text-gray-700`}>Total Movies</h3>
            <span className={`p-1.5 sm:p-2 ${UI_CONFIG.COLORS.INFO.LIGHT} rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 ${UI_CONFIG.COLORS.INFO.DEFAULT}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </span>
          </div>
          <p className={`${UI_CONFIG.FONTS.SIZES.XL} sm:${UI_CONFIG.FONTS.SIZES['2XL']} md:${UI_CONFIG.FONTS.SIZES['3XL']} font-bold ${UI_CONFIG.COLORS.INFO.DEFAULT} mt-2 sm:mt-3`}>
            {stats.total_movies.toLocaleString()}
          </p>
          <p className={`${UI_CONFIG.FONTS.SIZES.XS} sm:${UI_CONFIG.FONTS.SIZES.SM} text-gray-500 mt-1 sm:mt-2`}>in {startYear}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className={`${UI_CONFIG.FONTS.SIZES.BASE} sm:${UI_CONFIG.FONTS.SIZES.LG} font-semibold text-gray-700`}>
              {type === 'rating' ? 'Average Rating' : 'Average Gross'}
            </h3>
            <span className={`p-1.5 sm:p-2 ${UI_CONFIG.COLORS.SUCCESS.LIGHT} rounded-lg`}>
              {type === 'rating' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 ${UI_CONFIG.COLORS.SUCCESS.DEFAULT}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 ${UI_CONFIG.COLORS.SUCCESS.DEFAULT}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </span>
          </div>
          <p className={`${UI_CONFIG.FONTS.SIZES.XL} sm:${UI_CONFIG.FONTS.SIZES['2XL']} md:${UI_CONFIG.FONTS.SIZES['3XL']} font-bold ${UI_CONFIG.COLORS.SUCCESS.DEFAULT} mt-2 sm:mt-3`}>
            {type === 'rating' 
              ? (stats.average_rating ? stats.average_rating.toFixed(1) : 'No Data')
              : (stats.average_gross ? `$${(stats.average_gross / 1000000).toFixed(1)}M` : 'No Data')}
          </p>
          <p className={`${UI_CONFIG.FONTS.SIZES.XS} sm:${UI_CONFIG.FONTS.SIZES.SM} text-gray-500 mt-1 sm:mt-2`}>
            average {type} for {startYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieStats; 