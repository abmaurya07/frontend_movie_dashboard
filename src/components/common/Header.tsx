/**
 * Header Component
 * 
 * Main header component for the movie dashboard that includes:
 * - Dashboard title
 * - Year selector dropdown for filtering movie data
 * 
 * @param {number} selectedYear - Currently selected year for filtering
 * @param {Function} onYearChange - Callback function when year selection changes
 * @param {number[]} years - Array of available years to select from
 */
import React from 'react';

interface HeaderProps {
  selectedYear: number;
  onYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
}

const Header: React.FC<HeaderProps> = ({ selectedYear, onYearChange, years }) => {
  return (
    <header className="w-full bg-white shadow-lg rounded-xl mb-6 sm:mb-8 sm:top-4 z-10">
      <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Movie Analytics Dashboard
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <label htmlFor="year" className="text-sm font-medium text-gray-700">
                Year:
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={onYearChange}
                className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 