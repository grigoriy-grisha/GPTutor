-- CreateTable
CREATE TABLE "usage_records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptTokens" INTEGER NOT NULL,
    "completionTokens" INTEGER NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "costRub" REAL NOT NULL,
    "costUsd" REAL,
    "duration" INTEGER NOT NULL,
    "stream" BOOLEAN NOT NULL DEFAULT false,
    "requestId" TEXT,
    "messagesCount" INTEGER,
    "temperature" REAL,
    "maxTokens" INTEGER,
    "topP" REAL,
    "frequencyPenalty" REAL,
    "presencePenalty" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "usage_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
