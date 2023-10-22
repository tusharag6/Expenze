/*
  Warnings:

  - You are about to drop the column `seen` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `SavingsContribution` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `SavingsGoal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SavingsGoal` table. All the data in the column will be lost.
  - You are about to drop the `SavingsGoalProgress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isRead` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notificationDate` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contributionDate` to the `SavingsContribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalName` to the `SavingsGoal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetDate` to the `SavingsGoal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SavingsGoalProgress" DROP CONSTRAINT "SavingsGoalProgress_savingsGoalId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "seen",
DROP COLUMN "timestamp",
ADD COLUMN     "isRead" BOOLEAN NOT NULL,
ADD COLUMN     "notificationDate" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "SavingsContribution" DROP COLUMN "date",
ADD COLUMN     "contributionDate" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "SavingsGoal" DROP COLUMN "dueDate",
DROP COLUMN "name",
ADD COLUMN     "currentBalance" DOUBLE PRECISION,
ADD COLUMN     "goalDescription" TEXT,
ADD COLUMN     "goalName" TEXT NOT NULL,
ADD COLUMN     "isAchieved" BOOLEAN,
ADD COLUMN     "targetDate" TIMESTAMPTZ NOT NULL;

-- DropTable
DROP TABLE "SavingsGoalProgress";
