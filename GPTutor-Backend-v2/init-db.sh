#!/bin/sh

# Create prisma directory if it doesn't exist
mkdir -p /app/prisma

# Check if database exists
if [ ! -f /app/prisma/prod.db ]; then
    echo "Creating new database..."
    npx prisma db push
else
    echo "Database exists, checking schema..."
    npx prisma db push
fi

# Start the application
npm start
