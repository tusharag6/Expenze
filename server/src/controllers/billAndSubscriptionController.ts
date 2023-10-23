import { Request, Response } from "express";
import { billAndSubscriptionService, userService } from "../services";

export const createNewBill = async (req: Request, res: Response) => {
  try {
    const { billName, billAmount, dueDate, isRecurring, interval, category } =
      req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);

    const newBill = billAndSubscriptionService.newBill(
      billName,
      billAmount,
      dueDate,
      isRecurring,
      interval,
      category,
      userId
    );
    res.status(201).json(newBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating bill.", error });
  }
};
