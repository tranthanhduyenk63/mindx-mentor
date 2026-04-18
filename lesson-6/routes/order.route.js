import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/highvalue", OrderController.findHighValueOrders);
orderRouter.post("/", OrderController.create);
orderRouter.put("/:orderId", OrderController.updateOrder);

export default orderRouter;
