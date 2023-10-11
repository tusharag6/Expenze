import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewHousehold = async (userId: number, joiningId: string) => {
  const newHousehold = await prisma.household.create({
    data: {
      ownerUserId: userId,
      joiningId,
    },
  });
  return newHousehold;
};

export const getJoiningId = async (householdId: number) => {
  const household = await prisma.household.findUnique({
    where: { id: householdId },
  });

  if (!household) {
    throw new Error("Household not found.");
  }

  const joiningId = household.joiningId;

  return joiningId;
};

export const changeRoleToOwner = async (userId: number) => {
  const updatedUserData = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "Owner",
    },
  });
  return updatedUserData;
};

export const changeRoleToMember = async (userId: number) => {
  const updatedUserData = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "Member",
    },
  });
  return updatedUserData;
};

export const findHouseholdIdFromJoiningId = async (joiningId: string) => {
  const household = await prisma.household.findFirst({
    where: {
      joiningId: joiningId,
    },
  });
  const householdId = household?.id;

  return householdId;
};

export const joinNewHousehold = async (userId: number, householdId: number) => {
  const newHouseholdMember = await prisma.householdMember.create({
    data: {
      userId,
      householdId,
    },
  });

  return newHouseholdMember;
};

export const addNewAccountToHousehold = async (
  householdId: number,
  accountId: number
) => {
  const newAccount = await prisma.householdAccount.create({
    data: {
      householdId,
      accountId,
    },
  });
  return newAccount;
};

export const getHouseholdSummaryData = async (householdId: number) => {
  // Retrieve all accounts for the household
  const accounts = await prisma.account.findMany({
    where: {
      HouseholdAccount: { some: { householdId } },
    },
  });

  let totalBalance = 0;
  let totalExpense = 0;
  let totalIncome = 0;
  let numTransactions = 0;

  // Iterate through each account and calculate the summary
  if (accounts) {
    for (const account of accounts) {
      const transactions = await prisma.transaction.findMany({
        where: { account_id: account.id },
      });

      for (const transaction of transactions) {
        if (transaction.type === "Expense") {
          totalExpense += transaction.amount;
          totalBalance -= transaction.amount;
        } else if (transaction.type === "Income") {
          totalIncome += transaction.amount;
          totalBalance += transaction.amount;
        }
      }

      numTransactions += transactions.length;
    }

    // Create the summary object
    const summary = {
      totalBalance,
      totalExpense,
      totalIncome,
      numTransactions,
    };

    return summary;
  } else {
    throw new Error("Account not found.");
  }
};

// Define the route to get transactions for a household
export const fetchHouseholdTransactions = async (householdId: number) => {
  // Retrieve all accounts for the household
  const accounts = await prisma.account.findMany({
    where: {
      HouseholdAccount: { some: { householdId } },
    },
  });

  let allTransactions: any[] = [];

  // Iterate through each account and retrieve its transactions
  for (const account of accounts) {
    const transactions = await prisma.transaction.findMany({
      where: { account_id: account.id },
    });
    allTransactions = allTransactions.concat(transactions);
  }

  return allTransactions;
};
