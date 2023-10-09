-- AlterTable
ALTER TABLE "User" ADD COLUMN     "householdId" INTEGER;

-- CreateTable
CREATE TABLE "Household" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Household_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE SET NULL ON UPDATE CASCADE;
