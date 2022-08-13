-- CreateTable
CREATE TABLE "Puzzle" (
    "rowId" INTEGER NOT NULL,
    "clue" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "definition" TEXT,
    "clueNumber" TEXT NOT NULL,
    "puzzleDate" TEXT NOT NULL,
    "puzzleName" TEXT NOT NULL,
    "sourceURL" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "setDate" TEXT NOT NULL DEFAULT 'NIL'
);

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_rowId_key" ON "Puzzle"("rowId");
