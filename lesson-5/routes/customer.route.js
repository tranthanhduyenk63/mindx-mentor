import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.get("/", CustomerController.findAll);
customerRouter.get("/:id", CustomerController.findById);
customerRouter.get("/:id/orders", CustomerController.findOrders);
customerRouter.delete("/:id", CustomerController.deleteById);
customerRouter.post("/customers", CustomerController.create);

export default customerRouter;
