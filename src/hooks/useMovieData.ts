import { useState, useEffect, useCallback } from 'react';
import { Movie, ChartType, ChartData } from '../types/movie.types';
import movieService from '../services/movieService';
import useWindowSize from './useWindowSize';
import { CHART_CONFIG } from '../config/constants';

interface UseMovieDataProps {
  type: ChartType;
  year?: number;
}

interface UseMovieDataReturn {
  data: ChartData;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching movie data based on type and year
 * Handles data transformation for charts
 */
const useMovieData = ({ type, year }: UseMovieDataProps): UseMovieDataReturn => {
  const [data, setData] = useState<ChartData>({ labels: [], datasets: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile } = useWindowSize();

  // Transform movies data to chart format
  const transformData = useCallback((movies: Movie[]): ChartData => ({
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
  }), [type, isMobile]);

  // Fetch data when type or year changes
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      
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

        if (!isMounted) return;

        const chartData = transformData(movies);
        setData(chartData);
      } catch (error) {
        if (!isMounted) return;
        setError(`Failed to fetch ${type} data. Please try again later.`);
        console.error(`Error fetching ${type} data:`, error);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [type, year, transformData]);

  return { data, isLoading, error };
};

export default useMovieData; 