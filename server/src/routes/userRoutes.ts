import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.get("/", userController.getUserInfo);

export default router;
