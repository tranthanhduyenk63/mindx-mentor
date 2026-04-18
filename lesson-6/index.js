import express from "express";
import { connectToDb } from "./configs/db.js";
import customerRouter from "./routes/customer.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";

const app = express();
app.use(express.json());

connectToDb();

app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
