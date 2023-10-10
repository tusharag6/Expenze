/*
  Warnings:

  - You are about to drop the column `householdId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerUserId]` on the table `Household` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerUserId` to the `Household` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_householdId_fkey";

-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "ownerUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "householdId";

-- CreateTable
CREATE TABLE "HouseholdMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "householdId" INTEGER NOT NULL,

    CONSTRAINT "HouseholdMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Household_ownerUserId_key" ON "Household"("ownerUserId");

-- AddForeignKey
ALTER TABLE "Household" ADD CONSTRAINT "Household_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
