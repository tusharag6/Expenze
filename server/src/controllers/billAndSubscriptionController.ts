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

export const updateBill = async (req: Request, res: Response) => {
  try {
    const { billName, billAmount, dueDate, isRecurring, interval, category } =
      req.body;

    const billId = req.params.billId;

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
    const billId = req.params.billId;
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
    const bills = billAndSubscriptionService.deleteBill(userId);
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching bills.", error });
  }
};

export const createNewSubscription = async (req: Request, res: Response) => {
  try {
    const {
      subscriptionName,
      startDate,
      endDate,
      monthlyCost,
      renewalDate,
      category,
    } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);

    const newSubscription = billAndSubscriptionService.newSubscription(
      subscriptionName,
      startDate,
      endDate,
      monthlyCost,
      renewalDate,
      category,
      userId
    );
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating subscription.", error });
  }
};

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const {
      subscriptionName,
      startDate,
      endDate,
      monthlyCost,
      renewalDate,
      category,
    } = req.body;

    const subscriptionId = req.params.subscriptionId;

    const updatedSubscription = billAndSubscriptionService.updateSubscription(
      subscriptionName,
      startDate,
      endDate,
      monthlyCost,
      renewalDate,
      category,
      subscriptionId
    );
    res.status(200).json(updatedSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating subscription.", error });
  }
};

export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    billAndSubscriptionService.deleteSubscription(subscriptionId);
    res.status(200).json({ msg: "Subscription Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting subscription.", error });
  }
};

export const getAllSubscription = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }

    const userId = userService.getUserIdFromToken(token);
    const subscriptions = billAndSubscriptionService.getSubscriptions(userId);
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching subscriptions.", error });
  }
};

export const markBillPaid = async (req: Request, res: Response) => {
  try {
    const billId = req.params.billId;
    const updatedBill = billAndSubscriptionService.markPaid(billId);
    res.status(200).json(updateBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error marking bill paid.", error });
  }
};

export const renewSubscription = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;
    const subscriptionId = req.params.subscriptionId;
    const renewedSubscription = billAndSubscriptionService.renewSubscription(
      startDate,
      endDate,
      subscriptionId
    );
    res.status(200).json(renewedSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error renewing subscriptions.", error });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const subscriptionId = req.params.subscriptionId;

    const cancelledSubscription =
      billAndSubscriptionService.cancelSubscription(subscriptionId);
    res.status(200).json(cancelSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error cancelling subscriptions.", error });
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

export const getUpcomingSubscriptions = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token not found." });
    }
    const userId = userService.getUserIdFromToken(token);

    const upcomingSubscriptions =
      billAndSubscriptionService.upcomingSubscriptions(userId);
    res.status(200).json(upcomingSubscriptions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error fetching upcoming subscriptions.", error });
  }
};

export const payBill = async (req: Request, res: Response) => {
  try {
    const { paymentAmount, paymentDate } = req.body;
    const billId = req.params.billId;
    const accountId = req.params.accountId;

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
    const billId = req.params.billId;
    const payments = billAndSubscriptionService.getHistory(billId);
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching history of payments.", error });
  }
};
