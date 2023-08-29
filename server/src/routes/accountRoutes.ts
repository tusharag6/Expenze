import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  console.log("Request Came");

  try {
    console.log(req.body);

    const { accountName, accountNumber, initialBalance } = req.body;
    console.log(accountName, accountNumber, initialBalance);

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const secretKey = process.env.JWT_SECRET;
    // console.log(secretKey);

    const decodedToken = jwt.verify(token, secretKey as jwt.Secret) as {
      userId: number;
    };
    console.log(decodedToken);

    const userId = decodedToken.userId;
    console.log(userId);

    // Add new transaction in the database
    const newAccount = await prisma.account.create({
      data: {
        account_name: accountName,
        account_number: accountNumber,
        initial_balance: initialBalance,
        user_id: userId,
      },
    });
    console.log(newAccount);

    res.status(201).json(newAccount); // Return the newly created account
  } catch (error) {
    res.status(500).json({ msg: "Error creating account.", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const secretKey = process.env.JWT_SECRET;
    // console.log(secretKey);

    const decodedToken = jwt.verify(token, secretKey as jwt.Secret) as {
      userId: number;
    };
    // console.log(decodedToken);

    const userId = decodedToken.userId;
    // console.log(userId);

    const accountsData = await prisma.account.findMany({
      where: { user_id: userId },
    });

    res.status(200).json(accountsData);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching accounts data.", error });
  }
});

router.get("/:accountId/summary", async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);

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
      totalBalance = account.initial_balance;

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

      res.status(200).json(summary);
    } else {
      res.status(404).json({ msg: "Account not found." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error fetching summary data.", error });
  }
});
export default router;
