import React, { FC, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartType } from '../../types/movie.types';
import { generateChartOptions } from '../../utils/chartConfig';
import useWindowSize from '../../hooks/useWindowSize';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MovieChartProps {
  type: ChartType;
  data: ChartData;
  year?: number;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Reusable chart component for displaying movie data
 * Supports different chart types (bar/line) and responsive design
 */
const MovieChart: FC<MovieChartProps> = ({ 
  type, 
  data, 
  year,
  isLoading = false,
  error = null 
}) => {
  const { isMobile } = useWindowSize();

  // Update chart options when window size changes
  const options = generateChartOptions(type, isMobile, year);
  const ChartComponent = type === 'votes' ? Line : Bar;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          type === 'rating' ? 'border-pink-500' :
          type === 'votes' ? 'border-teal-500' :
          'border-blue-500'
        }`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ChartComponent 
        options={options} 
        data={data}
        redraw={true}
      />
    </div>
  );
};

export default MovieChart; 