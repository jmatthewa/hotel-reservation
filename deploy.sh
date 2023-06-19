#!/bin/bash

# Build the frontend
cd frontend
npm install
npm run build

# Move frontend build files to the backend
cd ..
cp -r frontend/dist/* backend/public/

# Install backend dependencies
cd backend
npm install

# Start the backend server
npm start
