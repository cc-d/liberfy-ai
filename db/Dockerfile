# Use the official PostgreSQL 15 image
FROM postgres:15

# Update the package manager and install any necessary dependencies
RUN apt-get update && apt-get install -y

# Copy the custom initialization script to the container
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

# Set the environment variables for PostgreSQL
ENV POSTGRES_USER=pguser
ENV POSTGRES_PASSWORD=pgpass
ENV POSTGRES_DB=pgdb

# Expose the PostgreSQL port (default: 5432)
EXPOSE 5432

# Start PostgreSQL service when the container starts
CMD ["postgres"]

