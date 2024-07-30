/*
  Warnings:

  - Added the required column `trackName` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trackName" TEXT NOT NULL,
    "trackIntro" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "imageUrl" TEXT
);
INSERT INTO "new_Track" ("endTime", "id", "imageUrl", "startTime") SELECT "endTime", "id", "imageUrl", "startTime" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
