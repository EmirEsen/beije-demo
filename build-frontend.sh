#!/bin/bash

echo "Starting frontend build process..."

# Copy the Vercel package.json
echo "Copying package.vercel.json to package.json..."
cp apps/frontend/package.vercel.json apps/frontend/package.json

# Change to frontend directory
echo "Changing to frontend directory..."
cd apps/frontend

# Run pre-build script
echo "Running pre-build script..."
node pre-build.js

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building frontend..."
npm run build

echo "Build completed successfully!"
