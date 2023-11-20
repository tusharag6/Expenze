import { PrismaClient } from "@prisma/client";
import { subDays, addDays } from "date-fns";

const prisma = new PrismaClient();

// Bill and Subscription Management API:

// Create a new bill
export const newBill = async (
  billName: string,
  billAmount: number,
  dueDate: string,
  isRecurring: boolean,
  interval: string,
  category: string,
  userId: string,
  isPaid: boolean
) => {
  const newBill = await prisma.bill.create({
    data: {
      billName,
      dueDate,
      billAmount,
      isRecurring,
      interval,
      category,
      userId,
      isPaid,
    },
  });
  return newBill;
};

// Update an existing bill
export const updateBill = async (
  billName: string,
  dueDate: string,
  billAmount: number,
  isRecurring: boolean,
  interval: string,
  category: string,
  billId: string
) => {
  const updatedBill = await prisma.bill.update({
    where: { id: billId },
    data: {
      billName,
      dueDate,
      billAmount,
      isRecurring,
      interval,
      category,
    },
  });
  return updateBill;
};

// Delete a bill
export const deleteBill = async (billId: string) => {
  await prisma.bill.delete({
    where: {
      id: billId,
    },
  });
};

// Get a list of user's bills
export const getBills = async (userId: string) => {
  const allBills = await prisma.bill.findMany({
    where: {
      userId,
    },
  });
  return allBills;
};

// Create a new subscription
export const newSubscription = async (
  subscriptionName: string,
  startDate: string,
  endDate: string,
  monthlyCost: number,
  renewalDate: string,
  category: string,
  userId: string
) => {
  const isCancelled = false;
  const newSubscription = await prisma.subscription.create({
    data: {
      subscriptionName,
      startDate,
      endDate,
      monthlyCost,
      renewalDate,
      category,
      userId,
      isCancelled,
    },
  });
  return newSubscription;
};

// Update an existing subscription
export const updateSubscription = async (
  subscriptionName: string,
  startDate: string,
  endDate: string,
  monthlyCost: number,
  renewalDate: string,
  category: string,
  subscriptionId: string
) => {
  const updatedSubscription = await prisma.subscription.update({
    where: {
      id: subscriptionId,
    },
    data: {
      subscriptionName,
      startDate,
      endDate,
      monthlyCost,
      renewalDate,
      category,
    },
  });
  return updateSubscription;
};

// Delete a subscription
export const deleteSubscription = async (subscriptionId: string) => {
  await prisma.subscription.delete({
    where: { id: subscriptionId },
  });
};

// Get a list of user's subscriptions
export const getSubscriptions = async (userId: string) => {
  const allSubscriptions = await prisma.subscription.findMany({
    where: { userId },
  });
};

// Mark a bill as paid
export const markPaid = async (billId: string) => {
  const isPaid = true;
  const updatedBill = await prisma.bill.update({
    where: {
      id: billId,
    },
    data: {
      isPaid,
    },
  });
  return updateBill;
};

// Renew or cancel a subscription
export const renewSubscription = async (
  subscriptionId: string,
  startDate: string,
  endDate: string
) => {
  const renewedSubscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      startDate,
      endDate,
    },
  });
  return renewedSubscription;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const cancelledSubscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      isCancelled: true,
    },
  });
  return cancelSubscription;
};

// Fetch upcoming bills and subscriptions
export const upcomingBills = async (userId: string) => {
  const today = new Date();
  const thirtyDaysLater = addDays(today, 30);
  const upcomingBills = await prisma.bill.findMany({
    where: {
      userId,
      dueDate: {
        gte: today,
        lte: thirtyDaysLater,
      },
    },
  });
  return upcomingBills;
};

export const upcomingSubscriptions = async (userId: string) => {
  const today = new Date();
  const sevenDaysLater = addDays(today, 7);
  const upcomingSubscriptions = await prisma.subscription.findMany({
    where: {
      userId,
      renewalDate: {
        gte: today,
        lte: sevenDaysLater,
      },
    },
  });
  return upcomingSubscriptions;
};

// Set up recurring bills

// Bill Payment API:

// Record a bill payment
export const billPayment = async (
  paymentDate: string,
  paymentAmount: number,
  billId: string,
  accountId: string
) => {
  const payment = await prisma.billPayments.create({
    data: {
      paymentDate,
      paymentAmount,
      billId,
    },
  });
  const transaction = await prisma.transaction.create({
    data: {
      date: paymentDate,
      amount: paymentAmount,
      type: "Expense",
      account_id: accountId,
    },
  });
  return payment;
};

// Get a list of bill payments
export const getPayments = async (userId: string) => {
  const allPayments = await prisma.billPayments.findMany({
    where: {
      bill: {
        user: {
          id: userId,
        },
      },
    },
  });
  return allPayments;
};

// Calculate total payments for a specific period

// Fetch payment history for a bill
export const getHistory = async (billId: string) => {
  const payments = await prisma.billPayments.findMany({
    where: { billId },
  });
  return payments;
};

// Notification API:

// Send notifications for upcoming bills and subscriptions
// Get a list of user's notifications
// Mark notifications as read or dismiss them

// Category Management API:

// Create new categories for bills and subscriptions
// Update existing categories
// Delete categories
// List available categories
