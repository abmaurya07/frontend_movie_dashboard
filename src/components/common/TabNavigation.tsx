/**
 * TabNavigation Component
 * 
 * A navigation component that displays three tabs for different movie categories:
 * - Top Rated (Star icon)
 * - Top Voted (Arrow Up icon)
 * - Top Grossing (Dollar Circle icon)
 * 
 * @param {ChartType} activeTab - Currently active tab
 * @param {Function} onTabChange - Callback function when tab is changed
 */
import React from 'react';
import { ChartType } from '../../types/movie.types';

interface TabNavigationProps {
  activeTab: ChartType;
  onTabChange: (tab: ChartType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  // Define tabs with their respective icons and labels
  const tabs = [
    {
      id: 'rating' as ChartType,
      label: 'Top Rated',
      icon: (
        // Star Icon - Represents movie ratings
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      id: 'votes' as ChartType,
      label: 'Top Voted',
      icon: (
        // Chevron Up Icon - Represents vote count/popularity
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      ),
    },
    {
      id: 'gross' as ChartType,
      label: 'Top Grossing',
      icon: (
        // Currency Circle Icon - Represents box office earnings
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    // Sticky navigation container with gradient background
    <div className="mb-6 sm:mb-8 sticky top-0 bg-gradient-to-br from-blue-50 to-indigo-100 py-4 z-20 after:content-[''] after:block after:h-1 after:invisible">
      <div className="border-b border-gray-200">
        {/* Horizontal scrollable navigation */}
        <nav className="-mb-px flex overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 sm:space-x-4 px-4 sm:px-0 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-white border-indigo-500 text-indigo-600 shadow-sm'
                    : 'border-transparent text-gray-300 hover:text-gray-400 hover:border-gray-300'
                } flex items-center px-4 py-2 border-b-2 font-medium text-sm transition-all duration-200 flex-shrink-0 focus:outline-none`}
              >
                <span className="flex items-center space-x-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation; 