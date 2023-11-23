import { Request, Response } from "express";
import { billAndSubscriptionService, userService } from "../services";

export const createNewBill = async (req: Request, res: Response) => {
  try {
    const {
      billName,
      dueDate,
      billAmount,
      isRecurring,
      interval,
      category,
      isPaid,
    } = req.body;

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
      userId,
      isPaid
    );
    res.status(201).json(newBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating bill.", error });
  }
};

export const updateBill = async (req: Request, res: Response) => {
  try {
    const { billName, billAmount, dueDate, isRecurring, interval, category } =
      req.body;

    const billId: string = req.query.billId as string;

    const updatedBill = billAndSubscriptionService.updateBill(
      billName,
      billAmount,
      dueDate,
      isRecurring,
      interval,
      category,
      billId
    );
    res.status(200).json(updateBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating bill.", error });
  }
};

export const deleteBill = async (req: Request, res: Response) => {
  try {
    const billId: string = req.query.billId as string;
    billAndSubscriptionService.deleteBill(billId);
    res.status(200).json({ msg: "Bill Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting bill.", error });
  }
};

export const getAllBill = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);

    const bills = await billAndSubscriptionService.getBills(userId);
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching bills.", error });
  }
};

export const markBillPaid = async (req: Request, res: Response) => {
  try {
    const billId: string = req.query.billId as string;
    const updatedBill = billAndSubscriptionService.markPaid(billId);
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error marking bill paid.", error });
  }
};

export const getUpcomingBills = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const userId = userService.getUserIdFromToken(token);

    const upcomingBills = billAndSubscriptionService.upcomingBills(userId);
    res.status(200).json(upcomingBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching upcoming bills.", error });
  }
};

export const payBill = async (req: Request, res: Response) => {
  try {
    const { paymentAmount, paymentDate } = req.body;
    const billId: string = req.query.billId as string;
    const accountId: string = req.query.accountId as string;
    const payment = billAndSubscriptionService.billPayment(
      paymentAmount,
      paymentDate,
      billId,
      accountId
    );
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error while bill payment.", error });
  }
};

export const getAllBillPayments = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const userId = userService.getUserIdFromToken(token);
    const payments = billAndSubscriptionService.getPayments(userId);
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching payments.", error });
  }
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const billId: string = req.query.billId as string;
    const payments = billAndSubscriptionService.getHistory(billId);
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching history of payments.", error });
  }
};
