DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'pguser') THEN
        CREATE ROLE pguser WITH LOGIN PASSWORD 'pgpass';
        GRANT ALL PRIVILEGES ON DATABASE pgdb TO pguser;
    END IF;
END
$$;
