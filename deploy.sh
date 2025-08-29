#!/bin/bash

echo "🚀 Starting deployment to VPS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env exists
if [ ! -f .env ]; then
    print_error ".env file not found!"
    print_warning "Please copy .env.example to .env and fill in your values:"
    print_warning "cp .env.example .env"
    print_warning "nano .env"
    exit 1
fi

print_status "Environment file found ✅"

# Pull latest changes
print_status "Pulling latest changes from GitHub..."
git pull origin main

# Clean and reinstall dependencies
print_status "Cleaning and installing dependencies..."
rm -f package-lock.json
rm -rf node_modules
npm install

# Build the application
print_status "Building client application..."
npm run build --workspace=client

print_status "Building server application..."
npm run build --workspace=server

# Start Docker services
print_status "Starting Docker services..."
docker-compose down
docker-compose up --build -d

# Check if containers are running
print_status "Checking container status..."
docker-compose ps

print_status "🎉 Deployment completed!"
print_status "Your application should be running on:"
print_status "- Client: http://localhost:3000"
print_status "- Server: http://localhost:5008"

# Test the deployment
print_status "Testing deployment..."
sleep 10

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Client is responding"
else
    print_error "❌ Client is not responding"
fi

if curl -f http://localhost:5008 > /dev/null 2>&1; then
    print_status "✅ Server is responding"  
else
    print_error "❌ Server is not responding"
fi

echo "Deployment script completed!"