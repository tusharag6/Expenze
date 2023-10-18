/*
  Warnings:

  - Made the column `defaultTargetAmount` on table `MarketplaceGoal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MarketplaceGoal" ALTER COLUMN "defaultTargetAmount" SET NOT NULL;
