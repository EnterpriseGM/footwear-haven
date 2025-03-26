
# Multi-stage build for frontend and backend

# Base stage for shared dependencies
FROM node:18-alpine AS base
WORKDIR /app
# Install dependencies needed for both frontend and backend
RUN apk add --no-cache libc6-compat

# Frontend build stage
FROM base AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
# Install frontend dependencies
RUN npm ci
# Copy frontend source files
COPY . .
# Build the frontend
RUN npm run build

# Backend build stage
FROM base AS backend-build
WORKDIR /app/api
# Copy backend package.json and dependencies
COPY api/package.json api/package-lock.json ./
# Install backend dependencies
RUN npm ci
# Copy backend source files
COPY api ./
# Build the backend (if needed)
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy backend from backend build
COPY --from=backend-build /app/api /app/api
# Copy frontend build from frontend build
COPY --from=frontend-build /app/dist /app/dist

# Install production dependencies for backend
WORKDIR /app/api
RUN npm ci --only=production

# Expose ports
EXPOSE 3000 8080

# Add startup script
WORKDIR /app
COPY docker-entrypoint.sh .
RUN chmod +x ./docker-entrypoint.sh

# Start both services
ENTRYPOINT ["./docker-entrypoint.sh"]
