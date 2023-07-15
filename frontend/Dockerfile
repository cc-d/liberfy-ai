# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /frontend

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the frontend code into the working directory
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
