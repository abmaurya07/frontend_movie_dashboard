export interface Movie {
  id: string;
  title: string;
  rating?: number;
  votes?: number;
  gross?: number;
  year: number;
}

export interface MovieStats {
  total_movies: number;
  average_rating: number;
  average_gross: number;
  year: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    tension?: number;
    pointRadius?: number;
    pointHoverRadius?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointBorderWidth?: number;
  }[];
}

export type ChartType = 'rating' | 'votes' | 'gross'; 