import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const prisma = new PrismaClient();

// Add Transaction
router.post("/accounts/:accountId", async (req, res) => {
  try {
    const { amount, type, budgetCategory, description } = req.body;
    const accountId = parseInt(req.params.accountId);

    // Validate account existence
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    const budgetCategoryData = await prisma.budgetCategory.findFirst({
      where: { budgetCategory },
    });
    // console.log("budget category Id", budgetCategoryId);
    const budgetCategoryId = Number(budgetCategoryData?.id);

    if (!budgetCategory) {
      return res.status(404).json({ msg: "Budget category not found." });
    }

    if (!account) {
      return res.status(404).json({ msg: "Account not found." });
    }

    // Add new transaction in the database
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        budgetCategory,
        description,
        date: new Date(),
        account_id: accountId,
        budgetCategoryId: Number(budgetCategoryId),
      },
    });
    console.log(newTransaction);

    res.status(201).json(newTransaction); // Return the newly created user
  } catch (error) {
    res.status(500).json({ msg: "Error creating transaction.", error });
  }
});

// Get transactions for an account
router.get("/accounts/:accountId", async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);

    // Fetch transactions for the account
    const transactions = await prisma.transaction.findMany({
      where: { account_id: accountId },
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching transactions.", error });
  }
});

// Edit transaction for an account
router.patch("/:transactionId/accounts/:accountId/", async (req, res) => {
  const { amount, type, budgetCategory, description } = req.body;
  // console.log(amount, type, budgetCategory, description);

  const updatedFields: any = {};
  if (amount !== undefined && amount !== null) updatedFields.amount = amount;
  if (type !== undefined && type !== "") updatedFields.type = type;
  if (budgetCategory !== undefined && budgetCategory !== "")
    updatedFields.budgetCategory = budgetCategory;
  if (description !== undefined && description !== "")
    updatedFields.description = description;
  // console.log(updatedFields);

  try {
    const accountId = parseInt(req.params.accountId);
    const transactionId = parseInt(req.params.transactionId);

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: updatedFields,
    });

    res.status(200).json(updatedTransaction);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the transaction" });
  }
});
export default router;
