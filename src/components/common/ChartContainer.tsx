/**
 * ChartContainer Component
 * 
 * A container component that manages the display of different chart types:
 * - TopRatedMoviesChart (Bar chart)
 * - TopVotedMoviesChart (Line chart)
 * - TopGrossMoviesChart (Bar chart)
 * 
 * The component switches between charts based on the active tab selection
 * and provides a consistent layout wrapper with hover effects.
 * 
 * @param {ChartType} activeTab - Currently selected chart type
 * @param {number} selectedYear - Selected year for filtering chart data
 */
import React from 'react';
import { ChartType, ChartData } from '../../types/movie.types';
import TopRatedMoviesChart from '../TopRatedMoviesChart';
import TopVotedMoviesChart from '../TopVotedMoviesChart';
import TopGrossMoviesChart from '../TopGrossMoviesChart';

interface ChartContainerProps {
  activeTab: ChartType;
  selectedYear: number;
  chartData: ChartData | null;
  isLoading: boolean;
  error: string | null;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  activeTab, 
  selectedYear,
  chartData,
  isLoading,
  error
}) => {
  const renderActiveChart = () => {
    switch (activeTab) {
      case 'rating':
        return (
          <TopRatedMoviesChart 
            key={`rating-${selectedYear}`} 
            year={selectedYear}
            data={chartData}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'votes':
        return (
          <TopVotedMoviesChart 
            key="votes"
            data={chartData}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'gross':
        return (
          <TopGrossMoviesChart 
            key={`gross-${selectedYear}`} 
            year={selectedYear}
            data={chartData}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 transition-all duration-300 hover:shadow-xl">
      {renderActiveChart()}
    </div>
  );
};

export default ChartContainer; 