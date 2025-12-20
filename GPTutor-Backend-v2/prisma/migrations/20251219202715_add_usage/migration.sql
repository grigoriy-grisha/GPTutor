-- CreateTable
CREATE TABLE "usages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptTokens" INTEGER NOT NULL,
    "completionTokens" INTEGER NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "cost" REAL NOT NULL,
    "generationId" TEXT,
    "aborted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "usages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "usages_userId_idx" ON "usages"("userId");

-- CreateIndex
CREATE INDEX "usages_createdAt_idx" ON "usages"("createdAt");

-- CreateIndex
CREATE INDEX "usages_model_idx" ON "usages"("model");
