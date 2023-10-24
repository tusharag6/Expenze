import { Request, Response } from "express";
import { accountService } from "../services";

export const createAccount = async (req: Request, res: Response) => {
  try {
    // console.log("req body : ", req.body);

    const { account_name, account_number, initial_balance } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const newAccount = await accountService.createNewAccount(
      account_name,
      account_number,
      initial_balance,
      token
    );
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ msg: "Error creating account.", error });
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const accountsData = await accountService.getUserAccounts(token);
    res.status(200).json(accountsData);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching accounts data.", error });
  }
};

export const getAccountSummary = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;

    const summary = await accountService.getAccountSummaryData(accountId);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching summary data.", error });
  }
};
