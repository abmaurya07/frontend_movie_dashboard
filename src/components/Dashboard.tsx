import React, { FC, useState, useCallback } from 'react';
import { ChartType } from '../types/movie.types';
import Header from './common/Header';
import TabNavigation from './common/TabNavigation';
import ChartContainer from './common/ChartContainer';

/**
 * Main dashboard component
 * Manages chart selection and year filtering
 */
const Dashboard: FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [activeTab, setActiveTab] = useState<ChartType>('rating');
  
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  // Handle year change
  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(event.target.value);
    if (!isNaN(year) && year > 1900 && year <= currentYear) {
      setSelectedYear(year);
    }
  }, [currentYear]);

  // Handle tab change
  const handleTabChange = useCallback((tab: ChartType) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full p-3 sm:p-6">
        <Header 
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          years={years}
        />

        <main className="w-full mx-auto">
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          <ChartContainer 
            activeTab={activeTab}
            selectedYear={selectedYear}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 