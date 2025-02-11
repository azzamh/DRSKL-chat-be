# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the dist directory
COPY dist ./dist

# Copy the .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 8888

# Command to run the application
CMD ["node", "dist/src/server.js"]
