import { Request, Response } from "express";
import { transactionService, userService } from "../services";

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, type, budgetCategory, description } = req.body;
    const accountId = parseInt(req.params.accountId);

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);

    // Ensure the account belongs to the user
    const userAccount = await userService.checkAccountOwnership(
      accountId,
      userId
    );

    const newTransaction = await transactionService.createTransaction(
      accountId,
      amount,
      type,
      budgetCategory,
      description
    );

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating transaction.", error });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const accountId = parseInt(req.params.accountId);
    const transactions = await transactionService.fetchTransactions(accountId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching transactions.", error });
  }
};

export const editTransaction = async (req: Request, res: Response) => {
  try {
    const accountId = parseInt(req.params.accountId);
    const transactionId = parseInt(req.params.transactionId);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);

    // Ensure the account belongs to the user
    const userAccount = await userService.checkAccountOwnership(
      accountId,
      userId
    );

    const { amount, type, budgetCategory, description } = req.body;
    const updatedFields: any = {};

    if (amount !== undefined && amount !== null) updatedFields.amount = amount;
    if (type !== undefined && type !== "") updatedFields.type = type;
    if (budgetCategory !== undefined && budgetCategory !== "")
      updatedFields.budgetCategory = budgetCategory;
    if (description !== undefined && description !== "")
      updatedFields.description = description;

    const updatedTransaction = await transactionService.updateTransaction(
      transactionId,
      updatedFields
    );

    res.status(200).json(updatedTransaction);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the transaction" });
  }
};
