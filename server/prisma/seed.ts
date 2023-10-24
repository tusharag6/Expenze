import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create a user
    const hashedPassword = await bcrypt.hash("Demo@1234", 10);

    const user = await prisma.user.create({
      data: {
        username: "Demo User",
        email: "demo@user.com",
        password: hashedPassword,
        verified: true,
      },
    });

    // Create two accounts for the user
    const account1 = await prisma.account.create({
      data: {
        account_name: "Account 1",
        account_number: "123456789",
        total_balance: 1000.0,
        user_id: user.id,
      },
    });

    const account2 = await prisma.account.create({
      data: {
        account_name: "Account 2",
        account_number: "987654321",
        total_balance: 2000.0,
        user_id: user.id,
      },
    });

    // Create two budget categories
    const budgetCategory1 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Category 1",
        amount: 500.0,
        user_id: user.id,
      },
    });

    const budgetCategory2 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Category 2",
        amount: 800.0,
        user_id: user.id,
      },
    });

    // Create five transactions in each budget category
    for (let i = 1; i <= 5; i++) {
      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: 100.0 * i,
          type: "Expense",
          budgetCategoryId: budgetCategory1.id,
          account_id: account1.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: 200.0 * i,
          type: "Expense",
          budgetCategoryId: budgetCategory2.id,
          account_id: account2.id,
        },
      });
    }

    console.log("Seed data has been created.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
