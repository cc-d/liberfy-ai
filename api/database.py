import os
from sqlalchemy import Column, Integer, String, create_engine, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, class_mapper, DeclarativeMeta

from typing import Optional

from config import HOST

Base = declarative_base()

SQLALCHEMY_DATABASE_URL = f'postgresql://pguser:pgpass@{HOST}:5432/pgdb'
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

from logfunc import logf

import logging

logging.basicConfig(level=logging.DEBUG)


# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@logf(level='info')
def to_dict(obj):
    """Returns a dictionary representation of an SQLAlchemy-backed object."""
    if obj is None:
        return None

    data = {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}

    # Include relationships
    for relation in class_mapper(obj.__class__).relationships:
        # only proceed if the relationship is loaded
        if relation.key in obj.__dict__:
            related_obj = getattr(obj, relation.key)

            # If it's a list, loop through all items
            if isinstance(related_obj, list):
                data[relation.key] = [to_dict(child) for child in related_obj]

            # If it's a single item, just convert it to a dict
            else:
                data[relation.key] = to_dict(related_obj)

    return data


def model_to_dict(
    model_instance: DeclarativeMeta, exclude_internal: bool = True
) -> dict:
    """
    Convert a SQLAlchemy model instance to a dictionary.

    Parameters:
        model_instance (DeclarativeMeta):
            The SQLAlchemy model instance to convert.

        exclude_internal (bool, optional):
            Whether to exclude internal SQLAlchemy attributes. Defaults to True.

    Returns:
        dict:
            A dictionary containing the column names and their corresponding values.

    Raises:
        ValueError:
            If the input is not a valid SQLAlchemy model instance.
    """
    if not isinstance(model_instance.__class__, DeclarativeMeta):
        raise ValueError("Input is not a SQLAlchemy model instance.")

    # Get column names and their corresponding values
    if exclude_internal:
        column_names = [col.name for col in model_instance.__table__.columns]
        data = {
            col_name: getattr(model_instance, col_name) for col_name in column_names
        }
    else:
        # Get the dictionary representation of the model instance
        # (including internal attributes)
        data = model_instance.__dict__.copy()

    # Remove internal SQLAlchemy attributes
    internal_attributes = ["_sa_instance_state"]
    for attr in internal_attributes:
        data.pop(attr, None)

    return data
