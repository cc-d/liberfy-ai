from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

PGDBIP = '172.18.0.2'

SQLALCHEMY_DATABASE_URL = f'postgresql://pguser:pgpass@{PGDBIP}:5432/pgdb'
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        print("Error connecting to the database:")
        print(e)
        raise
    finally:
        db.close()
