import { Router } from "express";
import { savingsGoalController } from "../controllers";

const router = Router();

router.post("/", savingsGoalController.createSavingsGoal);
router.get("/", savingsGoalController.fetchAllGoals);
router.patch("/", savingsGoalController.updateGoalDetails);
router.delete("/", savingsGoalController.deleteGoal);

router.post("/contributions", savingsGoalController.addContributionToGoal);
router.get("/contributions/", savingsGoalController.getAllContributions);

router.post("/allocate", savingsGoalController.contributePercentageIncome);
router.patch(
  "/allocate",
  savingsGoalController.updatePercentageAllocationDetails
);

router.post("/market", savingsGoalController.createMarketplaceGoal);
router.get("/market", savingsGoalController.getAllMarketplaceGoals);
router.post("/market/add", savingsGoalController.addMarketplaceGoalToPersonal);

export default router;
