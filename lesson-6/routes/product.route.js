import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.get("/", authMiddleware, ProductController.findAll);

export default productRouter;
