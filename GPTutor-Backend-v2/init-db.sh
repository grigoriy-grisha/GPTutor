#!/bin/sh

# Create prisma directory if it doesn't exist
mkdir -p /app/prisma

# Initialize database if it doesn't exist
if [ ! -f /app/prisma/prod.db ]; then
    echo "Creating new database..."
    npx prisma migrate deploy
else
    echo "Database already exists, applying migrations..."
    npx prisma migrate deploy
fi

# Start the application
npm start
