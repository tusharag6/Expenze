import { Router } from "express";
import { accountController } from "../controllers";

const router = Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.get("/:accountId/summary", accountController.getAccountSummary);

export default router;
