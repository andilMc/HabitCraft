# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy config files
COPY package.json ./
# Only copy lock file if it exists, otherwise npm install will create it
COPY package-lock.json* ./
RUN npm install

# Copy source
COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY public ./public
COPY src ./src

# Build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
