import { ChartOptions } from 'chart.js';

export interface ColorConfig {
  BACKGROUND: string;
  BORDER: string;
}

export interface ChartColors {
  RATING: ColorConfig;
  VOTES: ColorConfig;
  GROSS: ColorConfig;
}

export interface ChartBreakpoints {
  MOBILE: number;
}

export interface ChartLimits {
  TOP_RATED: number;
  TOP_VOTED: number;
  TOP_GROSS: number;
}

export interface ChartAnimation {
  DURATION: number;
  EASING: string;
}

export interface ChartConfig {
  BREAKPOINTS: ChartBreakpoints;
  COLORS: ChartColors;
  LIMITS: ChartLimits;
  ANIMATION: ChartAnimation;
}

export interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: {
    MOVIES: string;
  };
}

export interface FontSizes {
  XS: string;
  SM: string;
  BASE: string;
  LG: string;
  XL: string;
  '2XL': string;
  '3XL': string;
}

export interface Spacing {
  XS: string;
  SM: string;
  MD: string;
  LG: string;
}

export interface ColorVariant {
  LIGHT?: string;
  DEFAULT: string;
}

export interface UiColors {
  PRIMARY: ColorVariant;
  SUCCESS: ColorVariant;
  INFO: ColorVariant;
  ERROR: ColorVariant;
}

export interface UiConfig {
  FONTS: {
    SIZES: FontSizes;
  };
  SPACING: Spacing;
  COLORS: UiColors;
}

export interface ChartScaleOptions {
  display?: boolean;
  border?: {
    display?: boolean;
  };
  grid?: {
    display?: boolean;
  };
  ticks?: {
    maxRotation?: number;
    minRotation?: number;
    font?: {
      size?: number;
    };
    padding?: number;
    callback?: (value: any) => string;
  };
}

export interface CustomChartOptions extends Omit<ChartOptions, 'scales'> {
  scales?: {
    x?: ChartScaleOptions;
    y?: ChartScaleOptions;
  };
} 