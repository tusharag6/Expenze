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

export const getAccountSummaryData = async (accountId: string) => {
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    throw new Error("Account not found.");
  }

  const transactions = await prisma.transaction.findMany({
    where: { account_id: accountId },
  });

  let totalBalance = account.total_balance;
  let totalExpense = 0;
  let totalIncome = 0;

  for (const transaction of transactions) {
    if (transaction.type === "Expense") {
      totalExpense += transaction.amount;
    } else if (transaction.type === "Income") {
      totalIncome += transaction.amount;
    }
  }

  // Calculate the updated total balance without making changes in the database
  const updatedTotalBalance = totalBalance - totalExpense + totalIncome;

  const summary = {
    totalExpense,
    totalIncome,
    totalBalance: updatedTotalBalance, // Provide the updated total balance
    numTransactions: transactions.length,
  };

  return summary;
};
