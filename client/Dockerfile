# Base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json /app



RUN npm  install


# Copy source files
COPY . /app

# Build the React app
#clearRUN npm run 

# Expose port
EXPOSE 3000

# Start nginx
CMD ["npm", "run", "start"]
