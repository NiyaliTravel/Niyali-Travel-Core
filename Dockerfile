# Build stage
FROM node:20-alpine as builder
WORKDIR /usr/src/app

# Copy all package.json files
COPY package.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared/package.json ./shared/

# Install all dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the client
RUN npm run build --workspace=client

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]