# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /frontend

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Copy the rest of the frontend code into the working directory
COPY . ./

# Install the Node.js dependencies
RUN npm install && npm run build

# Expose port 3333 for the app
EXPOSE 3333

# Start the app
CMD ["npm", "start"]
