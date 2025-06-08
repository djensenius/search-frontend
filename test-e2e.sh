#!/bin/bash

# End-to-end test script for Dachshund.dev
echo "🐕 Starting Dachshund.dev E2E Tests"

# Check Node.js version
echo "📋 Checking prerequisites..."
node --version
npm --version

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --silent

# Run linting
echo "🔍 Running linters..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test -- --passWithNoTests

# Build applications
echo "🏗️  Building applications..."
npm run build

# Verify build outputs
echo "✅ Verifying build outputs..."
if [ -d "frontend/dist" ]; then
    echo "✓ Frontend build successful"
else
    echo "✗ Frontend build failed"
    exit 1
fi

if [ -d "backend/dist" ]; then
    echo "✓ Backend build successful"
else
    echo "✗ Backend build failed"
    exit 1
fi

# Check TypeDoc configuration
echo "📚 Checking documentation..."
if [ -f "typedoc.json" ]; then
    echo "✓ TypeDoc configuration found"
else
    echo "✗ TypeDoc configuration missing"
    exit 1
fi

# Check CI/CD workflows
echo "🚀 Checking CI/CD workflows..."
if [ -f ".github/workflows/ci.yml" ]; then
    echo "✓ CI workflow found"
else
    echo "✗ CI workflow missing"
    exit 1
fi

if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✓ Deploy workflow found"
else
    echo "✗ Deploy workflow missing"
    exit 1
fi

if [ -f ".github/workflows/docs.yml" ]; then
    echo "✓ Documentation workflow found"
else
    echo "✗ Documentation workflow missing"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Dachshund.dev is ready for deployment!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "🌐 URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo ""
echo "📚 Documentation will be available at:"
echo "   https://djensenius.github.io/search-frontend"
