import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBudgetCategory = async (
  userId: string,
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

export const getBudgetCategoriesForUser = async (userId: string) => {
  const budgetCategories = await prisma.budgetCategory.findMany({
    where: { user_id: userId },
  });

  const simplifiedCategories = budgetCategories.map((category) => ({
    category: category.budgetCategory,
    amount: category.amount,
  }));

  return simplifiedCategories;
};

export const getBudgetSummaryData = async (userId: string) => {
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

export const getCategorySpendingPieChartData = async (
  userId: string,
  budgetPeriodStart: Date
) => {
  try {
    // Calculate the current date as the end date
    const budgetPeriodEnd = new Date();

    // Fetch all budget categories for the user
    const budgetCategories = await prisma.budgetCategory.findMany({
      where: { user_id: userId },
    });

    // Initialize an object to store category spending data
    const categorySpendingData: { [key: string]: number } = {};

    for (const category of budgetCategories) {
      // Calculate spending for each category within the budget period
      const categoryTransactions = await prisma.transaction.findMany({
        where: {
          budgetCategoryId: category.id,
          date: {
            gte: budgetPeriodStart,
            lte: budgetPeriodEnd,
          },
        },
      });

      const categorySpentAmount = categoryTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      // Add category spending data to the object
      categorySpendingData[category.budgetCategory] = categorySpentAmount;
    }

    const pieChartData = {
      ...categorySpendingData,
    };

    return pieChartData;
  } catch (error) {
    console.error("Error in getCategorySpendingPieChartData:", error);
    throw new Error("Unable to fetch category spending data");
  }
};

export const getBudgetVsActualBarChartData = async (
  userId: string,
  budgetPeriodStart: Date
) => {
  try {
    // Calculate the current date as the end date
    const budgetPeriodEnd = new Date();
    // Fetch all budget categories for the user
    const budgetCategories = await prisma.budgetCategory.findMany({
      where: { user_id: userId },
    });

    // Initialize an array to store budget vs. actual data
    const budgetVsActualData = [];

    for (const category of budgetCategories) {
      // Calculate the budgeted amount for the category
      const budgetedAmount = category.amount;

      // Calculate the actual spending for the category within the budget period
      const categoryTransactions = await prisma.transaction.findMany({
        where: {
          budgetCategoryId: category.id,
          date: {
            gte: budgetPeriodStart,
            lte: budgetPeriodEnd,
          },
        },
      });

      const actualSpending = categoryTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      // Determine if the user is over or under budget
      const isOverBudget = actualSpending > budgetedAmount;

      // Add budget vs. actual data to the array
      budgetVsActualData.push({
        category: category.budgetCategory,
        budgetedAmount,
        actualSpending,
        isOverBudget,
      });
    }

    return budgetVsActualData;
  } catch (error) {
    console.error("Error in getBudgetVsActualBarChartData:", error);
    throw new Error("Unable to fetch budget vs. actual data");
  }
};

export const getBudgetProgressLineChartData = async (
  userId: string,
  budgetPeriodStart: Date,
  interval: "daily" | "weekly"
) => {
  try {
    // Calculate the current date as the end date
    const budgetPeriodEnd = new Date();
    // Calculate the number of days or weeks within the budget period
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    const oneWeekMilliseconds = 7 * oneDayMilliseconds;
    const budgetPeriodMilliseconds =
      budgetPeriodEnd.getTime() - budgetPeriodStart.getTime();

    let intervalMilliseconds;
    if (interval === "daily") {
      intervalMilliseconds = oneDayMilliseconds;
    } else if (interval === "weekly") {
      intervalMilliseconds = oneWeekMilliseconds;
    } else {
      throw new Error("Invalid interval");
    }

    const numberOfIntervals = Math.ceil(
      budgetPeriodMilliseconds / intervalMilliseconds
    );

    // Initialize an array to store budget progress data
    const budgetProgressData = [];

    // Calculate budget progress for each interval
    for (let i = 0; i < numberOfIntervals; i++) {
      const intervalStart = new Date(
        budgetPeriodStart.getTime() + i * intervalMilliseconds
      );
      const intervalEnd = new Date(
        intervalStart.getTime() + intervalMilliseconds
      );

      // Calculate spending within the interval
      const intervalTransactions = await prisma.transaction.findMany({
        where: {
          account: {
            user_id: userId,
          },
          date: {
            gte: intervalStart,
            lt: intervalEnd,
          },
        },
      });

      const intervalSpending = intervalTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      // Add budget progress data to the array
      budgetProgressData.push({
        intervalStart,
        intervalEnd,
        intervalSpending,
      });
    }

    return budgetProgressData;
  } catch (error) {
    console.error("Error in getBudgetProgressLineChartData:", error);
    throw new Error("Unable to fetch budget progress data");
  }
};
