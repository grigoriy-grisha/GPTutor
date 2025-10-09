-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "notStatic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_files" ("createdAt", "id", "name", "size", "type", "updatedAt", "url", "userId") SELECT "createdAt", "id", "name", "size", "type", "updatedAt", "url", "userId" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
