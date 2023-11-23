import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import accountRoutes from "./accountRoutes";
import transactionRoutes from "./transactionRoutes";
import budgetRoutes from "./budgetRoutes";
import householdRoutes from "./householdRoutes";
import savingsGoalRoutes from "./savingsGoalRoutes";
import billsRoutes from "./billRoutes";
import subscriptionRoutes from "./subscriptionRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/budget", budgetRoutes);
router.use("/household", householdRoutes);
router.use("/goals", savingsGoalRoutes);
router.use("/bills", billsRoutes);
router.use("/subscriptions", subscriptionRoutes);

export default router;
