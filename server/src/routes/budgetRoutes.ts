import { Router } from "express";
import { budgetController } from "../controllers";

const router = Router();

router.post("/", budgetController.addBudgetCategory);
router.get("/", budgetController.getBudgetCategories);

export default router;
