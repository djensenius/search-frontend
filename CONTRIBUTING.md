# Contributing to Dachshund.dev

Thank you for your interest in contributing to Dachshund.dev! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- A GitHub account

### Setting up your development environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/search-frontend.git
   cd search-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔧 Development Workflow

### Making Changes

1. Make your changes in the appropriate directories:
   - Frontend: `frontend/src/`
   - Backend: `backend/src/`
   - Documentation: `docs/` or `README.md`

2. Write or update tests for your changes:
   - Frontend tests: `frontend/src/**/__tests__/`
   - Backend tests: `backend/__tests__/`

3. Run tests locally:
   ```bash
   npm run test
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Build the project:
   ```bash
   npm run build
   ```

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use meaningful variable and function names

### Commit Message Guidelines

Use conventional commit messages:

- `feat: add new search filter`
- `fix: resolve pagination bug`
- `docs: update API documentation`
- `test: add unit tests for SearchBar`
- `refactor: simplify search logic`

## 🧪 Testing

### Writing Tests

- Write unit tests for all new components and functions
- Include both positive and negative test cases
- Mock external dependencies
- Aim for high test coverage

### Running Tests

```bash
# Run all tests
npm run test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend

# Run with coverage
npm run test:coverage
```

## 📝 Documentation

### Code Documentation

- Add JSDoc comments to all public functions and classes
- Include parameter descriptions and return types
- Provide usage examples for complex functions

### API Documentation

API documentation is automatically generated using TypeDoc. Ensure your code includes proper TypeScript types and JSDoc comments.

To generate documentation locally:
```bash
npm run docs:generate
```

The documentation will be generated in the `docs/` directory and is automatically deployed to GitHub Pages on each release.

## 🔍 Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Write or update tests as needed
3. Update documentation if you're changing APIs
4. Make sure all tests pass
5. Create a pull request with a clear title and description

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include a clear description of what you've changed
- Reference any related issues
- Include screenshots for UI changes
- Ensure CI/CD checks pass

## 🐛 Reporting Bugs

When reporting bugs, please include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots or error messages
- Your environment (OS, Node.js version, browser)

## 💡 Suggesting Features

For feature requests, please include:

- A clear description of the feature
- Why it would be useful
- How it should work
- Any alternative solutions you've considered

## 📋 Code Review

All submissions require code review. We use GitHub pull requests for this purpose. Reviewers will check for:

- Code quality and style
- Test coverage
- Documentation updates
- Performance implications
- Security considerations

## 🏆 Recognition

Contributors will be recognized in:

- The project's README
- Release notes
- GitHub contributors list

## ❓ Questions?

If you have questions about contributing, please:

- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out to the maintainers

Thank you for contributing to Dachshund.dev! 🐕
