-- CreateTable
CREATE TABLE "Puzzle" (
    "id" SERIAL NOT NULL,
    "rowId" INTEGER NOT NULL,
    "clue" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "definition" TEXT,
    "clueNumber" TEXT NOT NULL,
    "puzzleDate" TEXT NOT NULL,
    "puzzleName" TEXT NOT NULL,
    "sourceURL" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "ourDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_rowId_key" ON "Puzzle"("rowId");
