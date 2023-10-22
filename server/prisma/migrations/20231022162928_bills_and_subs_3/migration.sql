/*
  Warnings:

  - Changed the type of `isCancelled` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "isCancelled",
ADD COLUMN     "isCancelled" BOOLEAN NOT NULL;
