import { Request, Response } from "express";
import { request } from "http";
import { householdService, userService } from "../services";

export const createHousehold = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);

    // Generate joining Id
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let joiningId = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      joiningId += characters.charAt(randomIndex);
    }

    const newHousehold = await householdService.createNewHousehold(
      userId,
      joiningId
    );

    const updatedUserData = await householdService.changeRoleToOwner(userId);
    res.status(201).json({ newHousehold, updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating household.", error });
  }
};

export const getHouseholdJoiningId = async (req: Request, res: Response) => {
  try {
    const householdId = parseInt(req.params.householdId);

    const joiningId = await householdService.getJoiningId(householdId);

    res.json({ joiningId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the joining ID." });
  }
};

export const joinHousehold = async (req: Request, res: Response) => {
  try {
    const { joiningId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = userService.getUserIdFromToken(token);

    const householdId = await householdService.findHouseholdIdFromJoiningId(
      joiningId
    );
    if (!householdId) {
      return res.status(401).json({ message: "Unauthorized to join" });
    }
    const newHouseholdMember = await householdService.joinNewHousehold(
      userId,
      householdId
    );
    const updatedUserData = await householdService.changeRoleToMember(userId);
    res.status(201).json(newHouseholdMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error joining household.", error });
  }
};

export const addAccount = async (req: Request, res: Response) => {
  try {
    const { householdId, accountId } = req.body;
    const newAccount = await householdService.addNewAccountToHousehold(
      householdId,
      accountId
    );
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ msg: "Error creating account.", error });
  }
};

export const getHouseholdSummary = async (req: Request, res: Response) => {
  try {
    const householdId = parseInt(req.params.householdId);

    const summary = await householdService.getHouseholdSummaryData(householdId);
    res.status(200).json(summary);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching household summary data.", error });
  }
};

export const getHouseholdTransactions = async (req: Request, res: Response) => {
  try {
    const householdId = parseInt(req.params.householdId);
    const transactions = await householdService.fetchHouseholdTransactions(
      householdId
    );
    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching household transactions.", error });
  }
};
