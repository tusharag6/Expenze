/*
  Warnings:

  - You are about to drop the column `initial_balance` on the `Account` table. All the data in the column will be lost.
  - Added the required column `total_balance` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "initial_balance",
ADD COLUMN     "total_balance" DOUBLE PRECISION NOT NULL;
