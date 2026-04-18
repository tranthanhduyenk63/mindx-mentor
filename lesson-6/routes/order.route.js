import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.get(
  "/highvalue",
  authMiddleware,
  OrderController.findHighValueOrders,
);
orderRouter.post("/", authMiddleware, OrderController.create);
orderRouter.put("/:orderId", authMiddleware, OrderController.updateOrder);

export default orderRouter;
