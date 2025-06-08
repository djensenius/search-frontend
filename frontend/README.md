# 🐕 Dachshund.dev Frontend

The React TypeScript frontend for Dachshund.dev, a beautiful search engine application with a Dachshund mascot.

## 🛠️ Tech Stack

- **React 19** - Latest React with improved performance and features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast development and building
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Vitest** - Modern testing framework
- **React Testing Library** - Component testing utilities

## 🏗️ Architecture

### Components

- **DachshundLogo** - Customizable logo component with size and className props
- **SearchBar** - Reusable search input with validation, loading states, and clear functionality
- **SearchResults** - Display search results with pagination and metadata
- **ThemeToggle** - Dark/light theme switcher with system preference detection

### Pages

- **HomePage** - Landing page with search interface
- **SearchPage** - Search results page with advanced features

### Context & State

- **ThemeContext** - Global theme management with localStorage persistence
- **useSearch** - Custom hook for search functionality and state management

### Features

- 🎨 **Dark/Light Theme Support** - Automatic system preference detection with manual toggle
- 🔍 **Advanced Search** - Real-time search with validation and error handling
- 📱 **Responsive Design** - Mobile-first approach with seamless desktop experience
- ⚡ **Fast Performance** - Optimized with Vite and React 19 features
- 🧪 **Comprehensive Testing** - Unit tests for all components and hooks
- ♿ **Accessibility** - ARIA labels and keyboard navigation support

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Development Server

The development server runs on `http://localhost:5173` with hot module replacement (HMR) enabled.

### Environment Variables

The frontend connects to the backend API. No additional environment configuration is needed for development as it uses relative API calls.

## 🧪 Testing

The project uses Vitest with React Testing Library for comprehensive testing:

- **Component Tests** - Testing component rendering and user interactions
- **Hook Tests** - Testing custom hooks with mock scenarios
- **Integration Tests** - Testing component integration and API interactions

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── DachshundLogo.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   └── ThemeToggle.test.tsx
│   └── ...
├── hooks/
│   ├── __tests__/
│   │   └── useSearch.test.ts
│   └── ...
└── test/
    └── setup.ts
```

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build process:
1. TypeScript compilation with strict type checking
2. Vite bundling with optimizations
3. Asset optimization and code splitting
4. Generates static files in `dist/` directory

## 🎨 Styling

The application uses CSS modules and custom properties for theming:

- **CSS Variables** - Dynamic theming support
- **Responsive Design** - Mobile-first CSS Grid and Flexbox
- **Component Scoping** - Localized styles per component
- **Theme System** - Light/dark mode with smooth transitions

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with:
- Strict type checking enabled
- Path mapping for clean imports
- React JSX support with automatic runtime

### ESLint

Configured with:
- TypeScript ESLint rules
- React hooks rules
- React refresh compatibility
- Custom rules for code quality

### Vite

Optimized for:
- Fast development with HMR
- Production bundling with tree-shaking
- Asset optimization
- TypeScript support

## 🚢 Deployment

The frontend is designed to be deployed as static files. In production:

1. Built files are served by the Express backend
2. React Router is configured for single-page application routing
3. All non-API routes fall back to `index.html`

For standalone deployment, serve the `dist/` directory with a web server that supports SPA routing.

## 🤝 Contributing

When contributing to the frontend:

1. Follow existing code patterns and TypeScript conventions
2. Write tests for new components and features
3. Ensure accessibility guidelines are followed
4. Test across different themes and screen sizes
5. Run linting and type checking before submitting

## 📚 API Integration

The frontend communicates with the backend API through:

- **Search API** - `/api/search` for search functionality
- **Health API** - `/api/health` for status checking
- **Admin API** - `/api/admin/*` for administrative features

All API calls include proper error handling and loading states.
