import { Router } from "express";
import { householdController } from "../controllers";

const router = Router();

// Create a household
router.post("/", householdController.createHousehold);
router.post("/join", householdController.joinHousehold);

export default router;
