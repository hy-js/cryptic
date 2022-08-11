-- CreateTable
CREATE TABLE "Clue" (
    "rowId" TEXT NOT NULL,
    "clue" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "definition" TEXT,
    "clueNumber" TEXT NOT NULL,
    "puzzleDate" TEXT NOT NULL,
    "puzzleName" TEXT NOT NULL,
    "sourceURL" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Clue_pkey" PRIMARY KEY ("rowId")
);
