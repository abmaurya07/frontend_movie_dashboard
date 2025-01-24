import axios from 'axios';
import { Movie, MovieStats } from '../types/movie.types';
import { API_CONFIG } from '../config/constants';

const API_BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MOVIES}`;

/**
 * Service for handling all movie-related API calls
 */
const movieService = {
  /**
   * Fetch top rated movies for a given year
   */
  getTopRatedMovies: async (year?: number): Promise<Movie[]> => {
    const response = await axios.get<Movie[]>(
      `${API_BASE_URL}/top-by-rating/${year ? `?year=${year}` : ''}`
    );
    return response.data;
  },

  /**
   * Fetch top movies by number of votes
   */
  getTopVotedMovies: async (): Promise<Movie[]> => {
    const response = await axios.get<Movie[]>(`${API_BASE_URL}/top-by-votes/`);
    return response.data;
  },

  /**
   * Fetch top grossing movies for a given year
   */
  getTopGrossingMovies: async (year?: number): Promise<Movie[]> => {
    const response = await axios.get<Movie[]>(
      `${API_BASE_URL}/top-by-gross/${year ? `?year=${year}` : ''}`
    );
    return response.data;
  },

  /**
   * Fetch movie statistics for a year range
   */
  getMovieStats: async (startYear: number, endYear?: number): Promise<MovieStats[]> => {
    const response = await axios.get<MovieStats[]>(
      `${API_BASE_URL}/year-stats/?start_year=${startYear}&end_year=${endYear || startYear}&min_movies=1`
    );
    return response.data;
  }
};

export default movieService; 