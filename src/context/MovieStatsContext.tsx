import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { MovieStats } from '../types/movie.types';
import movieService from '../services/movieService';

interface CacheEntry {
  data: MovieStats[];
  timestamp: number;
}

interface MovieStatsContextType {
  getStats: (startYear: number, endYear?: number) => Promise<MovieStats[]>;
  isLoading: boolean;
  error: string | null;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const MovieStatsContext = createContext<MovieStatsContextType | null>(null);

export const useMovieStats = () => {
  const context = useContext(MovieStatsContext);
  if (!context) {
    throw new Error('useMovieStats must be used within a MovieStatsProvider');
  }
  return context;
};

export const MovieStatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cache] = useState<Map<string, CacheEntry>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCacheKey = useCallback((startYear: number, endYear?: number): string => {
    return `stats-${startYear}-${endYear || startYear}`;
  }, []);

  const getStats = useCallback(async (startYear: number, endYear?: number): Promise<MovieStats[]> => {
    const cacheKey = getCacheKey(startYear, endYear);
    const cachedEntry = cache.get(cacheKey);
    
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
      return cachedEntry.data;
    }

    setIsLoading(true);
    setError(null);

    try {
      const stats = await movieService.getMovieStats(startYear, endYear);
      
      cache.set(cacheKey, {
        data: stats,
        timestamp: Date.now()
      });

      return stats;
    } catch (error) {
      const errorMessage = 'Failed to fetch movie statistics. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching movie stats:', error);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [cache, getCacheKey]);

  const value = useMemo(() => ({
    getStats,
    isLoading,
    error
  }), [getStats, isLoading, error]);

  return (
    <MovieStatsContext.Provider value={value}>
      {children}
    </MovieStatsContext.Provider>
  );
}; 