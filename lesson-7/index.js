import express from "express";
import dotenv from "dotenv";
dotenv.config();

import customerRouter from "./routes/customer.route.js";
import { connectToDb } from "./configs/db.js";
import orderRouter from "./routes/order.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
await connectToDb();

app.use(express.json());

app.use("/customers", customerRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
