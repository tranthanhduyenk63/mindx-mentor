import express from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { CustomerMiddleware } from "../middlewares/customer.middleware.js";

const router = express.Router();

router.post("/register", CustomerController.register);
router.post(
  "/login",
  CustomerMiddleware.validateLogin,
  CustomerController.login,
);

export default router;
