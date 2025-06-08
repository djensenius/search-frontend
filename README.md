# 🐕 Dachshund.dev

[![CI](https://github.com/djensenius/search-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/djensenius/search-frontend/actions/workflows/ci.yml)
[![Deploy](https://github.com/djensenius/search-frontend/actions/workflows/main_dachshund.yml/badge.svg)](https://github.com/djensenius/search-frontend/actions/workflows/main_dachshund.yml)
[![Documentation](https://github.com/djensenius/search-frontend/actions/workflows/docs.yml/badge.svg)](https://github.com/djensenius/search-frontend/actions/workflows/docs.yml)

A lightning-fast search engine application built with React TypeScript and Node.js, featuring an adorable Dachshund mascot.

## ✨ Features

- **Fast Search**: Integration with Search Backend Demo API with advanced validation
- **Real-time Search**: Advanced search capabilities with pagination and metadata
- **Health Monitoring**: Live status indicators for backend and API services
- **Comprehensive Testing**: Unit tests for components, hooks, and API endpoints
- **CI/CD Pipeline**: Automated testing, building, and deployment workflows
- **API Documentation**: Auto-generated documentation with TypeDoc
- **Admin Interface**: Administrative endpoints for search statistics and indexing
- **Security**: Helmet security headers, CORS configuration, and input validation
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Search Backend Demo API (configured via `SEARCH_API_URL` environment variable)

### Installation

```bash
# Clone the repository
git clone https://github.com/djensenius/search-frontend.git
cd search-frontend

# Install dependencies
npm install

# Start development servers
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Environment Configuration

The application uses dotenv for environment variable management. Create a `.env` file in the backend directory to configure local development:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Search API Configuration
SEARCH_API_URL=http://localhost:3000

# Admin Interface Configuration (optional)
ADMIN_API_KEY=your-admin-key-here
```

#### Using dotenv locally:

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit the `.env` file with your configuration values

3. The backend automatically loads these variables using dotenv

#### Admin Interface:

Set the `ADMIN_API_KEY` environment variable to enable admin endpoints:
- `/admin/stats` - View search statistics  
- `/admin/top-queries` - View top search queries
- `/admin/force-index` - Force domain indexing

Admin endpoints require the `X-Admin-Key` header with your configured admin key.

## 📁 Project Structure

```
/
├── frontend/              # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts (theme management)
│   │   ├── utils/         # API services and utilities
│   │   ├── types/         # TypeScript type definitions
│   │   ├── assets/        # Static images and resources
│   │   └── test/          # Test utilities and setup
│   ├── public/            # Static assets
│   └── dist/              # Built frontend
├── backend/               # Node.js Express backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Business logic services (SearchService)
│   │   ├── middleware/    # Express middleware (auth, error handling)
│   │   └── types/         # TypeScript type definitions
│   ├── __tests__/         # Backend tests
│   └── dist/              # Built backend
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD workflows
└── package.json           # Root package.json for monorepo
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Building
npm run build            # Build both applications
npm run build:frontend   # Build only frontend
npm run build:backend    # Build only backend

# Testing
npm run test             # Run all tests
npm run test:frontend    # Run frontend tests
npm run test:backend     # Run backend tests

# Linting
npm run lint             # Lint all code
npm run lint:frontend    # Lint frontend code
npm run lint:backend     # Lint backend code

# Documentation
npm run docs             # Generate documentation
```

### Adding New Features

1. **Frontend Components**: Add to `frontend/src/components/`
2. **API Endpoints**: Add to `backend/src/routes/`
3. **Tests**: Add corresponding test files in `__tests__/` directories
4. **Types**: Update type definitions in respective `types/` directories

## 🧪 Testing

The project includes comprehensive test suites:

### Frontend Tests
- Component unit tests using React Testing Library
- User interaction testing with user-event
- Mock API responses and error handling

### Backend Tests
- API endpoint testing with Supertest
- Service layer unit tests
- Error handling and validation tests

Run tests with coverage:
```bash
npm run test:coverage
```

## 🎨 UI Components

### DachshundLogo
Custom image component featuring an adorable Dachshund dog mascot. Supports customizable size and CSS classes for flexible integration.

### SearchBar
Comprehensive search input component with validation, loading states, clear functionality, and keyboard navigation. Features auto-focus and disabled state management.

### SearchResults
Displays paginated search results with metadata including relevance scores, indexed dates, and result counts. Includes empty state handling and accessibility features.

### ThemeToggle
Dark/light theme switcher with system preference detection. Provides smooth transitions and proper ARIA labels for accessibility.

## 🔌 API Integration

The backend serves as a proxy to the Search Backend Demo API with additional features:

### Endpoints

#### Public Endpoints
- `GET /api/health` - Backend health check with service information
- `GET /api/search` - Search proxy with Zod validation (query, limit, offset parameters)
- `GET /api/search/health` - Search API health check with status and timestamp
- `POST /api/index` - Submit domains for indexing (requires domains array in request body)

#### Admin Endpoints (require X-Admin-Key header)
- `GET /api/admin/stats` - Get comprehensive search statistics
- `GET /api/admin/top-queries` - Get top search queries with usage data
- `POST /api/admin/force-index` - Force start domain indexing process

### Features

- Request validation with Zod
- Error handling and logging
- CORS configuration
- Security headers with Helmet
- Admin authentication with API key

## 🚦 CI/CD Pipeline

### Continuous Integration
- **Linting**: ESLint for code quality
- **Testing**: Jest and Vitest for comprehensive testing
- **Building**: Ensures all code compiles successfully

### Deployment
- **Azure App Service**: Automated deployment on main branch
- **GitHub Pages**: Documentation deployment
- **Environment Variables**: Secure configuration management

### Workflows

1. **CI (`ci.yml`)**: Runs on all PRs and pushes - linting, testing, and building
2. **Deploy (`main_dachshund.yml`)**: Deploys to Azure Web App on main branch
3. **Documentation (`docs.yml`)**: Generates and deploys TypeDoc documentation to GitHub Pages

## 📚 Documentation

- **API Documentation**: Auto-generated with TypeDoc
- **GitHub Pages**: https://djensenius.github.io/search-frontend
- **Inline Comments**: Comprehensive code documentation

## 🌐 Deployment

### Azure App Service

The application is configured for Azure App Service deployment with:

- Single-page application routing
- Environment variable configuration
- Production optimizations
- Static file serving

### Required Azure Secrets

- `AZURE_WEBAPP_NAME`: Your Azure App Service name
- `AZURE_WEBAPP_PUBLISH_PROFILE`: Deployment credentials

### Environment Variables

```env
# Production environment variables
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://your-app.azurewebsites.net
SEARCH_API_URL=https://your-search-api.com
```

## 🔒 Security

- **Helmet**: Security headers for Express
- **CORS**: Configured for specific origins
- **Input Validation**: Zod schemas for API validation
- **Environment Variables**: Sensitive data protection

## 🎯 Performance

- **Vite**: Lightning-fast development and building
- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Efficient resource loading
- **Caching**: Browser and API response caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style
- Update documentation as needed
- Ensure CI/CD pipeline passes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Frontend won't start:**
- Ensure Node.js 18+ is installed
- Run `npm install` in the frontend directory
- Check for port conflicts (default: 5173)

**Backend connection errors:**
- Verify Search API URL is correctly configured in `SEARCH_API_URL`
- Check environment variables in backend/.env
- Ensure backend is running on the correct port (default: 3001)

**Build failures:**
- Clear node_modules and reinstall dependencies
- Check TypeScript compilation errors
- Verify all imports are correct

## 🎉 Acknowledgments

- Inspired by the adorable Dachshund breed, specifically Rhizome.

---

Made with ❤️ and 🐕 by David Jensenius
