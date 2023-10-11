import { Router } from "express";
import { householdController } from "../controllers";

const router = Router();

// Create a household
router.post("/", householdController.createHousehold);
router.get("/join/:householdId", householdController.getHouseholdJoiningId);
router.post("/join", householdController.joinHousehold);
router.post("/add", householdController.addAccount);
router.get("/summary/:householdId", householdController.getHouseholdSummary);
router.get(
  "/transaction/:householdId",
  householdController.getHouseholdTransactions
);

export default router;
