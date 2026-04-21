import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { OrderMiddleware } from "../middlewares/order.middleware.js";

const orderRouter = Router();

orderRouter.post("/", AuthMiddleware.validateApiKey, OrderController.create);
orderRouter.put(
  "/:id",
  AuthMiddleware.validateApiKey,
  OrderMiddleware.validateUpdate,
  OrderController.update,
);
orderRouter.delete(
  "/:id",
  AuthMiddleware.validateApiKey,
  OrderController.remove,
);

export default orderRouter;
