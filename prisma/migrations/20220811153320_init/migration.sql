/*
  Warnings:

  - You are about to drop the column `ourDate` on the `Puzzle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "ourDate",
ADD COLUMN     "setDate" TEXT NOT NULL DEFAULT 'NIL';
