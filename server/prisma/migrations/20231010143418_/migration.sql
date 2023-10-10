/*
  Warnings:

  - Added the required column `joiningId` to the `Household` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "joiningId" TEXT NOT NULL;
