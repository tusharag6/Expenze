-- CreateTable
CREATE TABLE "SavingsGoal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMPTZ NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SavingsGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavingsGoalProgress" (
    "id" SERIAL NOT NULL,
    "savingsGoalId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "SavingsGoalProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeAllocation" (
    "id" SERIAL NOT NULL,
    "allocationPercentage" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "savingsGoalId" INTEGER NOT NULL,

    CONSTRAINT "IncomeAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplaceGoal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "defaultTargetAmount" DOUBLE PRECISION,

    CONSTRAINT "MarketplaceGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "seen" BOOLEAN NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavingsGoal" ADD CONSTRAINT "SavingsGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingsGoalProgress" ADD CONSTRAINT "SavingsGoalProgress_savingsGoalId_fkey" FOREIGN KEY ("savingsGoalId") REFERENCES "SavingsGoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeAllocation" ADD CONSTRAINT "IncomeAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeAllocation" ADD CONSTRAINT "IncomeAllocation_savingsGoalId_fkey" FOREIGN KEY ("savingsGoalId") REFERENCES "SavingsGoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
