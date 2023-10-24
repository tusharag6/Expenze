import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a goal
export const createGoal = async (
  goalName: string,
  goalDescription: string,
  targetAmount: number,
  targetDate: string,
  userId: string
) => {
  const newGoal = await prisma.savingsGoal.create({
    data: {
      goalName,
      goalDescription,
      targetAmount,
      targetDate,
      userId,
    },
  });
  return newGoal;
};

// get a list of all goals associated with a user
export const getGoal = async (userId: string) => {
  const goals = await prisma.savingsGoal.findMany({
    where: {
      userId,
    },
  });
  return goals;
};

// update an existing goal
export const updateGoal = async (
  targetAmount: number,
  targetDate: string,
  goalId: string
) => {
  const updatedGoal = await prisma.savingsGoal.update({
    where: { id: goalId },
    data: {
      targetAmount,
      targetDate,
    },
  });
  return updateGoal;
};

// delete a goal
export const deleteGoal = async (goalId: string) => {
  const goal = await prisma.savingsGoal.delete({
    where: {
      id: goalId,
    },
  });
};

// add contribution towards the goal
export const goalContribution = async (
  userId: string,
  goalId: string,
  amount: number,
  contributionDate: string
) => {
  const newContribution = await prisma.savingsContribution.create({
    data: {
      userId,
      goalId,
      amount,
      contributionDate,
    },
  });
  return newContribution;
};

// get a lost of all contributions associated with a specific goal
export const getContributions = async (goalId: string) => {
  const allContributions = await prisma.savingsContribution.findMany({
    where: {
      id: goalId,
    },
  });
  return allContributions;
};

// contribute a percentage of goal towards the goal
export const createAllocation = async (
  userId: string,
  goalId: string,
  allocationPercentage: number
) => {
  const allocation = await prisma.incomeAllocation.create({
    data: {
      userId,
      savingsGoalId: goalId,
      allocationPercentage,
    },
  });
  return allocation;
};

export const updateAllocation = async (
  allocationId: string,
  allocationPercentage: number
) => {
  const updatedAllocation = await prisma.incomeAllocation.update({
    where: { id: allocationId },
    data: {
      allocationPercentage,
    },
  });
  return updatedAllocation;
};

// create custom goal for the market
export const createMarketGoal = async (
  name: string,
  description: string,
  defaultTargetAmount: number
) => {
  const newMarketGoal = await prisma.marketplaceGoal.create({
    data: {
      name,
      description,
      defaultTargetAmount,
    },
  });
  return newMarketGoal;
};

export const getMarketGoals = async () => {
  const marketplaceGoal = await prisma.marketplaceGoal.findMany();
  return marketplaceGoal;
};

// add the predefined market goal to personal account
export const addMarketGoalToPersonal = async (
  marketGoalId: string,
  targetAmount: number,
  targetDate: string,
  userId: string
) => {
  const marketplaceGoal = await prisma.marketplaceGoal.findUnique({
    where: {
      id: marketGoalId,
    },
  });
  if (marketplaceGoal) {
    if (targetAmount < 0) {
      targetAmount = marketplaceGoal.defaultTargetAmount;
    }

    const newGoal = await prisma.savingsGoal.create({
      data: {
        goalName: marketplaceGoal.name,
        goalDescription: marketplaceGoal.description,
        targetAmount,
        targetDate,
        userId,
      },
    });
    return newGoal;
  }
};
