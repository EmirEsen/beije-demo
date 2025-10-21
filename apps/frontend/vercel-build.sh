#!/bin/bash

# Install dependencies for the entire monorepo
cd ../..
npm install

# Build the shared package first
npx nx build shared

# Build the frontend
npx nx build frontend

# Copy the built files to the expected location
cp -r dist/apps/frontend/. ./dist/
