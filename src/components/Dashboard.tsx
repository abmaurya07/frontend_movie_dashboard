import React, { FC, useState, useCallback, useEffect } from 'react';
import { ChartType, ChartData } from '../types/movie.types';
import Header from './common/Header';
import TabNavigation from './common/TabNavigation';
import ChartContainer from './common/ChartContainer';
import { useMovieData } from '../context/MovieDataContext';

interface ChartState {
  data: ChartData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Main dashboard component
 * Manages chart selection and year filtering
 */
const Dashboard: FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [activeTab, setActiveTab] = useState<ChartType>('rating');
  const [chartState, setChartState] = useState<ChartState>({
    data: null,
    isLoading: true,
    error: null
  });
  
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);
  const { getData, isLoading: isCacheLoading, error: cacheError } = useMovieData();

  // Fetch data when year changes (not on tab changes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setChartState(prev => ({ ...prev, isLoading: true, error: null }));
        const data = await getData(activeTab, activeTab !== 'votes' ? selectedYear : undefined);
        setChartState({ data, isLoading: false, error: null });
      } catch (error) {
        setChartState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch data'
        }));
      }
    };

    fetchData();
  }, [selectedYear, getData]); // Remove activeTab from dependencies

  // Handle tab change - fetch data only if not in cache
  const handleTabChange = useCallback(async (tab: ChartType) => {
    setActiveTab(tab);
    try {
      const data = await getData(tab, tab !== 'votes' ? selectedYear : undefined);
      setChartState({ data, isLoading: false, error: null });
    } catch (error) {
      setChartState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to fetch data'
      }));
    }
  }, [selectedYear, getData]);

  // Handle year change
  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(event.target.value);
    if (!isNaN(year) && year > 1900 && year <= currentYear) {
      setSelectedYear(year);
    }
  }, [currentYear]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full p-3 sm:p-6">
        <Header />

        <main className="w-full mx-auto">
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            years={years}
          />

          <ChartContainer 
            activeTab={activeTab}
            selectedYear={selectedYear}
            chartData={chartState.data}
            isLoading={chartState.isLoading || isCacheLoading}
            error={chartState.error || cacheError}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 