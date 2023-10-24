/*
  Warnings:

  - Added the required column `isCancelled` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "isPaid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "isCancelled" TEXT NOT NULL;
