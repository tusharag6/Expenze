import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGoal = async (
  name: string,
  targetAmount: number,
  dueDate: string,
  userId: number
) => {
  const newGoal = await prisma.savingsGoal.create({
    data: {
      name,
      targetAmount,
      dueDate,
      userId,
    },
  });
  return newGoal;
};

export const getGoal = async (goalId: number) => {
  const goal = await prisma.savingsGoal.findUnique({
    where: {
      id: goalId,
    },
  });
  return goal;
};

export const updateGoal = async (
  name: string,
  targetAmount: number,
  dueDate: string,
  goalId: number
) => {
  const updatedGoal = await prisma.savingsGoal.update({
    where: { id: goalId },
    data: {
      name,
      targetAmount,
      dueDate,
    },
  });
  return updateGoal;
};

export const deleteGoal = async (goalId: number) => {
  const goal = await prisma.savingsGoal.delete({
    where: {
      id: goalId,
    },
  });
};

export const goalContribute = async (
  userId: number,
  goalId: number,
  amount: number,
  date: string
) => {
  const newContribution = await prisma.savingsContribution.create({
    data: {
      userId,
      goalId,
      amount,
      date,
    },
  });
  return newContribution;
};

export const getContribute = async (goalId: number) => {
  const allContributions = await prisma.savingsContribution.findMany({
    where: {
      id: goalId,
    },
  });
  return allContributions;
};

export const addSavingsProgress = async (
  goalId: number,
  amount: number,
  date: string
) => {
  const newProgress = await prisma.savingsGoalProgress.create({
    data: {
      savingsGoalId: goalId,
      amount,
      date,
    },
  });
  return newProgress;
};

export const createAllocation = async (
  userId: number,
  goalId: number,
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
  allocationId: number,
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

export const addMarketGoalToPersonal = async (
  marketGoalId: number,
  targetAmount: number,
  dueDate: string,
  userId: number
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
        name: marketplaceGoal.name,
        targetAmount,
        dueDate,
        userId,
      },
    });
    return newGoal;
  }
};
