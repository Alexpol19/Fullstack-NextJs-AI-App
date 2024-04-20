/*
  Warnings:

  - Added the required column `subject` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "entryId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "negative" BOOLEAN NOT NULL,
    "subject" TEXT NOT NULL,
    CONSTRAINT "Analysis_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "JournalEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Analysis" ("color", "createdAt", "entryId", "id", "mood", "negative", "summary", "updatedAt") SELECT "color", "createdAt", "entryId", "id", "mood", "negative", "summary", "updatedAt" FROM "Analysis";
DROP TABLE "Analysis";
ALTER TABLE "new_Analysis" RENAME TO "Analysis";
CREATE UNIQUE INDEX "Analysis_entryId_key" ON "Analysis"("entryId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
