import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  try {
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
        account_name: "HDFC Bank",
        account_number: "123456789",
        total_balance: 10000.0,
        user_id: user.id,
      },
    });

    const account2 = await prisma.account.create({
      data: {
        account_name: "SBI Bank",
        account_number: "987654321",
        total_balance: 20000.0,
        user_id: user.id,
      },
    });

    // Create budget categories
    const budgetCategory1 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Housing",
        amount: 2000.0,
        user_id: user.id,
      },
    });

    const budgetCategory2 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Education",
        amount: 800.0,
        user_id: user.id,
      },
    });

    const budgetCategory3 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Entertainment",
        amount: 1000.0,
        user_id: user.id,
      },
    });

    const budgetCategory4 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Food",
        amount: 1500.0,
        user_id: user.id,
      },
    });

    const budgetCategory5 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Transportation",
        amount: 200.0,
        user_id: user.id,
      },
    });

    const budgetCategory6 = await prisma.budgetCategory.create({
      data: {
        budgetCategory: "Shopping",
        amount: 600.0,
        user_id: user.id,
      },
    });

    // Create transactions for each budget category
    for (let i = 1; i <= 3; i++) {
      // Create expense transactions
      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 200),
          type: "Expense",
          budgetCategoryId: budgetCategory1.id,
          account_id: account1.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 100),
          type: "Expense",
          budgetCategoryId: budgetCategory2.id,
          account_id: account1.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 200),
          type: "Expense",
          budgetCategoryId: budgetCategory3.id,
          account_id: account1.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 100),
          type: "Expense",
          budgetCategoryId: budgetCategory4.id,
          account_id: account1.id,
        },
      });
    }
    for (let i = 1; i <= 2; i++) {
      // Create expense transactions
      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 200),
          type: "Expense",
          budgetCategoryId: budgetCategory1.id,
          account_id: account2.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 100),
          type: "Expense",
          budgetCategoryId: budgetCategory2.id,
          account_id: account2.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 200),
          type: "Expense",
          budgetCategoryId: budgetCategory3.id,
          account_id: account2.id,
        },
      });

      await prisma.transaction.create({
        data: {
          date: new Date(),
          amount: Math.round(Math.random() * 100),
          type: "Expense",
          budgetCategoryId: budgetCategory4.id,
          account_id: account2.id,
        },
      });
    }

    // Create income transactions
    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 1000),
        type: "Income",
        description: "Salary",
        account_id: account1.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 500),
        type: "Income",
        description: "Freelance Gig",
        account_id: account2.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 300),
        type: "Income",
        description: "Scholarship",
        account_id: account1.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 200),
        type: "Income",
        description: "Gift",
        account_id: account2.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 1000),
        type: "Income",
        description: "Salary",
        account_id: account2.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 500),
        type: "Income",
        description: "Freelance Gig",
        account_id: account2.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 300),
        type: "Income",
        description: "Scholarship",
        account_id: account2.id,
      },
    });

    await prisma.transaction.create({
      data: {
        date: new Date(),
        amount: Math.round(Math.random() * 200),
        type: "Income",
        description: "Gift",
        account_id: account2.id,
      },
    });

    const bills = await prisma.bill.createMany({
      data: [
        {
          billName: "Rent",
          dueDate: new Date("2023-12-01"),
          billAmount: 1200.0,
          isRecurring: true,
          interval: "monthly",
          category: "Housing",
          isPaid: false,
          userId: user.id,
        },
        {
          billName: "Utilities",
          dueDate: new Date("2023-12-05"),
          billAmount: 200.0,
          isRecurring: true,
          interval: "monthly",
          category: "Utilities",
          isPaid: false,
          userId: user.id,
        },
        {
          billName: "Internet",
          dueDate: new Date("2023-12-10"),
          billAmount: 50.0,
          isRecurring: true,
          interval: "monthly",
          category: "Utilities",
          isPaid: false,
          userId: user.id,
        },
        {
          billName: "Gym Membership",
          dueDate: new Date("2023-12-15"),
          billAmount: 30.0,
          isRecurring: true,
          interval: "monthly",
          category: "Fitness",
          isPaid: false,
          userId: user.id,
        },
        {
          billName: "Credit Card Payment",
          dueDate: new Date("2023-12-20"),
          billAmount: 150.0,
          isRecurring: true,
          interval: "monthly",
          category: "Debt",
          isPaid: false,
          userId: user.id,
        },
      ],
    });

    console.log("Seed data has been created.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
