import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction = async (
  accountId: string,
  amount: number,
  type: string,
  budgetCategory: string,
  description: string
) => {
  try {
    // Validate account existence
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    // Validate budget category existence
    const budgetCategoryData = await prisma.budgetCategory.findFirst({
      where: { budgetCategory },
    });

    if (!budgetCategoryData) {
      budgetCategory = "";
    }

    // Create new transaction
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        budgetCategory,
        description,
        date: new Date(),
        account_id: accountId,
      },
    });

    return newTransaction;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Error creating transaction");
  }
};

export const fetchTransactions = async (accountId: string) => {
  const transactions = await prisma.transaction.findMany({
    where: { account_id: accountId },
  });

  return transactions;
};

export const updateTransaction = async (
  transactionId: string,
  updatedFields: any
) => {
  const updatedTransaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: updatedFields,
  });

  return updatedTransaction;
};
