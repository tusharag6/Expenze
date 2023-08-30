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
