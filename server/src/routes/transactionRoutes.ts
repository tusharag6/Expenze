import { Router } from "express";
import { transactionController } from "../controllers";

const router = Router();

router.post("/accounts/:accountId", transactionController.addTransaction);
router.get("/accounts/:accountId", transactionController.getTransactions);
router.patch(
  "/:transactionId/accounts/:accountId",
  transactionController.editTransaction
);

export default router;
