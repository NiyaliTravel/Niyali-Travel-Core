# Build stage
FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY client/package*.json ./
COPY tsconfig.json ./
COPY shared ./shared
RUN npm install
COPY client/ .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]