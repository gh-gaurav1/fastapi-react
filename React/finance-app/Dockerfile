# Dockerfile for React

# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "build", "-l", "3000"]
