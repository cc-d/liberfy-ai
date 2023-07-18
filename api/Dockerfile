# Use an official Python 3.11 runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /api

# Copy the entire backend directory into the container
COPY . ./

# Expose the port on which the application will run (default: 8888)
EXPOSE 8888

RUN python -m venv /api/venv
ENV VIRTUAL_ENV=/api/venv
ENV PATH=/api/venv/bin:$PATH

RUN pip install -r requirements.txt


# Set the command to run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8888"]

