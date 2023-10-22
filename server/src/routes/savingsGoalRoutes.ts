import { Router } from "express";
import { savingsGoalController } from "../controllers";

const router = Router();

router.post("/", savingsGoalController.createSavingsGoal);
router.get("/", savingsGoalController.fetchAllGoals);
router.patch("/:goalId", savingsGoalController.updateGoalDetails);
router.delete("/:goalId", savingsGoalController.deleteGoal);

router.post("/contributions", savingsGoalController.addContributionToGoal);
router.get("/contributions/:goalId", savingsGoalController.getAllContributions);

router.post(
  "/allocate/:goalId",
  savingsGoalController.contributePercentageIncome
);
router.patch(
  "/allocate/update/:allocationId",
  savingsGoalController.updatePercentageAllocationDetails
);

router.post("/market", savingsGoalController.createMarketplaceGoal);
router.get("/market", savingsGoalController.getAllMarketplaceGoals);
router.post(
  "/market/add/:marketGoalId",
  savingsGoalController.addMarketplaceGoalToPersonal
);

export default router;
