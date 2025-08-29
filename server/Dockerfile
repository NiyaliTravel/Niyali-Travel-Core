# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Define a healthcheck to ensure the service is running
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/health || exit 1

# Start the Node.js application
CMD [ "npm", "start" ]

# Note on persistent data:
# For persistent data, a volume should be mounted when running the container.
# Example: docker run -p 3000:3000 -v /path/on/host:/usr/src/app/data --name niyali-backend my-backend-image
# Note on restart policy:
# The restart policy should be configured when running the container, e.g., --restart=always