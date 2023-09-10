import { Request, Response } from "express";
import { budgetService, userService } from "../services";

export const addBudgetCategory = async (req: Request, res: Response) => {
  try {
    const { budgetCategory, amount } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);

    // Check if user exists
    const user = await userService.getUserById(token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newCategory = await budgetService.createBudgetCategory(
      userId,
      budgetCategory,
      amount
    );

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating category.", error });
  }
};

export const getBudgetCategories = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);

    const budgetCategories = await budgetService.getBudgetCategoriesForUser(
      userId
    );

    res.status(200).json(budgetCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching categories.", error });
  }
};

export const getBudgetSummary = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);

    const summary = await budgetService.getBudgetSummaryData(userId);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching summary data.", error });
  }
};

export const getCategorySpendingPieChart = async (
  req: Request,
  res: Response
) => {
  try {
    const { budgetPeriodStart } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);

    const pieChartData = await budgetService.getCategorySpendingPieChartData(
      userId,
      budgetPeriodStart
    );
    res.json(pieChartData);
  } catch (error) {
    console.error("Error in getCategorySpendingPieChart controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBudgetVsActualBarChart = async (
  req: Request,
  res: Response
) => {
  try {
    const { budgetPeriodStart } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);
    const barChartData = await budgetService.getBudgetVsActualBarChartData(
      userId,
      budgetPeriodStart
    );
    res.json(barChartData);
  } catch (error) {
    console.error("Error in getBudgetVsActualBarChart controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBudgetProgressLineChart = async (
  req: Request,
  res: Response
) => {
  try {
    const { interval } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = userService.getUserIdFromToken(token);
    const budgetPeriodStart = new Date(req.body.budgetPeriodStart);
    const lineChartData = await budgetService.getBudgetProgressLineChartData(
      userId,
      budgetPeriodStart,
      interval
    );
    res.json(lineChartData);
  } catch (error) {
    console.error("Error in getBudgetProgressLineChart controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
