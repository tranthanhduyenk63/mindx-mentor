import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/configs/db.js";
import authRouter from "./src/router/auth.router.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";
import depositOrderRouter from "./src/router/depositOrder.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

//connect to mongodb
connectDB();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  console.log("server is serving ok");
  return res.send("ok");
});

//routes
app.use("/auth", authRouter);
app.use("/deposit-orders", (req, res, next) => {
  console.log("da di qua route deposit-orders");
  next();
}, depositOrderRouter);

// example: app.use('/protected-route', authMiddleware.authenticate, protectedRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// index -> router -> controller -> model
