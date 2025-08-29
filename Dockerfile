# Multi-stage build for Node.js application
FROM node:20-bullseye-slim AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci --only=production

# Development stage
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3000 5008
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build
COPY . .
RUN npm ci
RUN npm run build

# Production stage
FROM node:20-bullseye-slim AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/package*.json ./server/
RUN npm ci --only=production
EXPOSE 3000 5008
CMD ["npm", "start"]