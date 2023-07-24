arevid="$(alembic revision | grep -Eo '[0-9].*_' | sed 's/_//g')";
alembic upgrade $arevid
