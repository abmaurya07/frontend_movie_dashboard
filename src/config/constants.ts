import { ApiConfig, ChartConfig, UiConfig } from '../types/config.types';

/**
 * API Configuration
 */
export const API_CONFIG: ApiConfig = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  ENDPOINTS: {
    MOVIES: import.meta.env.VITE_API_MOVIES_ENDPOINT || '/api/movies',
  }
} as const;

/**
 * Chart Configuration
 */
export const CHART_CONFIG: ChartConfig = {
  BREAKPOINTS: {
    MOBILE: Number(import.meta.env.VITE_CHART_MOBILE_BREAKPOINT) || 640,
  },
  COLORS: {
    RATING: {
      BACKGROUND: 'rgba(255, 99, 132, 0.5)',
      BORDER: 'rgb(255, 99, 132)',
    },
    VOTES: {
      BACKGROUND: 'rgba(75, 192, 192, 0.5)',
      BORDER: 'rgb(75, 192, 192)',
    },
    GROSS: {
      BACKGROUND: 'rgba(53, 162, 235, 0.5)',
      BORDER: 'rgb(53, 162, 235)',
    },
  },
  LIMITS: {
    TOP_RATED: Number(import.meta.env.VITE_CHART_TOP_RATED_LIMIT) || 10,
    TOP_VOTED: Number(import.meta.env.VITE_CHART_TOP_VOTED_LIMIT) || 5,
    TOP_GROSS: Number(import.meta.env.VITE_CHART_TOP_GROSS_LIMIT) || 5,
  },
  ANIMATION: {
    DURATION: Number(import.meta.env.VITE_CHART_ANIMATION_DURATION) || 1000,
    EASING: import.meta.env.VITE_CHART_ANIMATION_EASING || 'easeInOutQuart',
  },
} as const;

/**
 * UI Configuration
 */
export const UI_CONFIG: UiConfig = {
  FONTS: {
    SIZES: {
      XS: 'text-xs',
      SM: 'text-sm',
      BASE: 'text-base',
      LG: 'text-lg',
      XL: 'text-xl',
      '2XL': 'text-2xl',
      '3XL': 'text-3xl',
    },
  },
  SPACING: {
    XS: 'space-y-2',
    SM: 'space-y-3',
    MD: 'space-y-4',
    LG: 'space-y-6',
  },
  COLORS: {
    PRIMARY: {
      LIGHT: 'bg-blue-50',
      DEFAULT: 'text-blue-700',
    },
    SUCCESS: {
      LIGHT: 'bg-green-100',
      DEFAULT: 'text-green-600',
    },
    INFO: {
      LIGHT: 'bg-indigo-100',
      DEFAULT: 'text-indigo-600',
    },
    ERROR: {
      DEFAULT: 'text-red-500',
    },
  },
} as const; 