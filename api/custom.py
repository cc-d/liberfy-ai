from sqlalchemy import Column, ForeignKeyConstraint
from sqlalchemy.sql.base import SchemaEventTarget
from sqlalchemy.sql.elements import ColumnClause
from sqlalchemy.sql.schema import SchemaItem, CheckConstraint
from sqlalchemy.sql.ddl import DDLElement

from sqlalchemy.sql.type_api import TypeEngine

from typing import Any, Optional, Type, Union


class IColumn(Column):
    """
    Represents a column in a database table.

    This class is almost identical to the SQLAlchemy Column class. The only difference
    is that the "index" parameter defaults to True.

    Examples:

    Integer column::

        column = IColumn(Integer)

    String column with a limit::

        column = IColumn(String(50))

    Column with unique constraint::

        column = IColumn(Integer, unique=True)

    Column with nullable constraint::

        column = IColumn(Integer, nullable=False)

    Autoincrementing primary key integer column::

        column = IColumn(Integer, primary_key=True)

    """

    global TypeEngine
    __visit_name__ = "column"

    def __init__(
        self,
        name: Optional[str] = None,
        type_: Optional[Union[TypeEngine, Type[TypeEngine]]] = None,
        *args: Any,
        index: Optional[bool] = True,
        **kwargs: Any,
    ) -> None:
        """
        Construct a new :class:`IColumn`.

        Args:
            name: The name of the column.
            type_: The type of the column.
            *args: Variable length arguments to be passed to the base class.
            index: Indicates whether an index should be created on the column.
            **kwargs: Arbitrary keyword arguments to be passed to the base class.

        This is a complex constructor with many parameters, providing multiple
        points of control and flexibility in determining how the :class:`.IColumn`
        is constructed.

        Please refer to SQLAlchemy's documentation for a complete overview
        of these parameters and their usage:
        https://docs.sqlalchemy.org/en/14/core/metadata.html#sqlalchemy.schema.Column
        """
        super().__init__(name, type_, *args, index=index, **kwargs)
