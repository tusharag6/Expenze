import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBudgetCategory = async (
  userId: number,
  budgetCategory: string,
  amount: number
) => {
  const newCategory = await prisma.budgetCategory.create({
    data: {
      budgetCategory,
      amount,
      user_id: userId,
    },
  });

  return newCategory;
};

export const getBudgetCategoriesForUser = async (userId: number) => {
  const budgetCategories = await prisma.budgetCategory.findMany({
    where: { user_id: userId },
  });

  return budgetCategories;
};

export const getBudgetSummaryData = async (userId: number) => {
  try {
    // Fetch all budget categories for the user
    const budgetCategories = await prisma.budgetCategory.findMany({
      where: { user_id: userId },
    });

    // Calculate the total budgeted amount by summing up allocated amounts
    let totalBudgetedAmount = 0;
    budgetCategories.forEach((category) => {
      totalBudgetedAmount += category.amount;
    });

    // Calculate the total actual spending by summing up spending for each category
    let totalActualSpending = 0;
    for (const category of budgetCategories) {
      const categoryTransactions = await prisma.transaction.findMany({
        where: { budgetCategoryId: category.id },
      });

      categoryTransactions.forEach((transaction) => {
        totalActualSpending += transaction.amount;
      });
    }

    let remainingBudget = totalBudgetedAmount - totalActualSpending;
    let budgetUtilizationPercentage = 0;
    if (totalBudgetedAmount !== 0) {
      budgetUtilizationPercentage =
        (totalActualSpending / totalBudgetedAmount) * 100;
    }

    const summary = {
      totalBudgetedAmount,
      totalActualSpending,
      remainingBudget,
      budgetUtilizationPercentage,
    };

    return summary;
  } catch (error) {
    console.error("Error in getBudgetSummaryData:", error);
    throw new Error("Unable to fetch budget summary data");
  }
};
