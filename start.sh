#!/bin/bash

echo "🚀 Starting Anduril Contracts Tracking System..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "${BLUE}📦 Installing dependencies...${NC}"

# Install backend dependencies
echo "${GREEN}Installing backend dependencies...${NC}"
cd backend
npm install

# Install frontend dependencies
echo "${GREEN}Installing frontend dependencies...${NC}"
cd ../frontend
npm install

cd ..

echo ""
echo "${GREEN}✅ Installation complete!${NC}"
echo ""
echo "🎯 Starting servers..."
echo ""

# Start backend
echo "${BLUE}Starting Backend on port 5000...${NC}"
cd backend
npm start &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "${BLUE}Starting Frontend on port 3000...${NC}"
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "${GREEN}✅ Servers are starting!${NC}"
echo ""
echo "📊 Backend:  http://localhost:5000/api"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Handle Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
