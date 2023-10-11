import { Router } from "express";
import { householdController } from "../controllers";

const router = Router();

// Create a household
router.post("/", householdController.createHousehold);
router.post("/join", householdController.joinHousehold);
router.post("/add", householdController.addAccount);
router.get("/summary/:householdId", householdController.getAccountSummary);

export default router;
