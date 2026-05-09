import { Router } from "express";
import { AccountController } from "../controllers/account.controller.js";

const router = Router();

router.post("/register", AccountController.register);

export default router;
