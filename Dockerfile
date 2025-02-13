# # Use the official Node.js image as the base image
# FROM node:14

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the dist directory
# COPY dist ./dist

# # Copy the .env file
# COPY .env .env

# # Expose the port the app runs on
# EXPOSE 8888

# # Command to run the application
# CMD ["node", "dist/src/server.js"]

FROM node:14-alpine
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm install

# Copy source code (opsional, atau skip jika pakai bind mount)
COPY . .

EXPOSE 8888
# CMD ["npm", "run", "start"]  # Production
# (Untuk dev, command akan di-override oleh docker-compose)