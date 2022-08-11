/*
  Warnings:

  - The primary key for the `Puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Puzzle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_pkey",
DROP COLUMN "id";
