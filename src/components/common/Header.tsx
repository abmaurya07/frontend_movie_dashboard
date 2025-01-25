/**
 * Header Component
 * 
 * Main header component for the movie dashboard
 */
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-lg rounded-xl mb-6 sm:mb-8 sm:top-4 z-10">
      <div className="mx-auto py-4 sm:py-6 px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Movie Analytics Dashboard
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 