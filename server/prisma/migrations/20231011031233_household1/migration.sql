-- CreateTable
CREATE TABLE "HouseholdAccount" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "userId" INTEGER,
    "householdId" INTEGER NOT NULL,

    CONSTRAINT "HouseholdAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HouseholdAccount" ADD CONSTRAINT "HouseholdAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdAccount" ADD CONSTRAINT "HouseholdAccount_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdAccount" ADD CONSTRAINT "HouseholdAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
