# Use an official Python 3.11 runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /api

# Copy the entire backend directory into the container
COPY . ./

RUN pip install -r requirements.txt

# Expose the port on which the application will run (default: 8888)
EXPOSE 8888

# Set the command to run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8888"]

