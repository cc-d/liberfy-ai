"""test

Revision ID: 6c244afd6a12
Revises: fa6609a0b64c
Create Date: 2023-07-24 01:03:00.149179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c244afd6a12'
down_revision = 'fa6609a0b64c'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('convos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=True),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('function_call', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_index('ix_tokens_token', table_name='tokens')
    op.drop_table('tokens')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tokens',
    sa.Column('token', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='tokens_user_id_fkey'),
    sa.PrimaryKeyConstraint('token', name='tokens_pkey')
    )
    op.create_index('ix_tokens_token', 'tokens', ['token'], unique=False)
    op.drop_table('messages')
    op.drop_table('convos')
    op.drop_table('chats')
    # ### end Alembic commands ###
