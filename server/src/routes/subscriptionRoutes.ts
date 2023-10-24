import { Router } from "express";
import { subscriptionController } from "../controllers";

const router = Router();

router.post("/", subscriptionController.createNewSubscription);
router.patch("/", subscriptionController.updateSubscription);
router.delete("/", subscriptionController.deleteSubscription);
router.get("/", subscriptionController.getAllSubscription);

router.patch("/renew", subscriptionController.renewSubscription);
router.patch("/cancel", subscriptionController.cancelSubscription);
router.get("/upcoming", subscriptionController.getUpcomingSubscriptions);

export default router;
