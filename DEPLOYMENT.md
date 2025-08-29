# Deployment Guide

This guide provides instructions for deploying the Niyali Travel Site to a Hostinger VPS with Ubuntu.

## Prerequisites

*   A Hostinger VPS with Ubuntu installed.
*   Node.js and npm installed on the VPS.
*   Git installed on the VPS.
*   A Supabase project for the database.

## 1. Set up the Environment

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/niyali-travel-core.git
    cd niyali-travel-core
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ../server
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory and add the following environment variables:
    ```
    DATABASE_URL="your-supabase-database-url"
    SUPABASE_URL="your-supabase-project-url"
    SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
    JWT_SECRET="your-jwt-secret"
    ```

## 2. Build the Project

1.  **Build the client:**
    ```bash
    npm run build:client
    ```

2.  **Build the server:**
    ```bash
    npm run build:server
    ```

## 3. Deploy the Project

1.  **Run the server:**
    ```bash
    npm start
    ```

2.  **Configure a process manager:**
    It is recommended to use a process manager like `pm2` to keep the server running in the background.
    ```bash
    npm install -g pm2
    pm2 start server/dist/index.js --name niyali-travel
    ```

3.  **Set up a reverse proxy:**
    Use a web server like Nginx to act as a reverse proxy and forward requests to the Node.js server.

    Create a new Nginx configuration file:
    ```bash
    sudo nano /etc/nginx/sites-available/niyali-travel
    ```

    Add the following configuration:
    ```nginx
    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://localhost:5008;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

    Enable the new configuration:
    ```bash
    sudo ln -s /etc/nginx/sites-available/niyali-travel /etc/nginx/sites-enabled
    sudo nginx -t
    sudo systemctl restart nginx