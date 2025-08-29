# Deployment Guide

This guide provides instructions for deploying the Niyali Travel Site to a Hostinger VPS with Ubuntu, using Docker for containerization and Nginx as a reverse proxy.

## Prerequisites

*   A Hostinger VPS with Ubuntu 22.04 or later installed.
*   Docker and Docker Compose installed on the VPS.
*   Git installed on the VPS.
*   A Supabase project for the database.
*   A domain name pointed to your VPS's IP address.

## 1. Set up the Environment

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/niyali-travel-core.git
    cd niyali-travel-core
    ```

2.  **Set up environment variables:**
    Create a `.env.production` file in the `client` directory and add the following environment variables:
    ```
    VITE_SUPABASE_URL="your-supabase-project-url"
    VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

    Create a `.env.production` file in the `server` directory and add the following environment variables:
    ```
    DATABASE_URL="your-supabase-database-url"
    SUPABASE_URL="your-supabase-project-url"
    SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
    JWT_SECRET="your-jwt-secret"
    ```

## 2. Build and Deploy with Docker

1.  **Build and run the Docker containers:**
    ```bash
    docker-compose up --build -d
    ```

2.  **Verify the containers are running:**
    ```bash
    docker-compose ps
    ```

## 3. Set up a Reverse Proxy with Nginx

1.  **Create a new Nginx configuration file:**
    ```bash
    sudo nano /etc/nginx/sites-available/niyali-travel
    ```

2.  **Add the following configuration:**
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

3.  **Enable the new configuration:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/niyali-travel /etc/nginx/sites-enabled
    sudo nginx -t
    sudo systemctl restart nginx
    ```

## 4. Secure with SSL

1.  **Install Certbot:**
    ```bash
    sudo apt update
    sudo apt install certbot python3-certbot-nginx
    ```

2.  **Obtain an SSL certificate:**
    ```bash
    sudo certbot --nginx -d your-domain.com
    ```

## 5. Monitoring and Alerts

It is recommended to set up monitoring and alerts to ensure the health of the application.

*   **Uptime Monitoring:** Use a service like Uptime Robot to monitor the availability of the site.
*   **Performance Monitoring:** Use a tool like PM2's monitoring features or a third-party service like Datadog or New Relic to monitor CPU usage, memory usage, and response times.
*   **Error Tracking:** Use a service like Sentry or Bugsnag to track and receive alerts for any errors that occur in the application.