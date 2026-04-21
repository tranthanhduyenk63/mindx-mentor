import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get(
  "/:id/orders",
  AuthMiddleware.validateApiKey,
  OrderController.getOrdersByUser,
);

export default userRouter;
