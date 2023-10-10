import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import accountRoutes from "./accountRoutes";
import transactionRoutes from "./transactionRoutes";
import budgetRoutes from "./budgetRoutes";
import householdRoutes from "./householdRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/budget", budgetRoutes);
router.use("/household", householdRoutes);

export default router;
