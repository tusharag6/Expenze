import { Request, Response } from "express";
import { savingsGoalService, userService } from "../services";

export const createSavingsGoal = async (req: Request, res: Response) => {
  try {
    const { goalName, goalDescription, targetAmount, targetDate } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);

    const newGoal = await savingsGoalService.createGoal(
      goalName,
      goalDescription,
      targetAmount,
      targetDate,
      userId
    );
    res.status(201).json(newGoal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating goals.", error });
  }
};

export const fetchAllGoals = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);
    const goals = await savingsGoalService.getGoal(userId);
    res.status(200).json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while fetching goals.", error });
  }
};

export const updateGoalDetails = async (req: Request, res: Response) => {
  try {
    const { targetAmount, targetDate } = req.body;
    const goalId: string = req.query.goalId as string;
    const updatedGoal = savingsGoalService.updateGoal(
      targetAmount,
      targetDate,
      goalId
    );
    res.status(201).json(updatedGoal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erorr while updating the goal", error });
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const goalId: string = req.query.goalId as string;
    savingsGoalService.deleteGoal(goalId);
    res.status(200).json({ msg: "Goal Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while deleting the goal", error });
  }
};

export const addContributionToGoal = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const goalId: string = req.query.goalId as string;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);
    const contributionDate = new Date().toISOString();
    const newContribution = savingsGoalService.goalContribution(
      userId,
      goalId,
      amount,
      contributionDate
    );
    res.status(201).json(newContribution);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while adding contribution", error });
  }
};

export const getAllContributions = async (req: Request, res: Response) => {
  try {
    const goalId: string = req.query.goalId as string;
    const allContributions = savingsGoalService.getContributions(goalId);
    res.status(200).json(allContributions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error fetching contributions", error });
  }
};

export const contributePercentageIncome = async (
  req: Request,
  res: Response
) => {
  try {
    const { allocationPercentage } = req.body;
    const goalId: string = req.query.goalId as string;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);
    const newAllocation = savingsGoalService.createAllocation(
      userId,
      goalId,
      allocationPercentage
    );
    res.status(201).json(newAllocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while allocating income", error });
  }
};

export const updatePercentageAllocationDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { allocationPercentage } = req.body;
    const allocationId: string = req.query.allocationId as string;
    const updateAllocation = savingsGoalService.updateAllocation(
      allocationId,
      allocationPercentage
    );
    res.status(200).json(updateAllocation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while updating allocation", error });
  }
};

export const createMarketplaceGoal = async (req: Request, res: Response) => {
  try {
    const { name, description, defaultTargetAmount } = req.body;
    const newMarketGoal = savingsGoalService.createMarketGoal(
      name,
      description,
      defaultTargetAmount
    );
    res.status(201).json(newMarketGoal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error creating market goal", error });
  }
};

export const getAllMarketplaceGoals = async (req: Request, res: Response) => {
  try {
    const marketplaceGoals = savingsGoalService.getMarketGoals();
    res.status(201).json(marketplaceGoals);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error while fetching marketplace goals", error });
  }
};

export const addMarketplaceGoalToPersonal = async (
  req: Request,
  res: Response
) => {
  try {
    const { targetAmount, targetDate } = req.body;
    const marketGoalId: string = req.query.marketGoalId as string;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);
    const marketplaceGoal = savingsGoalService.addMarketGoalToPersonal(
      marketGoalId,
      targetAmount,
      targetDate,
      userId
    );
    res.status(201).json(marketplaceGoal);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error while adding marketplace goal to personal", error });
  }
};
