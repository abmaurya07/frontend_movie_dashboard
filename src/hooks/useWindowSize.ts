import { useState, useEffect } from 'react';
import { CHART_CONFIG } from '../config/constants';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

/**
 * Custom hook for handling window resize events
 * Returns current window dimensions and mobile status
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < CHART_CONFIG.BREAKPOINTS.MOBILE
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < CHART_CONFIG.BREAKPOINTS.MOBILE
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize; 