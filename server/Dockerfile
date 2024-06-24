

# Base image
FROM node:16.20.2-alpine

# Set working directory
WORKDIR /app

# Install Python and build tools
RUN apk add --no-cache python3 build-base

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

EXPOSE 5000

# Start the application
CMD ["npm", "start"]
