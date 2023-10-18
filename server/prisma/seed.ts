import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Accounts
    const account1 = await prisma.account.create({
      data: {
        account_name: "ABC Bank - Savings Account",
        account_number: "12345678",
        total_balance: 5000.0,
        user: {
          connect: { id: 2 },
        },
      },
    });

    const account2 = await prisma.account.create({
      data: {
        account_name: "DEF Bank - Current Account",
        account_number: "87654321",
        total_balance: 2500.0,
        user: {
          connect: { id: 2 },
        },
      },
    });

    // Seed Budget Categories
    const budgetCategory1 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Groceries",
        amount: 500.0,
        user: {
          connect: { id: 2 },
        },
      },
    });

    const budgetCategory2 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Entertainment",
        amount: 300.0,
        user: {
          connect: { id: 2 },
        },
      },
    });

    // Seed Transactions for Budget Category 1
    const transaction1 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 50.0,
        type: "Expense",
        description: "Grocery shopping",
        account: {
          connect: { id: 3 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory1.id },
        },
      },
    });

    const transaction2 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 25.0,
        type: "Expense",
        description: "Dinner ingredients",
        account: {
          connect: { id: 3 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory1.id },
        },
      },
    });

    const transaction3 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 30.0,
        type: "Expense",
        description: "Monthly groceries",
        account: {
          connect: { id: 4 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory1.id },
        },
      },
    });

    const transaction4 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 20.0,
        type: "Expense",
        description: "Grocery shopping",
        account: {
          connect: { id: 4 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory1.id },
        },
      },
    });

    const transaction5 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 40.0,
        type: "Expense",
        description: "Weekly groceries",
        account: {
          connect: { id: 3 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory1.id },
        },
      },
    });

    // Seed Transactions for Budget Category 2
    const transaction6 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 15.0,
        type: "Expense",
        description: "Movie tickets",
        account: {
          connect: { id: 3 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory2.id },
        },
      },
    });

    const transaction7 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 10.0,
        type: "Expense",
        description: "Concert tickets",
        account: {
          connect: { id: 3 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory2.id },
        },
      },
    });

    const transaction8 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 20.0,
        type: "Expense",
        description: "Movie night snacks",
        account: {
          connect: { id: 4 },
        },
        BudgetCategory: {
          connect: { id: budgetCategory2.id },
        },
      },
    });

    // Seed income Transactions
    const transaction9 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 300.0,
        type: "Income",
        description: "Part-time job",
        account: {
          connect: { id: 3 },
        },
      },
    });

    const transaction10 = await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: 200.0,
        type: "Income",
        description: "Freelance work",
        account: {
          connect: { id: 4 },
        },
      },
    });

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
