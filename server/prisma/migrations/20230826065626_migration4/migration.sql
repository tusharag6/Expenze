/*
  Warnings:

  - You are about to drop the column `category_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `TransactionCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_category_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "category_id",
ADD COLUMN     "budgetCategory" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "TransactionCategory";
