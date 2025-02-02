# Frontend Movie Dashboard

A modern React-based dashboard application for visualizing movie statistics and data using interactive charts.

## Features

- Interactive movie charts and statistics
- Responsive design with mobile support
- Real-time data visualization
- Top rated movies visualization
- Most voted movies charts
- Top grossing movies analysis
- Dynamic chart animations

## Tech Stack

- React with TypeScript
- Chart.js for data visualization
- TailwindCSS for styling
- Vite as build tool
- Docker for containerization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Docker (for containerized deployment)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/abmaurya07/frontend_movie_dashboard.git
cd frontend_movie_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_MOVIES_ENDPOINT=/api/movies
VITE_CHART_MOBILE_BREAKPOINT=640
VITE_CHART_TOP_RATED_LIMIT=10
VITE_CHART_TOP_VOTED_LIMIT=5
VITE_CHART_TOP_GROSS_LIMIT=5
VITE_CHART_ANIMATION_DURATION=1000
VITE_CHART_ANIMATION_EASING=easeInOutQuart
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t movie-dashboard .
```

2. Run the container:
```bash
docker run -p 3000:80 movie-dashboard
```

The application will be available at `http://localhost:3000`

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # React components
├── config/        # Configuration files
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Dependencies

Main dependencies include:
- @headlessui/react: ^2.2.0
- @heroicons/react: ^2.2.0
- axios: ^1.7.9
- chart.js: ^4.4.7
- depcheck: ^1.4.7
- lucide-react: ^0.474.0
- react: ^18.3.1
- react-chartjs-2: ^5.3.0
- react-dom: ^18.3.1
- recharts: ^2.15.0

## License

This project is licensed under the MIT License - see the LICENSE file for details.
