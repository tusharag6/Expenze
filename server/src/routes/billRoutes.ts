import { Router } from "express";
import { billsController } from "../controllers";

const router = Router();

router.post("/", billsController.createNewBill);
router.patch("/", billsController.updateBill);
router.delete("/", billsController.deleteBill);
router.get("/", billsController.getAllBill);

router.patch("/paid", billsController.markBillPaid);
router.get("/upcoming", billsController.getUpcomingBills);

router.post("/pay", billsController.payBill);
router.get("/pay", billsController.getAllBillPayments);
router.get("/history", billsController.getPaymentHistory);
export default router;
