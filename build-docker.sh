#!/bin/bash

# Prediksivisa - Docker Build Script

echo "🐳 Building Docker image for Prediksivisa..."

# Build image
docker build -t prediksivisa:latest .

echo "✓ Docker image built successfully"
echo ""
echo "Run container:"
echo "  docker run -p 3001:3001 -e NODE_ENV=production prediksivisa:latest"
echo ""
