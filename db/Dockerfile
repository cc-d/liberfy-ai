# Use the official PostgreSQL 15 image
FROM postgres:15

# Update the package manager and install any necessary dependencies
RUN apt-get update && apt-get install -y \
    # Add any additional dependencies here, if needed

# Copy custom configuration files to the container
COPY ./path/to/custom/pg_hba.conf /etc/postgresql/15/main/pg_hba.conf
COPY ./path/to/custom/postgresql.conf /etc/postgresql/15/main/postgresql.conf

# Expose the PostgreSQL port (default: 5432)
EXPOSE 5432

# Set the environment variables for PostgreSQL
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=opass
ENV POSTGRES_DB=mydatabase

# Start PostgreSQL service when the container starts
CMD ["postgres"]

