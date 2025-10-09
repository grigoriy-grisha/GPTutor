/*
  Warnings:

  - You are about to drop the `usage_records` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "usage_records";
PRAGMA foreign_keys=on;
