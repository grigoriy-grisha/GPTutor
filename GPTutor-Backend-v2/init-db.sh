#!/bin/sh

# Create prisma directory if it doesn't exist
mkdir -p /app/prisma

# Check if database exists
if [ ! -f /app/prisma/prod.db ]; then
    echo "Database does not exist, creating and applying migrations..."
    # Для новой БД используем migrate deploy (применит все миграции)
    npx prisma migrate deploy
fi

echo "Database exists, applying pending migrations..."
# Для существующей БД применяем только новые миграции
npx prisma migrate deploy
# Verify migration status
echo "Migration status:"
npx prisma migrate status

# Start the application
echo "Starting application..."
npm start
