import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default";

export const createNewAccount = async (
  accountName: string,
  accountNumber: string,
  initialBalance: number,
  token: string
) => {
  const decodedToken: any = jwt.verify(token, JWT_SECRET) as { userId: number };
  const userId = decodedToken.userId;

  const newAccount = await prisma.account.create({
    data: {
      account_name: accountName,
      account_number: accountNumber,
      total_balance: initialBalance,
      user_id: userId,
    },
  });

  return newAccount;
};

export const getUserAccounts = async (token: string) => {
  const decodedToken: any = jwt.verify(token, JWT_SECRET) as { userId: number };
  const userId = decodedToken.userId;

  const accountsData = await prisma.account.findMany({
    where: { user_id: userId },
  });

  return accountsData;
};

export const getAccountSummaryData = async (accountId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { account_id: accountId },
  });

  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  let totalBalance = 0;
  let totalExpense = 0;
  let totalIncome = 0;
  const numTransactions = transactions.length;

  if (account) {
    totalBalance = account.total_balance;

    for (const transaction of transactions) {
      if (transaction.type === "Expense") {
        totalExpense += transaction.amount;
        totalBalance -= transaction.amount;
      } else if (transaction.type === "Income") {
        totalIncome += transaction.amount;
        totalBalance += transaction.amount;
      }
    }

    const summary = {
      totalExpense,
      totalIncome,
      totalBalance,
      numTransactions,
    };

    await prisma.account.update({
      where: { id: accountId },
      data: { total_balance: totalBalance },
    });

    return summary;
  } else {
    throw new Error("Account not found.");
  }
};
