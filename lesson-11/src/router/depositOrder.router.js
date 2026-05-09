import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import DepositOrderController from "../controllers/depositOrder.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware.authenticate,
  DepositOrderController.getDepositOrders
);

export default router;
