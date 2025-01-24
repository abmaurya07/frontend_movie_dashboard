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
- GraphQL with Apollo Client
- Chart.js for data visualization
- TailwindCSS for styling
- Vite as build tool

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
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
- @apollo/server: ^4.9.3
- bcrypt: ^5.1.1
- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- graphql: ^16.8.0
- jsonwebtoken: ^9.0.2
- mongoose: ^7.5.1

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
