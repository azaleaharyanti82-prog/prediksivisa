#!/bin/bash

# Prediksivisa - Production Build Script

set -e  # Exit on error

echo "🔨 Building Prediksivisa for Production..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "${YELLOW}Checking Node.js version...${NC}"
node_version=$(node -v)
echo "Node.js version: $node_version"
echo ""

# Build Backend
echo "${YELLOW}Building Backend...${NC}"
cd backend

if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install --production
fi

echo "${GREEN}✓ Backend built successfully${NC}"
echo ""

cd ..

# Build Frontend
echo "${YELLOW}Building Frontend...${NC}"
cd frontend

if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install
fi

npm run build

echo "${GREEN}✓ Frontend built successfully${NC}"
echo ""

cd ..

# Summary
echo "${GREEN}✨ Build completed successfully!${NC}"
echo ""
echo "${YELLOW}Build artifacts:${NC}"
echo "  - Backend: ./backend/"
echo "  - Frontend: ./frontend/dist/"
echo ""
echo "${YELLOW}Next steps:${NC}"
echo "  1. Review DEPLOYMENT.md for EdgeOne setup"
echo "  2. Configure environment variables"
echo "  3. Deploy to EdgeOne"
echo ""
echo "${YELLOW}Start production server locally:${NC}"
echo "  node backend/server.js"
echo ""
