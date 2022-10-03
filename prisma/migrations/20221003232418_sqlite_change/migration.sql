-- CreateTable
CREATE TABLE "Lil" (
    "accessory" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "glasses" TEXT,
    "head" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Alerts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
