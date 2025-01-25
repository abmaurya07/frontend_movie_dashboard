import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Movie, ChartType, ChartData } from '../types/movie.types';
import movieService from '../services/movieService';
import useWindowSize from '../hooks/useWindowSize';
import { CHART_CONFIG } from '../config/constants';

interface CacheEntry {
  data: ChartData;
  timestamp: number;
}

interface MovieDataContextType {
  getData: (type: ChartType, year?: number) => Promise<ChartData>;
  isLoading: boolean;
  error: string | null;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const MovieDataContext = createContext<MovieDataContextType | null>(null);

export const useMovieData = () => {
  const context = useContext(MovieDataContext);
  if (!context) {
    throw new Error('useMovieData must be used within a MovieDataProvider');
  }
  return context;
};

export const MovieDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cache] = useState<Map<string, CacheEntry>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isMobile } = useWindowSize();

  // Transform movies data to chart format
  const transformData = useCallback((movies: Movie[], type: ChartType): ChartData => ({
    labels: movies.map(movie => movie.title),
    datasets: [{
      label: type === 'rating' ? 'Rating' : 
             type === 'votes' ? 'Number of Votes' : 
             'Gross Revenue',
      data: movies.map(movie => 
        type === 'rating' ? movie.rating! : 
        type === 'votes' ? movie.votes! : 
        movie.gross!
      ),
      backgroundColor: type === 'rating' ? 
        movies.map(() => CHART_CONFIG.COLORS.RATING.BACKGROUND) :
        type === 'votes' ? CHART_CONFIG.COLORS.VOTES.BACKGROUND :
        CHART_CONFIG.COLORS.GROSS.BACKGROUND,
      borderColor: type === 'rating' ? CHART_CONFIG.COLORS.RATING.BORDER :
                  type === 'votes' ? CHART_CONFIG.COLORS.VOTES.BORDER :
                  CHART_CONFIG.COLORS.GROSS.BORDER,
      borderWidth: 1,
      ...(type === 'votes' && {
        tension: 0.3,
        pointRadius: isMobile ? 4 : 6,
        pointHoverRadius: isMobile ? 6 : 8,
        pointBackgroundColor: CHART_CONFIG.COLORS.VOTES.BORDER,
        pointBorderColor: 'white',
        pointBorderWidth: isMobile ? 1.5 : 2,
      })
    }]
  }), [isMobile]);

  const getCacheKey = useCallback((type: ChartType, year?: number): string => {
    return `${type}-${year || 'all'}`;
  }, []);

  const getData = useCallback(async (type: ChartType, year?: number): Promise<ChartData> => {
    const cacheKey = getCacheKey(type, year);
    const cachedEntry = cache.get(cacheKey);
    
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
      return cachedEntry.data;
    }

    setIsLoading(true);
    setError(null);

    try {
      let movies: Movie[] = [];
      
      switch (type) {
        case 'rating':
          movies = await movieService.getTopRatedMovies(year);
          break;
        case 'votes':
          movies = await movieService.getTopVotedMovies();
          break;
        case 'gross':
          movies = await movieService.getTopGrossingMovies(year);
          break;
      }

      const chartData = transformData(movies, type);
      
      cache.set(cacheKey, {
        data: chartData,
        timestamp: Date.now()
      });

      return chartData;
    } catch (error) {
      const errorMessage = `Failed to fetch ${type} data. Please try again later.`;
      setError(errorMessage);
      console.error(`Error fetching ${type} data:`, error);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [cache, transformData, getCacheKey]);

  const value = useMemo(() => ({
    getData,
    isLoading,
    error
  }), [getData, isLoading, error]);

  return (
    <MovieDataContext.Provider value={value}>
      {children}
    </MovieDataContext.Provider>
  );
}; 