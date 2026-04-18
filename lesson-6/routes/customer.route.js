import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const customerRouter = Router();

customerRouter.get("/", authMiddleware, CustomerController.findAll);
customerRouter.get("/:id", authMiddleware, CustomerController.findById);
customerRouter.get(
  "/:id/orders",
  authMiddleware,
  CustomerController.findOrders,
);
customerRouter.delete("/:id", authMiddleware, CustomerController.deleteById);
customerRouter.post("/customers", authMiddleware, CustomerController.create);
customerRouter.get("/getApiKey/:id", CustomerController.getApiKey);

export default customerRouter;
