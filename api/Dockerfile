# Use an official Python 3.11 runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /api

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd postgresql-client

# Copy the entire backend directory into the container
COPY . ./

# Expose the port on which the application will run (default: 8888)
EXPOSE 8888

RUN pip install -r requirements.txt

# Set the command to run the FastAPI application
