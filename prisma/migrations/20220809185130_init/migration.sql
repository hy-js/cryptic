/*
  Warnings:

  - The primary key for the `Clue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[rowId]` on the table `Clue` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `rowId` on the `Clue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Clue" DROP CONSTRAINT "Clue_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "rowId",
ADD COLUMN     "rowId" INTEGER NOT NULL,
ADD CONSTRAINT "Clue_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clue_rowId_key" ON "Clue"("rowId");
