import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import accountRoutes from "./accountRoutes";
import transactionRoutes from "./transactionRoutes";
import budgetRoutes from "./budgetRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/budget", budgetRoutes);

export default router;
