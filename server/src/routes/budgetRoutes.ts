import { Router } from "express";
import { budgetController } from "../controllers";

const router = Router();

router.post("/", budgetController.addBudgetCategory);
router.get("/", budgetController.getBudgetCategories);
router.get("/summary", budgetController.getBudgetSummary);
router.get(
  "/category-spending-chart",
  budgetController.getCategorySpendingPieChart
);
router.get(
  "/budget-vs-actual-bar-chart",
  budgetController.getBudgetVsActualBarChart
);
router.get(
  "/budget-progress-line-chart",
  budgetController.getBudgetProgressLineChart
);

export default router;
