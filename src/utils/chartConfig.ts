import { ChartType } from '../types/movie.types';
import { CustomChartOptions } from '../types/config.types';

interface ResponsiveSizes {
  titleSize: number;
  legendSize: number;
  tickSize: number;
  labelSize: number;
  padding: number;
}

/**
 * Get responsive font sizes based on screen width
 */
const getResponsiveSizes = (isMobile: boolean): ResponsiveSizes => ({
  titleSize: isMobile ? 14 : 16,
  legendSize: isMobile ? 10 : 12,
  tickSize: isMobile ? 10 : 12,
  labelSize: isMobile ? 8 : 11,
  padding: isMobile ? 5 : 10,
});

interface ChartTypeConfig {
  title: string;
  yAxisMax?: number;
  backgroundColor: string;
  borderColor: string;
}

/**
 * Get chart title and formatting based on chart type
 */
const getChartConfig = (type: ChartType, year?: number): ChartTypeConfig => {
  switch (type) {
    case 'rating':
      return {
        title: `Top 10 Movies by Rating ${year ? `(${year})` : ''}`,
        yAxisMax: 10,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
      };
    case 'votes':
      return {
        title: 'Top 5 Movies of All Time by Votes',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
      };
    case 'gross':
      return {
        title: `Top 5 Movies by Gross Revenue ${year ? `(${year})` : ''}`,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
      };
  }
};

/**
 * Format large numbers for display
 */
export const formatNumber = (value: number, isMobile: boolean): string => {
  if (isMobile) {
    return value >= 1000000 
      ? `${(value / 1000000).toFixed(1)}M` 
      : `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
};

/**
 * Generate chart options based on type and screen size
 */
export const generateChartOptions = (
  type: ChartType, 
  isMobile: boolean,
  year?: number
): CustomChartOptions => {
  const sizes = getResponsiveSizes(isMobile);
  const config = getChartConfig(type, year);

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: sizes.legendSize },
          boxWidth: isMobile ? 30 : 40,
          padding: sizes.padding
        }
      },
      title: {
        display: true,
        text: config.title,
        font: {
          size: sizes.titleSize,
          weight: 'bold'
        },
        padding: {
          top: sizes.padding,
          bottom: sizes.padding * 1.5
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        titleFont: { size: sizes.legendSize },
        bodyFont: { size: sizes.legendSize },
        padding: sizes.padding,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            switch (type) {
              case 'rating':
                return `Rating: ${value.toFixed(1)}`;
              case 'votes':
                return `Votes: ${formatNumber(value, isMobile)}`;
              case 'gross':
                return `Revenue: $${formatNumber(value, isMobile)}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        display: true,
        grid: {
          display: !isMobile
        },
        border: {
          display: false
        },
        ticks: {
          callback: (value: any) => {
            if (type === 'gross') return '$' + formatNumber(value, isMobile);
            if (type === 'votes') return formatNumber(value, isMobile);
            return value;
          },
          font: { size: sizes.tickSize },
          maxRotation: isMobile ? 45 : 30,
          minRotation: isMobile ? 45 : 30,
          padding: sizes.padding
        }
      },
      x: {
        display: true,
        grid: {
          display: !isMobile
        },
        border: {
          display: false
        },
        ticks: {
          maxRotation: isMobile ? 45 : 30,
          minRotation: isMobile ? 45 : 30,
          font: { size: sizes.labelSize },
          padding: sizes.padding
        }
      }
    }
  };
}; 